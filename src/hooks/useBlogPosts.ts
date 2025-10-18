import { useState, useEffect } from 'react';
import pool from '../lib/database';

// Types pour les données
export interface BlogPost {
  id: string;
  slug: string;
  status: string;
  featured_image?: string;
  views: number;
  likes: number;
  comments: number;
  read_time: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPostTranslation {
  id: string;
  blog_post_id: string;
  language: string;
  title: string;
  excerpt?: string;
  content?: string;
  author?: string;
  category?: string;
  tags?: string[];
  seo_title?: string;
  seo_description?: string;
}

export interface BlogPostWithTranslation extends BlogPost {
  translation: BlogPostTranslation;
}

// Hook pour récupérer les articles de blog
export const useBlogPosts = (language: string = 'fr') => {
  const [posts, setPosts] = useState<BlogPostWithTranslation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
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
          WHERE bpt.language = $1 AND bp.status = 'published'
          ORDER BY bp.created_at DESC
        `, [language]);

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

        setPosts(formattedPosts);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des articles:', err);
        setError('Erreur lors du chargement des articles');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [language]);

  return { posts, loading, error };
};

// Hook pour récupérer un article spécifique
export const useBlogPost = (slug: string, language: string = 'fr') => {
  const [post, setPost] = useState<BlogPostWithTranslation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
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

        if (result.rows.length > 0) {
          const row = result.rows[0];
          const formattedPost = {
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
          setPost(formattedPost);
        } else {
          setPost(null);
        }
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement de l\'article:', err);
        setError('Erreur lors du chargement de l\'article');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug, language]);

  return { post, loading, error };
};

// Fonction pour créer un nouvel article
export const createBlogPost = async (postData: Partial<BlogPost>, translations: BlogPostTranslation[]) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Créer l'article principal
    const postResult = await client.query(`
      INSERT INTO blog_posts (slug, status, featured_image, read_time)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `, [postData.slug, postData.status || 'draft', postData.featured_image, postData.read_time]);

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
    return postId;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Fonction pour mettre à jour les vues d'un article
export const incrementBlogPostViews = async (slug: string) => {
  try {
    await pool.query(`
      UPDATE blog_posts 
      SET views = views + 1 
      WHERE slug = $1
    `, [slug]);
  } catch (error) {
    console.error('Erreur lors de l\'incrémentation des vues:', error);
  }
};
