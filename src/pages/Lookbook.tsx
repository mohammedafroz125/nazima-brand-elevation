import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-bride.jpg";
import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";
import collectionBridal from "@/assets/collection-bridal.jpg";
import collectionAbaya from "@/assets/collection-abaya.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";

const Lookbook = () => {
  const lookbookImages = [
    { image: heroImage, title: "Bridal Elegance" },
    { image: lookbook1, title: "Pashmina Dreams" },
    { image: lookbook2, title: "Festive Glamour" },
    { image: lookbook3, title: "Printed Grace" },
    { image: collectionBridal, title: "Velvet Royalty" },
    { image: collectionAbaya, title: "Navy Sophistication" },
    { image: product1, title: "Coral Charm" },
    { image: product2, title: "Black Elegance" },
    { image: product3, title: "Everyday Grace" },
    { image: product4, title: "Sage Serenity" },
    { image: product5, title: "Royal Heritage" },
  ];

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
              craftsmanship of StyledByNazima collections.
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
                className={`group image-zoom relative ${
                  index === 0 || index === 5 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div
                  className={`overflow-hidden ${
                    index === 0 || index === 5 ? "aspect-square" : "aspect-[3/4]"
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
              Get daily inspiration and be the first to know about new arrivals by
              following us on Instagram.
            </p>
            <a
              href="https://instagram.com/itsafrozmirza"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero"
            >
              @itsafrozmirza
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Lookbook;
