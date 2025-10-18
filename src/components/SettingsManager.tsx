import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Settings, 
  User, 
  Globe, 
  Mail, 
  Shield, 
  Database, 
  Palette, 
  Bell,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

interface SettingsData {
  general: {
    siteName: string;
    siteDescription: string;
    defaultLanguage: string;
    timezone: string;
    maintenanceMode: boolean;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    socialMedia: {
      facebook: string;
      linkedin: string;
      instagram: string;
    };
  };
  notifications: {
    emailNotifications: boolean;
    adminNotifications: boolean;
    userNotifications: boolean;
    newsletterEnabled: boolean;
  };
  security: {
    sessionTimeout: number;
    passwordPolicy: boolean;
    twoFactorAuth: boolean;
    ipWhitelist: string[];
  };
  appearance: {
    theme: string;
    primaryColor: string;
    logoUrl: string;
    faviconUrl: string;
  };
  backup: {
    autoBackup: boolean;
    backupFrequency: string;
    lastBackup: string;
    retentionDays: number;
  };
}

const SettingsManager: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({
    general: {
      siteName: 'TunisiaGBC',
      siteDescription: 'Tunisia Green Building Council - Organisation à but non lucratif dédiée à la promotion de la construction durable',
      defaultLanguage: 'fr',
      timezone: 'Africa/Tunis',
      maintenanceMode: false
    },
    contact: {
      email: 'tunisiagbc.contact@tunisiagbc.org',
      phone: '+216 XX XXX XXX',
      address: 'Tunis, Tunisie',
      socialMedia: {
        facebook: 'https://www.facebook.com/TunisiaGBC/',
        linkedin: 'https://www.linkedin.com/company/tunisia-green-building-council/posts/',
        instagram: 'https://www.instagram.com/tunisiagbc/'
      }
    },
    notifications: {
      emailNotifications: true,
      adminNotifications: true,
      userNotifications: true,
      newsletterEnabled: true
    },
    security: {
      sessionTimeout: 30,
      passwordPolicy: true,
      twoFactorAuth: false,
      ipWhitelist: []
    },
    appearance: {
      theme: 'light',
      primaryColor: '#10b981',
      logoUrl: '/logo TunisiaGBC.png',
      faviconUrl: '/tree-icon.png'
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      lastBackup: '2024-01-15 14:30:00',
      retentionDays: 30
    }
  });

  const tabs = [
    { id: 'general', label: t('admin.settings.tabs.general'), icon: Settings },
    { id: 'contact', label: t('admin.settings.tabs.contact'), icon: Mail },
    { id: 'notifications', label: t('admin.settings.tabs.notifications'), icon: Bell },
    { id: 'security', label: t('admin.settings.tabs.security'), icon: Shield },
    { id: 'appearance', label: t('admin.settings.tabs.appearance'), icon: Palette },
    { id: 'backup', label: t('admin.settings.tabs.backup'), icon: Database }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simuler la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('admin_settings', JSON.stringify(settings));
      toast.success(t('admin.settings.saveSuccess'));
    } catch (error) {
      toast.error(t('admin.settings.saveError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSettings({
      general: {
        siteName: 'TunisiaGBC',
        siteDescription: 'Tunisia Green Building Council - Organisation à but non lucratif dédiée à la promotion de la construction durable',
        defaultLanguage: 'fr',
        timezone: 'Africa/Tunis',
        maintenanceMode: false
      },
      contact: {
        email: 'tunisiagbc.contact@tunisiagbc.org',
        phone: '+216 XX XXX XXX',
        address: 'Tunis, Tunisie',
        socialMedia: {
          facebook: 'https://www.facebook.com/TunisiaGBC/',
          linkedin: 'https://www.linkedin.com/company/tunisia-green-building-council/posts/',
          instagram: 'https://www.instagram.com/tunisiagbc/'
        }
      },
      notifications: {
        emailNotifications: true,
        adminNotifications: true,
        userNotifications: true,
        newsletterEnabled: true
      },
      security: {
        sessionTimeout: 30,
        passwordPolicy: true,
        twoFactorAuth: false,
        ipWhitelist: []
      },
      appearance: {
        theme: 'light',
        primaryColor: '#10b981',
        logoUrl: '/logo TunisiaGBC.png',
        faviconUrl: '/tree-icon.png'
      },
      backup: {
        autoBackup: true,
        backupFrequency: 'daily',
        lastBackup: '2024-01-15 14:30:00',
        retentionDays: 30
      }
    });
    toast.success(t('admin.settings.resetSuccess'));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tunisiagbc-settings.json';
    link.click();
    URL.revokeObjectURL(url);
    toast.success(t('admin.settings.exportSuccess'));
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings(importedSettings);
          toast.success(t('admin.settings.importSuccess'));
        } catch (error) {
          toast.error(t('admin.settings.importError'));
        }
      };
      reader.readAsText(file);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t('admin.settings.general.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteName">{t('admin.settings.general.siteName')}</Label>
              <Input
                id="siteName"
                value={settings.general.siteName}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  general: { ...prev.general, siteName: e.target.value }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="defaultLanguage">{t('admin.settings.general.defaultLanguage')}</Label>
              <Select 
                value={settings.general.defaultLanguage}
                onValueChange={(value) => setSettings(prev => ({
                  ...prev,
                  general: { ...prev.general, defaultLanguage: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="siteDescription">{t('admin.settings.general.siteDescription')}</Label>
            <Textarea
              id="siteDescription"
              value={settings.general.siteDescription}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                general: { ...prev.general, siteDescription: e.target.value }
              }))}
              rows={3}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maintenanceMode">{t('admin.settings.general.maintenanceMode')}</Label>
              <p className="text-sm text-gray-500">{t('admin.settings.general.maintenanceModeDescription')}</p>
            </div>
            <Switch
              id="maintenanceMode"
              checked={settings.general.maintenanceMode}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                general: { ...prev.general, maintenanceMode: checked }
              }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContactSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {t('admin.settings.contact.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">{t('admin.settings.contact.email')}</Label>
              <Input
                id="email"
                type="email"
                value={settings.contact.email}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  contact: { ...prev.contact, email: e.target.value }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="phone">{t('admin.settings.contact.phone')}</Label>
              <Input
                id="phone"
                value={settings.contact.phone}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  contact: { ...prev.contact, phone: e.target.value }
                }))}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="address">{t('admin.settings.contact.address')}</Label>
            <Textarea
              id="address"
              value={settings.contact.address}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                contact: { ...prev.contact, address: e.target.value }
              }))}
              rows={2}
            />
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-3">{t('admin.settings.contact.socialMedia')}</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={settings.contact.socialMedia.facebook}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    contact: {
                      ...prev.contact,
                      socialMedia: { ...prev.contact.socialMedia, facebook: e.target.value }
                    }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={settings.contact.socialMedia.linkedin}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    contact: {
                      ...prev.contact,
                      socialMedia: { ...prev.contact.socialMedia, linkedin: e.target.value }
                    }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={settings.contact.socialMedia.instagram}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    contact: {
                      ...prev.contact,
                      socialMedia: { ...prev.contact.socialMedia, instagram: e.target.value }
                    }
                  }))}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            {t('admin.settings.notifications.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">{t('admin.settings.notifications.emailNotifications')}</Label>
                <p className="text-sm text-gray-500">{t('admin.settings.notifications.emailNotificationsDescription')}</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.notifications.emailNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, emailNotifications: checked }
                }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="adminNotifications">{t('admin.settings.notifications.adminNotifications')}</Label>
                <p className="text-sm text-gray-500">{t('admin.settings.notifications.adminNotificationsDescription')}</p>
              </div>
              <Switch
                id="adminNotifications"
                checked={settings.notifications.adminNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, adminNotifications: checked }
                }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="userNotifications">{t('admin.settings.notifications.userNotifications')}</Label>
                <p className="text-sm text-gray-500">{t('admin.settings.notifications.userNotificationsDescription')}</p>
              </div>
              <Switch
                id="userNotifications"
                checked={settings.notifications.userNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, userNotifications: checked }
                }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newsletterEnabled">{t('admin.settings.notifications.newsletterEnabled')}</Label>
                <p className="text-sm text-gray-500">{t('admin.settings.notifications.newsletterEnabledDescription')}</p>
              </div>
              <Switch
                id="newsletterEnabled"
                checked={settings.notifications.newsletterEnabled}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, newsletterEnabled: checked }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t('admin.settings.security.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sessionTimeout">{t('admin.settings.security.sessionTimeout')}</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  security: { ...prev.security, sessionTimeout: parseInt(e.target.value) || 30 }
                }))}
              />
              <p className="text-sm text-gray-500">{t('admin.settings.security.sessionTimeoutDescription')}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="passwordPolicy">{t('admin.settings.security.passwordPolicy')}</Label>
                <p className="text-sm text-gray-500">{t('admin.settings.security.passwordPolicyDescription')}</p>
              </div>
              <Switch
                id="passwordPolicy"
                checked={settings.security.passwordPolicy}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  security: { ...prev.security, passwordPolicy: checked }
                }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactorAuth">{t('admin.settings.security.twoFactorAuth')}</Label>
                <p className="text-sm text-gray-500">{t('admin.settings.security.twoFactorAuthDescription')}</p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={settings.security.twoFactorAuth}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  security: { ...prev.security, twoFactorAuth: checked }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            {t('admin.settings.appearance.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="theme">{t('admin.settings.appearance.theme')}</Label>
              <Select 
                value={settings.appearance.theme}
                onValueChange={(value) => setSettings(prev => ({
                  ...prev,
                  appearance: { ...prev.appearance, theme: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">{t('admin.settings.appearance.themes.light')}</SelectItem>
                  <SelectItem value="dark">{t('admin.settings.appearance.themes.dark')}</SelectItem>
                  <SelectItem value="auto">{t('admin.settings.appearance.themes.auto')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="primaryColor">{t('admin.settings.appearance.primaryColor')}</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={settings.appearance.primaryColor}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    appearance: { ...prev.appearance, primaryColor: e.target.value }
                  }))}
                  className="w-16 h-10"
                />
                <Input
                  value={settings.appearance.primaryColor}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    appearance: { ...prev.appearance, primaryColor: e.target.value }
                  }))}
                  placeholder="#10b981"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="logoUrl">{t('admin.settings.appearance.logoUrl')}</Label>
              <Input
                id="logoUrl"
                value={settings.appearance.logoUrl}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  appearance: { ...prev.appearance, logoUrl: e.target.value }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="faviconUrl">{t('admin.settings.appearance.faviconUrl')}</Label>
              <Input
                id="faviconUrl"
                value={settings.appearance.faviconUrl}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  appearance: { ...prev.appearance, faviconUrl: e.target.value }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            {t('admin.settings.backup.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoBackup">{t('admin.settings.backup.autoBackup')}</Label>
              <p className="text-sm text-gray-500">{t('admin.settings.backup.autoBackupDescription')}</p>
            </div>
            <Switch
              id="autoBackup"
              checked={settings.backup.autoBackup}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                backup: { ...prev.backup, autoBackup: checked }
              }))}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="backupFrequency">{t('admin.settings.backup.backupFrequency')}</Label>
              <Select 
                value={settings.backup.backupFrequency}
                onValueChange={(value) => setSettings(prev => ({
                  ...prev,
                  backup: { ...prev.backup, backupFrequency: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">{t('admin.settings.backup.frequencies.daily')}</SelectItem>
                  <SelectItem value="weekly">{t('admin.settings.backup.frequencies.weekly')}</SelectItem>
                  <SelectItem value="monthly">{t('admin.settings.backup.frequencies.monthly')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="retentionDays">{t('admin.settings.backup.retentionDays')}</Label>
              <Input
                id="retentionDays"
                type="number"
                value={settings.backup.retentionDays}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  backup: { ...prev.backup, retentionDays: parseInt(e.target.value) || 30 }
                }))}
              />
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t('admin.settings.backup.lastBackup')}</p>
                <p className="text-sm text-gray-500">{settings.backup.lastBackup}</p>
              </div>
              <Badge variant="outline">{t('admin.settings.backup.status.completed')}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.info(t('admin.settings.backup.createBackup'))}>
              <Database className="h-4 w-4 mr-2" />
              {t('admin.settings.backup.createBackup')}
            </Button>
            <Button variant="outline" onClick={() => toast.info(t('admin.settings.backup.restoreBackup'))}>
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('admin.settings.backup.restoreBackup')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'contact':
        return renderContactSettings();
      case 'notifications':
        return renderNotificationsSettings();
      case 'security':
        return renderSecuritySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'backup':
        return renderBackupSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('admin.settings.title')}</h2>
          <p className="text-gray-600 mt-1">{t('admin.settings.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {t('admin.settings.reset')}
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            {t('admin.settings.export')}
          </Button>
          <label htmlFor="import-settings">
            <Button variant="outline" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                {t('admin.settings.import')}
              </span>
            </Button>
          </label>
          <input
            id="import-settings"
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="min-h-[600px]">
        {renderTabContent()}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button variant="outline" onClick={() => window.history.back()}>
          {t('admin.actions.cancel')}
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              {t('admin.settings.saving')}
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {t('admin.settings.save')}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SettingsManager;
