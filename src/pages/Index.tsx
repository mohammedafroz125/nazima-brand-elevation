import Layout from "@/components/layout/Layout";
import HeroSlider from "@/components/home/HeroSlider";
import TrustBadges from "@/components/home/TrustBadges";
import CollectionsGrid from "@/components/home/CollectionsGrid";
import BrandValues from "@/components/home/BrandValues";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutPreview from "@/components/home/AboutPreview";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSlider />
      <TrustBadges />
      <CollectionsGrid />
      <FeaturedProducts />
      <BrandValues />
      <AboutPreview />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
