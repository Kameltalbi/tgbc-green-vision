import express from 'express';
import pool from '../../src/lib/database.js';

const router = express.Router();

// GET /api/resources - Récupérer toutes les ressources
router.get('/', async (req, res) => {
  try {
    const { language = 'fr', page = 1, limit = 10, type, category, status = 'published' } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = `
      SELECT 
        r.*,
        rt.id as translation_id,
        rt.language,
        rt.title,
        rt.description,
        rt.type,
        rt.category,
        rt.tags
      FROM resources r
      JOIN resource_translations rt ON r.id = rt.resource_id
      WHERE rt.language = $1 AND r.status = $2
    `;
    
    const params = [language, status];
    let paramIndex = 3;

    if (type) {
      query += ` AND rt.type = $${paramIndex}`;
      params.push(type);
      paramIndex++;
    }

    if (category) {
      query += ` AND rt.category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    query += ` ORDER BY r.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Compter le total
    let countQuery = `
      SELECT COUNT(*) 
      FROM resources r
      JOIN resource_translations rt ON r.id = rt.resource_id
      WHERE rt.language = $1 AND r.status = $2
    `;
    
    const countParams = [language, status];
    let countParamIndex = 3;

    if (type) {
      countQuery += ` AND rt.type = $${countParamIndex}`;
      countParams.push(type);
      countParamIndex++;
    }

    if (category) {
      countQuery += ` AND rt.category = $${countParamIndex}`;
      countParams.push(category);
      countParamIndex++;
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    const formattedResources = result.rows.map(row => ({
      id: row.id,
      slug: row.slug,
      file_url: row.file_url,
      file_size: row.file_size,
      file_type: row.file_type,
      downloads: row.downloads,
      status: row.status,
      created_at: row.created_at,
      updated_at: row.updated_at,
      translation: {
        id: row.translation_id,
        resource_id: row.id,
        language: row.language,
        title: row.title,
        description: row.description,
        type: row.type,
        category: row.category,
        tags: row.tags,
      }
    }));

    res.json({
      resources: formattedResources,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des ressources:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des ressources' });
  }
});

// GET /api/resources/:slug - Récupérer une ressource spécifique
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { language = 'fr' } = req.query;

    const result = await pool.query(`
      SELECT 
        r.*,
        rt.id as translation_id,
        rt.language,
        rt.title,
        rt.description,
        rt.type,
        rt.category,
        rt.tags
      FROM resources r
      JOIN resource_translations rt ON r.id = rt.resource_id
      WHERE r.slug = $1 AND rt.language = $2 AND r.status = 'published'
    `, [slug, language]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ressource non trouvée' });
    }

    const row = result.rows[0];
    const resource = {
      id: row.id,
      slug: row.slug,
      file_url: row.file_url,
      file_size: row.file_size,
      file_type: row.file_type,
      downloads: row.downloads,
      status: row.status,
      created_at: row.created_at,
      updated_at: row.updated_at,
      translation: {
        id: row.translation_id,
        resource_id: row.id,
        language: row.language,
        title: row.title,
        description: row.description,
        type: row.type,
        category: row.category,
        tags: row.tags,
      }
    };

    // Incrémenter les téléchargements
    await pool.query(`
      UPDATE resources 
      SET downloads = downloads + 1 
      WHERE slug = $1
    `, [slug]);

    res.json(resource);
  } catch (error) {
    console.error('Erreur lors de la récupération de la ressource:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la ressource' });
  }
});

// POST /api/resources - Créer une nouvelle ressource (Admin)
router.post('/', async (req, res) => {
  try {
    const { 
      slug, 
      file_url, 
      file_size, 
      file_type, 
      status, 
      translations 
    } = req.body;

    if (!slug || !file_url || !translations || !Array.isArray(translations)) {
      return res.status(400).json({ error: 'Données invalides' });
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Créer la ressource principale
      const resourceResult = await client.query(`
        INSERT INTO resources (slug, file_url, file_size, file_type, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `, [slug, file_url, file_size, file_type, status || 'draft']);

      const resourceId = resourceResult.rows[0].id;

      // Créer les traductions
      for (const translation of translations) {
        await client.query(`
          INSERT INTO resource_translations (
            resource_id, language, title, description, type, category, tags
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [
          resourceId, translation.language, translation.title, 
          translation.description, translation.type, translation.category, translation.tags
        ]);
      }

      await client.query('COMMIT');
      res.status(201).json({ id: resourceId, message: 'Ressource créée avec succès' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur lors de la création de la ressource:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la ressource' });
  }
});

// PUT /api/resources/:slug - Mettre à jour une ressource (Admin)
router.put('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { file_url, file_size, file_type, status, translations } = req.body;

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Mettre à jour la ressource principale
      await client.query(`
        UPDATE resources 
        SET file_url = $1, file_size = $2, file_type = $3, status = $4,
            updated_at = CURRENT_TIMESTAMP
        WHERE slug = $5
      `, [file_url, file_size, file_type, status, slug]);

      // Supprimer les anciennes traductions
      await client.query(`
        DELETE FROM resource_translations 
        WHERE resource_id = (SELECT id FROM resources WHERE slug = $1)
      `, [slug]);

      // Ajouter les nouvelles traductions
      const resourceResult = await client.query(`
        SELECT id FROM resources WHERE slug = $1
      `, [slug]);

      if (resourceResult.rows.length === 0) {
        return res.status(404).json({ error: 'Ressource non trouvée' });
      }

      const resourceId = resourceResult.rows[0].id;

      for (const translation of translations) {
        await client.query(`
          INSERT INTO resource_translations (
            resource_id, language, title, description, type, category, tags
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [
          resourceId, translation.language, translation.title, 
          translation.description, translation.type, translation.category, translation.tags
        ]);
      }

      await client.query('COMMIT');
      res.json({ message: 'Ressource mise à jour avec succès' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la ressource:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la ressource' });
  }
});

// DELETE /api/resources/:slug - Supprimer une ressource (Admin)
router.delete('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await pool.query(`
      DELETE FROM resources 
      WHERE slug = $1
      RETURNING id
    `, [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ressource non trouvée' });
    }

    res.json({ message: 'Ressource supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la ressource:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la ressource' });
  }
});

export default router;
