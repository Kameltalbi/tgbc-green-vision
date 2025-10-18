import express from 'express';
import pool from '../../src/lib/database.js';

const router = express.Router();

// GET /api/blog - Récupérer tous les articles publiés
router.get('/', async (req, res) => {
  try {
    const { language = 'fr', page = 1, limit = 10, category, tag } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = `
      SELECT 
        bp.*,
        bpt.id as translation_id,
        bpt.language,
        bpt.title,
        bpt.excerpt,
        bpt.content,
        bpt.author,
        bpt.category,
        bpt.tags,
        bpt.seo_title,
        bpt.seo_description
      FROM blog_posts bp
      JOIN blog_post_translations bpt ON bp.id = bpt.blog_post_id
      WHERE bpt.language = $1 AND bp.status = 'published'
    `;
    
    const params = [language];
    let paramIndex = 2;

    // Filtres optionnels
    if (category) {
      query += ` AND bpt.category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (tag) {
      query += ` AND $${paramIndex} = ANY(bpt.tags)`;
      params.push(tag);
      paramIndex++;
    }

    query += ` ORDER BY bp.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Compter le total pour la pagination
    let countQuery = `
      SELECT COUNT(*) 
      FROM blog_posts bp
      JOIN blog_post_translations bpt ON bp.id = bpt.blog_post_id
      WHERE bpt.language = $1 AND bp.status = 'published'
    `;
    
    const countParams = [language];
    let countParamIndex = 2;

    if (category) {
      countQuery += ` AND bpt.category = $${countParamIndex}`;
      countParams.push(category);
      countParamIndex++;
    }

    if (tag) {
      countQuery += ` AND $${countParamIndex} = ANY(bpt.tags)`;
      countParams.push(tag);
      countParamIndex++;
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    const formattedPosts = result.rows.map(row => ({
      id: row.id,
      slug: row.slug,
      status: row.status,
      featured_image: row.featured_image,
      views: row.views,
      likes: row.likes,
      comments: row.comments,
      read_time: row.read_time,
      created_at: row.created_at,
      updated_at: row.updated_at,
      translation: {
        id: row.translation_id,
        blog_post_id: row.id,
        language: row.language,
        title: row.title,
        excerpt: row.excerpt,
        content: row.content,
        author: row.author,
        category: row.category,
        tags: row.tags,
        seo_title: row.seo_title,
        seo_description: row.seo_description,
      }
    }));

    res.json({
      posts: formattedPosts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des articles' });
  }
});

// GET /api/blog/:slug - Récupérer un article spécifique
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { language = 'fr' } = req.query;

    const result = await pool.query(`
      SELECT 
        bp.*,
        bpt.id as translation_id,
        bpt.language,
        bpt.title,
        bpt.excerpt,
        bpt.content,
        bpt.author,
        bpt.category,
        bpt.tags,
        bpt.seo_title,
        bpt.seo_description
      FROM blog_posts bp
      JOIN blog_post_translations bpt ON bp.id = bpt.blog_post_id
      WHERE bp.slug = $1 AND bpt.language = $2 AND bp.status = 'published'
    `, [slug, language]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }

    const row = result.rows[0];
    const post = {
      id: row.id,
      slug: row.slug,
      status: row.status,
      featured_image: row.featured_image,
      views: row.views,
      likes: row.likes,
      comments: row.comments,
      read_time: row.read_time,
      created_at: row.created_at,
      updated_at: row.updated_at,
      translation: {
        id: row.translation_id,
        blog_post_id: row.id,
        language: row.language,
        title: row.title,
        excerpt: row.excerpt,
        content: row.content,
        author: row.author,
        category: row.category,
        tags: row.tags,
        seo_title: row.seo_title,
        seo_description: row.seo_description,
      }
    };

    // Incrémenter les vues
    await pool.query(`
      UPDATE blog_posts 
      SET views = views + 1 
      WHERE slug = $1
    `, [slug]);

    res.json(post);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'article' });
  }
});

