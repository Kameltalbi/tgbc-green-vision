import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, 
  Calendar, 
  User, 
  Eye, 
  MessageSquare, 
  ThumbsUp,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Tag
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

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
  images?: Array<{
    id: string;
    url: string;
    alt: string;
    position: 'start' | 'middle' | 'end';
    caption?: string;
  }>;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    // Mock data for blog posts
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'L\'Avenir de la Construction Durable en Tunisie',
        excerpt: 'Découvrez les tendances et innovations qui façonnent l\'avenir de la construction durable en Tunisie.',
        content: 'Contenu complet de l\'article...',
        author: 'Dr. Ahmed Ben Ali',
        featuredImage: '/images/blog/construction-durable-tunisie.jpg',
        category: 'Innovation',
        language: 'fr',
        status: 'published',
        tags: ['Construction', 'Durable', 'Innovation', 'Tunisie'],
        views: 1245,
        likes: 89,
        comments: 23,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        title: 'Guide Pratique : Certification LEED en Tunisie',
        excerpt: 'Un guide complet pour comprendre et obtenir la certification LEED dans le contexte tunisien.',
        content: 'Contenu complet de l\'article...',
        author: 'Ing. Fatma Mansouri',
        featuredImage: '/images/blog/certification-leed.jpg',
        category: 'Certification',
        language: 'fr',
        status: 'published',
        tags: ['LEED', 'Certification', 'Guide', 'Pratique'],
        views: 892,
        likes: 67,
        comments: 18,
        createdAt: '2024-01-10T14:30:00Z',
        updatedAt: '2024-01-10T14:30:00Z'
      },
      {
        id: '3',
        title: 'Matériaux Durables : Tendances 2024',
        excerpt: 'Explorez les nouveaux matériaux durables qui révolutionnent l\'industrie de la construction.',
        content: 'Contenu complet de l\'article...',
        author: 'Arch. Mohamed Khelil',
        featuredImage: '/images/blog/materiaux-durables.jpg',
        category: 'Matériaux',
        language: 'fr',
        status: 'published',
        tags: ['Matériaux', 'Durable', 'Innovation', '2024'],
        views: 678,
        likes: 45,
        comments: 12,
        createdAt: '2024-01-05T09:15:00Z',
        updatedAt: '2024-01-05T09:15:00Z'
      },
      {
        id: '4',
        title: 'Économie Circulaire dans le Bâtiment',
        excerpt: 'Comment l\'économie circulaire transforme-t-elle l\'industrie du bâtiment ?',
        content: 'Contenu complet de l\'article...',
        author: 'Dr. Salma Trabelsi',
        featuredImage: '/images/blog/economie-circulaire.jpg',
        category: 'Économie',
        language: 'fr',
        status: 'published',
        tags: ['Économie Circulaire', 'Bâtiment', 'Développement Durable'],
        views: 534,
        likes: 38,
        comments: 8,
        createdAt: '2024-01-01T16:45:00Z',
        updatedAt: '2024-01-01T16:45:00Z'
      },
      {
        id: '5',
        title: 'Technologies Vertes : Solutions Innovantes',
        excerpt: 'Les dernières technologies vertes qui révolutionnent la construction durable.',
        content: 'Contenu complet de l\'article...',
        author: 'Ing. Youssef Hammami',
        featuredImage: '/images/blog/technologies-vertes.jpg',
        category: 'Technologie',
        language: 'fr',
        status: 'published',
        tags: ['Technologie', 'Vert', 'Innovation', 'Solutions'],
        views: 456,
        likes: 32,
        comments: 6,
        createdAt: '2023-12-28T11:20:00Z',
        updatedAt: '2023-12-28T11:20:00Z'
      }
    ];
    setPosts(mockPosts);
    setFilteredPosts(mockPosts);
  }, []);

  useEffect(() => {
    let filtered = posts.filter(post => post.status === 'published');

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    // Sort posts
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'mostViewed':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'mostLiked':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory, selectedTag, sortBy]);

  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category)))];
  const tags = ['all', ...Array.from(new Set(posts.flatMap(post => post.tags)))];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Innovation': 'bg-blue-100 text-blue-800',
      'Certification': 'bg-green-100 text-green-800',
      'Matériaux': 'bg-purple-100 text-purple-800',
      'Économie': 'bg-orange-100 text-orange-800',
      'Technologie': 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-primary text-white py-16 sm:py-20 lg:py-24 mt-18 sm:mt-20 lg:mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 sm:h-10 sm:w-10" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                {t('admin.admin.blog.public.public.title')}
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
              {t('admin.admin.blog.public.public.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('admin.admin.blog.public.public.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder={t('admin.blog.public.filterByCategory')} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? t('admin.blog.public.allCategories') : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Tag Filter */}
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder={t('admin.blog.public.filterByTag')} />
                </SelectTrigger>
                <SelectContent>
                  {tags.map(tag => (
                    <SelectItem key={tag} value={tag}>
                      {tag === 'all' ? t('admin.blog.public.allTags') : tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t('admin.blog.public.sortBy')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t('admin.blog.public.sortOptions.newest')}</SelectItem>
                <SelectItem value="oldest">{t('admin.blog.public.sortOptions.oldest')}</SelectItem>
                <SelectItem value="mostViewed">{t('admin.blog.public.sortOptions.mostViewed')}</SelectItem>
                <SelectItem value="mostLiked">{t('admin.blog.public.sortOptions.mostLiked')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {t('admin.blog.public.noPosts')}
              </h3>
              <p className="text-gray-500">
                {t('admin.blog.public.noPostsDescription')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {post.featuredImage && (
                    <div className="aspect-video bg-gray-200">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg sm:text-xl line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Author and Date */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.createdAt)}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {post.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {post.comments}
                        </div>
                      </div>

                      {/* Read More Button */}
                      <Button variant="outline" className="w-full group">
                        {t('admin.blog.public.readMore')}
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 sm:py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              {t('admin.blog.public.newsletter.title')}
            </h2>
            <p className="text-lg text-white/90 mb-6">
              {t('admin.blog.public.newsletter.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder={t('admin.blog.public.newsletter.emailPlaceholder')}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button variant="secondary" className="whitespace-nowrap">
                {t('admin.blog.public.newsletter.subscribe')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
