import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Users, Building2, GraduationCap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Membership = () => {
  const { t } = useTranslation();
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

  const benefits = t('membership.benefits.list', { returnObjects: true }) as string[];

  const membershipTypes = [
    {
      icon: <Users className="h-8 w-8" />,
      title: t('membership.types.individual.title'),
      description: t('membership.types.individual.description'),
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: t('membership.types.company.title'),
      description: t('membership.types.company.description'),
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: t('membership.types.student.title'),
      description: t('membership.types.student.description'),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.membershipType) {
      toast.error(t('membership.form.required'));
      return;
    }

    setIsSubmitted(true);
    toast.success(t('membership.form.success'));
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
                {t('membership.success.title')}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t('membership.success.message')}
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                {t('membership.success.backToForm')}
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
            {t('membership.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('membership.subtitle')}
          </p>
        </div>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-foreground">
            {t('membership.benefits.title')}
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
            {t('membership.types.title')}
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
                {t('membership.form.title')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t('membership.form.firstName')} *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t('membership.form.lastName')} *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">{t('membership.form.company')}</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">{t('membership.form.position')}</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('membership.form.email')} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('membership.form.phone')}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="membershipType">{t('membership.form.membershipType')} *</Label>
                  <Select
                    value={formData.membershipType}
                    onValueChange={(value) => handleInputChange("membershipType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('membership.form.selectType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">{t('membership.types.individual.title')}</SelectItem>
                      <SelectItem value="company">{t('membership.types.company.title')}</SelectItem>
                      <SelectItem value="student">{t('membership.types.student.title')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  {t('membership.form.submit')}
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
