import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, X, Image as ImageIcon, Upload, Edit, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

interface BlogImage {
  id: string;
  url: string;
  alt: string;
  position: 'start' | 'middle' | 'end';
  caption?: string;
}

interface ImageManagerProps {
  images: BlogImage[];
  onImagesChange: (images: BlogImage[]) => void;
}

const ImageManager: React.FC<ImageManagerProps> = ({ images, onImagesChange }) => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<BlogImage | null>(null);
  const [formData, setFormData] = useState({
    url: '',
    alt: '',
    position: 'middle' as 'start' | 'middle' | 'end',
    caption: ''
  });

  const handleAddImage = () => {
    setEditingImage(null);
    setFormData({
      url: '',
      alt: '',
      position: 'middle',
      caption: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditImage = (image: BlogImage) => {
    setEditingImage(image);
    setFormData({
      url: image.url,
      alt: image.alt,
      position: image.position,
      caption: image.caption || ''
    });
    setIsDialogOpen(true);
  };

  const handleDeleteImage = (imageId: string) => {
    const newImages = images.filter(img => img.id !== imageId);
    onImagesChange(newImages);
  };

  const handleSaveImage = () => {
    if (!formData.url || !formData.alt) return;

    const imageData: BlogImage = {
      id: editingImage?.id || `img_${Date.now()}`,
      url: formData.url,
      alt: formData.alt,
      position: formData.position,
      caption: formData.caption || undefined
    };

    if (editingImage) {
      // Update existing image
      const newImages = images.map(img => 
        img.id === editingImage.id ? imageData : img
      );
      onImagesChange(newImages);
    } else {
      // Add new image
      onImagesChange([...images, imageData]);
    }

    setIsDialogOpen(false);
    setEditingImage(null);
  };

  const getPositionLabel = (position: string) => {
    const labels = {
      start: t('admin.blog.imagePosition.start'),
      middle: t('admin.blog.imagePosition.middle'),
      end: t('admin.blog.imagePosition.end')
    };
    return labels[position as keyof typeof labels] || position;
  };

  const getPositionColor = (position: string) => {
    const colors = {
      start: 'bg-green-100 text-green-800',
      middle: 'bg-blue-100 text-blue-800',
      end: 'bg-purple-100 text-purple-800'
    };
    return colors[position as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          {t('admin.blog.images.title')} ({images.length})
        </Label>
        <Button type="button" onClick={handleAddImage} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          {t('admin.blog.images.add')}
        </Button>
      </div>

      {images.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center">
            <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('admin.blog.images.noImages')}
            </h3>
            <p className="text-gray-500 mb-4">
              {t('admin.blog.images.noImagesDescription')}
            </p>
            <Button onClick={handleAddImage}>
              <Plus className="h-4 w-4 mr-2" />
              {t('admin.blog.images.addFirst')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute top-2 right-2">
                  <Badge className={getPositionColor(image.position)}>
                    {getPositionLabel(image.position)}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-1 line-clamp-2">
                  {image.alt}
                </h4>
                {image.caption && (
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {image.caption}
                  </p>
                )}
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditImage(image)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    {t('admin.actions.edit')}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteImage(image.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Image Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingImage ? t('admin.blog.images.edit') : t('admin.blog.images.add')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="image-url">{t('admin.blog.images.url')}</Label>
              <Input
                id="image-url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder={t('admin.blog.images.urlPlaceholder')}
              />
            </div>

            <div>
              <Label htmlFor="image-alt">{t('admin.blog.images.alt')}</Label>
              <Input
                id="image-alt"
                value={formData.alt}
                onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                placeholder={t('admin.blog.images.altPlaceholder')}
              />
            </div>

            <div>
              <Label htmlFor="image-position">{t('admin.blog.images.position')}</Label>
              <Select 
                value={formData.position} 
                onValueChange={(value: 'start' | 'middle' | 'end') => 
                  setFormData({ ...formData, position: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">{t('admin.blog.imagePosition.start')}</SelectItem>
                  <SelectItem value="middle">{t('admin.blog.imagePosition.middle')}</SelectItem>
                  <SelectItem value="end">{t('admin.blog.imagePosition.end')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="image-caption">{t('admin.blog.images.caption')}</Label>
              <Textarea
                id="image-caption"
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                placeholder={t('admin.blog.images.captionPlaceholder')}
                rows={2}
              />
            </div>

            {formData.url && (
              <div>
                <Label>{t('admin.blog.images.preview')}</Label>
                <div className="mt-2 border rounded-lg p-4">
                  <img
                    src={formData.url}
                    alt={formData.alt || 'Preview'}
                    className="max-w-full h-32 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <div className="mt-2">
                    <Badge className={getPositionColor(formData.position)}>
                      {getPositionLabel(formData.position)}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              {t('admin.actions.cancel')}
            </Button>
            <Button onClick={handleSaveImage}>
              {editingImage ? t('admin.actions.update') : t('admin.actions.create')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageManager;
