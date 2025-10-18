import pool from './database';

// Script de création des tables PostgreSQL
export const createTables = async () => {
  try {
    // Table des articles de blog
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug VARCHAR UNIQUE NOT NULL,
        status VARCHAR DEFAULT 'draft',
        featured_image VARCHAR,
        views INTEGER DEFAULT 0,
        likes INTEGER DEFAULT 0,
        comments INTEGER DEFAULT 0,
        read_time INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Table des traductions des articles
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_post_translations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        blog_post_id UUID NOT NULL,
        language VARCHAR(2) NOT NULL,
        title VARCHAR NOT NULL,
        excerpt TEXT,
        content TEXT,
        author VARCHAR,
        category VARCHAR,
        tags TEXT[],
        seo_title VARCHAR,
        seo_description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
        UNIQUE(blog_post_id, language)
      );
    `);

    // Table des événements
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug VARCHAR UNIQUE NOT NULL,
        start_date TIMESTAMP NOT NULL,
        end_date TIMESTAMP,
        location VARCHAR,
        max_attendees INTEGER,
        price DECIMAL(10,2),
        currency VARCHAR(3),
        registration_url VARCHAR,
        status VARCHAR DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Table des traductions des événements
    await pool.query(`
      CREATE TABLE IF NOT EXISTS event_translations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        event_id UUID NOT NULL,
        language VARCHAR(2) NOT NULL,
        title VARCHAR NOT NULL,
        description TEXT,
        category VARCHAR,
        tags TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
        UNIQUE(event_id, language)
      );
    `);

    // Table des ressources
    await pool.query(`
      CREATE TABLE IF NOT EXISTS resources (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug VARCHAR UNIQUE NOT NULL,
        file_url VARCHAR NOT NULL,
        file_size INTEGER,
        file_type VARCHAR,
        downloads INTEGER DEFAULT 0,
        status VARCHAR DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Table des traductions des ressources
    await pool.query(`
      CREATE TABLE IF NOT EXISTS resource_translations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        resource_id UUID NOT NULL,
        language VARCHAR(2) NOT NULL,
        title VARCHAR NOT NULL,
        description TEXT,
        type VARCHAR,
        category VARCHAR,
        tags TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
        UNIQUE(resource_id, language)
      );
    `);

    // Table des membres
    await pool.query(`
      CREATE TABLE IF NOT EXISTS members (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR UNIQUE NOT NULL,
        first_name VARCHAR,
        last_name VARCHAR,
        company VARCHAR,
        position VARCHAR,
        phone VARCHAR,
        membership_type VARCHAR,
        status VARCHAR DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Index pour améliorer les performances
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at);
      CREATE INDEX IF NOT EXISTS idx_blog_translations_language ON blog_post_translations(language);
      CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
      CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
      CREATE INDEX IF NOT EXISTS idx_event_translations_language ON event_translations(language);
      CREATE INDEX IF NOT EXISTS idx_resources_status ON resources(status);
      CREATE INDEX IF NOT EXISTS idx_resource_translations_language ON resource_translations(language);
    `);

    console.log('✅ Tables PostgreSQL créées avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de la création des tables:', error);
    throw error;
  }
};

// Fonction pour tester la connexion
export const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Connexion PostgreSQL réussie:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion PostgreSQL:', error);
    return false;
  }
};
