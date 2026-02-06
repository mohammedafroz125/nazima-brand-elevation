import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-bride.jpg";
import collectionBridal from "@/assets/collection-bridal.jpg";
import collectionAbaya from "@/assets/collection-abaya.jpg";
import collectionScarfs from "@/assets/collection-scarfs.jpg";
import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";

const Index = () => {
  const collections = [
    {
      title: "Ethnic Wear",
      tag: "Premium • Limited",
      description:
        "Graceful silhouettes, intricate embroidery, and luxe fabrics inspired by Hyderabadi heritage.",
      image: collectionBridal,
      link: "/shop?category=ethnic",
    },
    {
      title: "Abayas",
      tag: "Modest • Premium",
      description:
        "Flowing abayas with refined cuts and embellishments, balancing modesty and modern elegance.",
      image: collectionAbaya,
      link: "/shop?category=abayas",
    },
    {
      title: "Scarfs & Hijabs",
      tag: "Soft • Classic",
      description:
        "Soft, airy scarfs that complete every look with grace and comfort.",
      image: collectionScarfs,
      link: "/shop?category=scarfs",
    },
  ];

  const brandValues = [
    { title: "Premium Quality", description: "Only the finest fabrics" },
    { title: "Modest Elegance", description: "Timeless & graceful designs" },
    { title: "Timeless Craft", description: "Handcrafted with love" },
  ];

  const testimonials = [
    {
      quote:
        "Beautiful collection with elegant designs and premium quality fabrics.",
      author: "Salma Tabassum",
    },
    {
      quote: "Loved the detailing and comfort – truly worth every purchase.",
      author: "Shama Afreen",
    },
    {
      quote:
        "As a mother, I am so happy to see such graceful dresses. May Allah put more barakah in this business!",
      author: "Fatima",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-brand-cream">
        <div className="section-container w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Hero Text */}
            <div className="order-2 lg:order-1 animate-fade-in">
              <span className="text-caption mb-4 block">New Collection 2026</span>
              <h1 className="heading-display mb-6">
                Premium Hyderabadi &<br />
                <span className="italic">Pakistani Ethnic Wear</span>
              </h1>
              <p className="text-body max-w-lg mb-8">
                Explore Ethnic Dresses, Dubai Abayas, and Scarfs crafted with
                premium fabrics and elegant detailing. Pricing is slightly premium
                to reflect our unwavering quality.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="btn-hero">
                  Shop Collections
                  <ArrowRight size={18} />
                </Link>
                <Link to="/lookbook" className="btn-hero-outline">
                  View Lookbook
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
                <img
                  src={heroImage}
                  alt="Premium bridal ethnic wear"
                  className="w-full h-full object-cover object-top"
                />
                {/* Brand Value Tags */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 justify-center">
                  {brandValues.map((value) => (
                    <span
                      key={value.title}
                      className="bg-background/90 backdrop-blur-sm px-4 py-2 text-sm font-body text-brand-charcoal"
                    >
                      {value.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-caption mb-4 block">Curated With Love</span>
            <h2 className="heading-section">Shop the Collections</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Link
                key={collection.title}
                to={collection.link}
                className="group card-luxury"
              >
                <div className="image-zoom aspect-[3/4]">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="heading-card mb-3">{collection.title}</h3>
                  <span className="badge-premium mb-4 inline-block">
                    {collection.tag}
                  </span>
                  <p className="text-sm text-brand-warm-gray leading-relaxed">
                    {collection.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook Preview */}
      <section className="section-padding bg-brand-cream">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-caption mb-4 block">Style Inspiration</span>
            <h2 className="heading-section">Lookbook & Posters</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { image: lookbook1, label: "Pashmina Hijab" },
              { image: lookbook2, label: "Festive Kurtas" },
              { image: lookbook3, label: "Printed Abaya" },
            ].map((item) => (
              <div key={item.label} className="relative group image-zoom aspect-[3/4]">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-background/90 backdrop-blur-sm px-4 py-2 text-sm font-body text-brand-charcoal">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/lookbook" className="btn-hero-outline">
              View Full Lookbook
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-caption mb-4 block">Our Story</span>
            <h2 className="heading-section mb-8">About StyledByNazima</h2>
            <p className="text-body mb-8">
              StyledByNazima celebrates Hyderabadi and Pakistani aesthetics
              through premium fabrics, intricate work, and elegant modest designs.
              Each piece is curated with love to feel timeless yet modern,
              reflecting Muslim cultural beauty and craftsmanship. Our pricing is
              intentionally a little premium to honor the artisanship and quality
              you deserve.
            </p>
            <Link to="/about" className="btn-hero-outline">
              Learn More
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-secondary">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-caption mb-4 block">Testimonials</span>
            <h2 className="heading-section">What Our Customers Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-background p-8 border border-border/50"
              >
                <blockquote className="font-display text-lg italic text-brand-charcoal leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <cite className="text-sm font-body text-brand-gold not-italic">
                  — {testimonial.author}
                </cite>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/reviews" className="btn-hero-outline">
              Read All Reviews
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-charcoal">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-brand-ivory mb-6">
              Ready to Elevate Your Wardrobe?
            </h2>
            <p className="font-body text-brand-ivory/70 mb-8">
              Explore our curated collection of premium ethnic wear and find your
              perfect piece.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-charcoal font-body font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-brand-champagne"
            >
              Explore Collection
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
