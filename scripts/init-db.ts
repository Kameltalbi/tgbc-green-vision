import { initializeDatabase, createSampleData, migrateBlogPosts } from './lib/migration';

// Script de test et d'initialisation
async function main() {
  console.log('🚀 Initialisation de la base de données TunisiaGBC...\n');

  try {
    // 1. Initialiser la base de données
    const initialized = await initializeDatabase();
    if (!initialized) {
      console.log('❌ Échec de l\'initialisation');
      process.exit(1);
    }

    console.log('\n📊 Voulez-vous :');
    console.log('1. Créer des données de test');
    console.log('2. Migrer les données existantes');
    console.log('3. Passer (tables vides)');

    // Pour l'instant, créons des données de test
    console.log('\n🧪 Création de données de test...');
    await createSampleData();

    console.log('\n✅ Configuration PostgreSQL terminée !');
    console.log('\n📝 Prochaines étapes :');
    console.log('1. Configurez vos variables d\'environnement dans .env');
    console.log('2. Mettez à jour vos composants pour utiliser les hooks PostgreSQL');
    console.log('3. Testez la connexion avec votre VPS');

  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

// Exécuter le script
if (require.main === module) {
  main();
}
