import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
  category?: string;
  tags?: string[];
  [key: string]: any;
}

interface ContentManagerProps {
  title: string;
  items: ContentItem[];
  onAdd: () => void;
  onEdit: (item: ContentItem) => void;
  onDelete: (item: ContentItem) => void;
  onView: (item: ContentItem) => void;
  columns: Array<{
    key: string;
    label: string;
    render?: (item: ContentItem) => React.ReactNode;
  }>;
  searchPlaceholder?: string;
}

const ContentManager: React.FC<ContentManagerProps> = ({
  title,
  items,
  onAdd,
  onEdit,
  onDelete,
  onView,
  columns,
  searchPlaceholder
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteDialog, setDeleteDialog] = useState<ContentItem | null>(null);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: t('admin.status.published'), variant: 'default' as const },
      draft: { label: t('admin.status.draft'), variant: 'secondary' as const },
      archived: { label: t('admin.status.archived'), variant: 'outline' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleDelete = () => {
    if (deleteDialog) {
      onDelete(deleteDialog);
      setDeleteDialog(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-1">
            {t('admin.content.totalItems', { count: items.length })}
          </p>
        </div>
        <Button onClick={onAdd} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t('admin.actions.addNew')}
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={searchPlaceholder || t('admin.search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">{t('admin.filter.all')}</option>
                <option value="published">{t('admin.status.published')}</option>
                <option value="draft">{t('admin.status.draft')}</option>
                <option value="archived">{t('admin.status.archived')}</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      <div className="grid gap-4">
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FileText className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('admin.content.noItems')}
              </h3>
              <p className="text-gray-500 mb-4">
                {t('admin.content.noItemsDescription')}
              </p>
              <Button onClick={onAdd}>
                <Plus className="h-4 w-4 mr-2" />
                {t('admin.actions.addFirst')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      {getStatusBadge(item.status)}
                    </div>
                    
                    {item.description && (
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{t('admin.content.created')}: {new Date(item.createdAt).toLocaleDateString()}</span>
                      <span>{t('admin.content.updated')}: {new Date(item.updatedAt).toLocaleDateString()}</span>
                      {item.category && (
                        <Badge variant="outline">{item.category}</Badge>
                      )}
                    </div>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(item)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView(item)}>
                          <Eye className="h-4 w-4 mr-2" />
                          {t('admin.actions.view')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(item)}>
                          <Edit className="h-4 w-4 mr-2" />
                          {t('admin.actions.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setDeleteDialog(item)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {t('admin.actions.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('admin.confirm.deleteTitle')}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">
              {t('admin.confirm.deleteMessage', { title: deleteDialog?.title })}
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteDialog(null)}>
              {t('admin.actions.cancel')}
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {t('admin.actions.delete')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentManager;
