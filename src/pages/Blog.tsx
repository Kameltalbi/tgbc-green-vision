import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { blogPosts, BlogPost } from '../data/blogPosts';
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

const Blog: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    // Use multilingual blog posts data
    setPosts(blogPosts);
    setFilteredPosts(blogPosts);
  }, []);

  // Get current language
  const currentLanguage = i18n.language as 'fr' | 'en' | 'ar';

  // Filter and search posts
  useEffect(() => {
    let filtered = posts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title[currentLanguage]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt[currentLanguage]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author[currentLanguage]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags[currentLanguage]?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || 
        post.category[currentLanguage] === selectedCategory;

      const matchesTag = selectedTag === 'all' || 
        post.tags[currentLanguage]?.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'mostViewed':
          return b.views - a.views;
        case 'mostLiked':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory, selectedTag, sortBy, currentLanguage]);

  // Get unique categories and tags
  const categories = Array.from(new Set(posts.map(post => post.category[currentLanguage]).filter(Boolean)));
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags[currentLanguage] || [])));

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Innovation': 'bg-blue-100 text-blue-800',
      'Certification': 'bg-green-100 text-green-800',
      'Matériaux': 'bg-purple-100 text-purple-800',
      'Énergie': 'bg-orange-100 text-orange-800',
      'Technologie': 'bg-pink-100 text-pink-800',
      // English translations
      'Materials': 'bg-purple-100 text-purple-800',
      'Energy': 'bg-orange-100 text-orange-800',
      'Technology': 'bg-pink-100 text-pink-800',
      // Arabic translations
      'الابتكار': 'bg-blue-100 text-blue-800',
      'الشهادة': 'bg-green-100 text-green-800',
      'المواد': 'bg-purple-100 text-purple-800',
      'الطاقة': 'bg-orange-100 text-orange-800',
      'التقنية': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Header */}
      <section className="bg-gradient-primary text-white py-16 sm:py-20 lg:py-24 mt-18 sm:mt-20 lg:mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 sm:h-10 sm:w-10" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                {t('blog.title')}
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('blog.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder={t('blog.filterByCategory')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('blog.allCategories')}</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Tag Filter */}
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder={t('blog.filterByTag')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('blog.allTags')}</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder={t('blog.sortBy')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t('blog.sortOptions.newest')}</SelectItem>
                  <SelectItem value="oldest">{t('blog.sortOptions.oldest')}</SelectItem>
                  <SelectItem value="mostViewed">{t('blog.sortOptions.mostViewed')}</SelectItem>
                  <SelectItem value="mostLiked">{t('blog.sortOptions.mostLiked')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('blog.noPosts')}
              </h3>
              <p className="text-gray-600">
                {t('blog.noPostsDescription')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="p-0">
                    {/* Featured Image */}
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={post.featuredImage}
                        alt={post.title[currentLanguage] || post.title.fr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={getCategoryColor(post.category[currentLanguage] || post.category.fr)}>
                          {post.category[currentLanguage] || post.category.fr}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title[currentLanguage] || post.title.fr}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 line-clamp-3">
                        {post.excerpt[currentLanguage] || post.excerpt.fr}
                      </p>

                      {/* Author and Date */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{post.author[currentLanguage] || post.author.fr}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime} min</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {(post.tags[currentLanguage] || post.tags.fr)?.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        {(post.tags[currentLanguage] || post.tags.fr)?.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{(post.tags[currentLanguage] || post.tags.fr)?.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm text-gray-500">
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
                      <Link to={`/blog/${post.id}`}>
                        <Button variant="outline" className="w-full group">
                          {t('blog.readMore')}
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('blog.newsletter.title')}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t('blog.newsletter.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('blog.newsletter.emailPlaceholder')}
                className="flex-1"
              />
              <Button variant="secondary" className="whitespace-nowrap">
                {t('blog.newsletter.subscribe')}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;