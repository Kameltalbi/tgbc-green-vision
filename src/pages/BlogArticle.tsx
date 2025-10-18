import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { blogPosts, BlogPost } from '../data/blogPosts';
import { ArrowLeft, Calendar, User, Eye, Heart, MessageCircle, Share2, Tag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';

const BlogArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Get current language
  const currentLanguage = i18n.language as 'fr' | 'en' | 'ar';

  useEffect(() => {
    // Simuler un chargement
    setTimeout(() => {
      const foundArticle = blogPosts.find(article => article.id === id);
      setArticle(foundArticle || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">{t('blog.article.loading')}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('blog.article.articleNotFound')}</h1>
          <p className="text-gray-600 mb-6">{t('blog.article.articleNotFoundDescription')}</p>
            <Button onClick={() => navigate('/blog')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('blog.article.backToBlog')}
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/blog')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('blog.article.backToBlog')}
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                {t('blog.article.share')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {article.category[currentLanguage] || article.category.fr}
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {article.title[currentLanguage] || article.title.fr}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {article.excerpt[currentLanguage] || article.excerpt.fr}
            </p>
            
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author[currentLanguage] || article.author.fr}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{article.views} {t('blog.article.views')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>{article.likes} {t('blog.article.likes')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>{article.comments} {t('blog.article.comments')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{article.readTime} {t('blog.article.readTime')}</span>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {(article.tags[currentLanguage] || article.tags.fr)?.map((tag, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={article.featuredImage}
              alt={article.title[currentLanguage] || article.title.fr}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Article Content */}
          <Card className="p-6 sm:p-8 lg:p-10">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: article.content[currentLanguage] || article.content.fr }}
            />
          </Card>

          {/* Article Footer */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                {t('blog.article.like')} ({article.likes})
              </Button>
              <Button variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                {t('blog.article.comment')} ({article.comments})
              </Button>
            </div>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              {t('blog.article.share')}
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogArticle;
