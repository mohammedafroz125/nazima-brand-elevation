import Layout from "@/components/layout/Layout";

import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import lookbookEditorial2 from "@/assets/lookbook-editorial-2.jpg";
import lookbookEditorial3 from "@/assets/lookbook-editorial-3.jpg";
import collectionAbayas from "@/assets/collection-abayas.jpg";
import collectionBridal from "@/assets/collection-bridal.jpg";
import collectionJilbab from "@/assets/collection-jilbab.jpg";
import collectionKhimar from "@/assets/collection-khimar.jpg";

interface LookbookEntry {
  image: string;
  title: string;
  subtitle?: string;
}

const editorials: LookbookEntry[] = [
  { image: heroSlide1, title: "Grace in Every Layer", subtitle: "Luxury Abayas — Spring 2026" },
  { image: lookbookEditorial2, title: "A Love Story in Lace", subtitle: "Bridal & Occasion Collection" },
  { image: heroSlide2, title: "Modest by Nature", subtitle: "Jilbab & Makhna Edit" },
  { image: lookbookEditorial3, title: "Earth Tones", subtitle: "Everyday Modest Essentials" },
  { image: heroSlide3, title: "Serenity in Simplicity", subtitle: "Prayer Wear & Khimar" },
];

const galleryImages: LookbookEntry[] = [
  { image: collectionAbayas, title: "Champagne Abaya" },
  { image: collectionBridal, title: "Bridal Elegance" },
  { image: collectionJilbab, title: "Mocha Jilbab" },
  { image: collectionKhimar, title: "White Khimar" },
];

const Lookbook = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-brand-cream py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-caption mb-4 block">Visual Stories</span>
            <h1 className="heading-display mb-6">Lookbook</h1>
            <p className="text-body">
              Explore our editorial gallery — a celebration of modesty, grace, 
              and the art of dressing with intention.
            </p>
          </div>
        </div>
      </section>

      {/* Full-width Editorial Spreads */}
      <section className="bg-background">
        {editorials.map((entry, index) => (
          <div key={index} className="relative">
            <div className="aspect-[16/7] md:aspect-[16/6] overflow-hidden">
              <img
                src={entry.image}
                alt={entry.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/50 via-transparent to-transparent flex items-end">
              <div className="section-container pb-10 md:pb-16">
                {entry.subtitle && (
                  <span className="text-brand-champagne text-xs md:text-sm tracking-[0.3em] uppercase font-body block mb-2">
                    {entry.subtitle}
                  </span>
                )}
                <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-brand-ivory font-medium">
                  {entry.title}
                </h2>
              </div>
            </div>
            {/* Spacer between editorials */}
            {index < editorials.length - 1 && (
              <div className="h-2 md:h-4 bg-background" />
            )}
          </div>
        ))}
      </section>

      {/* Smaller Gallery Grid */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-caption mb-4 block">Closer Look</span>
            <h2 className="heading-section">Details & Craft</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((item, index) => (
              <div key={index} className="group relative overflow-hidden aspect-[3/4]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/30 transition-all duration-500 flex items-end p-4">
                  <span className="text-brand-ivory font-display text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 bg-brand-cream">
        <div className="section-container">
          <div className="text-center">
            <span className="text-caption mb-4 block">Stay Connected</span>
            <h2 className="heading-section mb-6">Follow Our Journey</h2>
            <p className="text-body max-w-xl mx-auto mb-8">
              Get daily inspiration and be the first to know about new arrivals 
              by following us on Instagram.
            </p>
            <a
              href="https://instagram.com/styledbynazima"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero"
            >
              @styledbynazima
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Lookbook;
