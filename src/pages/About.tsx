import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Recycle, Lightbulb, GraduationCap, Megaphone, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import campusImage from "@/assets/green-campus.jpg";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  const missions = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: t('about.missions.decarbonation.title'),
      description: t('about.missions.decarbonation.description'),
    },
    {
      icon: <Recycle className="h-8 w-8" />,
      title: t('about.missions.circular.title'),
      description: t('about.missions.circular.description'),
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: t('about.missions.innovation.title'),
      description: t('about.missions.innovation.description'),
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: t('about.missions.education.title'),
      description: t('about.missions.education.description'),
    },
    {
      icon: <Megaphone className="h-8 w-8" />,
      title: t('about.missions.advocacy.title'),
      description: t('about.missions.advocacy.description'),
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t('about.missions.community.title'),
      description: t('about.missions.community.description'),
    },
  ];

  const team = [
    { 
      name: t('about.team.members.ibtissem.name'), 
      role: t('about.team.members.ibtissem.role'),
      description: t('about.team.members.ibtissem.description'),
      image: "/equipe/Ibtissam Bouattay.png"
    },
    { 
      name: t('about.team.members.abdelmalek.name'), 
      role: t('about.team.members.abdelmalek.role'),
      description: t('about.team.members.abdelmalek.description'),
      image: "/equipe/Abdelmalek GHANEM.png"
    },
    { 
      name: t('about.team.members.raoudha.name'), 
      role: t('about.team.members.raoudha.role'),
      description: t('about.team.members.raoudha.description'),
      image: "/equipe/Raoudha LARBI.png"
    },
    { 
      name: t('about.team.members.amel.name'), 
      role: t('about.team.members.amel.role'),
      description: t('about.team.members.amel.description'),
      image: "/equipe/amel souissi Talbi.png"
    },
    { 
      name: t('about.team.members.mohamed.name'), 
      role: t('about.team.members.mohamed.role'),
      description: t('about.team.members.mohamed.description'),
      image: "/equipe/Mohamed El Khames.png"
    },
    { 
      name: t('about.team.members.aida.name'), 
      role: t('about.team.members.aida.role'),
      description: t('about.team.members.aida.description'),
      image: "/equipe/Aida SIALA.png"
    },
    { 
      name: t('about.team.members.emna.name'), 
      role: t('about.team.members.emna.role'),
      description: t('about.team.members.emna.description'),
      image: "/equipe/Emna BCHIR.png"
    },
    { 
      name: t('about.team.members.halim.name'), 
      role: t('about.team.members.halim.role'),
      description: t('about.team.members.halim.description'),
      image: "/equipe/Halim Hammi.png"
    },
    { 
      name: t('about.team.members.saoussen.name'), 
      role: t('about.team.members.saoussen.role'),
      description: t('about.team.members.saoussen.description'),
      image: "/equipe/Saoussen Lakhdar.png"
    },
  ];

  const alliances = [
    { name: t('about.alliances.worldgbc.name'), description: t('about.alliances.worldgbc.description') },
    { name: t('about.alliances.mena.name'), description: t('about.alliances.mena.description') },
    { name: t('about.alliances.unesco.name'), description: t('about.alliances.unesco.description') },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {t('about.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Introduction Section */}
        <section className="mb-20 bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-elegant">
          <h2 className="font-display text-3xl font-bold text-center mb-8 text-foreground">
            {t('about.introduction.title')}
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.introduction.paragraph1')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.introduction.paragraph2')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.introduction.paragraph3')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.introduction.paragraph4')}
            </p>
          </div>
        </section>

        {/* Presentation Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-in">
            <h2 className="font-display text-3xl font-bold mb-6 text-foreground">{t('about.vision.title')}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t('about.vision.description1')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('about.vision.description2')}
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
            {t('about.missions.title')}
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
              {t('about.team.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <Card key={idx} className="text-center border-none shadow-card hover:shadow-elegant transition-all">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-primary flex items-center justify-center">
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Users className="h-12 w-12 text-white" />
                      )}
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
            {t('about.alliances.title')}
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
