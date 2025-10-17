import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  ExternalLink, 
  BookOpen, 
  Video, 
  Presentation,
  Search,
  Filter
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'document' | 'video' | 'presentation' | 'guide';
  category: 'regulation' | 'technical' | 'training' | 'research';
  language: 'fr' | 'en' | 'ar';
  downloadUrl: string;
  externalUrl?: string;
  size?: string;
  date: string;
}

const Resources = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const resources: Resource[] = [
    {
      id: 1,
      title: t('resources.documents.greenBuildingGuide.title'),
      description: t('resources.documents.greenBuildingGuide.description'),
      type: 'guide',
      category: 'technical',
      language: 'fr',
      downloadUrl: '/resources/guide-batiment-vert.pdf',
      size: '2.5 MB',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: t('resources.documents.energyEfficiency.title'),
      description: t('resources.documents.energyEfficiency.description'),
      type: 'document',
      category: 'regulation',
      language: 'fr',
      downloadUrl: '/resources/efficacite-energetique.pdf',
      size: '1.8 MB',
      date: '2024-02-10'
    },
    {
      id: 3,
      title: t('resources.documents.circularEconomy.title'),
      description: t('resources.documents.circularEconomy.description'),
      type: 'presentation',
      category: 'training',
      language: 'fr',
      downloadUrl: '/resources/economie-circulaire.pptx',
      size: '5.2 MB',
      date: '2024-01-28'
    },
    {
      id: 4,
      title: t('resources.documents.leedCertification.title'),
      description: t('resources.documents.leedCertification.description'),
      type: 'guide',
      category: 'technical',
      language: 'en',
      downloadUrl: '/resources/leed-certification.pdf',
      size: '3.1 MB',
      date: '2024-02-05'
    },
    {
      id: 5,
      title: t('resources.documents.sustainableMaterials.title'),
      description: t('resources.documents.sustainableMaterials.description'),
      type: 'document',
      category: 'research',
      language: 'fr',
      downloadUrl: '/resources/materiaux-durables.pdf',
      size: '2.9 MB',
      date: '2024-01-20'
    },
    {
      id: 6,
      title: t('resources.documents.greenSchools.title'),
      description: t('resources.documents.greenSchools.description'),
      type: 'video',
      category: 'training',
      language: 'fr',
      externalUrl: 'https://youtube.com/watch?v=example',
      date: '2024-02-15'
    }
  ];

  const categories = [
    { id: 'all', label: t('resources.categories.all') },
    { id: 'regulation', label: t('resources.categories.regulation') },
    { id: 'technical', label: t('resources.categories.technical') },
    { id: 'training', label: t('resources.categories.training') },
    { id: 'research', label: t('resources.categories.research') }
  ];

  const types = [
    { id: 'all', label: t('resources.types.all'), icon: <FileText className="h-4 w-4" /> },
    { id: 'document', label: t('resources.types.document'), icon: <FileText className="h-4 w-4" /> },
    { id: 'video', label: t('resources.types.video'), icon: <Video className="h-4 w-4" /> },
    { id: 'presentation', label: t('resources.types.presentation'), icon: <Presentation className="h-4 w-4" /> },
    { id: 'guide', label: t('resources.types.guide'), icon: <BookOpen className="h-4 w-4" /> }
  ];

  const filteredResources = resources.filter(resource => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory;
    const typeMatch = selectedType === 'all' || resource.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      case 'presentation': return <Presentation className="h-5 w-5" />;
      case 'guide': return <BookOpen className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getLanguageFlag = (language: string) => {
    switch (language) {
      case 'fr': return '🇫🇷';
      case 'en': return '🇬🇧';
      case 'ar': return '🇹🇳';
      default: return '🇫🇷';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {t('resources.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('resources.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <Card className="shadow-card border-none">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">{t('resources.filters.title')}:</span>
                </div>
                
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>

                {/* Type Filter */}
                <div className="flex flex-wrap gap-2 ml-4">
                  {types.map((type) => (
                    <Button
                      key={type.id}
                      variant={selectedType === type.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type.id)}
                      className="flex items-center gap-2"
                    >
                      {type.icon}
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-none shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    {getTypeIcon(resource.type)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{getLanguageFlag(resource.language)}</span>
                    <span className="text-xs text-muted-foreground">{resource.date}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-2 text-foreground line-clamp-2">
                  {resource.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">
                      {t(`resources.categories.${resource.category}`)}
                    </span>
                    {resource.size && (
                      <span className="text-xs text-muted-foreground">
                        {resource.size}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {resource.downloadUrl && (
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {t('resources.download')}
                      </Button>
                    )}
                    {resource.externalUrl && (
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" />
                        {t('resources.view')}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-foreground">
              {t('resources.empty.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('resources.empty.description')}
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-primary text-white border-none shadow-elegant">
            <CardContent className="p-8">
              <h2 className="font-display text-2xl font-bold mb-4">
                {t('resources.cta.title')}
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                {t('resources.cta.description')}
              </p>
              <Button variant="secondary" size="lg">
                {t('resources.cta.button')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Resources;
