import { Link } from "react-router-dom";
import { Leaf, Linkedin, Facebook, Instagram, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-primary text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-lg">
                <Leaf className="h-6 w-6" />
              </div>
              <span className="font-display font-bold text-xl">TGBC</span>
            </div>
            <p className="text-white/80 text-sm">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.events')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.membership')}
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.admin')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@tgbc.tn" className="hover:text-white transition-colors">
                  contact@tgbc.tn
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.followUs')}</h3>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} Tunisia Green Building Council - {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
