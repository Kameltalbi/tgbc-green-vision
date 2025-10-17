import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, GraduationCap, Users, Megaphone, Rocket, Building2, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-tgbc.png";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  const actionAxes = [
    {
      icon: <Building2 className="h-8 w-8" />,
      title: t('home.actions.business.title'),
      description: t('home.actions.business.description'),
      color: "bg-primary/10",
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: t('home.actions.campus.title'),
      description: t('home.actions.campus.description'),
      color: "bg-accent/10",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t('home.actions.awareness.title'),
      description: t('home.actions.awareness.description'),
      color: "bg-secondary",
    },
    {
      icon: <Megaphone className="h-8 w-8" />,
      title: t('home.actions.advocacy.title'),
      description: t('home.actions.advocacy.description'),
      color: "bg-primary/10",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: t('home.actions.innovation.title'),
      description: t('home.actions.innovation.description'),
      color: "bg-accent/10",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: t('home.actions.certification.title'),
      description: t('home.actions.certification.description'),
      color: "bg-secondary",
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
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <Link to="/about">
            <Button variant="hero" size="lg" className="animate-slide-in">
              {t('home.hero.cta')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Pourquoi Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Texte à gauche */}
            <div className="animate-fade-in">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-foreground">
                {t('home.why.title')}
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-primary leading-relaxed">
                  {t('home.why.reason1')}
                </p>
                
                <p className="text-lg md:text-xl text-primary leading-relaxed">
                  {t('home.why.reason2')}
                </p>
                
                <p className="text-lg md:text-xl font-semibold text-accent leading-relaxed">
                  {t('home.why.question')}
                </p>
              </div>
            </div>

            {/* Image à droite */}
            <div className="animate-slide-in flex justify-center">
              <div className="w-80 h-60 rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src="/image lac de Tunis.png" 
                  alt="Lac de Tunis" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground">
            {t('home.mission.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('home.mission.description')}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { icon: <Lightbulb className="h-8 w-8" />, label: t('home.mission.innovation') },
              { icon: <GraduationCap className="h-8 w-8" />, label: t('home.mission.education') },
              { icon: <Megaphone className="h-8 w-8" />, label: t('home.mission.advocacy') },
              { icon: <Users className="h-8 w-8" />, label: t('home.mission.community') },
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
            {t('home.actions.title')}
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
            {t('home.cta.title')}
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            {t('home.cta.description')}
          </p>
          <Link to="/membership">
            <Button variant="hero" size="lg">
              {t('home.cta.button')}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
