import { useState, useCallback } from "react";
import Layout from "@/components/layout/Layout";
import HeroSlider from "@/components/home/HeroSlider";
import TrustBadges from "@/components/home/TrustBadges";
import CollectionsGrid from "@/components/home/CollectionsGrid";
import BrandValues from "@/components/home/BrandValues";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutPreview from "@/components/home/AboutPreview";
import Testimonials from "@/components/home/Testimonials";
import CommunityGrid from "@/components/home/CommunityGrid";
import CTASection from "@/components/home/CTASection";
import SplashScreen from "@/components/ui/SplashScreen";


const Index = () => {
  const [showSplash, setShowSplash] = useState(() => {
    if (sessionStorage.getItem("sbn_visited")) return false;
    sessionStorage.setItem("sbn_visited", "1");
    return true;
  });

  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <Layout>
        <HeroSlider />
        <TrustBadges />
        <CollectionsGrid />
        <FeaturedProducts />
        <BrandValues />
        <AboutPreview />
        <Testimonials />
        <CommunityGrid />
        <CTASection />
      </Layout>
      
    </>
  );
};

export default Index;