// POST /api/blog - Créer un nouvel article (Admin)
router.post('/', async (req, res) => {
  try {
    const { slug, status, featured_image, read_time, translations } = req.body;

    if (!slug || !translations || !Array.isArray(translations)) {
      return res.status(400).json({ error: 'Données invalides' });
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Créer l'article principal
      const postResult = await client.query(`
        INSERT INTO blog_posts (slug, status, featured_image, read_time)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `, [slug, status || 'draft', featured_image, read_time]);

      const postId = postResult.rows[0].id;

      // Créer les traductions
      for (const translation of translations) {
        await client.query(`
          INSERT INTO blog_post_translations (
            blog_post_id, language, title, excerpt, content, 
            author, category, tags, seo_title, seo_description
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `, [
          postId, translation.language, translation.title, translation.excerpt,
          translation.content, translation.author, translation.category,
          translation.tags, translation.seo_title, translation.seo_description
        ]);
      }

      await client.query('COMMIT');
      res.status(201).json({ id: postId, message: 'Article créé avec succès' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'article' });
  }
});

// PUT /api/blog/:slug - Mettre à jour un article (Admin)
router.put('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { status, featured_image, read_time, translations } = req.body;

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Mettre à jour l'article principal
      await client.query(`
        UPDATE blog_posts 
        SET status = $1, featured_image = $2, read_time = $3, updated_at = CURRENT_TIMESTAMP
        WHERE slug = $4
      `, [status, featured_image, read_time, slug]);

      // Supprimer les anciennes traductions
      await client.query(`
        DELETE FROM blog_post_translations 
        WHERE blog_post_id = (SELECT id FROM blog_posts WHERE slug = $1)
      `, [slug]);

      // Ajouter les nouvelles traductions
      const postResult = await client.query(`
        SELECT id FROM blog_posts WHERE slug = $1
      `, [slug]);

      if (postResult.rows.length === 0) {
        return res.status(404).json({ error: 'Article non trouvé' });
      }

      const postId = postResult.rows[0].id;

      for (const translation of translations) {
        await client.query(`
          INSERT INTO blog_post_translations (
            blog_post_id, language, title, excerpt, content, 
            author, category, tags, seo_title, seo_description
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `, [
          postId, translation.language, translation.title, translation.excerpt,
          translation.content, translation.author, translation.category,
          translation.tags, translation.seo_title, translation.seo_description
        ]);
      }

      await client.query('COMMIT');
      res.json({ message: 'Article mis à jour avec succès' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'article' });
  }
});

// DELETE /api/blog/:slug - Supprimer un article (Admin)
router.delete('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await pool.query(`
      DELETE FROM blog_posts 
      WHERE slug = $1
      RETURNING id
    `, [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }

    res.json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'article' });
  }
});

// GET /api/blog/categories - Récupérer toutes les catégories
router.get('/meta/categories', async (req, res) => {
  try {
    const { language = 'fr' } = req.query;

    const result = await pool.query(`
      SELECT DISTINCT category 
      FROM blog_post_translations 
      WHERE language = $1 AND category IS NOT NULL
      ORDER BY category
    `, [language]);

    const categories = result.rows.map(row => row.category);
    res.json({ categories });
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
  }
});

// GET /api/blog/tags - Récupérer tous les tags
router.get('/meta/tags', async (req, res) => {
  try {
    const { language = 'fr' } = req.query;

    const result = await pool.query(`
      SELECT DISTINCT unnest(tags) as tag 
      FROM blog_post_translations 
      WHERE language = $1 AND tags IS NOT NULL
      ORDER BY tag
    `, [language]);

    const tags = result.rows.map(row => row.tag);
    res.json({ tags });
  } catch (error) {
    console.error('Erreur lors de la récupération des tags:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des tags' });
  }
});

export default router;
