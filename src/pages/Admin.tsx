import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AdminAuth from '../components/AdminAuth';
import AdminSidebar from '../components/AdminSidebar';
import ResourcesManager from '../components/ResourcesManager';
import EventsManager from '../components/EventsManager';
import BlogManager from '../components/BlogManager';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Users, 
  FileText, 
  Calendar, 
  BarChart3, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  Mail,
  CheckCircle,
  XCircle
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

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

const Admin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [membershipRequests, setMembershipRequests] = useState<MembershipRequest[]>([]);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    toast.success(t('admin.auth.logout'));
    navigate('/');
  };

  // Si pas authentifié, afficher le formulaire de connexion
  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

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

  const stats = {
    totalMembers: 156,
    pendingRequests: membershipRequests.filter(req => req.status === 'pending').length,
    totalResources: 24,
    publishedResources: 18,
    totalEvents: 12,
    upcomingEvents: 8,
    totalPosts: 45,
    publishedPosts: 38
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t('admin.dashboard.stats.totalMembers')}
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalMembers}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% par rapport au mois dernier
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t('admin.dashboard.stats.pendingRequests')}
                  </CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingRequests}</div>
                  <p className="text-xs text-muted-foreground">
                    En attente de validation
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t('admin.dashboard.stats.totalResources')}
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalResources}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.publishedResources} publiées
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t('admin.dashboard.stats.totalEvents')}
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalEvents}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.upcomingEvents} à venir
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.dashboard.quickActions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveSection('members')}
                  >
                    <Users className="h-6 w-6" />
                    <span className="text-sm">{t('admin.dashboard.manageMembers')}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveSection('resources')}
                  >
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">{t('admin.dashboard.manageResources')}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveSection('events')}
                  >
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm">{t('admin.dashboard.manageEvents')}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveSection('blog')}
                  >
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">{t('admin.dashboard.manageBlog')}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.dashboard.recentActivity')}</CardTitle>
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
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Calendar className="h-5 w-5 text-secondary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{t('admin.dashboard.newEvent')}</p>
                      <p className="text-xs text-muted-foreground">Il y a 3 jours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'members':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {t('admin.members.title')}
                </span>
                <Badge variant="secondary">
                  {membershipRequests.filter(req => req.status === 'pending').length} {t('admin.members.pending')}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('admin.members.name')}</TableHead>
                    <TableHead>{t('admin.members.email')}</TableHead>
                    <TableHead>{t('admin.members.company')}</TableHead>
                    <TableHead>{t('admin.members.type')}</TableHead>
                    <TableHead>{t('admin.members.status')}</TableHead>
                    <TableHead>{t('admin.members.actions')}</TableHead>
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
                          {t(`admin.members.status.${request.status}`)}
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
        );

      case 'resources':
        return <ResourcesManager />;

      case 'events':
        return <EventsManager />;

      case 'blog':
        return <BlogManager />;

      case 'analytics':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {t('admin.analytics.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">{t('admin.analytics.comingSoon')}</h3>
                <p className="text-muted-foreground">{t('admin.analytics.description')}</p>
              </div>
            </CardContent>
          </Card>
        );

      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                {t('admin.settings.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">{t('admin.settings.comingSoon')}</h3>
                <p className="text-muted-foreground">{t('admin.settings.description')}</p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t(`admin.sidebar.${activeSection}`)}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {t('admin.header.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-green-600 border-green-200">
                {t('admin.header.online')}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;