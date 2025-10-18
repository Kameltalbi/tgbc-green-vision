import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Users, MapPin, Clock } from 'lucide-react';
import ContentManager, { ContentItem } from '../components/ContentManager';
import EventForm from '../components/EventForm';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface Event extends ContentItem {
  startDate: string;
  endDate: string;
  location: string;
  maxAttendees?: number;
  currentAttendees?: number;
  price?: number;
  currency?: string;
  type: 'conference' | 'workshop' | 'webinar' | 'meeting' | 'training';
  status: 'published' | 'draft' | 'archived' | 'cancelled';
  images?: Array<{
    id: string;
    url: string;
    alt: string;
    width: number;
    height: number;
    position: number;
    caption?: string;
  }>;
  imageDisplay: 'single' | 'carousel' | 'gallery';
}

const EventsManager: React.FC = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    // Load events from localStorage or API
    const savedEvents = localStorage.getItem('admin_events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      // Mock data
      const mockEvents: Event[] = [
        {
          id: '1',
          title: 'Conférence sur le Bâtiment Durable 2024',
          description: 'Conférence annuelle sur les dernières innovations en construction durable',
          type: 'conference',
          status: 'published',
          category: 'Conférence',
          language: 'fr',
          tags: ['Construction', 'Durable', 'Innovation'],
          startDate: '2024-03-15T09:00:00Z',
          endDate: '2024-03-15T17:00:00Z',
          location: 'Hôtel Laico Tunis',
          maxAttendees: 200,
          currentAttendees: 156,
          price: 150,
          currency: 'TND',
          images: [
            {
              id: 'img1',
              url: '/images/events/conference-2024.jpg',
              alt: 'Conférence Bâtiment Durable 2024',
              width: 1200,
              height: 800,
              position: 1,
              caption: 'Salle de conférence principale'
            },
            {
              id: 'img2',
              url: '/images/events/speakers-panel.jpg',
              alt: 'Panel d\'experts',
              width: 1200,
              height: 600,
              position: 2,
              caption: 'Panel d\'experts en construction durable'
            }
          ],
          imageDisplay: 'carousel',
          createdAt: '2024-01-10T10:00:00Z',
          updatedAt: '2024-01-10T10:00:00Z'
        },
        {
          id: '2',
          title: 'Formation Certification LEED',
          description: 'Formation intensive pour obtenir la certification LEED',
          type: 'training',
          status: 'published',
          category: 'Formation',
          language: 'fr',
          tags: ['LEED', 'Certification', 'Formation'],
          startDate: '2024-02-20T08:00:00Z',
          endDate: '2024-02-22T18:00:00Z',
          location: 'Centre de Formation TunisiaGBC',
          maxAttendees: 25,
          currentAttendees: 18,
          price: 800,
          currency: 'TND',
          createdAt: '2024-01-05T14:30:00Z',
          updatedAt: '2024-01-05T14:30:00Z'
        }
      ];
      setEvents(mockEvents);
    }
  }, []);

  const saveEvents = (newEvents: Event[]) => {
    setEvents(newEvents);
    localStorage.setItem('admin_events', JSON.stringify(newEvents));
  };

  const handleAdd = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = (event: Event) => {
    const newEvents = events.filter(e => e.id !== event.id);
    saveEvents(newEvents);
  };

  const handleView = (event: Event) => {
    // Open event details or registration page
    console.log('View event:', event);
  };

  const handleSave = (data: Partial<Event>) => {
    if (editingEvent) {
      // Update existing event
      const newEvents = events.map(e => 
        e.id === editingEvent.id ? { ...e, ...data } : e
      );
      saveEvents(newEvents);
    } else {
      // Add new event
      const newEvent: Event = {
        ...data as Event,
        id: `event_${Date.now()}`,
        currentAttendees: 0
      };
      saveEvents([...events, newEvent]);
    }
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      conference: '🎤',
      workshop: '🔧',
      webinar: '💻',
      meeting: '🤝',
      training: '📚'
    };
    return icons[type as keyof typeof icons] || '📅';
  };

  const getTypeLabel = (type: string) => {
    return t(`admin.events.types.${type}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const columns = [
    {
      key: 'title',
      label: t('admin.events.columns.title'),
      render: (event: Event) => (
        <div className="flex items-center gap-3">
          <span className="text-lg">{getTypeIcon(event.type)}</span>
          <div>
            <div className="font-medium">{event.title}</div>
            <div className="text-sm text-gray-500">{event.description}</div>
          </div>
        </div>
      )
    },
    {
      key: 'date',
      label: t('admin.events.columns.date'),
      render: (event: Event) => (
        <div className="text-sm">
          <div className="font-medium">{formatDate(event.startDate)}</div>
          <div className="text-gray-500">{event.location}</div>
        </div>
      )
    },
    {
      key: 'attendees',
      label: t('admin.events.columns.attendees'),
      render: (event: Event) => (
        <div className="text-sm">
          <div className="font-medium">
            {event.currentAttendees || 0} / {event.maxAttendees || '∞'}
          </div>
          <div className="text-gray-500">
            {event.price ? `${event.price} ${event.currency}` : t('admin.events.free')}
          </div>
        </div>
      )
    }
  ];

  const formFields = [
    {
      key: 'title',
      label: t('admin.events.form.title'),
      type: 'text' as const,
      required: true,
      placeholder: t('admin.events.form.titlePlaceholder')
    },
    {
      key: 'description',
      label: t('admin.events.form.description'),
      type: 'textarea' as const,
      required: true,
      placeholder: t('admin.events.form.descriptionPlaceholder')
    },
    {
      key: 'type',
      label: t('admin.events.form.type'),
      type: 'select' as const,
      required: true,
      options: [
        { value: 'conference', label: t('admin.events.types.conference') },
        { value: 'workshop', label: t('admin.events.types.workshop') },
        { value: 'webinar', label: t('admin.events.types.webinar') },
        { value: 'meeting', label: t('admin.events.types.meeting') },
        { value: 'training', label: t('admin.events.types.training') }
      ]
    },
    {
      key: 'startDate',
      label: t('admin.events.form.startDate'),
      type: 'date' as const,
      required: true
    },
    {
      key: 'endDate',
      label: t('admin.events.form.endDate'),
      type: 'date' as const,
      required: true
    },
    {
      key: 'location',
      label: t('admin.events.form.location'),
      type: 'text' as const,
      required: true,
      placeholder: t('admin.events.form.locationPlaceholder')
    },
    {
      key: 'maxAttendees',
      label: t('admin.events.form.maxAttendees'),
      type: 'text' as const,
      placeholder: t('admin.events.form.maxAttendeesPlaceholder')
    },
    {
      key: 'price',
      label: t('admin.events.form.price'),
      type: 'text' as const,
      placeholder: t('admin.events.form.pricePlaceholder')
    },
    {
      key: 'currency',
      label: t('admin.events.form.currency'),
      type: 'select' as const,
      options: [
        { value: 'TND', label: 'TND' },
        { value: 'EUR', label: 'EUR' },
        { value: 'USD', label: 'USD' }
      ]
    },
    {
      key: 'category',
      label: t('admin.events.form.category'),
      type: 'text' as const,
      placeholder: t('admin.events.form.categoryPlaceholder')
    },
    {
      key: 'language',
      label: t('admin.events.form.language'),
      type: 'select' as const,
      required: true,
      options: [
        { value: 'fr', label: 'Français' },
        { value: 'en', label: 'English' },
        { value: 'ar', label: 'العربية' }
      ]
    },
    {
      key: 'status',
      label: t('admin.events.form.status'),
      type: 'select' as const,
      required: true,
      options: [
        { value: 'published', label: t('admin.status.published') },
        { value: 'draft', label: t('admin.status.draft') },
        { value: 'cancelled', label: t('admin.events.status.cancelled') },
        { value: 'archived', label: t('admin.status.archived') }
      ]
    },
    {
      key: 'tags',
      label: t('admin.events.form.tags'),
      type: 'tags' as const,
      placeholder: t('admin.events.form.tagsPlaceholder')
    }
  ];

  const upcomingEvents = events.filter(e => 
    new Date(e.startDate) > new Date() && e.status === 'published'
  );

  const pastEvents = events.filter(e => 
    new Date(e.startDate) < new Date() || e.status === 'archived'
  );

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.events.stats.total')}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.events.stats.upcoming')}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.events.stats.past')}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pastEvents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.events.stats.attendees')}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {events.reduce((sum, e) => sum + (e.currentAttendees || 0), 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Manager */}
      <ContentManager
        title={t('admin.events.title')}
        items={events}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        columns={columns}
        searchPlaceholder={t('admin.events.searchPlaceholder')}
      />

      {/* Form Dialog */}
      <ContentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSave}
        item={editingEvent}
        title={editingEvent ? t('admin.events.editTitle') : t('admin.events.addTitle')}
        fields={formFields}
      />
    </div>
  );
};

export default EventsManager;
