import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  BookOpen, 
  Settings, 
  Users,
  BarChart3,
  LogOut
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  onLogout 
}) => {
  const { t } = useTranslation();

  const menuItems = [
    {
      id: 'dashboard',
      label: t('admin.sidebar.dashboard'),
      icon: LayoutDashboard,
      color: 'text-blue-600'
    },
    {
      id: 'resources',
      label: t('admin.sidebar.resources'),
      icon: FileText,
      color: 'text-green-600'
    },
    {
      id: 'events',
      label: t('admin.sidebar.events'),
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      id: 'blog',
      label: t('admin.sidebar.blog'),
      icon: BookOpen,
      color: 'text-orange-600'
    },
    {
      id: 'members',
      label: t('admin.sidebar.members'),
      icon: Users,
      color: 'text-indigo-600'
    },
    {
      id: 'analytics',
      label: t('admin.sidebar.analytics'),
      icon: BarChart3,
      color: 'text-red-600'
    },
    {
      id: 'settings',
      label: t('admin.sidebar.settings'),
      icon: Settings,
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">
          {t('admin.sidebar.title')}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {t('admin.sidebar.subtitle')}
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-12 text-left font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className={cn("h-5 w-5 mr-3", isActive ? "text-primary-foreground" : item.color)} />
              {item.label}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          className="w-full justify-start h-12 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          {t('admin.sidebar.logout')}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
