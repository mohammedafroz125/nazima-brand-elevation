import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="section-padding bg-brand-cream min-h-[60vh] flex items-center">
        <div className="section-container">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-caption mb-4 block">Error 404</span>
            <h1 className="heading-display mb-6">Page Not Found</h1>
            <p className="text-body mb-8">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back to exploring our beautiful collection.
            </p>
            <Link to="/" className="btn-hero inline-flex">
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
