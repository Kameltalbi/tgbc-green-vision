import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Save, Upload, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { ContentItem } from './ContentManager';
import ImageManager from './ImageManager';

interface ContentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<ContentItem>) => void;
  item?: ContentItem | null;
  title: string;
  fields: Array<{
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'date' | 'tags';
    required?: boolean;
    options?: Array<{ value: string; label: string }>;
    placeholder?: string;
  }>;
}

const ContentForm: React.FC<ContentFormProps> = ({
  isOpen,
  onClose,
  onSave,
  item,
  title,
  fields
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<ContentItem>>({});
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (item) {
      setFormData(item);
      setTags(item.tags || []);
    } else {
      setFormData({
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setTags([]);
    }
  }, [item, isOpen]);

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleSave = () => {
    const dataToSave = {
      ...formData,
      tags,
      id: item?.id || `item_${Date.now()}`,
      createdAt: item?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onSave(dataToSave);
    onClose();
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const renderField = (field: any) => {
    const value = formData[field.key] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="resize-none"
          />
        );

      case 'select':
        return (
          <Select value={value} onValueChange={(val) => handleInputChange(field.key, val)}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'date':
        return (
          <Input
            type="datetime-local"
            value={value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
          />
        );

      case 'tags':
        return (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder={field.placeholder || t('admin.form.addTag')}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-500" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        );

      case 'images':
        return (
          <ImageManager
            images={formData.images || []}
            onImagesChange={(images) => handleInputChange(field.key, images)}
          />
        );

      default:
        return (
          <Input
            value={value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {title}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key} className="text-sm font-medium">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {renderField(field)}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            {t('admin.actions.cancel')}
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {item ? t('admin.actions.update') : t('admin.actions.create')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentForm;
