import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, GraduationCap, Users, Megaphone, Rocket, Building2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-tgbc.png";

const Home = () => {
  const actionAxes = [
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Business & Impact",
      description: "Accompagner les entreprises dans leur transition écologique et valoriser les projets durables",
      color: "bg-primary/10",
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Green Campus & Schools",
      description: "Former la prochaine génération aux pratiques de construction durable",
      color: "bg-accent/10",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Sensibiliser",
      description: "Éduquer et mobiliser tous les acteurs du secteur du bâtiment",
      color: "bg-secondary",
    },
    {
      icon: <Megaphone className="h-8 w-8" />,
      title: "Plaidoyer",
      description: "Influencer les politiques publiques en faveur de la construction durable",
      color: "bg-primary/10",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Innovation & Startups",
      description: "Soutenir l'innovation et l'entrepreneuriat dans le secteur du bâtiment vert",
      color: "bg-accent/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Construire aujourd'hui,<br />penser demain
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Promouvoir une culture du bâtiment durable en Tunisie
          </p>
          <Link to="/about">
            <Button variant="hero" size="lg" className="animate-slide-in">
              Découvrir TGBC
            </Button>
          </Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Notre Mission
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Promouvoir une culture du bâtiment durable en Tunisie en sensibilisant, formant et accompagnant 
            les acteurs publics et privés vers une transition écologique du secteur. En tant que membre du 
            WorldGBC, nous contribuons à la décarbonation du bâtiment et à l'économie circulaire.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { icon: <Lightbulb className="h-8 w-8" />, label: "Innovation" },
              { icon: <GraduationCap className="h-8 w-8" />, label: "Éducation" },
              { icon: <Megaphone className="h-8 w-8" />, label: "Plaidoyer" },
              { icon: <Users className="h-8 w-8" />, label: "Communauté" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-secondary transition-colors group">
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="font-semibold text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Axes Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Nos Axes d'Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actionAxes.map((axis, idx) => (
              <Card 
                key={idx} 
                className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-none shadow-card"
              >
                <CardContent className="p-6">
                  <div className={`${axis.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform`}>
                    {axis.icon}
                  </div>
                  <h3 className="font-semibold text-xl mb-3 text-foreground">{axis.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{axis.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="bg-gradient-primary text-white rounded-3xl p-12 md:p-16 text-center shadow-elegant">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Rejoignez le Mouvement
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Devenez membre du TGBC et contribuez à construire un avenir durable pour la Tunisie
          </p>
          <Link to="/membership">
            <Button variant="hero" size="lg">
              Adhérer au TGBC
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
