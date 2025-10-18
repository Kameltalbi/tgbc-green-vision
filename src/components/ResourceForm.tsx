import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Save } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import ResourceImageManager from '../components/ResourceImageManager';

interface ResourceImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  position: number;
  caption?: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'guide' | 'template' | 'report';
  category: string;
  language: string;
  fileUrl?: string;
  fileSize?: string;
  downloadCount?: number;
  images?: ResourceImage[];
  imageDisplay: 'single' | 'carousel' | 'gallery';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ResourceFormProps {
  resource: Resource | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Resource>) => void;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ resource, isOpen, onClose, onSave }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<Resource>>({
    title: '',
    description: '',
    type: 'document',
    category: '',
    language: 'fr',
    fileUrl: '',
    fileSize: '',
    images: [],
    imageDisplay: 'single',
    tags: []
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  React.useEffect(() => {
    if (resource) {
      setFormData(resource);
      setTags(resource.tags || []);
    } else {
      setFormData({
        title: '',
        description: '',
        type: 'document',
        category: '',
        language: 'fr',
        fileUrl: '',
        fileSize: '',
        images: [],
        imageDisplay: 'single',
        tags: []
      });
      setTags([]);
    }
  }, [resource, isOpen]);

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

  const handleImagesChange = (images: ResourceImage[]) => {
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
            {resource ? t('admin.resources.editTitle') : t('admin.resources.addTitle')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">{t('admin.resources.form.title')} *</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder={t('admin.resources.form.titlePlaceholder')}
                required
              />
            </div>

            <div>
              <Label htmlFor="type">{t('admin.resources.form.type')} *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document">{t('admin.resources.form.types.document')}</SelectItem>
                  <SelectItem value="guide">{t('admin.resources.form.types.guide')}</SelectItem>
                  <SelectItem value="template">{t('admin.resources.form.types.template')}</SelectItem>
                  <SelectItem value="report">{t('admin.resources.form.types.report')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">{t('admin.resources.form.category')} *</Label>
              <Input
                id="category"
                value={formData.category || ''}
                onChange={(e) => handleInputChange('category', e.target.value)}
                placeholder={t('admin.resources.form.categoryPlaceholder')}
                required
              />
            </div>

            <div>
              <Label htmlFor="language">{t('admin.resources.form.language')} *</Label>
              <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fileUrl">{t('admin.resources.form.fileUrl')}</Label>
              <Input
                id="fileUrl"
                value={formData.fileUrl || ''}
                onChange={(e) => handleInputChange('fileUrl', e.target.value)}
                placeholder={t('admin.resources.form.fileUrlPlaceholder')}
              />
            </div>

            <div>
              <Label htmlFor="fileSize">{t('admin.resources.form.fileSize')}</Label>
              <Input
                id="fileSize"
                value={formData.fileSize || ''}
                onChange={(e) => handleInputChange('fileSize', e.target.value)}
                placeholder={t('admin.resources.form.fileSizePlaceholder')}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">{t('admin.resources.form.description')} *</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder={t('admin.resources.form.descriptionPlaceholder')}
              rows={4}
              required
            />
          </div>

          {/* Image Management */}
          <div>
            <ResourceImageManager
              images={formData.images || []}
              onImagesChange={handleImagesChange}
              imageDisplay={formData.imageDisplay || 'single'}
              onDisplayChange={handleImageDisplayChange}
            />
          </div>

          {/* Tags */}
          <div>
            <Label>{t('admin.resources.form.tags')}</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder={t('admin.resources.form.addTag')}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                {t('admin.resources.form.addTag')}
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
              {resource ? t('admin.actions.update') : t('admin.actions.create')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceForm;
