import Layout from "@/components/layout/Layout";

import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import lookbookModest1 from "@/assets/lookbook-modest-1.jpg";
import lookbookModest2 from "@/assets/lookbook-modest-2.jpg";
import lookbookModest3 from "@/assets/lookbook-modest-3.jpg";
import collectionAbayas from "@/assets/collection-abayas.jpg";
import collectionDresses from "@/assets/collection-dresses.jpg";
import collectionOccasion from "@/assets/collection-occasion.jpg";
import productAbaya1 from "@/assets/product-abaya-1.jpg";
import productOccasion2 from "@/assets/product-occasion-2.jpg";

interface LookbookImage {
  image: string;
  title: string;
  size?: "large" | "normal";
}

const lookbookImages: LookbookImage[] = [
  { image: heroSlide1, title: "Timeless Elegance", size: "large" },
  { image: lookbookModest1, title: "Classic Black Abaya" },
  { image: collectionDresses, title: "Champagne Dreams" },
  { image: lookbookModest2, title: "Sage Serenity" },
  { image: productAbaya1, title: "Navy Sophistication" },
  { image: collectionOccasion, title: "Blush Romance", size: "large" },
  { image: heroSlide2, title: "Lace Elegance" },
  { image: lookbookModest3, title: "Ivory Grace" },
  { image: heroSlide3, title: "Sage Collection" },
  { image: productOccasion2, title: "Burgundy Royalty" },
  { image: collectionAbayas, title: "Everyday Elegance" },
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
              Explore our curated visual gallery showcasing the elegance and
              craftsmanship of StyledByNazima modest fashion collections.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {lookbookImages.map((item, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden ${
                  item.size === "large" ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div
                  className={`overflow-hidden ${
                    item.size === "large" ? "aspect-square" : "aspect-[3/4]"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/40 transition-all duration-500 flex items-end justify-start p-4 md:p-6">
                  <span className="text-brand-ivory font-display text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
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
