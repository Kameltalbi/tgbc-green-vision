import express from 'express';
import pool from '../../src/lib/database.js';

const router = express.Router();

// GET /api/events - Récupérer tous les événements
router.get('/', async (req, res) => {
  try {
    const { language = 'fr', page = 1, limit = 10, category, status = 'published' } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = `
      SELECT 
        e.*,
        et.id as translation_id,
        et.language,
        et.title,
        et.description,
        et.category,
        et.tags
      FROM events e
      JOIN event_translations et ON e.id = et.event_id
      WHERE et.language = $1 AND e.status = $2
    `;
    
    const params = [language, status];
    let paramIndex = 3;

    if (category) {
      query += ` AND et.category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    query += ` ORDER BY e.start_date ASC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Compter le total
    let countQuery = `
      SELECT COUNT(*) 
      FROM events e
      JOIN event_translations et ON e.id = et.event_id
      WHERE et.language = $1 AND e.status = $2
    `;
    
    const countParams = [language, status];
    let countParamIndex = 3;

    if (category) {
      countQuery += ` AND et.category = $${countParamIndex}`;
      countParams.push(category);
      countParamIndex++;
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    const formattedEvents = result.rows.map(row => ({
      id: row.id,
      slug: row.slug,
      start_date: row.start_date,
      end_date: row.end_date,
      location: row.location,
      max_attendees: row.max_attendees,
      price: row.price,
      currency: row.currency,
      registration_url: row.registration_url,
      status: row.status,
      created_at: row.created_at,
      updated_at: row.updated_at,
      translation: {
        id: row.translation_id,
        event_id: row.id,
        language: row.language,
        title: row.title,
        description: row.description,
        category: row.category,
        tags: row.tags,
      }
    }));

    res.json({
      events: formattedEvents,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des événements' });
  }
});

// GET /api/events/:slug - Récupérer un événement spécifique
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { language = 'fr' } = req.query;

    const result = await pool.query(`
      SELECT 
        e.*,
        et.id as translation_id,
        et.language,
        et.title,
        et.description,
        et.category,
        et.tags
      FROM events e
      JOIN event_translations et ON e.id = et.event_id
      WHERE e.slug = $1 AND et.language = $2 AND e.status = 'published'
    `, [slug, language]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }

    const row = result.rows[0];
    const event = {
      id: row.id,
      slug: row.slug,
      start_date: row.start_date,
      end_date: row.end_date,
      location: row.location,
      max_attendees: row.max_attendees,
      price: row.price,
      currency: row.currency,
      registration_url: row.registration_url,
      status: row.status,
      created_at: row.created_at,
      updated_at: row.updated_at,
      translation: {
        id: row.translation_id,
        event_id: row.id,
        language: row.language,
        title: row.title,
        description: row.description,
        category: row.category,
        tags: row.tags,
      }
    };

    res.json(event);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'événement:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'événement' });
  }
});

// POST /api/events - Créer un nouvel événement (Admin)
router.post('/', async (req, res) => {
  try {
    const { 
      slug, 
      start_date, 
      end_date, 
      location, 
      max_attendees, 
      price, 
      currency, 
      registration_url, 
      status, 
      translations 
    } = req.body;

    if (!slug || !start_date || !translations || !Array.isArray(translations)) {
      return res.status(400).json({ error: 'Données invalides' });
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Créer l'événement principal
      const eventResult = await client.query(`
        INSERT INTO events (
          slug, start_date, end_date, location, max_attendees, 
          price, currency, registration_url, status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
      `, [slug, start_date, end_date, location, max_attendees, price, currency, registration_url, status || 'draft']);

      const eventId = eventResult.rows[0].id;

      // Créer les traductions
      for (const translation of translations) {
        await client.query(`
          INSERT INTO event_translations (
            event_id, language, title, description, category, tags
          )
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [
          eventId, translation.language, translation.title, 
          translation.description, translation.category, translation.tags
        ]);
      }

      await client.query('COMMIT');
      res.status(201).json({ id: eventId, message: 'Événement créé avec succès' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'événement' });
  }
});

// PUT /api/events/:slug - Mettre à jour un événement (Admin)
router.put('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { 
      start_date, 
      end_date, 
      location, 
      max_attendees, 
      price, 
      currency, 
      registration_url, 
      status, 
      translations 
    } = req.body;

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Mettre à jour l'événement principal
      await client.query(`
        UPDATE events 
        SET start_date = $1, end_date = $2, location = $3, max_attendees = $4,
            price = $5, currency = $6, registration_url = $7, status = $8,
            updated_at = CURRENT_TIMESTAMP
        WHERE slug = $9
      `, [start_date, end_date, location, max_attendees, price, currency, registration_url, status, slug]);

      // Supprimer les anciennes traductions
      await client.query(`
        DELETE FROM event_translations 
        WHERE event_id = (SELECT id FROM events WHERE slug = $1)
      `, [slug]);

      // Ajouter les nouvelles traductions
      const eventResult = await client.query(`
        SELECT id FROM events WHERE slug = $1
      `, [slug]);

      if (eventResult.rows.length === 0) {
        return res.status(404).json({ error: 'Événement non trouvé' });
      }

      const eventId = eventResult.rows[0].id;

      for (const translation of translations) {
        await client.query(`
          INSERT INTO event_translations (
            event_id, language, title, description, category, tags
          )
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [
          eventId, translation.language, translation.title, 
          translation.description, translation.category, translation.tags
        ]);
      }

      await client.query('COMMIT');
      res.json({ message: 'Événement mis à jour avec succès' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'événement:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'événement' });
  }
});

// DELETE /api/events/:slug - Supprimer un événement (Admin)
router.delete('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await pool.query(`
      DELETE FROM events 
      WHERE slug = $1
      RETURNING id
    `, [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }

    res.json({ message: 'Événement supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'événement' });
  }
});

export default router;
