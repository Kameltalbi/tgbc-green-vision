import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navLinks = [
    { path: "/about", label: t('nav.about') },
    { path: "/resources", label: t('nav.resources') },
    { path: "/events", label: t('nav.events') },
    { path: "/membership", label: t('nav.membership') },
    { path: "/contact", label: t('nav.contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-card/95 backdrop-blur-sm border-b border-border z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-18 sm:h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-white p-1.5 sm:p-2.5 rounded-lg">
              <img 
                src="/logo TunisiaGBC.png" 
                alt="Tunisia Green Building Council" 
                className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 ml-4 xl:ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-2 xl:px-4 py-2 rounded-md font-medium transition-all duration-300 text-sm xl:text-base ${
                  isActive(link.path)
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Spacer to push button to the right */}
          <div className="flex-1"></div>

          {/* Language Switcher */}
          <div className="hidden sm:block mr-2 lg:mr-4">
            <LanguageSwitcher />
          </div>

          {/* Membership Button */}
          <div className="hidden sm:block">
            <Link to="/membership">
              <Button size="sm" className="text-xs lg:text-sm">
                {t('nav.becomeMember')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 rounded-md hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="sm:hidden py-4 space-y-2 animate-fade-in border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-md font-medium transition-all text-sm ${
                  isActive(link.path)
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 py-2">
              <LanguageSwitcher />
            </div>
            <div className="px-4">
              <Link to="/membership" onClick={() => setIsOpen(false)}>
                <Button className="w-full text-sm">{t('nav.becomeMember')}</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
