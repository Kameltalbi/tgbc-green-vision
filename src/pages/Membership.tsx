import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Users, Building2, GraduationCap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Membership = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    position: "",
    email: "",
    phone: "",
    membershipType: "",
  });

  const benefits = [
    "Accès aux formations et événements TGBC",
    "Réseautage avec les professionnels du secteur",
    "Reconnaissance en tant que membre WorldGBC Network",
    "Participation aux groupes de travail et initiatives",
    "Veille réglementaire et technique",
    "Visibilité sur nos plateformes de communication",
  ];

  const membershipTypes = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Individuelle",
      description: "Pour les professionnels engagés dans le bâtiment durable",
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Entreprise",
      description: "Pour les organisations et entreprises du secteur",
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Étudiant",
      description: "Pour les étudiants en architecture, ingénierie et environnement",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.membershipType) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsSubmitted(true);
    toast.success("Votre demande d'adhésion a été envoyée avec succès!");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[80vh]">
          <Card className="max-w-lg w-full text-center shadow-elegant border-none">
            <CardContent className="p-12">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
              <h2 className="font-display text-3xl font-bold mb-4 text-foreground">
                Merci de rejoindre TGBC !
              </h2>
              <p className="text-muted-foreground mb-8">
                Votre demande d'adhésion a été reçue. Notre équipe vous contactera prochainement 
                pour finaliser votre inscription.
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                Retour au formulaire
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Devenez Membre
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Rejoignez la communauté du bâtiment durable en Tunisie et contribuez 
            à construire un avenir plus vert
          </p>
        </div>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-foreground">
            Les Avantages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-card shadow-card">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Membership Types */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-foreground">
            Types d'Adhésion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {membershipTypes.map((type, idx) => (
              <Card key={idx} className="border-none shadow-card hover:shadow-elegant transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {type.icon}
                  </div>
                  <h3 className="font-semibold text-xl mb-2 text-foreground">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Registration Form */}
        <section className="max-w-2xl mx-auto">
          <Card className="shadow-elegant border-none">
            <CardContent className="p-8">
              <h2 className="font-display text-2xl font-bold mb-6 text-foreground text-center">
                Formulaire d'Adhésion
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Société / Organisation</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Fonction</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="membershipType">Type d'adhésion *</Label>
                  <Select
                    value={formData.membershipType}
                    onValueChange={(value) => handleInputChange("membershipType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individuelle</SelectItem>
                      <SelectItem value="company">Entreprise</SelectItem>
                      <SelectItem value="student">Étudiant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Devenir Membre
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Membership;
