import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, X, Image as ImageIcon, Upload, Edit, Trash2, MoveUp, MoveDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

interface EventImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  position: number;
  caption?: string;
}

interface EventImageManagerProps {
  images: EventImage[];
  onImagesChange: (images: EventImage[]) => void;
  imageDisplay: 'single' | 'carousel' | 'gallery';
  onDisplayChange: (display: 'single' | 'carousel' | 'gallery') => void;
}

const EventImageManager: React.FC<EventImageManagerProps> = ({ 
  images, 
  onImagesChange, 
  imageDisplay, 
  onDisplayChange 
}) => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<EventImage | null>(null);
  const [formData, setFormData] = useState({
    url: '',
    alt: '',
    width: 1200,
    height: 800,
    caption: ''
  });

  const handleAddImage = () => {
    setEditingImage(null);
    setFormData({
      url: '',
      alt: '',
      width: 1200,
      height: 800,
      caption: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditImage = (image: EventImage) => {
    setEditingImage(image);
    setFormData({
      url: image.url,
      alt: image.alt,
      width: image.width,
      height: image.height,
      caption: image.caption || ''
    });
    setIsDialogOpen(true);
  };

  const handleDeleteImage = (imageId: string) => {
    const newImages = images.filter(img => img.id !== imageId);
    onImagesChange(newImages);
  };

  const handleMoveImage = (imageId: string, direction: 'up' | 'down') => {
    const currentIndex = images.findIndex(img => img.id === imageId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= images.length) return;

    const newImages = [...images];
    [newImages[currentIndex], newImages[newIndex]] = [newImages[newIndex], newImages[currentIndex]];
    
    // Update positions
    newImages.forEach((img, index) => {
      img.position = index + 1;
    });
    
    onImagesChange(newImages);
  };

  const handleSaveImage = () => {
    if (!formData.url || !formData.alt) return;

    const imageData: EventImage = {
      id: editingImage?.id || `img_${Date.now()}`,
      url: formData.url,
      alt: formData.alt,
      width: formData.width,
      height: formData.height,
      position: editingImage?.position || images.length + 1,
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

  const getDisplayLabel = (display: string) => {
    const labels = {
      single: t('admin.events.imageDisplay.single'),
      carousel: t('admin.events.imageDisplay.carousel'),
      gallery: t('admin.events.imageDisplay.gallery')
    };
    return labels[display as keyof typeof labels] || display;
  };

  const getDisplayDescription = (display: string) => {
    const descriptions = {
      single: t('admin.events.imageDisplay.singleDescription'),
      carousel: t('admin.events.imageDisplay.carouselDescription'),
      gallery: t('admin.events.imageDisplay.galleryDescription')
    };
    return descriptions[display as keyof typeof descriptions] || '';
  };

  return (
    <div className="space-y-4">
      {/* Display Mode Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {t('admin.events.imageDisplay.title')}
        </Label>
        <Select value={imageDisplay} onValueChange={onDisplayChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">
              <div>
                <div className="font-medium">{getDisplayLabel('single')}</div>
                <div className="text-xs text-gray-500">{getDisplayDescription('single')}</div>
              </div>
            </SelectItem>
            <SelectItem value="carousel">
              <div>
                <div className="font-medium">{getDisplayLabel('carousel')}</div>
                <div className="text-xs text-gray-500">{getDisplayDescription('carousel')}</div>
              </div>
            </SelectItem>
            <SelectItem value="gallery">
              <div>
                <div className="font-medium">{getDisplayLabel('gallery')}</div>
                <div className="text-xs text-gray-500">{getDisplayDescription('gallery')}</div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Image Management */}
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          {t('admin.events.images.title')} ({images.length})
        </Label>
        <Button type="button" onClick={handleAddImage} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          {t('admin.events.images.add')}
        </Button>
      </div>

      {images.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center">
            <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('admin.events.images.noImages')}
            </h3>
            <p className="text-gray-500 mb-4">
              {t('admin.events.images.noImagesDescription')}
            </p>
            <Button onClick={handleAddImage}>
              <Plus className="h-4 w-4 mr-2" />
              {t('admin.events.images.addFirst')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {images
            .sort((a, b) => a.position - b.position)
            .map((image, index) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="flex">
                <div className="w-32 h-24 bg-gray-100 relative flex-shrink-0">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute top-1 right-1">
                    <Badge variant="outline" className="text-xs">
                      #{image.position}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1 line-clamp-1">
                        {image.alt}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span>{image.width} × {image.height}px</span>
                        {image.caption && (
                          <>
                            <span>•</span>
                            <span className="line-clamp-1">{image.caption}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMoveImage(image.id, 'up')}
                          disabled={index === 0}
                          className="h-6 px-2"
                        >
                          <MoveUp className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMoveImage(image.id, 'down')}
                          disabled={index === images.length - 1}
                          className="h-6 px-2"
                        >
                          <MoveDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditImage(image)}
                      >
                        <Edit className="h-3 w-3" />
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
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Image Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingImage ? t('admin.events.images.edit') : t('admin.events.images.add')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="image-url">{t('admin.events.images.url')}</Label>
              <Input
                id="image-url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder={t('admin.events.images.urlPlaceholder')}
              />
            </div>

            <div>
              <Label htmlFor="image-alt">{t('admin.events.images.alt')}</Label>
              <Input
                id="image-alt"
                value={formData.alt}
                onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                placeholder={t('admin.events.images.altPlaceholder')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="image-width">{t('admin.events.images.width')}</Label>
                <Input
                  id="image-width"
                  type="number"
                  value={formData.width}
                  onChange={(e) => setFormData({ ...formData, width: parseInt(e.target.value) || 1200 })}
                  placeholder="1200"
                />
              </div>
              <div>
                <Label htmlFor="image-height">{t('admin.events.images.height')}</Label>
                <Input
                  id="image-height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 800 })}
                  placeholder="800"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image-caption">{t('admin.events.images.caption')}</Label>
              <Textarea
                id="image-caption"
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                placeholder={t('admin.events.images.captionPlaceholder')}
                rows={2}
              />
            </div>

            {formData.url && (
              <div>
                <Label>{t('admin.events.images.preview')}</Label>
                <div className="mt-2 border rounded-lg p-4">
                  <img
                    src={formData.url}
                    alt={formData.alt || 'Preview'}
                    className="max-w-full h-32 object-cover rounded"
                    style={{ 
                      width: `${Math.min(formData.width, 300)}px`,
                      height: `${Math.min(formData.height, 200)}px`
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <div className="mt-2 text-xs text-gray-500">
                    {formData.width} × {formData.height}px
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

export default EventImageManager;
