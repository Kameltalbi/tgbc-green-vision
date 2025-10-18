import express from 'express';
import pool from '../../src/lib/database.js';

const router = express.Router();

// GET /api/members - Récupérer tous les membres (Admin)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, membership_type } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = `
      SELECT * FROM members
      WHERE 1=1
    `;
    
    const params = [];
    let paramIndex = 1;

    if (status) {
      query += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    if (membership_type) {
      query += ` AND membership_type = $${paramIndex}`;
      params.push(membership_type);
      paramIndex++;
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Compter le total
    let countQuery = `SELECT COUNT(*) FROM members WHERE 1=1`;
    const countParams = [];
    let countParamIndex = 1;

    if (status) {
      countQuery += ` AND status = $${countParamIndex}`;
      countParams.push(status);
      countParamIndex++;
    }

    if (membership_type) {
      countQuery += ` AND membership_type = $${countParamIndex}`;
      countParams.push(membership_type);
      countParamIndex++;
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      members: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des membres:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des membres' });
  }
});

// GET /api/members/:id - Récupérer un membre spécifique (Admin)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT * FROM members WHERE id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Membre non trouvé' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du membre:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du membre' });
  }
});

// POST /api/members - Créer un nouveau membre (Inscription)
router.post('/', async (req, res) => {
  try {
    const { 
      email, 
      first_name, 
      last_name, 
      company, 
      position, 
      phone, 
      membership_type 
    } = req.body;

    if (!email || !first_name || !last_name) {
      return res.status(400).json({ error: 'Email, prénom et nom sont requis' });
    }

    // Vérifier si l'email existe déjà
    const existingMember = await pool.query(`
      SELECT id FROM members WHERE email = $1
    `, [email]);

    if (existingMember.rows.length > 0) {
      return res.status(409).json({ error: 'Un membre avec cet email existe déjà' });
    }

    const result = await pool.query(`
      INSERT INTO members (
        email, first_name, last_name, company, position, phone, membership_type, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
      RETURNING id, email, first_name, last_name, status, created_at
    `, [email, first_name, last_name, company, position, phone, membership_type]);

    res.status(201).json({
      member: result.rows[0],
      message: 'Demande d\'adhésion soumise avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la création du membre:', error);
    res.status(500).json({ error: 'Erreur lors de la création du membre' });
  }
});

// PUT /api/members/:id - Mettre à jour un membre (Admin)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      email, 
      first_name, 
      last_name, 
      company, 
      position, 
      phone, 
      membership_type, 
      status 
    } = req.body;

    const result = await pool.query(`
      UPDATE members 
      SET email = $1, first_name = $2, last_name = $3, company = $4,
          position = $5, phone = $6, membership_type = $7, status = $8,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *
    `, [email, first_name, last_name, company, position, phone, membership_type, status, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Membre non trouvé' });
    }

    res.json({
      member: result.rows[0],
      message: 'Membre mis à jour avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du membre:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du membre' });
  }
});

// DELETE /api/members/:id - Supprimer un membre (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      DELETE FROM members 
      WHERE id = $1
      RETURNING id
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Membre non trouvé' });
    }

    res.json({ message: 'Membre supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du membre:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du membre' });
  }
});

// GET /api/members/stats/summary - Statistiques des membres (Admin)
router.get('/stats/summary', async (req, res) => {
  try {
    const statsResult = await pool.query(`
      SELECT 
        COUNT(*) as total_members,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_members,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_members,
        COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inactive_members,
        COUNT(CASE WHEN membership_type = 'individual' THEN 1 END) as individual_members,
        COUNT(CASE WHEN membership_type = 'corporate' THEN 1 END) as corporate_members
      FROM members
    `);

    const monthlyStats = await pool.query(`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(*) as new_members
      FROM members
      WHERE created_at >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month DESC
    `);

    res.json({
      summary: statsResult.rows[0],
      monthly_stats: monthlyStats.rows
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
});

export default router;
