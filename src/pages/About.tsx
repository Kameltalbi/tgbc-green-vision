import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Recycle, Lightbulb, GraduationCap, Megaphone, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import campusImage from "@/assets/green-campus.jpg";

const About = () => {
  const missions = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Décarbonation",
      description: "Réduire l'empreinte carbone du secteur du bâtiment",
    },
    {
      icon: <Recycle className="h-8 w-8" />,
      title: "Économie circulaire",
      description: "Promouvoir le réemploi et la valorisation des matériaux",
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "Encourager les solutions technologiques durables",
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Éducation",
      description: "Former les professionnels et les étudiants",
    },
    {
      icon: <Megaphone className="h-8 w-8" />,
      title: "Plaidoyer",
      description: "Influencer les politiques et réglementations",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Communauté",
      description: "Fédérer les acteurs du bâtiment durable",
    },
  ];

  const team = [
    { 
      name: "Ibtissem BOUATTAY", 
      role: "Présidente",
      description: "Ingénieur, adaptation, ESG, SPP/GPP - Point focal Global ABC"
    },
    { 
      name: "Abdelmalek GHANEM", 
      role: "Vice-Président",
      description: "Universitaire, CEO de l'entreprise SOIB"
    },
    { 
      name: "Raoudha LARBI", 
      role: "Secrétaire Générale",
      description: "Architecte, ancienne directrice des bâtiments civils et direction urbanisme MEHAT"
    },
    { 
      name: "Amel SOUISSI TALBI", 
      role: "Responsable de la communication",
      description: "Architecte, Fondatrice et directrice de la revue ARCHIBAT"
    },
    { 
      name: "Mohamed El Khames LABIDI", 
      role: "Trésorier",
      description: "Architecte, Ancien Pdg AFH, et directeur au MEHAT"
    },
    { 
      name: "Aida SIALA", 
      role: "Coordinatrice de l'innovation",
      description: "Architecte, universitaire - Green building"
    },
    { 
      name: "Emna BCHIR", 
      role: "Coordinatrice relations internationales",
      description: "Architecte, Universitaire"
    },
    { 
      name: "Halim Hammi", 
      role: "Responsable des relations universitaires",
      description: "Ingénieur, universitaire"
    },
    { 
      name: "Saoussen Lakhdar", 
      role: "Responsable Programme Green Schools",
      description: "Universitaire et consultante spécialiste en marketing for good"
    },
  ];

  const alliances = [
    { name: "WorldGBC", description: "World Green Building Council" },
    { name: "MENA Green Schools", description: "Réseau régional d'écoles vertes" },
    { name: "UNESCO Green Schools", description: "Programme éducatif mondial" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            À Propos du TGBC
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Le Tunisia Green Building Council est l'organisation de référence pour la promotion 
            du bâtiment durable en Tunisie
          </p>
        </div>

        {/* Presentation Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-in">
            <h2 className="font-display text-3xl font-bold mb-6 text-foreground">Notre Vision</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Le TGBC est une organisation indépendante qui rassemble les professionnels du bâtiment, 
              les institutions académiques, les autorités publiques et la société civile autour d'un 
              objectif commun : transformer le secteur de la construction en Tunisie vers plus de durabilité.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              En tant que membre du World Green Building Council, nous contribuons activement aux objectifs 
              mondiaux de décarbonation et d'adaptation au changement climatique, tout en répondant aux 
              spécificités et aux besoins du contexte tunisien.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-elegant animate-slide-in">
            <img 
              src={campusImage} 
              alt="Green Campus" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <section className="mb-20">
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-foreground">
            Nos Missions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission, idx) => (
              <Card key={idx} className="border-none shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {mission.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{mission.title}</h3>
                  <p className="text-sm text-muted-foreground">{mission.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20 bg-muted/30 -mx-4 px-4 py-16 md:py-20">
          <div className="container mx-auto">
            <h2 className="font-display text-3xl font-bold text-center mb-12 text-foreground">
              Bureau Exécutif
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <Card key={idx} className="text-center border-none shadow-card hover:shadow-elegant transition-all">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mt-1">{member.role}</p>
                    <p className="text-xs text-muted-foreground mt-2">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Alliances Section */}
        <section>
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-foreground">
            Nos Partenariats Internationaux
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {alliances.map((alliance, idx) => (
              <Card key={idx} className="text-center border-none shadow-card hover:shadow-elegant transition-all">
                <CardContent className="p-8">
                  <div className="bg-primary/10 w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">{alliance.name}</h3>
                  <p className="text-sm text-muted-foreground">{alliance.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
