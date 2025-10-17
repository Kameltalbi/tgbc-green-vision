import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

const Events = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
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

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-12 text-foreground text-center">
          Événements
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Upcoming Events Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-card border-none sticky top-24">
              <CardContent className="p-6">
                <h2 className="font-semibold text-xl mb-4 text-foreground">Événements à venir</h2>
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
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
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
            <Button className="w-full" variant="accent">
              S'inscrire
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Events;
