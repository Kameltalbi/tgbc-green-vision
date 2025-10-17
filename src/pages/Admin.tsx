import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Upload,
  Download,
  Eye,
  Settings,
  BarChart3,
  Calendar,
  Mail,
  LogOut
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminAuth from "@/components/AdminAuth";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MembershipRequest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  position: string;
  phone: string;
  membershipType: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'document' | 'video' | 'presentation' | 'guide';
  category: 'regulation' | 'technical' | 'training' | 'research';
  language: 'fr' | 'en' | 'ar';
  fileUrl: string;
  size: string;
  uploadDate: string;
  status: 'draft' | 'published' | 'archived';
}

const Admin = () => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'memberships' | 'resources' | 'content'>('dashboard');
  const [membershipRequests, setMembershipRequests] = useState<MembershipRequest[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    toast.success(t('admin.auth.logout'));
  };

  // Si pas authentifié, afficher le formulaire de connexion
  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  // Mock data - En production, cela viendrait d'une API
  useEffect(() => {
    // Simuler le chargement des données
    setMembershipRequests([
      {
        id: 1,
        firstName: "Ahmed",
        lastName: "Ben Ali",
        email: "ahmed.benali@example.com",
        company: "Architecture Plus",
        position: "Architecte",
        phone: "+216 98 123 456",
        membershipType: "individual",
        status: "pending",
        submittedAt: "2024-01-15"
      },
      {
        id: 2,
        firstName: "Fatma",
        lastName: "Khelil",
        email: "fatma.khelil@example.com",
        company: "Green Building Solutions",
        position: "Directrice",
        phone: "+216 95 789 012",
        membershipType: "company",
        status: "approved",
        submittedAt: "2024-01-10"
      }
    ]);

    setResources([
      {
        id: 1,
        title: "Guide du Bâtiment Vert",
        description: "Guide complet pour la conception et la construction de bâtiments durables",
        type: "guide",
        category: "technical",
        language: "fr",
        fileUrl: "/resources/guide-batiment-vert.pdf",
        size: "2.5 MB",
        uploadDate: "2024-01-15",
        status: "published"
      }
    ]);
  }, []);

  const handleMembershipAction = (id: number, action: 'approve' | 'reject') => {
    setMembershipRequests(prev => 
      prev.map(req => 
        req.id === id 
          ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' }
          : req
      )
    );
    toast.success(action === 'approve' ? 'Adhésion approuvée' : 'Adhésion rejetée');
  };

  const handleResourceSubmit = (resourceData: Partial<Resource>) => {
    if (editingResource) {
      setResources(prev => 
        prev.map(res => 
          res.id === editingResource.id 
            ? { ...res, ...resourceData }
            : res
        )
      );
      toast.success('Ressource mise à jour');
    } else {
      const newResource: Resource = {
        id: Date.now(),
        ...resourceData,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'draft'
      } as Resource;
      setResources(prev => [...prev, newResource]);
      toast.success('Ressource ajoutée');
    }
    setIsResourceDialogOpen(false);
    setEditingResource(null);
  };

  const handleResourceDelete = (id: number) => {
    setResources(prev => prev.filter(res => res.id !== id));
    toast.success('Ressource supprimée');
  };

  const stats = {
    totalMembers: 156,
    pendingRequests: membershipRequests.filter(req => req.status === 'pending').length,
    totalResources: resources.length,
    publishedResources: resources.filter(res => res.status === 'published').length
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
                {t('admin.title')}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('admin.subtitle')}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              {t('admin.auth.logout')}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('admin.stats.totalMembers')}</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalMembers}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('admin.stats.pendingRequests')}</p>
                  <p className="text-2xl font-bold text-foreground">{stats.pendingRequests}</p>
                </div>
                <Mail className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('admin.stats.totalResources')}</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalResources}</p>
                </div>
                <FileText className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('admin.stats.publishedResources')}</p>
                  <p className="text-2xl font-bold text-foreground">{stats.publishedResources}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            {[
              { id: 'dashboard', label: t('admin.tabs.dashboard'), icon: <BarChart3 className="h-4 w-4" /> },
              { id: 'memberships', label: t('admin.tabs.memberships'), icon: <Users className="h-4 w-4" /> },
              { id: 'resources', label: t('admin.tabs.resources'), icon: <FileText className="h-4 w-4" /> },
              { id: 'content', label: t('admin.tabs.content'), icon: <Settings className="h-4 w-4" /> }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex items-center gap-2"
              >
                {tab.icon}
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t('admin.dashboard.recentActivity')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{t('admin.dashboard.newMember')}</p>
                      <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <FileText className="h-5 w-5 text-accent" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{t('admin.dashboard.newResource')}</p>
                      <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-none">
              <CardHeader>
                <CardTitle>{t('admin.dashboard.quickActions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab('memberships')}
                  >
                    <Users className="h-6 w-6" />
                    <span className="text-sm">{t('admin.actions.manageMembers')}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setIsResourceDialogOpen(true)}
                  >
                    <Plus className="h-6 w-6" />
                    <span className="text-sm">{t('admin.actions.addResource')}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'memberships' && (
          <Card className="shadow-card border-none">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {t('admin.memberships.title')}
                </span>
                <Badge variant="secondary">
                  {membershipRequests.filter(req => req.status === 'pending').length} {t('admin.memberships.pending')}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('admin.memberships.name')}</TableHead>
                    <TableHead>{t('admin.memberships.email')}</TableHead>
                    <TableHead>{t('admin.memberships.company')}</TableHead>
                    <TableHead>{t('admin.memberships.type')}</TableHead>
                    <TableHead>{t('admin.memberships.status')}</TableHead>
                    <TableHead>{t('admin.memberships.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {membershipRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {request.firstName} {request.lastName}
                      </TableCell>
                      <TableCell>{request.email}</TableCell>
                      <TableCell>{request.company}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {t(`membership.types.${request.membershipType}.title`)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            request.status === 'approved' ? 'default' :
                            request.status === 'rejected' ? 'destructive' : 'secondary'
                          }
                        >
                          {t(`admin.memberships.status.${request.status}`)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {request.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleMembershipAction(request.id, 'approve')}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleMembershipAction(request.id, 'reject')}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === 'resources' && (
          <Card className="shadow-card border-none">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t('admin.resources.title')}
                </span>
                <Button onClick={() => setIsResourceDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('admin.resources.add')}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('admin.resources.title')}</TableHead>
                    <TableHead>{t('admin.resources.type')}</TableHead>
                    <TableHead>{t('admin.resources.category')}</TableHead>
                    <TableHead>{t('admin.resources.status')}</TableHead>
                    <TableHead>{t('admin.resources.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium">{resource.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {t(`resources.types.${resource.type}`)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {t(`resources.categories.${resource.category}`)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            resource.status === 'published' ? 'default' :
                            resource.status === 'archived' ? 'destructive' : 'secondary'
                          }
                        >
                          {t(`admin.resources.status.${resource.status}`)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingResource(resource);
                              setIsResourceDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleResourceDelete(resource.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card border-none">
              <CardHeader>
                <CardTitle>{t('admin.content.homePage')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hero-title">{t('admin.content.heroTitle')}</Label>
                  <Input id="hero-title" defaultValue="Construire aujourd'hui, penser demain" />
                </div>
                <div>
                  <Label htmlFor="hero-subtitle">{t('admin.content.heroSubtitle')}</Label>
                  <Textarea id="hero-subtitle" defaultValue="Promouvoir une culture du bâtiment durable en Tunisie" />
                </div>
                <Button className="w-full">{t('admin.content.save')}</Button>
              </CardContent>
            </Card>

            <Card className="shadow-card border-none">
              <CardHeader>
                <CardTitle>{t('admin.content.aboutPage')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="about-title">{t('admin.content.aboutTitle')}</Label>
                  <Input id="about-title" defaultValue="À propos du TGBC" />
                </div>
                <div>
                  <Label htmlFor="about-description">{t('admin.content.aboutDescription')}</Label>
                  <Textarea id="about-description" rows={4} />
                </div>
                <Button className="w-full">{t('admin.content.save')}</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Resource Dialog */}
        <Dialog open={isResourceDialogOpen} onOpenChange={setIsResourceDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingResource ? t('admin.resources.edit') : t('admin.resources.add')}
              </DialogTitle>
            </DialogHeader>
            <ResourceForm 
              resource={editingResource}
              onSubmit={handleResourceSubmit}
              onCancel={() => {
                setIsResourceDialogOpen(false);
                setEditingResource(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Footer />
    </div>
  );
};

// Composant pour le formulaire de ressource
const ResourceForm = ({ 
  resource, 
  onSubmit, 
  onCancel 
}: { 
  resource: Resource | null;
  onSubmit: (data: Partial<Resource>) => void;
  onCancel: () => void;
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: resource?.title || '',
    description: resource?.description || '',
    type: resource?.type || 'document',
    category: resource?.category || 'technical',
    language: resource?.language || 'fr',
    status: resource?.status || 'draft'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">{t('admin.resources.form.title')}</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">{t('admin.resources.form.description')}</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">{t('admin.resources.form.type')}</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="document">{t('resources.types.document')}</SelectItem>
              <SelectItem value="video">{t('resources.types.video')}</SelectItem>
              <SelectItem value="presentation">{t('resources.types.presentation')}</SelectItem>
              <SelectItem value="guide">{t('resources.types.guide')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category">{t('admin.resources.form.category')}</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regulation">{t('resources.categories.regulation')}</SelectItem>
              <SelectItem value="technical">{t('resources.categories.technical')}</SelectItem>
              <SelectItem value="training">{t('resources.categories.training')}</SelectItem>
              <SelectItem value="research">{t('resources.categories.research')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="language">{t('admin.resources.form.language')}</Label>
          <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">🇫🇷 Français</SelectItem>
              <SelectItem value="en">🇬🇧 English</SelectItem>
              <SelectItem value="ar">🇹🇳 العربية</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="status">{t('admin.resources.form.status')}</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">{t('admin.resources.status.draft')}</SelectItem>
              <SelectItem value="published">{t('admin.resources.status.published')}</SelectItem>
              <SelectItem value="archived">{t('admin.resources.status.archived')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="file">{t('admin.resources.form.file')}</Label>
        <div className="flex items-center gap-2">
          <Input type="file" id="file" />
          <Button type="button" variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            {t('admin.resources.form.upload')}
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('admin.resources.form.cancel')}
        </Button>
        <Button type="submit">
          {resource ? t('admin.resources.form.update') : t('admin.resources.form.create')}
        </Button>
      </div>
    </form>
  );
};

export default Admin;
