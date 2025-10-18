import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Eye, MessageSquare, ThumbsUp } from 'lucide-react';
import ContentManager, { ContentItem } from '../components/ContentManager';
import ContentForm from '../components/ContentForm';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface BlogPost extends ContentItem {
  content: string;
  excerpt: string;
  author: string;
  featuredImage?: string;
  images?: Array<{
    id: string;
    url: string;
    alt: string;
    position: 'start' | 'middle' | 'end';
    caption?: string;
  }>;
  readTime?: number;
  views?: number;
  likes?: number;
  comments?: number;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
}

const BlogManager: React.FC = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    // Load posts from localStorage or API
    const savedPosts = localStorage.getItem('admin_blog');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Mock data
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'L\'Avenir de la Construction Durable en Tunisie',
          description: 'Exploration des tendances et innovations dans le secteur de la construction durable',
          content: 'Le secteur de la construction durable en Tunisie connaît une transformation majeure...',
          excerpt: 'Exploration des tendances et innovations dans le secteur de la construction durable en Tunisie.',
          author: 'Dr. Ahmed Ben Ali',
          slug: 'avenir-construction-durable-tunisie',
          status: 'published',
          category: 'Innovation',
          language: 'fr',
          tags: ['Construction', 'Durable', 'Innovation', 'Tunisie'],
          featuredImage: '/images/blog/construction-durable.jpg',
          images: [
            {
              id: 'img1',
              url: '/images/blog/construction-durable-hero.jpg',
              alt: 'Bâtiment durable moderne en Tunisie',
              position: 'start',
              caption: 'Exemple de bâtiment durable en Tunisie'
            },
            {
              id: 'img2',
              url: '/images/blog/technologies-vertes.jpg',
              alt: 'Technologies vertes pour le bâtiment',
              position: 'middle',
              caption: 'Nouvelles technologies pour l\'efficacité énergétique'
            },
            {
              id: 'img3',
              url: '/images/blog/futur-construction.jpg',
              alt: 'Vision du futur de la construction',
              position: 'end',
              caption: 'Le futur de la construction durable'
            }
          ],
          readTime: 8,
          views: 1245,
          likes: 89,
          comments: 23,
          seoTitle: 'Avenir Construction Durable Tunisie - TunisiaGBC',
          seoDescription: 'Découvrez les tendances et innovations dans la construction durable en Tunisie',
          createdAt: '2024-01-20T09:00:00Z',
          updatedAt: '2024-01-20T09:00:00Z'
        },
        {
          id: '2',
          title: 'Guide Pratique : Certification LEED en Tunisie',
          description: 'Un guide complet pour comprendre et obtenir la certification LEED',
          content: 'La certification LEED (Leadership in Energy and Environmental Design)...',
          excerpt: 'Guide complet pour comprendre et obtenir la certification LEED en Tunisie.',
          author: 'Ing. Fatma Mansouri',
          slug: 'guide-certification-leed-tunisie',
          status: 'published',
          category: 'Certification',
          language: 'fr',
          tags: ['LEED', 'Certification', 'Guide', 'Pratique'],
          featuredImage: '/images/blog/leed-certification.jpg',
          images: [
            {
              id: 'img4',
              url: '/images/blog/leed-process.jpg',
              alt: 'Processus de certification LEED',
              position: 'start',
              caption: 'Les étapes du processus de certification LEED'
            },
            {
              id: 'img5',
              url: '/images/blog/leed-benefits.jpg',
              alt: 'Avantages de la certification LEED',
              position: 'middle',
              caption: 'Les bénéfices économiques et environnementaux'
            }
          ],
          readTime: 12,
          views: 892,
          likes: 67,
          comments: 15,
          seoTitle: 'Guide Certification LEED Tunisie - TunisiaGBC',
          seoDescription: 'Guide complet pour obtenir la certification LEED en Tunisie',
          createdAt: '2024-01-15T14:30:00Z',
          updatedAt: '2024-01-15T14:30:00Z'
        }
      ];
      setPosts(mockPosts);
    }
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    localStorage.setItem('admin_blog', JSON.stringify(newPosts));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const handleAdd = () => {
    setEditingPost(null);
    setIsFormOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleDelete = (post: BlogPost) => {
    const newPosts = posts.filter(p => p.id !== post.id);
    savePosts(newPosts);
  };

  const handleView = (post: BlogPost) => {
    // Open blog post in new tab
    window.open(`/blog/${post.slug}`, '_blank');
  };

  const handleSave = (data: Partial<BlogPost>) => {
    if (editingPost) {
      // Update existing post
      const newPosts = posts.map(p => 
        p.id === editingPost.id ? { 
          ...p, 
          ...data,
          slug: data.title ? generateSlug(data.title) : p.slug
        } : p
      );
      savePosts(newPosts);
    } else {
      // Add new post
      const newPost: BlogPost = {
        ...data as BlogPost,
        id: `post_${Date.now()}`,
        slug: generateSlug(data.title || ''),
        views: 0,
        likes: 0,
        comments: 0,
        readTime: Math.ceil((data.content?.length || 0) / 200) // Estimate read time
      };
      savePosts([...posts, newPost]);
    }
    setIsFormOpen(false);
    setEditingPost(null);
  };

  const columns = [
    {
      key: 'title',
      label: t('admin.blog.columns.title'),
      render: (post: BlogPost) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-gray-500" />
          </div>
          <div>
            <div className="font-medium">{post.title}</div>
            <div className="text-sm text-gray-500">{post.excerpt}</div>
          </div>
        </div>
      )
    },
    {
      key: 'author',
      label: t('admin.blog.columns.author'),
      render: (post: BlogPost) => (
        <div className="text-sm">
          <div className="font-medium">{post.author}</div>
          <div className="text-gray-500">{post.readTime} min</div>
        </div>
      )
    },
    {
      key: 'stats',
      label: t('admin.blog.columns.stats'),
      render: (post: BlogPost) => (
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4 text-gray-400" />
            {post.views || 0}
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4 text-gray-400" />
            {post.likes || 0}
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4 text-gray-400" />
            {post.comments || 0}
          </div>
        </div>
      )
    }
  ];

  const formFields = [
    {
      key: 'title',
      label: t('admin.blog.form.title'),
      type: 'text' as const,
      required: true,
      placeholder: t('admin.blog.form.titlePlaceholder')
    },
    {
      key: 'excerpt',
      label: t('admin.blog.form.excerpt'),
      type: 'textarea' as const,
      required: true,
      placeholder: t('admin.blog.form.excerptPlaceholder')
    },
    {
      key: 'content',
      label: t('admin.blog.form.content'),
      type: 'textarea' as const,
      required: true,
      placeholder: t('admin.blog.form.contentPlaceholder')
    },
    {
      key: 'author',
      label: t('admin.blog.form.author'),
      type: 'text' as const,
      required: true,
      placeholder: t('admin.blog.form.authorPlaceholder')
    },
    {
      key: 'featuredImage',
      label: t('admin.blog.form.featuredImage'),
      type: 'text' as const,
      placeholder: t('admin.blog.form.featuredImagePlaceholder')
    },
    {
      key: 'category',
      label: t('admin.blog.form.category'),
      type: 'text' as const,
      placeholder: t('admin.blog.form.categoryPlaceholder')
    },
    {
      key: 'language',
      label: t('admin.blog.form.language'),
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
      label: t('admin.blog.form.status'),
      type: 'select' as const,
      required: true,
      options: [
        { value: 'published', label: t('admin.status.published') },
        { value: 'draft', label: t('admin.status.draft') },
        { value: 'archived', label: t('admin.status.archived') }
      ]
    },
    {
      key: 'seoTitle',
      label: t('admin.blog.form.seoTitle'),
      type: 'text' as const,
      placeholder: t('admin.blog.form.seoTitlePlaceholder')
    },
    {
      key: 'seoDescription',
      label: t('admin.blog.form.seoDescription'),
      type: 'textarea' as const,
      placeholder: t('admin.blog.form.seoDescriptionPlaceholder')
    },
    {
      key: 'tags',
      label: t('admin.blog.form.tags'),
      type: 'tags' as const,
      placeholder: t('admin.blog.form.tagsPlaceholder')
    },
    {
      key: 'images',
      label: t('admin.blog.form.images'),
      type: 'images' as const
    }
  ];

  const publishedPosts = posts.filter(p => p.status === 'published');
  const draftPosts = posts.filter(p => p.status === 'draft');
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
  const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.blog.stats.total')}
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.blog.stats.published')}
            </CardTitle>
            <Badge variant="default" className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedPosts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.blog.stats.views')}
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.blog.stats.likes')}
            </CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLikes}</div>
          </CardContent>
        </Card>
      </div>

      {/* Content Manager */}
      <ContentManager
        title={t('admin.blog.title')}
        items={posts}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        columns={columns}
        searchPlaceholder={t('admin.blog.searchPlaceholder')}
      />

      {/* Form Dialog */}
      <ContentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPost(null);
        }}
        onSave={handleSave}
        item={editingPost}
        title={editingPost ? t('admin.blog.editTitle') : t('admin.blog.addTitle')}
        fields={formFields}
      />
    </div>
  );
};

export default BlogManager;
