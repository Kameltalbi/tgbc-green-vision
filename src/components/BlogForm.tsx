import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Save } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import ImageManager from '../components/ImageManager';

interface BlogImage {
  id: string;
  url: string;
  alt: string;
  position: 'start' | 'middle' | 'end';
  caption?: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  featuredImage?: string;
  category: string;
  language: string;
  status: 'published' | 'draft' | 'archived';
  seoTitle?: string;
  seoDescription?: string;
  tags: string[];
  images?: BlogImage[];
  createdAt: string;
  updatedAt: string;
}

interface BlogFormProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BlogPost>) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ post, isOpen, onClose, onSave }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    featuredImage: '',
    category: '',
    language: 'fr',
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
    tags: [],
    images: []
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  React.useEffect(() => {
    if (post) {
      setFormData(post);
      setTags(post.tags || []);
    } else {
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        featuredImage: '',
        category: '',
        language: 'fr',
        status: 'draft',
        seoTitle: '',
        seoDescription: '',
        tags: [],
        images: []
      });
      setTags([]);
    }
  }, [post, isOpen]);

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

  const handleImagesChange = (images: BlogImage[]) => {
    setFormData(prev => ({ ...prev, images }));
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
            {post ? t('admin.blog.editTitle') : t('admin.blog.addTitle')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">{t('admin.blog.form.title')} *</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder={t('admin.blog.form.titlePlaceholder')}
                required
              />
            </div>

            <div>
              <Label htmlFor="author">{t('admin.blog.form.author')} *</Label>
              <Input
                id="author"
                value={formData.author || ''}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder={t('admin.blog.form.authorPlaceholder')}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">{t('admin.blog.form.category')}</Label>
              <Input
                id="category"
                value={formData.category || ''}
                onChange={(e) => handleInputChange('category', e.target.value)}
                placeholder={t('admin.blog.form.categoryPlaceholder')}
              />
            </div>

            <div>
              <Label htmlFor="language">{t('admin.blog.form.language')} *</Label>
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
              <Label htmlFor="status">{t('admin.blog.form.status')} *</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">{t('admin.status.draft')}</SelectItem>
                  <SelectItem value="published">{t('admin.status.published')}</SelectItem>
                  <SelectItem value="archived">{t('admin.status.archived')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="featuredImage">{t('admin.blog.form.featuredImage')}</Label>
              <Input
                id="featuredImage"
                value={formData.featuredImage || ''}
                onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                placeholder={t('admin.blog.form.featuredImagePlaceholder')}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="excerpt">{t('admin.blog.form.excerpt')} *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt || ''}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              placeholder={t('admin.blog.form.excerptPlaceholder')}
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="content">{t('admin.blog.form.content')} *</Label>
            <Textarea
              id="content"
              value={formData.content || ''}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder={t('admin.blog.form.contentPlaceholder')}
              rows={8}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="seoTitle">{t('admin.blog.form.seoTitle')}</Label>
              <Input
                id="seoTitle"
                value={formData.seoTitle || ''}
                onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                placeholder={t('admin.blog.form.seoTitlePlaceholder')}
              />
            </div>

            <div>
              <Label htmlFor="seoDescription">{t('admin.blog.form.seoDescription')}</Label>
              <Textarea
                id="seoDescription"
                value={formData.seoDescription || ''}
                onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                placeholder={t('admin.blog.form.seoDescriptionPlaceholder')}
                rows={2}
              />
            </div>
          </div>

          {/* Image Management */}
          <div>
            <ImageManager
              images={formData.images || []}
              onImagesChange={handleImagesChange}
            />
          </div>

          {/* Tags */}
          <div>
            <Label>{t('admin.blog.form.tags')}</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder={t('admin.blog.form.addTag')}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                {t('admin.blog.form.addTag')}
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
              {post ? t('admin.actions.update') : t('admin.actions.create')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogForm;
