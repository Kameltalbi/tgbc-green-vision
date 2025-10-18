import { Pool } from 'pg';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Configuration PostgreSQL
console.log('🔧 Configuration DB:', {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'tunisiagbc',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD ? '***' : 'empty'
});

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'tunisiagbc',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test de connexion
pool.on('connect', () => {
  console.log('✅ Connexion PostgreSQL établie');
});

pool.on('error', (err) => {
  console.error('❌ Erreur PostgreSQL:', err);
});

export default pool;
