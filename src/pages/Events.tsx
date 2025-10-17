import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, MapPin, Clock, ChevronLeft, ChevronRight, User, Mail, Phone, Building, Briefcase, Utensils, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  day: number;
  month: number;
  year: number;
}

interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  dietary: string;
  notes: string;
}

const Events = () => {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationForm, setRegistrationForm] = useState<RegistrationForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    dietary: '',
    notes: ''
  });

  const events: Event[] = [
    {
      id: 1,
      title: "World Green Building Week",
      date: "8-12 Septembre 2025",
      time: "09:00 - 18:00",
      location: "Tunis",
      description: "#BeBoldOnBuildings - Une semaine dédiée au bâtiment durable avec conférences, ateliers et visites de sites exemplaires",
      day: 8,
      month: 8,
      year: 2025,
    },
    {
      id: 2,
      title: "Conférence Économie Circulaire",
      date: "15 Octobre 2025",
      time: "14:00 - 17:00",
      location: "Sfax",
      description: "Découvrez comment l'économie circulaire transforme le secteur du bâtiment en Tunisie",
      day: 15,
      month: 9,
      year: 2025,
    },
    {
      id: 3,
      title: "Formation Green Campus & Schools",
      date: "22 Novembre 2025",
      time: "09:00 - 16:00",
      location: "Sousse",
      description: "Formation pratique pour les responsables d'établissements scolaires et universitaires",
      day: 22,
      month: 10,
      year: 2025,
    },
  ];

  const upcomingEvents = events.slice(0, 3);

  const monthNames = [
    t('events.months.january'), t('events.months.february'), t('events.months.march'), t('events.months.april'), 
    t('events.months.may'), t('events.months.june'), t('events.months.july'), t('events.months.august'),
    t('events.months.september'), t('events.months.october'), t('events.months.november'), t('events.months.december')
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getEventsForDay = (day: number) => {
    return events.filter(
      (event) => event.day === day && event.month === currentMonth && event.year === currentYear
    );
  };

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simuler l'envoi du formulaire
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(t('events.registration.success'));
      setShowRegistrationForm(false);
      setSelectedEvent(null);
      
      // Reset form
      setRegistrationForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        dietary: '',
        notes: ''
      });
    } catch (error) {
      toast.error(t('events.registration.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof RegistrationForm, value: string) => {
    setRegistrationForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const openRegistrationForm = () => {
    setShowRegistrationForm(true);
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-12 text-foreground text-center">
          {t('events.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Upcoming Events Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-card border-none sticky top-24">
              <CardContent className="p-6">
                <h2 className="font-semibold text-xl mb-4 text-foreground">{t('events.upcoming')}</h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border-l-4 border-primary pl-3 py-2 cursor-pointer hover:bg-secondary/50 transition-colors rounded-r"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <p className="font-semibold text-sm text-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card className="shadow-elegant border-none">
              <CardContent className="p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    {monthNames[currentMonth]} {currentYear}
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={previousMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Day Names */}
                  {[
                    t('events.days.monday'), t('events.days.tuesday'), t('events.days.wednesday'), 
                    t('events.days.thursday'), t('events.days.friday'), t('events.days.saturday'), t('events.days.sunday')
                  ].map((day) => (
                    <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}

                  {/* Empty Days */}
                  {emptyDays.map((_, idx) => (
                    <div key={`empty-${idx}`} className="aspect-square"></div>
                  ))}

                  {/* Calendar Days */}
                  {days.map((day) => {
                    const dayEvents = getEventsForDay(day);
                    const hasEvents = dayEvents.length > 0;

                    return (
                      <div
                        key={day}
                        className={`aspect-square border rounded-lg p-2 transition-all cursor-pointer ${
                          hasEvents
                            ? "bg-primary/10 border-primary hover:bg-primary/20"
                            : "border-border hover:bg-muted"
                        }`}
                        onClick={() => hasEvents && setSelectedEvent(dayEvents[0])}
                      >
                        <div className="font-semibold text-sm text-foreground">{day}</div>
                        {hasEvents && (
                          <div className="mt-1 text-xs text-primary font-medium line-clamp-2">
                            {dayEvents[0].title}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      <Dialog open={selectedEvent !== null} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <span>{selectedEvent?.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5 text-primary" />
              <span>{selectedEvent?.time}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              <span>{selectedEvent?.location}</span>
            </div>
            <p className="text-foreground leading-relaxed pt-4 border-t">
              {selectedEvent?.description}
            </p>
            <Button className="w-full" variant="accent" onClick={openRegistrationForm}>
              {t('events.register')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Registration Form Modal */}
      <Dialog open={showRegistrationForm} onOpenChange={setShowRegistrationForm}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl flex items-center gap-2">
              <User className="h-6 w-6 text-primary" />
              {t('events.registration.title')}
            </DialogTitle>
            <p className="text-muted-foreground">
              {t('events.registration.subtitle')}
            </p>
            {selectedEvent && (
              <div className="bg-primary/10 p-3 rounded-lg mt-4">
                <h3 className="font-semibold text-primary">{selectedEvent.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedEvent.date} - {selectedEvent.location}</p>
              </div>
            )}
          </DialogHeader>
          
          <form onSubmit={handleRegistrationSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {t('events.registration.form.firstName')} *
                </Label>
                <Input
                  id="firstName"
                  value={registrationForm.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  placeholder={t('events.registration.form.firstName')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {t('events.registration.form.lastName')} *
                </Label>
                <Input
                  id="lastName"
                  value={registrationForm.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  placeholder={t('events.registration.form.lastName')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t('events.registration.form.email')} *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={registrationForm.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  placeholder={t('events.registration.form.email')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {t('events.registration.form.phone')} *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={registrationForm.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  placeholder={t('events.registration.form.phone')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  {t('events.registration.form.company')}
                </Label>
                <Input
                  id="company"
                  value={registrationForm.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder={t('events.registration.form.company')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  {t('events.registration.form.position')}
                </Label>
                <Input
                  id="position"
                  value={registrationForm.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  placeholder={t('events.registration.form.position')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dietary" className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                {t('events.registration.form.dietary')}
              </Label>
              <Input
                id="dietary"
                value={registrationForm.dietary}
                onChange={(e) => handleInputChange('dietary', e.target.value)}
                placeholder={t('events.registration.form.dietaryPlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {t('events.registration.form.notes')}
              </Label>
              <Textarea
                id="notes"
                value={registrationForm.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder={t('events.registration.form.notesPlaceholder')}
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRegistrationForm(false)}
                className="flex-1"
              >
                {t('events.registration.form.cancel')}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? t('events.registration.form.submit') + '...' : t('events.registration.form.submit')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Events;
