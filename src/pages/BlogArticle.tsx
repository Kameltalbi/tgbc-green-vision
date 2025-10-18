import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ArrowLeft, Calendar, User, Eye, Heart, MessageCircle, Share2, Tag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  featuredImage: string;
  views: number;
  likes: number;
  comments: number;
  readTime: number;
}

const BlogArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - En réalité, cela viendrait d'une API
  const mockArticles: BlogPost[] = [
    {
      id: '1',
      title: 'Les Bâtiments Zéro Émission : L\'Avenir de la Construction Durable',
      excerpt: 'Découvrez comment les bâtiments zéro émission transforment l\'industrie de la construction...',
      content: `
        <h2>Introduction</h2>
        <p>Les bâtiments zéro émission représentent une révolution dans l'industrie de la construction. Ces structures innovantes ne produisent aucune émission nette de gaz à effet de serre sur leur cycle de vie complet.</p>
        
        <h2>Les Principes Fondamentaux</h2>
        <p>Pour atteindre le zéro émission, les bâtiments doivent :</p>
        <ul>
          <li>Utiliser uniquement des énergies renouvelables</li>
          <li>Intégrer des matériaux à faible empreinte carbone</li>
          <li>Optimiser l'efficacité énergétique</li>
          <li>Compenser les émissions résiduelles</li>
        </ul>
        
        <h2>Technologies Clés</h2>
        <p>Les technologies suivantes sont essentielles :</p>
        <ul>
          <li><strong>Panneaux solaires intégrés</strong> : Production d'électricité renouvelable</li>
          <li><strong>Géothermie</strong> : Chauffage et refroidissement naturel</li>
          <li><strong>Récupération de chaleur</strong> : Optimisation énergétique</li>
          <li><strong>Matériaux biosourcés</strong> : Réduction de l'empreinte carbone</li>
        </ul>
        
        <h2>Exemples Concrets</h2>
        <p>Plusieurs projets pionniers démontrent la faisabilité de cette approche :</p>
        <ul>
          <li>Le bâtiment administratif de Tunis avec ses 500m² de panneaux solaires</li>
          <li>L'école primaire de Sfax utilisant la géothermie</li>
          <li>Le complexe résidentiel de Sousse avec ses matériaux recyclés</li>
        </ul>
        
        <h2>Défis et Opportunités</h2>
        <p>Bien que prometteuse, cette approche présente des défis :</p>
        <ul>
          <li>Coûts initiaux élevés</li>
          <li>Complexité technique</li>
          <li>Réglementation à adapter</li>
        </ul>
        
        <p>Cependant, les opportunités sont immenses :</p>
        <ul>
          <li>Réduction drastique des coûts opérationnels</li>
          <li>Amélioration de la qualité de vie</li>
          <li>Contribution à la lutte contre le changement climatique</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Les bâtiments zéro émission ne sont plus un rêve mais une réalité accessible. Avec les bonnes technologies et une approche intégrée, nous pouvons transformer notre environnement bâti pour un avenir plus durable.</p>
      `,
      author: 'Dr. Ahmed Ben Ali',
      date: '2024-01-15',
      category: 'Innovation',
      tags: ['Zéro émission', 'Durabilité', 'Technologie', 'Énergie renouvelable'],
      featuredImage: '/src/assets/hero-sustainable-building.jpg',
      views: 1250,
      likes: 89,
      comments: 23,
      readTime: 8
    },
    {
      id: '2',
      title: 'Certification LEED en Tunisie : Guide Complet',
      excerpt: 'Tout ce que vous devez savoir sur la certification LEED et son application en Tunisie...',
      content: `
        <h2>Qu'est-ce que LEED ?</h2>
        <p>LEED (Leadership in Energy and Environmental Design) est le système de certification des bâtiments durables le plus utilisé au monde.</p>
        
        <h2>Les Catégories LEED</h2>
        <p>La certification LEED évalue plusieurs aspects :</p>
        <ul>
          <li><strong>Emplacement et Transport</strong> : Accessibilité et mobilité durable</li>
          <li><strong>Sites Durables</strong> : Gestion de l'eau et des espaces verts</li>
          <li><strong>Efficacité de l'Eau</strong> : Réduction de la consommation</li>
          <li><strong>Énergie et Atmosphère</strong> : Performance énergétique</li>
          <li><strong>Matériaux et Ressources</strong> : Utilisation durable des matériaux</li>
          <li><strong>Qualité Environnementale</strong> : Confort et santé des occupants</li>
        </ul>
        
        <h2>Niveaux de Certification</h2>
        <ul>
          <li><strong>Certifié</strong> : 40-49 points</li>
          <li><strong>Argent</strong> : 50-59 points</li>
          <li><strong>Or</strong> : 60-79 points</li>
          <li><strong>Platine</strong> : 80+ points</li>
        </ul>
        
        <h2>Application en Tunisie</h2>
        <p>En Tunisie, plusieurs projets ont obtenu la certification LEED :</p>
        <ul>
          <li>Le siège de la Banque Centrale de Tunisie (LEED Gold)</li>
          <li>Le complexe commercial de Tunis City (LEED Silver)</li>
          <li>L'hôpital privé de Sfax (LEED Gold)</li>
        </ul>
        
        <h2>Processus de Certification</h2>
        <ol>
          <li>Inscription du projet</li>
          <li>Conception selon les critères LEED</li>
          <li>Soumission de la documentation</li>
          <li>Révision par le GBCI</li>
          <li>Certification finale</li>
        </ol>
        
        <h2>Avantages de la Certification</h2>
        <ul>
          <li>Réduction des coûts opérationnels</li>
          <li>Amélioration de la valeur immobilière</li>
          <li>Attraction des investisseurs</li>
          <li>Contribution à la durabilité</li>
        </ul>
      `,
      author: 'Ing. Fatma Khelil',
      date: '2024-01-10',
      category: 'Certification',
      tags: ['LEED', 'Certification', 'Durabilité', 'Performance'],
      featuredImage: '/src/assets/green-campus.jpg',
      views: 980,
      likes: 67,
      comments: 15,
      readTime: 6
    },
    {
      id: '3',
      title: 'Matériaux de Construction Écologiques : Tendances 2024',
      excerpt: 'Les nouveaux matériaux écologiques qui révolutionnent la construction durable...',
      content: `
        <h2>Introduction aux Matériaux Écologiques</h2>
        <p>Les matériaux de construction écologiques sont au cœur de la révolution verte dans l'industrie du bâtiment.</p>
        
        <h2>Matériaux Biosourcés</h2>
        <h3>Béton de Chanvre</h3>
        <p>Le béton de chanvre offre d'excellentes propriétés isolantes et une faible empreinte carbone.</p>
        
        <h3>Fibres de Lin</h3>
        <p>Les fibres de lin sont utilisées pour renforcer les matériaux composites naturels.</p>
        
        <h2>Matériaux Recyclés</h2>
        <h3>Béton Recyclé</h3>
        <p>Le béton recyclé réduit l'extraction de matières premières et limite les déchets.</p>
        
        <h3>Métaux Récupérés</h3>
        <p>Les métaux récupérés conservent leurs propriétés mécaniques tout en réduisant l'impact environnemental.</p>
        
        <h2>Innovations 2024</h2>
        <h3>Mycelium</h3>
        <p>Le mycelium, réseau de champignons, est utilisé pour créer des matériaux isolants naturels.</p>
        
        <h3>Algues</h3>
        <p>Les algues sont transformées en matériaux de construction légers et résistants.</p>
        
        <h2>Avantages Environnementaux</h2>
        <ul>
          <li>Réduction de l'empreinte carbone</li>
          <li>Conservation des ressources naturelles</li>
          <li>Amélioration de la qualité de l'air intérieur</li>
          <li>Recyclabilité en fin de vie</li>
        </ul>
        
        <h2>Défis Techniques</h2>
        <ul>
          <li>Résistance mécanique</li>
          <li>Durabilité dans le temps</li>
          <li>Coûts de production</li>
          <li>Acceptation du marché</li>
        </ul>
        
        <h2>Perspectives d'Avenir</h2>
        <p>L'avenir des matériaux écologiques s'annonce prometteur avec le développement de nouvelles technologies et l'évolution des réglementations.</p>
      `,
      author: 'Prof. Mohamed Trabelsi',
      date: '2024-01-05',
      category: 'Matériaux',
      tags: ['Matériaux écologiques', 'Innovation', 'Recyclage', 'Biosourcé'],
      featuredImage: '/src/assets/hero-tgbc.png',
      views: 1450,
      likes: 112,
      comments: 31,
      readTime: 7
    },
    {
      id: '4',
      title: 'Économies d\'Énergie dans les Bâtiments Existants',
      excerpt: 'Stratégies pratiques pour améliorer l\'efficacité énergétique des bâtiments existants...',
      content: `
        <h2>Diagnostic Énergétique</h2>
        <p>Le premier pas vers l'efficacité énergétique est un diagnostic complet du bâtiment.</p>
        
        <h2>Isolation Thermique</h2>
        <h3>Isolation des Murs</h3>
        <p>L'isolation des murs peut réduire les pertes thermiques de 30 à 50%.</p>
        
        <h3>Isolation de la Toiture</h3>
        <p>Une toiture bien isolée limite les déperditions de chaleur vers l'extérieur.</p>
        
        <h2>Systèmes de Chauffage</h2>
        <h3>Pompes à Chaleur</h3>
        <p>Les pompes à chaleur offrent un excellent rendement énergétique.</p>
        
        <h3>Chaudières à Condensation</h3>
        <p>Les chaudières à condensation récupèrent la chaleur des fumées.</p>
        
        <h2>Éclairage LED</h2>
        <p>Le remplacement de l'éclairage traditionnel par des LED peut réduire la consommation de 80%.</p>
        
        <h2>Gestion Intelligente</h2>
        <h3>Thermostats Programmables</h3>
        <p>Les thermostats intelligents optimisent automatiquement la température.</p>
        
        <h3>Capteurs de Présence</h3>
        <p>Les capteurs de présence éteignent automatiquement l'éclairage inutile.</p>
        
        <h2>Énergies Renouvelables</h2>
        <h3>Panneaux Solaires</h3>
        <p>L'installation de panneaux solaires réduit la dépendance au réseau électrique.</p>
        
        <h3>Systèmes Solaires Thermiques</h3>
        <p>Les systèmes solaires thermiques chauffent l'eau sanitaire.</p>
        
        <h2>Retour sur Investissement</h2>
        <p>Les économies d'énergie génèrent un retour sur investissement en 5 à 10 ans selon les mesures.</p>
        
        <h2>Subventions et Aides</h2>
        <p>Plusieurs programmes d'aide existent pour financer les travaux d'efficacité énergétique.</p>
      `,
      author: 'Ing. Salma Ben Youssef',
      date: '2024-01-01',
      category: 'Énergie',
      tags: ['Économies d\'énergie', 'Efficacité', 'Rénovation', 'Énergies renouvelables'],
      featuredImage: '/src/assets/hero-sustainable-building.jpg',
      views: 2100,
      likes: 156,
      comments: 42,
      readTime: 9
    },
    {
      id: '5',
      title: 'Villes Intelligentes et Développement Durable',
      excerpt: 'Comment les technologies intelligentes transforment nos villes pour un avenir plus durable...',
      content: `
        <h2>Définition des Villes Intelligentes</h2>
        <p>Une ville intelligente utilise les technologies de l'information pour améliorer la qualité de vie et l'efficacité des services urbains.</p>
        
        <h2>Technologies Clés</h2>
        <h3>Internet des Objets (IoT)</h3>
        <p>L'IoT connecte les infrastructures urbaines pour une gestion optimisée.</p>
        
        <h3>Big Data</h3>
        <p>L'analyse des données massives permet une prise de décision éclairée.</p>
        
        <h3>Intelligence Artificielle</h3>
        <p>L'IA optimise les flux de circulation et la gestion énergétique.</p>
        
        <h2>Applications Urbaines</h2>
        <h3>Mobilité Intelligente</h3>
        <ul>
          <li>Gestion du trafic en temps réel</li>
          <li>Transport public connecté</li>
          <li>Véhicules autonomes</li>
          <li>Partage de véhicules</li>
        </ul>
        
        <h3>Gestion Énergétique</h3>
        <ul>
          <li>Réseaux électriques intelligents</li>
          <li>Éclairage public adaptatif</li>
          <li>Bâtiments connectés</li>
          <li>Énergies renouvelables intégrées</li>
        </ul>
        
        <h2>Bénéfices Environnementaux</h2>
        <ul>
          <li>Réduction des émissions de CO2</li>
          <li>Optimisation de la consommation d'énergie</li>
          <li>Amélioration de la qualité de l'air</li>
          <li>Gestion durable des déchets</li>
        </ul>
        
        <h2>Défis et Enjeux</h2>
        <h3>Protection des Données</h3>
        <p>La collecte massive de données soulève des questions de confidentialité.</p>
        
        <h3>Fracture Numérique</h3>
        <p>Il faut garantir l'accès équitable aux technologies intelligentes.</p>
        
        <h3>Coûts d'Investissement</h3>
        <p>Les infrastructures intelligentes nécessitent des investissements importants.</p>
        
        <h2>Exemples Internationaux</h2>
        <ul>
          <li><strong>Singapour</strong> : Modèle de ville intelligente intégrée</li>
          <li><strong>Barcelone</strong> : Innovation dans les services urbains</li>
          <li><strong>Copenhague</strong> : Neutralité carbone d'ici 2025</li>
        </ul>
        
        <h2>Perspectives Tunisiennes</h2>
        <p>La Tunisie développe ses premières initiatives de villes intelligentes avec des projets pilotes à Tunis et Sfax.</p>
        
        <h2>Conclusion</h2>
        <p>Les villes intelligentes représentent l'avenir du développement urbain durable, combinant innovation technologique et respect de l'environnement.</p>
      `,
      author: 'Dr. Leila Hammami',
      date: '2023-12-28',
      category: 'Innovation',
      tags: ['Villes intelligentes', 'Technologie', 'Développement durable', 'IoT'],
      featuredImage: '/src/assets/green-campus.jpg',
      views: 1800,
      likes: 134,
      comments: 28,
      readTime: 10
    }
  ];

  useEffect(() => {
    // Simuler un chargement
    setTimeout(() => {
      const foundArticle = mockArticles.find(article => article.id === id);
      setArticle(foundArticle || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">{t('blog.article.loading')}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('blog.article.articleNotFound')}</h1>
          <p className="text-gray-600 mb-6">{t('blog.article.articleNotFoundDescription')}</p>
            <Button onClick={() => navigate('/blog')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('blog.article.backToBlog')}
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/blog')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('blog.article.backToBlog')}
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                {t('blog.article.share')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {article.category}
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {article.excerpt}
            </p>
            
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{article.views} {t('blog.article.views')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>{article.likes} {t('blog.article.likes')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>{article.comments} {t('blog.article.comments')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{article.readTime} {t('blog.article.readTime')}</span>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Article Content */}
          <Card className="p-6 sm:p-8 lg:p-10">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </Card>

          {/* Article Footer */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                {t('blog.article.like')} ({article.likes})
              </Button>
              <Button variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                {t('blog.article.comment')} ({article.comments})
              </Button>
            </div>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              {t('blog.article.share')}
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogArticle;
