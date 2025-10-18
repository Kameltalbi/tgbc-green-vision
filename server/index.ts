import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initializeDatabase } from '../src/lib/migration.js';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de sécurité
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Logging
app.use(morgan('combined'));

// Parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes de santé
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes API
app.use('/api/blog', (await import('./routes/blog.js')).default);
app.use('/api/events', (await import('./routes/events.js')).default);
app.use('/api/resources', (await import('./routes/resources.js')).default);
app.use('/api/members', (await import('./routes/members.js')).default);

// Route 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Gestionnaire d'erreurs global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erreur serveur:', err);
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Erreur interne du serveur' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Démarrage du serveur
const startServer = async () => {
  try {
    // Initialiser la base de données
    console.log('🔍 Initialisation de la base de données...');
    await initializeDatabase();
    
    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur Express démarré sur le port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🌐 API disponible: http://localhost:${PORT}/api`);
      console.log(`🔗 Frontend configuré pour: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

// Gestion des signaux de fermeture
process.on('SIGTERM', () => {
  console.log('🛑 Signal SIGTERM reçu, fermeture du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Signal SIGINT reçu, fermeture du serveur...');
  process.exit(0);
});

// Démarrer le serveur
startServer();

export default app;
