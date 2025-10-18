import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Save } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import EventImageManager from '../components/EventImageManager';

interface EventImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  position: number;
  caption?: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'conference' | 'workshop' | 'webinar' | 'training';
  status: 'draft' | 'published' | 'cancelled';
  maxAttendees?: number;
  registrationUrl?: string;
  images?: EventImage[];
  imageDisplay: 'single' | 'carousel' | 'gallery';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface EventFormProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Event>) => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, isOpen, onClose, onSave }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'conference',
    status: 'draft',
    maxAttendees: undefined,
    registrationUrl: '',
    images: [],
    imageDisplay: 'single',
    tags: []
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  React.useEffect(() => {
    if (event) {
      setFormData(event);
      setTags(event.tags || []);
    } else {
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        type: 'conference',
        status: 'draft',
        maxAttendees: undefined,
        registrationUrl: '',
        images: [],
        imageDisplay: 'single',
        tags: []
      });
      setTags([]);
    }
  }, [event, isOpen]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const newTags = [...tags, newTag.trim()];
      setTags(newTags);
      setFormData(prev => ({ ...prev, tags: newTags }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const handleImagesChange = (images: EventImage[]) => {
    setFormData(prev => ({ ...prev, images }));
  };

  const handleImageDisplayChange = (imageDisplay: 'single' | 'carousel' | 'gallery') => {
    setFormData(prev => ({ ...prev, imageDisplay }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {event ? t('admin.events.editTitle') : t('admin.events.addTitle')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">{t('admin.events.form.title')} *</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder={t('admin.events.form.titlePlaceholder')}
                required
              />
            </div>

            <div>
              <Label htmlFor="type">{t('admin.events.form.type')} *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conference">{t('admin.events.form.types.conference')}</SelectItem>
                  <SelectItem value="workshop">{t('admin.events.form.types.workshop')}</SelectItem>
                  <SelectItem value="webinar">{t('admin.events.form.types.webinar')}</SelectItem>
                  <SelectItem value="training">{t('admin.events.form.types.training')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date">{t('admin.events.form.date')} *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date || ''}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="time">{t('admin.events.form.time')} *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time || ''}
                onChange={(e) => handleInputChange('time', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">{t('admin.events.form.location')} *</Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder={t('admin.events.form.locationPlaceholder')}
                required
              />
            </div>

            <div>
              <Label htmlFor="status">{t('admin.events.form.status')} *</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">{t('admin.events.form.statuses.draft')}</SelectItem>
                  <SelectItem value="published">{t('admin.events.form.statuses.published')}</SelectItem>
                  <SelectItem value="cancelled">{t('admin.events.form.statuses.cancelled')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="maxAttendees">{t('admin.events.form.maxAttendees')}</Label>
              <Input
                id="maxAttendees"
                type="number"
                value={formData.maxAttendees || ''}
                onChange={(e) => handleInputChange('maxAttendees', parseInt(e.target.value) || undefined)}
                placeholder={t('admin.events.form.maxAttendeesPlaceholder')}
              />
            </div>

            <div>
              <Label htmlFor="registrationUrl">{t('admin.events.form.registrationUrl')}</Label>
              <Input
                id="registrationUrl"
                value={formData.registrationUrl || ''}
                onChange={(e) => handleInputChange('registrationUrl', e.target.value)}
                placeholder={t('admin.events.form.registrationUrlPlaceholder')}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">{t('admin.events.form.description')} *</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder={t('admin.events.form.descriptionPlaceholder')}
              rows={4}
              required
            />
          </div>

          {/* Image Management */}
          <div>
            <EventImageManager
              images={formData.images || []}
              onImagesChange={handleImagesChange}
              imageDisplay={formData.imageDisplay || 'single'}
              onDisplayChange={handleImageDisplayChange}
            />
          </div>

          {/* Tags */}
          <div>
            <Label>{t('admin.events.form.tags')}</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder={t('admin.events.form.addTag')}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                {t('admin.events.form.addTag')}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('admin.actions.cancel')}
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              {event ? t('admin.actions.update') : t('admin.actions.create')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
