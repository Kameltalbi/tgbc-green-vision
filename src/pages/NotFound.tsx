import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <h1 className="font-display text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            {t('notFound.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            {t('notFound.description')}
          </p>
          <Link to="/">
            <Button size="lg" className="animate-fade-in">
              {t('notFound.backToHome')}
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
