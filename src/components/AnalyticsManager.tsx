import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BarChart3, 
  Users, 
  Eye, 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Globe,
  Clock,
  FileText,
  BookOpen,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface AnalyticsData {
  visitors: {
    total: number;
    monthly: number;
    weekly: number;
    daily: number;
    change: number;
  };
  pageViews: {
    total: number;
    monthly: number;
    change: number;
  };
  topPages: Array<{
    title: string;
    views: number;
    url: string;
  }>;
  topResources: Array<{
    title: string;
    downloads: number;
    type: string;
  }>;
  topEvents: Array<{
    title: string;
    registrations: number;
    date: string;
  }>;
  topBlogPosts: Array<{
    title: string;
    views: number;
    likes: number;
    author: string;
  }>;
  geographic: Array<{
    country: string;
    visitors: number;
    percentage: number;
  }>;
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  timeStats: {
    averageSession: string;
    bounceRate: number;
    pagesPerSession: number;
  };
}

const AnalyticsManager: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setData({
        visitors: {
          total: 15420,
          monthly: 3240,
          weekly: 890,
          daily: 156,
          change: 12.5
        },
        pageViews: {
          total: 45680,
          monthly: 12890,
          change: 8.3
        },
        topPages: [
          { title: 'Accueil', views: 8450, url: '/' },
          { title: 'À Propos', views: 3240, url: '/about' },
          { title: 'Événements', views: 2890, url: '/events' },
          { title: 'Ressources', views: 2560, url: '/resources' },
          { title: 'Adhésion', views: 1890, url: '/membership' }
        ],
        topResources: [
          { title: 'Guide Certification LEED', downloads: 456, type: 'PDF' },
          { title: 'Template Rapport Énergétique', downloads: 389, type: 'DOCX' },
          { title: 'Guide Bâtiment Vert', downloads: 312, type: 'PDF' },
          { title: 'Checklist Audit Énergétique', downloads: 278, type: 'PDF' },
          { title: 'Guide Matériaux Durables', downloads: 234, type: 'PDF' }
        ],
        topEvents: [
          { title: 'Conférence Bâtiment Durable 2024', registrations: 156, date: '2024-03-15' },
          { title: 'Formation Certification LEED', registrations: 89, date: '2024-02-20' },
          { title: 'Atelier Économie Circulaire', registrations: 67, date: '2024-01-25' },
          { title: 'Webinaire Technologies Vertes', registrations: 45, date: '2024-01-10' }
        ],
        topBlogPosts: [
          { title: 'L\'Avenir de la Construction Durable en Tunisie', views: 1245, likes: 89, author: 'Dr. Ahmed Ben Ali' },
          { title: 'Guide Pratique : Certification LEED en Tunisie', views: 892, likes: 67, author: 'Ing. Fatma Mansouri' },
          { title: 'Matériaux Durables : Tendances 2024', views: 678, likes: 45, author: 'Arch. Mohamed Khelil' },
          { title: 'Économie Circulaire dans le Bâtiment', views: 534, likes: 38, author: 'Dr. Salma Trabelsi' }
        ],
        geographic: [
          { country: 'Tunisie', visitors: 12450, percentage: 80.7 },
          { country: 'France', visitors: 1234, percentage: 8.0 },
          { country: 'Algérie', visitors: 567, percentage: 3.7 },
          { country: 'Maroc', visitors: 345, percentage: 2.2 },
          { country: 'Autres', visitors: 824, percentage: 5.4 }
        ],
        deviceStats: {
          desktop: 65.2,
          mobile: 28.7,
          tablet: 6.1
        },
        timeStats: {
          averageSession: '3m 42s',
          bounceRate: 34.2,
          pagesPerSession: 2.8
        }
      });
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4 animate-pulse" />
          <p className="text-gray-500">{t('admin.analytics.loading')}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('admin.analytics.title')}</h2>
          <p className="text-gray-600 mt-1">{t('admin.analytics.subtitle')}</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">{t('admin.analytics.last7Days')}</SelectItem>
              <SelectItem value="30d">{t('admin.analytics.last30Days')}</SelectItem>
              <SelectItem value="90d">{t('admin.analytics.last90Days')}</SelectItem>
              <SelectItem value="1y">{t('admin.analytics.lastYear')}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            {t('admin.analytics.export')}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.analytics.totalVisitors')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.visitors.total.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              {getChangeIcon(data.visitors.change)}
              <span className={`ml-1 ${getChangeColor(data.visitors.change)}`}>
                {data.visitors.change > 0 ? '+' : ''}{data.visitors.change}%
              </span>
              <span className="text-muted-foreground ml-1">{t('admin.analytics.vsLastMonth')}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.analytics.pageViews')}</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.pageViews.total.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              {getChangeIcon(data.pageViews.change)}
              <span className={`ml-1 ${getChangeColor(data.pageViews.change)}`}>
                {data.pageViews.change > 0 ? '+' : ''}{data.pageViews.change}%
              </span>
              <span className="text-muted-foreground ml-1">{t('admin.analytics.vsLastMonth')}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.analytics.totalDownloads')}</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.topResources.reduce((sum, res) => sum + res.downloads, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">{t('admin.analytics.resourcesDownloaded')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.analytics.eventRegistrations')}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.topEvents.reduce((sum, event) => sum + event.registrations, 0)}
            </div>
            <p className="text-xs text-muted-foreground">{t('admin.analytics.totalRegistrations')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t('admin.analytics.topPages')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="w-6 h-6 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">{page.title}</p>
                      <p className="text-xs text-gray-500">{page.url}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{page.views.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{t('admin.analytics.views')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('admin.analytics.topResources')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topResources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="w-6 h-6 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">{resource.title}</p>
                      <Badge variant="secondary" className="text-xs">{resource.type}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{resource.downloads}</p>
                    <p className="text-xs text-gray-500">{t('admin.analytics.downloads')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Blog Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {t('admin.analytics.topBlogPosts')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topBlogPosts.map((post, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="w-6 h-6 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-2">{post.title}</p>
                      <p className="text-xs text-gray-500">{post.author}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{post.views}</p>
                    <p className="text-xs text-gray-500">{t('admin.analytics.views')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {t('admin.analytics.geographicDistribution')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.geographic.map((geo, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{geo.country}</span>
                    <span className="text-sm text-gray-500">{geo.visitors.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${geo.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">{geo.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {t('admin.analytics.sessionStats')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">{t('admin.analytics.averageSession')}</p>
                <p className="text-lg font-semibold">{data.timeStats.averageSession}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('admin.analytics.bounceRate')}</p>
                <p className="text-lg font-semibold">{data.timeStats.bounceRate}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('admin.analytics.pagesPerSession')}</p>
                <p className="text-lg font-semibold">{data.timeStats.pagesPerSession}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('admin.analytics.deviceStats')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Desktop</span>
                <span className="text-sm font-medium">{data.deviceStats.desktop}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Mobile</span>
                <span className="text-sm font-medium">{data.deviceStats.mobile}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Tablet</span>
                <span className="text-sm font-medium">{data.deviceStats.tablet}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('admin.analytics.topEvents')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.topEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium line-clamp-1">{event.title}</p>
                    <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <Badge variant="outline">{event.registrations}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsManager;
