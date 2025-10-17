import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle2,
  MessageSquare,
  Users,
  Building2
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: ""
  });

  const inquiryTypes = [
    { value: "general", label: t('contact.inquiryTypes.general') },
    { value: "membership", label: t('contact.inquiryTypes.membership') },
    { value: "training", label: t('contact.inquiryTypes.training') },
    { value: "partnership", label: t('contact.inquiryTypes.partnership') },
    { value: "media", label: t('contact.inquiryTypes.media') },
    { value: "other", label: t('contact.inquiryTypes.other') }
  ];

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: t('contact.info.email.title'),
      value: "contact@tgbc.org",
      description: t('contact.info.email.description')
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: t('contact.info.phone.title'),
      value: "+216 71 793 500",
      description: t('contact.info.phone.description')
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: t('contact.info.address.title'),
      value: t('contact.info.address.value'),
      description: t('contact.info.address.description')
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: t('contact.info.hours.title'),
      value: t('contact.info.hours.value'),
      description: t('contact.info.hours.description')
    }
  ];

  const teamContacts = [
    {
      icon: <Users className="h-8 w-8" />,
      name: t('contact.team.general.name'),
      role: t('contact.team.general.role'),
      email: "info@tgbc.org",
      description: t('contact.team.general.description')
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      name: t('contact.team.membership.name'),
      role: t('contact.team.membership.role'),
      email: "membership@tgbc.org",
      description: t('contact.team.membership.description')
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      name: t('contact.team.communication.name'),
      role: t('contact.team.communication.role'),
      email: "communication@tgbc.org",
      description: t('contact.team.communication.description')
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message || !formData.inquiryType) {
      toast.error(t('contact.form.required'));
      return;
    }

    setIsSubmitted(true);
    toast.success(t('contact.form.success'));
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
                {t('contact.success.title')}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t('contact.success.message')}
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                {t('contact.success.sendAnother')}
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
            {t('contact.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant border-none">
              <CardContent className="p-8">
                <h2 className="font-display text-2xl font-bold mb-6 text-foreground">
                  {t('contact.form.title')}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contact.form.name')} *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('contact.form.email')} *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">{t('contact.form.company')}</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">{t('contact.form.inquiryType')} *</Label>
                    <Select
                      value={formData.inquiryType}
                      onValueChange={(value) => handleInputChange("inquiryType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('contact.form.selectType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.form.message')} *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    {t('contact.form.send')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* General Contact Info */}
            <Card className="shadow-card border-none">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-4 text-foreground">
                  {t('contact.info.title')}
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{info.title}</h4>
                        <p className="text-primary font-medium">{info.value}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Contacts */}
            <Card className="shadow-card border-none">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-4 text-foreground">
                  {t('contact.team.title')}
                </h3>
                <div className="space-y-4">
                  {teamContacts.map((member, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-secondary/50">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                          {member.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{member.name}</h4>
                          <p className="text-sm text-primary font-medium">{member.role}</p>
                          <p className="text-sm text-muted-foreground mb-2">{member.description}</p>
                          <a 
                            href={`mailto:${member.email}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {member.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="shadow-elegant border-none">
            <CardContent className="p-8">
              <h2 className="font-display text-2xl font-bold mb-6 text-center text-foreground">
                {t('contact.map.title')}
              </h2>
              <div className="bg-muted/30 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {t('contact.map.placeholder')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
