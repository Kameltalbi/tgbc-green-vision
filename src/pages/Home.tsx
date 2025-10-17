import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, GraduationCap, Users, Megaphone, Rocket, Building2, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-tgbc.png";
import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Home = () => {
  const { t } = useTranslation();
  
  // Hooks pour les animations au scroll
  const [pourquoiRef, pourquoiVisible] = useScrollAnimation();
  const [missionRef, missionVisible] = useScrollAnimation();
  const [actionsRef, actionsVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

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
      <section className="relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden mt-18 sm:mt-20 lg:mt-24">
        {/* Image de fond avec animation */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-gentle-move"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        {/* Overlay fixe qui couvre toute la section */}
        <div className="absolute inset-0 bg-gradient-hero"></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight animate-fade-in">
            {t('home.hero.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto px-4 animate-fade-in-delay-1">
            {t('home.hero.subtitle')}
          </p>
          <Link to="/about">
            <Button variant="hero" size="lg" className="animate-slide-in hover-lift hover-glow text-sm sm:text-base">
              {t('home.hero.cta')}
            </Button>
          </Link>
        </div>
        
        {/* Éléments flottants décoratifs - cachés sur mobile */}
        <div className="hidden sm:block absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-float animate-gentle-move"></div>
        <div className="hidden sm:block absolute top-40 right-20 w-6 h-6 bg-white/15 rounded-full animate-float animate-parallax-subtle" style={{ animationDelay: '1s' }}></div>
        <div className="hidden sm:block absolute bottom-32 left-20 w-3 h-3 bg-white/25 rounded-full animate-float animate-zoom-subtle" style={{ animationDelay: '2s' }}></div>
        <div className="hidden sm:block absolute top-60 left-1/2 w-2 h-2 bg-white/30 rounded-full animate-float animate-lake-move" style={{ animationDelay: '3s' }}></div>
      </section>

      {/* Pourquoi Section */}
      <section ref={pourquoiRef} className={`py-12 sm:py-16 lg:py-20 bg-gradient-subtle transition-all duration-1000 ${pourquoiVisible ? 'animate' : 'animate-on-scroll'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Texte à gauche */}
            <div className={`${pourquoiVisible ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-30px]'} transition-all duration-800 order-2 lg:order-1`}>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-foreground">
                {t('home.why.title')}
              </h2>
              
              <div className="space-y-4 sm:space-y-6">
                <p className={`text-base sm:text-lg lg:text-xl text-primary leading-relaxed transition-all duration-800 delay-200 ${pourquoiVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {t('home.why.reason1')}
                </p>
                
                <p className={`text-base sm:text-lg lg:text-xl text-primary leading-relaxed transition-all duration-800 delay-400 ${pourquoiVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {t('home.why.reason2')}
                </p>
                
                <p className={`text-base sm:text-lg lg:text-xl font-semibold text-accent leading-relaxed transition-all duration-800 delay-600 ${pourquoiVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {t('home.why.question')}
                </p>
              </div>
            </div>

            {/* Image à droite */}
            <div className={`${pourquoiVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-[30px]'} transition-all duration-800 delay-300 flex justify-center order-1 lg:order-2`}>
              <div className="w-full max-w-sm sm:max-w-md lg:w-80 h-48 sm:h-56 lg:h-60 rounded-2xl overflow-hidden shadow-elegant hover-lift animate-lake-move">
                <img 
                  src="/image lac de Tunis.png" 
                  alt="Lac de Tunis" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className={`py-12 sm:py-16 lg:py-20 container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${missionVisible ? 'animate' : 'animate-on-scroll'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-foreground transition-all duration-800 ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t('home.mission.title')}
          </h2>
          <p className={`text-base sm:text-lg text-muted-foreground leading-relaxed transition-all duration-800 delay-200 ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t('home.mission.description')}
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {[
              { icon: <Lightbulb className="h-8 w-8" />, label: t('home.mission.innovation') },
              { icon: <GraduationCap className="h-8 w-8" />, label: t('home.mission.education') },
              { icon: <Megaphone className="h-8 w-8" />, label: t('home.mission.advocacy') },
              { icon: <Users className="h-8 w-8" />, label: t('home.mission.community') },
            ].map((item, idx) => (
              <div key={idx} className={`flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-secondary transition-all duration-500 group hover-lift animate-pulse-soft ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${idx * 100 + 400}ms` }}>
                <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <span className="font-semibold text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Axes Section */}
      <section ref={actionsRef} className={`py-12 sm:py-16 lg:py-20 bg-muted/30 transition-all duration-1000 ${actionsVisible ? 'animate' : 'animate-on-scroll'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-foreground transition-all duration-800 ${actionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t('home.actions.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {actionAxes.map((axis, idx) => (
              <Card 
                key={idx} 
                className={`group hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 border-none shadow-card hover-lift hover-glow ${actionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${idx * 100 + 200}ms` }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className={`${axis.color} w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-3 sm:mb-4 text-primary group-hover:scale-110 transition-transform duration-300`}>
                    {axis.icon}
                  </div>
                  <h3 className="font-semibold text-lg sm:text-xl mb-2 sm:mb-3 text-foreground group-hover:text-primary transition-colors duration-300">{axis.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">{axis.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className={`py-12 sm:py-16 lg:py-20 container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${ctaVisible ? 'animate' : 'animate-on-scroll'}`}>
        <div className={`bg-gradient-primary text-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-elegant hover-lift relative overflow-hidden ${ctaVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-800`}>
          <h2 className={`font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 transition-all duration-800 delay-200 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t('home.cta.title')}
          </h2>
          <p className={`text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto transition-all duration-800 delay-400 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t('home.cta.description')}
          </p>
          <Link to="/membership">
            <Button variant="hero" size="lg" className={`hover-glow transition-all duration-800 delay-600 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} text-sm sm:text-base`}>
              {t('home.cta.button')}
            </Button>
          </Link>
          
          {/* Éléments décoratifs */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
          <div className="absolute top-8 right-8 w-3 h-3 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-6 left-8 w-2 h-2 bg-white/25 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-4 right-6 w-3 h-3 bg-white/15 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
