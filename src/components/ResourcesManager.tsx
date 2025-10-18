import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Download, ExternalLink } from 'lucide-react';
import ContentManager, { ContentItem } from '../components/ContentManager';
import ContentForm from '../components/ContentForm';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface Resource extends ContentItem {
  type: 'document' | 'guide' | 'template' | 'report';
  fileUrl?: string;
  fileSize?: string;
  downloadCount?: number;
  language: string;
}

const ResourcesManager: React.FC = () => {
  const { t } = useTranslation();
  const [resources, setResources] = useState<Resource[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  useEffect(() => {
    // Load resources from localStorage or API
    const savedResources = localStorage.getItem('admin_resources');
    if (savedResources) {
      setResources(JSON.parse(savedResources));
    } else {
      // Mock data
      const mockResources: Resource[] = [
        {
          id: '1',
          title: 'Guide de Certification LEED',
          description: 'Guide complet pour la certification LEED en Tunisie',
          type: 'guide',
          status: 'published',
          category: 'Certification',
          language: 'fr',
          tags: ['LEED', 'Certification', 'Guide'],
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
          fileUrl: '/resources/guide-leed.pdf',
          fileSize: '2.5 MB',
          downloadCount: 156
        },
        {
          id: '2',
          title: 'Template Rapport Énergétique',
          description: 'Modèle de rapport pour les audits énergétiques',
          type: 'template',
          status: 'published',
          category: 'Audit',
          language: 'fr',
          tags: ['Audit', 'Énergie', 'Template'],
          createdAt: '2024-01-10T14:30:00Z',
          updatedAt: '2024-01-10T14:30:00Z',
          fileUrl: '/resources/template-audit.docx',
          fileSize: '1.2 MB',
          downloadCount: 89
        }
      ];
      setResources(mockResources);
    }
  }, []);

  const saveResources = (newResources: Resource[]) => {
    setResources(newResources);
    localStorage.setItem('admin_resources', JSON.stringify(newResources));
  };

  const handleAdd = () => {
    setEditingResource(null);
    setIsFormOpen(true);
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setIsFormOpen(true);
  };

  const handleDelete = (resource: Resource) => {
    const newResources = resources.filter(r => r.id !== resource.id);
    saveResources(newResources);
  };

  const handleView = (resource: Resource) => {
    if (resource.fileUrl) {
      window.open(resource.fileUrl, '_blank');
    }
  };

  const handleSave = (data: Partial<Resource>) => {
    if (editingResource) {
      // Update existing resource
      const newResources = resources.map(r => 
        r.id === editingResource.id ? { ...r, ...data } : r
      );
      saveResources(newResources);
    } else {
      // Add new resource
      const newResource: Resource = {
        ...data as Resource,
        id: `resource_${Date.now()}`,
        downloadCount: 0
      };
      saveResources([...resources, newResource]);
    }
    setIsFormOpen(false);
    setEditingResource(null);
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      document: '📄',
      guide: '📖',
      template: '📋',
      report: '📊'
    };
    return icons[type as keyof typeof icons] || '📄';
  };

  const getTypeLabel = (type: string) => {
    return t(`admin.resources.types.${type}`);
  };

  const columns = [
    {
      key: 'title',
      label: t('admin.resources.columns.title'),
      render: (resource: Resource) => (
        <div className="flex items-center gap-3">
          <span className="text-lg">{getTypeIcon(resource.type)}</span>
          <div>
            <div className="font-medium">{resource.title}</div>
            <div className="text-sm text-gray-500">{resource.description}</div>
          </div>
        </div>
      )
    },
    {
      key: 'type',
      label: t('admin.resources.columns.type'),
      render: (resource: Resource) => (
        <Badge variant="outline">{getTypeLabel(resource.type)}</Badge>
      )
    },
    {
      key: 'downloads',
      label: t('admin.resources.columns.downloads'),
      render: (resource: Resource) => (
        <div className="text-sm">
          <div className="font-medium">{resource.downloadCount || 0}</div>
          <div className="text-gray-500">{resource.fileSize}</div>
        </div>
      )
    }
  ];

  const formFields = [
    {
      key: 'title',
      label: t('admin.resources.form.title'),
      type: 'text' as const,
      required: true,
      placeholder: t('admin.resources.form.titlePlaceholder')
    },
    {
      key: 'description',
      label: t('admin.resources.form.description'),
      type: 'textarea' as const,
      required: true,
      placeholder: t('admin.resources.form.descriptionPlaceholder')
    },
    {
      key: 'type',
      label: t('admin.resources.form.type'),
      type: 'select' as const,
      required: true,
      options: [
        { value: 'document', label: t('admin.resources.types.document') },
        { value: 'guide', label: t('admin.resources.types.guide') },
        { value: 'template', label: t('admin.resources.types.template') },
        { value: 'report', label: t('admin.resources.types.report') }
      ]
    },
    {
      key: 'category',
      label: t('admin.resources.form.category'),
      type: 'text' as const,
      placeholder: t('admin.resources.form.categoryPlaceholder')
    },
    {
      key: 'language',
      label: t('admin.resources.form.language'),
      type: 'select' as const,
      required: true,
      options: [
        { value: 'fr', label: 'Français' },
        { value: 'en', label: 'English' },
        { value: 'ar', label: 'العربية' }
      ]
    },
    {
      key: 'fileUrl',
      label: t('admin.resources.form.fileUrl'),
      type: 'text' as const,
      placeholder: t('admin.resources.form.fileUrlPlaceholder')
    },
    {
      key: 'fileSize',
      label: t('admin.resources.form.fileSize'),
      type: 'text' as const,
      placeholder: 'e.g., 2.5 MB'
    },
    {
      key: 'status',
      label: t('admin.resources.form.status'),
      type: 'select' as const,
      required: true,
      options: [
        { value: 'published', label: t('admin.status.published') },
        { value: 'draft', label: t('admin.status.draft') },
        { value: 'archived', label: t('admin.status.archived') }
      ]
    },
    {
      key: 'tags',
      label: t('admin.resources.form.tags'),
      type: 'tags' as const,
      placeholder: t('admin.resources.form.tagsPlaceholder')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.resources.stats.total')}
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.resources.stats.published')}
            </CardTitle>
            <Badge variant="default" className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resources.filter(r => r.status === 'published').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.resources.stats.drafts')}
            </CardTitle>
            <Badge variant="secondary" className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resources.filter(r => r.status === 'draft').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.resources.stats.downloads')}
            </CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resources.reduce((sum, r) => sum + (r.downloadCount || 0), 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Manager */}
      <ContentManager
        title={t('admin.resources.title')}
        items={resources}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        columns={columns}
        searchPlaceholder={t('admin.resources.searchPlaceholder')}
      />

      {/* Form Dialog */}
      <ContentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingResource(null);
        }}
        onSave={handleSave}
        item={editingResource}
        title={editingResource ? t('admin.resources.editTitle') : t('admin.resources.addTitle')}
        fields={formFields}
      />
    </div>
  );
};

export default ResourcesManager;
