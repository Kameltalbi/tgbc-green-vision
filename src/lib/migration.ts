import pool from '../lib/database';
import { blogPosts } from '../data/blogPosts';

// Script de migration des données existantes vers PostgreSQL
export const migrateBlogPosts = async () => {
  console.log('🚀 Début de la migration des articles de blog...');
  
  try {
    for (const post of blogPosts) {
      console.log(`📝 Migration de l'article: ${post.title.fr}`);
      
      // Créer l'article principal
      const postResult = await pool.query(`
        INSERT INTO blog_posts (slug, status, featured_image, views, likes, comments, read_time)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
      `, [
        post.id,
        'published',
        post.featuredImage,
        post.views,
        post.likes,
        post.comments,
        post.readTime
      ]);

      const postId = postResult.rows[0].id;

      // Créer les traductions pour chaque langue
      const languages = ['fr', 'en', 'ar'] as const;
      
      for (const lang of languages) {
        const translation = {
          language: lang,
          title: post.title[lang] || post.title.fr,
          excerpt: post.excerpt[lang] || post.excerpt.fr,
          content: post.content[lang] || post.content.fr,
          author: post.author[lang] || post.author.fr,
          category: post.category[lang] || post.category.fr,
          tags: post.tags[lang] || post.tags.fr,
        };

        await pool.query(`
          INSERT INTO blog_post_translations (
            blog_post_id, language, title, excerpt, content, 
            author, category, tags
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
          postId,
          translation.language,
          translation.title,
          translation.excerpt,
          translation.content,
          translation.author,
          translation.category,
          translation.tags
        ]);

        console.log(`  ✅ Traduction ${lang} ajoutée`);
      }
    }

    console.log('🎉 Migration terminée avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    throw error;
  }
};

// Script pour créer des données de test
export const createSampleData = async () => {
  console.log('🚀 Création de données de test...');
  
  try {
    // Créer un article de test
    const testPost = {
      slug: 'test-article',
      status: 'published',
      featured_image: '/src/assets/hero-sustainable-building.jpg',
      views: 100,
      likes: 10,
      comments: 5,
      read_time: 5
    };

    const postResult = await pool.query(`
      INSERT INTO blog_posts (slug, status, featured_image, views, likes, comments, read_time)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `, [
      testPost.slug,
      testPost.status,
      testPost.featured_image,
      testPost.views,
      testPost.likes,
      testPost.comments,
      testPost.read_time
    ]);

    const postId = postResult.rows[0].id;

    // Ajouter les traductions
    const translations = [
      {
        language: 'fr',
        title: 'Article de Test',
        excerpt: 'Ceci est un article de test pour vérifier la configuration PostgreSQL.',
        content: '<h1>Article de Test</h1><p>Contenu de test en français.</p>',
        author: 'Admin',
        category: 'Test',
        tags: ['test', 'postgresql']
      },
      {
        language: 'en',
        title: 'Test Article',
        excerpt: 'This is a test article to verify PostgreSQL configuration.',
        content: '<h1>Test Article</h1><p>Test content in English.</p>',
        author: 'Admin',
        category: 'Test',
        tags: ['test', 'postgresql']
      },
      {
        language: 'ar',
        title: 'مقال تجريبي',
        excerpt: 'هذا مقال تجريبي للتحقق من إعداد PostgreSQL.',
        content: '<h1>مقال تجريبي</h1><p>محتوى تجريبي بالعربية.</p>',
        author: 'Admin',
        category: 'تجريبي',
        tags: ['تجريبي', 'postgresql']
      }
    ];

    for (const translation of translations) {
      await pool.query(`
        INSERT INTO blog_post_translations (
          blog_post_id, language, title, excerpt, content, 
          author, category, tags
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        postId,
        translation.language,
        translation.title,
        translation.excerpt,
        translation.content,
        translation.author,
        translation.category,
        translation.tags
      ]);
    }

    console.log('✅ Données de test créées avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la création des données de test:', error);
    throw error;
  }
};

// Fonction pour tester la connexion et créer les tables
export const initializeDatabase = async () => {
  try {
    console.log('🔍 Test de connexion PostgreSQL...');
    
    // Test de connexion
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Connexion PostgreSQL réussie:', result.rows[0]);

    // Créer les tables
    console.log('📋 Création des tables...');
    const { createTables } = await import('./schema');
    await createTables();

    console.log('🎉 Base de données initialisée avec succès !');
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    return false;
  }
};
