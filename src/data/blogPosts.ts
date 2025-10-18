export interface BlogPost {
  id: string;
  title: Record<string, string>;
  excerpt: Record<string, string>;
  content: Record<string, string>;
  author: Record<string, string>;
  date: string;
  category: Record<string, string>;
  tags: Record<string, string[]>;
  featuredImage: string;
  views: number;
  likes: number;
  comments: number;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: {
      fr: 'Les Bâtiments Zéro Émission : L\'Avenir de la Construction Durable',
      en: 'Zero Emission Buildings: The Future of Sustainable Construction',
      ar: 'المباني صفرية الانبعاثات: مستقبل البناء المستدام'
    },
    excerpt: {
      fr: 'Découvrez comment les bâtiments zéro émission transforment l\'industrie de la construction...',
      en: 'Discover how zero emission buildings are transforming the construction industry...',
      ar: 'اكتشف كيف تحول المباني صفرية الانبعاثات صناعة البناء...'
    },
    content: {
      fr: `
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
      en: `
        <h2>Introduction</h2>
        <p>Zero emission buildings represent a revolution in the construction industry. These innovative structures produce no net greenhouse gas emissions throughout their complete life cycle.</p>
        
        <h2>Fundamental Principles</h2>
        <p>To achieve zero emissions, buildings must:</p>
        <ul>
          <li>Use only renewable energies</li>
          <li>Integrate low-carbon footprint materials</li>
          <li>Optimize energy efficiency</li>
          <li>Compensate for residual emissions</li>
        </ul>
        
        <h2>Key Technologies</h2>
        <p>The following technologies are essential:</p>
        <ul>
          <li><strong>Integrated solar panels</strong>: Renewable electricity production</li>
          <li><strong>Geothermal energy</strong>: Natural heating and cooling</li>
          <li><strong>Heat recovery</strong>: Energy optimization</li>
          <li><strong>Bio-based materials</strong>: Carbon footprint reduction</li>
        </ul>
        
        <h2>Concrete Examples</h2>
        <p>Several pioneering projects demonstrate the feasibility of this approach:</p>
        <ul>
          <li>Tunis administrative building with its 500m² of solar panels</li>
          <li>Sfax primary school using geothermal energy</li>
          <li>Sousse residential complex with recycled materials</li>
        </ul>
        
        <h2>Challenges and Opportunities</h2>
        <p>Although promising, this approach presents challenges:</p>
        <ul>
          <li>High initial costs</li>
          <li>Technical complexity</li>
          <li>Regulations to adapt</li>
        </ul>
        
        <p>However, the opportunities are immense:</p>
        <ul>
          <li>Dramatic reduction in operational costs</li>
          <li>Improved quality of life</li>
          <li>Contribution to the fight against climate change</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Zero emission buildings are no longer a dream but an accessible reality. With the right technologies and an integrated approach, we can transform our built environment for a more sustainable future.</p>
      `,
      ar: `
        <h2>مقدمة</h2>
        <p>تمثل المباني صفرية الانبعاثات ثورة في صناعة البناء. هذه الهياكل المبتكرة لا تنتج أي انبعاثات صافية من غازات الدفيئة طوال دورة حياتها الكاملة.</p>
        
        <h2>المبادئ الأساسية</h2>
        <p>لتحقيق الانبعاثات الصفرية، يجب على المباني:</p>
        <ul>
          <li>استخدام الطاقات المتجددة فقط</li>
          <li>دمج مواد منخفضة البصمة الكربونية</li>
          <li>تحسين كفاءة الطاقة</li>
          <li>تعويض الانبعاثات المتبقية</li>
        </ul>
        
        <h2>التقنيات الرئيسية</h2>
        <p>التقنيات التالية ضرورية:</p>
        <ul>
          <li><strong>الألواح الشمسية المدمجة</strong>: إنتاج الكهرباء المتجددة</li>
          <li><strong>الطاقة الحرارية الأرضية</strong>: التدفئة والتبريد الطبيعي</li>
          <li><strong>استرداد الحرارة</strong>: تحسين الطاقة</li>
          <li><strong>المواد الحيوية</strong>: تقليل البصمة الكربونية</li>
        </ul>
        
        <h2>أمثلة ملموسة</h2>
        <p>عدة مشاريع رائدة تثبت جدوى هذا النهج:</p>
        <ul>
          <li>مبنى تونس الإداري مع 500 متر مربع من الألواح الشمسية</li>
          <li>مدرسة صفاقس الابتدائية باستخدام الطاقة الحرارية الأرضية</li>
          <li>مجمع سوسة السكني بالمواد المعاد تدويرها</li>
        </ul>
        
        <h2>التحديات والفرص</h2>
        <p>رغم الوعد، هذا النهج يطرح تحديات:</p>
        <ul>
          <li>تكاليف أولية عالية</li>
          <li>تعقيد تقني</li>
          <li>لوائح تحتاج للتكيف</li>
        </ul>
        
        <p>لكن الفرص هائلة:</p>
        <ul>
          <li>تقليل جذري في التكاليف التشغيلية</li>
          <li>تحسين جودة الحياة</li>
          <li>المساهمة في مكافحة تغير المناخ</li>
        </ul>
        
        <h2>الخلاصة</h2>
        <p>المباني صفرية الانبعاثات لم تعد حلماً بل واقعاً قابلاً للتحقيق. بالتقنيات المناسبة والنهج المتكامل، يمكننا تحويل بيئتنا المبنية لمستقبل أكثر استدامة.</p>
      `
    },
    author: {
      fr: 'Dr. Ahmed Ben Ali',
      en: 'Dr. Ahmed Ben Ali',
      ar: 'د. أحمد بن علي'
    },
    date: '2024-01-15',
    category: {
      fr: 'Innovation',
      en: 'Innovation',
      ar: 'الابتكار'
    },
    tags: {
      fr: ['Zéro émission', 'Durabilité', 'Technologie', 'Énergie renouvelable'],
      en: ['Zero emission', 'Sustainability', 'Technology', 'Renewable energy'],
      ar: ['انبعاثات صفرية', 'استدامة', 'تقنية', 'طاقة متجددة']
    },
    featuredImage: '/src/assets/hero-sustainable-building.jpg',
    views: 1250,
    likes: 89,
    comments: 23,
    readTime: 8
  },
  {
    id: '2',
    title: {
      fr: 'Certification LEED en Tunisie : Guide Complet',
      en: 'LEED Certification in Tunisia: Complete Guide',
      ar: 'شهادة LEED في تونس: دليل شامل'
    },
    excerpt: {
      fr: 'Tout ce que vous devez savoir sur la certification LEED et son application en Tunisie...',
      en: 'Everything you need to know about LEED certification and its application in Tunisia...',
      ar: 'كل ما تحتاج لمعرفته حول شهادة LEED وتطبيقها في تونس...'
    },
    content: {
      fr: `
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
      en: `
        <h2>What is LEED?</h2>
        <p>LEED (Leadership in Energy and Environmental Design) is the most widely used sustainable building certification system in the world.</p>
        
        <h2>LEED Categories</h2>
        <p>LEED certification evaluates several aspects:</p>
        <ul>
          <li><strong>Location and Transportation</strong>: Accessibility and sustainable mobility</li>
          <li><strong>Sustainable Sites</strong>: Water and green space management</li>
          <li><strong>Water Efficiency</strong>: Consumption reduction</li>
          <li><strong>Energy and Atmosphere</strong>: Energy performance</li>
          <li><strong>Materials and Resources</strong>: Sustainable material use</li>
          <li><strong>Environmental Quality</strong>: Occupant comfort and health</li>
        </ul>
        
        <h2>Certification Levels</h2>
        <ul>
          <li><strong>Certified</strong>: 40-49 points</li>
          <li><strong>Silver</strong>: 50-59 points</li>
          <li><strong>Gold</strong>: 60-79 points</li>
          <li><strong>Platinum</strong>: 80+ points</li>
        </ul>
        
        <h2>Application in Tunisia</h2>
        <p>In Tunisia, several projects have obtained LEED certification:</p>
        <ul>
          <li>Tunisia Central Bank headquarters (LEED Gold)</li>
          <li>Tunis City commercial complex (LEED Silver)</li>
          <li>Sfax private hospital (LEED Gold)</li>
        </ul>
        
        <h2>Certification Process</h2>
        <ol>
          <li>Project registration</li>
          <li>Design according to LEED criteria</li>
          <li>Documentation submission</li>
          <li>GBCI review</li>
          <li>Final certification</li>
        </ol>
        
        <h2>Certification Benefits</h2>
        <ul>
          <li>Reduced operational costs</li>
          <li>Improved real estate value</li>
          <li>Investor attraction</li>
          <li>Contribution to sustainability</li>
        </ul>
      `,
      ar: `
        <h2>ما هو LEED؟</h2>
        <p>LEED (الريادة في الطاقة والتصميم البيئي) هو نظام شهادة المباني المستدامة الأكثر استخداماً في العالم.</p>
        
        <h2>فئات LEED</h2>
        <p>تقييم شهادة LEED عدة جوانب:</p>
        <ul>
          <li><strong>الموقع والنقل</strong>: إمكانية الوصول والتنقل المستدام</li>
          <li><strong>المواقع المستدامة</strong>: إدارة المياه والمساحات الخضراء</li>
          <li><strong>كفاءة المياه</strong>: تقليل الاستهلاك</li>
          <li><strong>الطاقة والغلاف الجوي</strong>: أداء الطاقة</li>
          <li><strong>المواد والموارد</strong>: استخدام المواد المستدامة</li>
          <li><strong>الجودة البيئية</strong>: راحة وصحة المقيمين</li>
        </ul>
        
        <h2>مستويات الشهادة</h2>
        <ul>
          <li><strong>معتمد</strong>: 40-49 نقطة</li>
          <li><strong>فضي</strong>: 50-59 نقطة</li>
          <li><strong>ذهبي</strong>: 60-79 نقطة</li>
          <li><strong>بلاتيني</strong>: 80+ نقطة</li>
        </ul>
        
        <h2>التطبيق في تونس</h2>
        <p>في تونس، حصلت عدة مشاريع على شهادة LEED:</p>
        <ul>
          <li>مقر البنك المركزي التونسي (LEED Gold)</li>
          <li>مجمع تونس سيتي التجاري (LEED Silver)</li>
          <li>مستشفى صفاقس الخاص (LEED Gold)</li>
        </ul>
        
        <h2>عملية الشهادة</h2>
        <ol>
          <li>تسجيل المشروع</li>
          <li>التصميم حسب معايير LEED</li>
          <li>تقديم الوثائق</li>
          <li>مراجعة GBCI</li>
          <li>الشهادة النهائية</li>
        </ol>
        
        <h2>فوائد الشهادة</h2>
        <ul>
          <li>تقليل التكاليف التشغيلية</li>
          <li>تحسين القيمة العقارية</li>
          <li>جذب المستثمرين</li>
          <li>المساهمة في الاستدامة</li>
        </ul>
      `
    },
    author: {
      fr: 'Ing. Fatma Khelil',
      en: 'Eng. Fatma Khelil',
      ar: 'مهندسة فاطمة خليل'
    },
    date: '2024-01-10',
    category: {
      fr: 'Certification',
      en: 'Certification',
      ar: 'الشهادة'
    },
    tags: {
      fr: ['LEED', 'Certification', 'Durabilité', 'Performance'],
      en: ['LEED', 'Certification', 'Sustainability', 'Performance'],
      ar: ['LEED', 'شهادة', 'استدامة', 'أداء']
    },
    featuredImage: '/src/assets/green-campus.jpg',
    views: 980,
    likes: 67,
    comments: 15,
    readTime: 6
  },
  {
    id: '3',
    title: {
      fr: 'Matériaux de Construction Écologiques : Tendances 2024',
      en: 'Ecological Construction Materials: 2024 Trends',
      ar: 'مواد البناء البيئية: اتجاهات 2024'
    },
    excerpt: {
      fr: 'Les nouveaux matériaux écologiques qui révolutionnent la construction durable...',
      en: 'The new ecological materials revolutionizing sustainable construction...',
      ar: 'المواد البيئية الجديدة التي تحدث ثورة في البناء المستدام...'
    },
    content: {
      fr: `
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
      en: `
        <h2>Introduction to Ecological Materials</h2>
        <p>Ecological construction materials are at the heart of the green revolution in the building industry.</p>
        
        <h2>Bio-based Materials</h2>
        <h3>Hemp Concrete</h3>
        <p>Hemp concrete offers excellent insulating properties and a low carbon footprint.</p>
        
        <h3>Flax Fibers</h3>
        <p>Flax fibers are used to reinforce natural composite materials.</p>
        
        <h2>Recycled Materials</h2>
        <h3>Recycled Concrete</h3>
        <p>Recycled concrete reduces raw material extraction and limits waste.</p>
        
        <h3>Recovered Metals</h3>
        <p>Recovered metals retain their mechanical properties while reducing environmental impact.</p>
        
        <h2>2024 Innovations</h2>
        <h3>Mycelium</h3>
        <p>Mycelium, a fungal network, is used to create natural insulating materials.</p>
        
        <h3>Algae</h3>
        <p>Algae are transformed into lightweight and resistant construction materials.</p>
        
        <h2>Environmental Benefits</h2>
        <ul>
          <li>Carbon footprint reduction</li>
          <li>Natural resource conservation</li>
          <li>Indoor air quality improvement</li>
          <li>End-of-life recyclability</li>
        </ul>
        
        <h2>Technical Challenges</h2>
        <ul>
          <li>Mechanical resistance</li>
          <li>Long-term durability</li>
          <li>Production costs</li>
          <li>Market acceptance</li>
        </ul>
        
        <h2>Future Prospects</h2>
        <p>The future of ecological materials looks promising with the development of new technologies and evolving regulations.</p>
      `,
      ar: `
        <h2>مقدمة في المواد البيئية</h2>
        <p>مواد البناء البيئية في قلب الثورة الخضراء في صناعة البناء.</p>
        
        <h2>المواد الحيوية</h2>
        <h3>الخرسانة القنب</h3>
        <p>الخرسانة القنب توفر خصائص عزل ممتازة وبصمة كربونية منخفضة.</p>
        
        <h3>ألياف الكتان</h3>
        <p>ألياف الكتان تستخدم لتقوية المواد المركبة الطبيعية.</p>
        
        <h2>المواد المعاد تدويرها</h2>
        <h3>الخرسانة المعاد تدويرها</h3>
        <p>الخرسانة المعاد تدويرها تقلل استخراج المواد الخام وتحد من النفايات.</p>
        
        <h3>المعادن المستردة</h3>
        <p>المعادن المستردة تحتفظ بخصائصها الميكانيكية مع تقليل التأثير البيئي.</p>
        
        <h2>ابتكارات 2024</h2>
        <h3>الفطريات</h3>
        <p>الفطريات، شبكة فطرية، تستخدم لإنشاء مواد عزل طبيعية.</p>
        
        <h3>الطحالب</h3>
        <p>الطحالب تتحول إلى مواد بناء خفيفة ومقاومة.</p>
        
        <h2>الفوائد البيئية</h2>
        <ul>
          <li>تقليل البصمة الكربونية</li>
          <li>حفظ الموارد الطبيعية</li>
          <li>تحسين جودة الهواء الداخلي</li>
          <li>قابلية إعادة التدوير في نهاية العمر</li>
        </ul>
        
        <h2>التحديات التقنية</h2>
        <ul>
          <li>المقاومة الميكانيكية</li>
          <li>المتانة طويلة المدى</li>
          <li>تكاليف الإنتاج</li>
          <li>قبول السوق</li>
        </ul>
        
        <h2>الآفاق المستقبلية</h2>
        <p>مستقبل المواد البيئية واعد مع تطوير تقنيات جديدة وتطور اللوائح.</p>
      `
    },
    author: {
      fr: 'Prof. Mohamed Trabelsi',
      en: 'Prof. Mohamed Trabelsi',
      ar: 'أستاذ محمد الطرابلسي'
    },
    date: '2024-01-05',
    category: {
      fr: 'Matériaux',
      en: 'Materials',
      ar: 'المواد'
    },
    tags: {
      fr: ['Matériaux écologiques', 'Innovation', 'Recyclage', 'Biosourcé'],
      en: ['Ecological materials', 'Innovation', 'Recycling', 'Bio-based'],
      ar: ['مواد بيئية', 'ابتكار', 'إعادة تدوير', 'حيوي']
    },
    featuredImage: '/src/assets/hero-tgbc.png',
    views: 1450,
    likes: 112,
    comments: 31,
    readTime: 7
  },
  {
    id: '4',
    title: {
      fr: 'Économies d\'Énergie dans les Bâtiments Existants',
      en: 'Energy Savings in Existing Buildings',
      ar: 'توفير الطاقة في المباني الموجودة'
    },
    excerpt: {
      fr: 'Stratégies pratiques pour améliorer l\'efficacité énergétique des bâtiments existants...',
      en: 'Practical strategies to improve energy efficiency in existing buildings...',
      ar: 'استراتيجيات عملية لتحسين كفاءة الطاقة في المباني الموجودة...'
    },
    content: {
      fr: `
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
      en: `
        <h2>Energy Audit</h2>
        <p>The first step towards energy efficiency is a complete building audit.</p>
        
        <h2>Thermal Insulation</h2>
        <h3>Wall Insulation</h3>
        <p>Wall insulation can reduce thermal losses by 30 to 50%.</p>
        
        <h3>Roof Insulation</h3>
        <p>A well-insulated roof limits heat loss to the outside.</p>
        
        <h2>Heating Systems</h2>
        <h3>Heat Pumps</h3>
        <p>Heat pumps offer excellent energy efficiency.</p>
        
        <h3>Condensing Boilers</h3>
        <p>Condensing boilers recover heat from flue gases.</p>
        
        <h2>LED Lighting</h2>
        <p>Replacing traditional lighting with LEDs can reduce consumption by 80%.</p>
        
        <h2>Smart Management</h2>
        <h3>Programmable Thermostats</h3>
        <p>Smart thermostats automatically optimize temperature.</p>
        
        <h3>Presence Sensors</h3>
        <p>Presence sensors automatically turn off unnecessary lighting.</p>
        
        <h2>Renewable Energies</h2>
        <h3>Solar Panels</h3>
        <p>Installing solar panels reduces dependence on the electrical grid.</p>
        
        <h3>Solar Thermal Systems</h3>
        <p>Solar thermal systems heat domestic hot water.</p>
        
        <h2>Return on Investment</h2>
        <p>Energy savings generate a return on investment in 5 to 10 years depending on the measures.</p>
        
        <h2>Subsidies and Aid</h2>
        <p>Several aid programs exist to finance energy efficiency work.</p>
      `,
      ar: `
        <h2>التدقيق الطاقي</h2>
        <p>الخطوة الأولى نحو كفاءة الطاقة هي تدقيق شامل للمبنى.</p>
        
        <h2>العزل الحراري</h2>
        <h3>عزل الجدران</h3>
        <p>عزل الجدران يمكن أن يقلل الخسائر الحرارية بنسبة 30 إلى 50%.</p>
        
        <h3>عزل السقف</h3>
        <p>السقف المعزول جيداً يحد من فقدان الحرارة للخارج.</p>
        
        <h2>أنظمة التدفئة</h2>
        <h3>مضخات الحرارة</h3>
        <p>مضخات الحرارة توفر كفاءة طاقية ممتازة.</p>
        
        <h3>المراجل المتكثفة</h3>
        <p>المراجل المتكثفة تسترد الحرارة من غازات المداخن.</p>
        
        <h2>الإضاءة LED</h2>
        <p>استبدال الإضاءة التقليدية بـ LED يمكن أن يقلل الاستهلاك بنسبة 80%.</p>
        
        <h2>الإدارة الذكية</h2>
        <h3>منظمات الحرارة القابلة للبرمجة</h3>
        <p>منظمات الحرارة الذكية تحسن درجة الحرارة تلقائياً.</p>
        
        <h3>أجهزة استشعار الحضور</h3>
        <p>أجهزة استشعار الحضور تطفئ الإضاءة غير الضرورية تلقائياً.</p>
        
        <h2>الطاقات المتجددة</h2>
        <h3>الألواح الشمسية</h3>
        <p>تركيب الألواح الشمسية يقلل الاعتماد على الشبكة الكهربائية.</p>
        
        <h3>أنظمة الطاقة الشمسية الحرارية</h3>
        <p>أنظمة الطاقة الشمسية الحرارية تسخن الماء الساخن المنزلي.</p>
        
        <h2>العائد على الاستثمار</h2>
        <p>توفير الطاقة يولد عائداً على الاستثمار في 5 إلى 10 سنوات حسب الإجراءات.</p>
        
        <h2>الإعانات والمساعدات</h2>
        <p>عدة برامج مساعدة موجودة لتمويل أعمال كفاءة الطاقة.</p>
      `
    },
    author: {
      fr: 'Ing. Salma Ben Youssef',
      en: 'Eng. Salma Ben Youssef',
      ar: 'مهندسة سلمى بن يوسف'
    },
    date: '2024-01-01',
    category: {
      fr: 'Énergie',
      en: 'Energy',
      ar: 'الطاقة'
    },
    tags: {
      fr: ['Économies d\'énergie', 'Efficacité', 'Rénovation', 'Énergies renouvelables'],
      en: ['Energy savings', 'Efficiency', 'Renovation', 'Renewable energies'],
      ar: ['توفير الطاقة', 'كفاءة', 'تجديد', 'طاقات متجددة']
    },
    featuredImage: '/src/assets/hero-sustainable-building.jpg',
    views: 2100,
    likes: 156,
    comments: 42,
    readTime: 9
  },
  {
    id: '5',
    title: {
      fr: 'Villes Intelligentes et Développement Durable',
      en: 'Smart Cities and Sustainable Development',
      ar: 'المدن الذكية والتنمية المستدامة'
    },
    excerpt: {
      fr: 'Comment les technologies intelligentes transforment nos villes pour un avenir plus durable...',
      en: 'How smart technologies are transforming our cities for a more sustainable future...',
      ar: 'كيف تحول التقنيات الذكية مدننا لمستقبل أكثر استدامة...'
    },
    content: {
      fr: `
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
      en: `
        <h2>Definition of Smart Cities</h2>
        <p>A smart city uses information technologies to improve quality of life and efficiency of urban services.</p>
        
        <h2>Key Technologies</h2>
        <h3>Internet of Things (IoT)</h3>
        <p>IoT connects urban infrastructures for optimized management.</p>
        
        <h3>Big Data</h3>
        <p>Analysis of massive data enables informed decision-making.</p>
        
        <h3>Artificial Intelligence</h3>
        <p>AI optimizes traffic flows and energy management.</p>
        
        <h2>Urban Applications</h2>
        <h3>Smart Mobility</h3>
        <ul>
          <li>Real-time traffic management</li>
          <li>Connected public transport</li>
          <li>Autonomous vehicles</li>
          <li>Vehicle sharing</li>
        </ul>
        
        <h3>Energy Management</h3>
        <ul>
          <li>Smart electrical grids</li>
          <li>Adaptive public lighting</li>
          <li>Connected buildings</li>
          <li>Integrated renewable energies</li>
        </ul>
        
        <h2>Environmental Benefits</h2>
        <ul>
          <li>CO2 emission reduction</li>
          <li>Energy consumption optimization</li>
          <li>Air quality improvement</li>
          <li>Sustainable waste management</li>
        </ul>
        
        <h2>Challenges and Issues</h2>
        <h3>Data Protection</h3>
        <p>Massive data collection raises privacy concerns.</p>
        
        <h3>Digital Divide</h3>
        <p>Equitable access to smart technologies must be guaranteed.</p>
        
        <h3>Investment Costs</h3>
        <p>Smart infrastructures require significant investments.</p>
        
        <h2>International Examples</h2>
        <ul>
          <li><strong>Singapore</strong>: Integrated smart city model</li>
          <li><strong>Barcelona</strong>: Innovation in urban services</li>
          <li><strong>Copenhagen</strong>: Carbon neutrality by 2025</li>
        </ul>
        
        <h2>Tunisian Perspectives</h2>
        <p>Tunisia is developing its first smart city initiatives with pilot projects in Tunis and Sfax.</p>
        
        <h2>Conclusion</h2>
        <p>Smart cities represent the future of sustainable urban development, combining technological innovation and environmental respect.</p>
      `,
      ar: `
        <h2>تعريف المدن الذكية</h2>
        <p>المدينة الذكية تستخدم تقنيات المعلومات لتحسين جودة الحياة وكفاءة الخدمات الحضرية.</p>
        
        <h2>التقنيات الرئيسية</h2>
        <h3>إنترنت الأشياء (IoT)</h3>
        <p>إنترنت الأشياء يربط البنى التحتية الحضرية للإدارة المحسنة.</p>
        
        <h3>البيانات الضخمة</h3>
        <p>تحليل البيانات الضخمة يتيح اتخاذ قرارات مدروسة.</p>
        
        <h3>الذكاء الاصطناعي</h3>
        <p>الذكاء الاصطناعي يحسن تدفقات المرور وإدارة الطاقة.</p>
        
        <h2>التطبيقات الحضرية</h2>
        <h3>الحركة الذكية</h3>
        <ul>
          <li>إدارة المرور في الوقت الفعلي</li>
          <li>النقل العام المتصل</li>
          <li>المركبات المستقلة</li>
          <li>مشاركة المركبات</li>
        </ul>
        
        <h3>إدارة الطاقة</h3>
        <ul>
          <li>الشبكات الكهربائية الذكية</li>
          <li>الإضاءة العامة التكيفية</li>
          <li>المباني المتصلة</li>
          <li>الطاقات المتجددة المدمجة</li>
        </ul>
        
        <h2>الفوائد البيئية</h2>
        <ul>
          <li>تقليل انبعاثات CO2</li>
          <li>تحسين استهلاك الطاقة</li>
          <li>تحسين جودة الهواء</li>
          <li>إدارة مستدامة للنفايات</li>
        </ul>
        
        <h2>التحديات والقضايا</h2>
        <h3>حماية البيانات</h3>
        <p>جمع البيانات الضخمة يثير مخاوف الخصوصية.</p>
        
        <h3>الفجوة الرقمية</h3>
        <p>يجب ضمان الوصول العادل للتقنيات الذكية.</p>
        
        <h3>تكاليف الاستثمار</h3>
        <p>البنى التحتية الذكية تتطلب استثمارات كبيرة.</p>
        
        <h2>أمثلة دولية</h2>
        <ul>
          <li><strong>سنغافورة</strong>: نموذج المدينة الذكية المتكاملة</li>
          <li><strong>برشلونة</strong>: الابتكار في الخدمات الحضرية</li>
          <li><strong>كوبنهاغن</strong>: الحياد الكربوني بحلول 2025</li>
        </ul>
        
        <h2>الآفاق التونسية</h2>
        <p>تونس تطور مبادراتها الأولى للمدن الذكية مع مشاريع تجريبية في تونس وصفاقس.</p>
        
        <h2>الخلاصة</h2>
        <p>المدن الذكية تمثل مستقبل التنمية الحضرية المستدامة، تجمع بين الابتكار التقني واحترام البيئة.</p>
      `
    },
    author: {
      fr: 'Dr. Leila Hammami',
      en: 'Dr. Leila Hammami',
      ar: 'د. ليلى حمامي'
    },
    date: '2023-12-28',
    category: {
      fr: 'Innovation',
      en: 'Innovation',
      ar: 'الابتكار'
    },
    tags: {
      fr: ['Villes intelligentes', 'Technologie', 'Développement durable', 'IoT'],
      en: ['Smart cities', 'Technology', 'Sustainable development', 'IoT'],
      ar: ['مدن ذكية', 'تقنية', 'تنمية مستدامة', 'إنترنت الأشياء']
    },
    featuredImage: '/src/assets/green-campus.jpg',
    views: 1800,
    likes: 134,
    comments: 28,
    readTime: 10
  }
];
