import { Link } from "react-router-dom";
import { ArrowRight, Heart, Sparkles, Gem } from "lucide-react";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-bride.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Curated with Love",
      description:
        "Every piece in our collection is handpicked and designed with care, ensuring it reflects the beauty and grace our customers deserve.",
    },
    {
      icon: Sparkles,
      title: "Premium Craftsmanship",
      description:
        "We work with skilled artisans who bring traditional techniques to life, creating pieces that are both timeless and modern.",
    },
    {
      icon: Gem,
      title: "Luxurious Fabrics",
      description:
        "From silk to velvet, chiffon to premium cotton, we source only the finest fabrics that drape beautifully and feel luxurious.",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-brand-cream py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-caption mb-4 block">Our Story</span>
            <h1 className="heading-display mb-6">About StyledByNazima</h1>
            <p className="text-body">
              Where tradition meets elegance. Celebrating the rich heritage of
              Hyderabadi and Pakistani fashion through premium ethnic wear.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="image-zoom aspect-[4/5]">
              <img
                src={heroImage}
                alt="StyledByNazima craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-caption mb-4 block">The Beginning</span>
              <h2 className="heading-section mb-6">A Passion for Beauty</h2>
              <div className="space-y-4 text-body">
                <p>
                  StyledByNazima was born from a deep love for the elegance of
                  Hyderabadi and Pakistani fashion. What started as a personal
                  passion has grown into a brand that celebrates modest fashion
                  with a touch of luxury.
                </p>
                <p>
                  Our journey began with a simple belief: every woman deserves to
                  feel beautiful and confident in clothes that honor both tradition
                  and personal style. We curate each piece with intention, ensuring
                  that our collection reflects the timeless beauty of South Asian
                  craftsmanship.
                </p>
                <p>
                  Today, StyledByNazima stands as a testament to quality over
                  quantity. Our pricing reflects the premium materials and
                  meticulous attention to detail that goes into every garment we
                  offer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-brand-cream">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-caption mb-4 block">What We Stand For</span>
            <h2 className="heading-section">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-8 bg-background border border-border/50"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-champagne/20 text-brand-gold mb-6">
                  <value.icon size={28} />
                </div>
                <h3 className="heading-card mb-4">{value.title}</h3>
                <p className="text-sm text-brand-warm-gray leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-caption mb-4 block">The Art</span>
              <h2 className="heading-section mb-6">Traditional Craftsmanship</h2>
              <div className="space-y-4 text-body">
                <p>
                  Behind every StyledByNazima piece lies hours of skilled
                  craftsmanship. Our artisans bring generations of knowledge to
                  their work, from intricate zari embroidery to delicate threadwork.
                </p>
                <p>
                  We honor these traditions while embracing modern silhouettes,
                  creating garments that feel both rooted in heritage and perfectly
                  contemporary. Each stitch tells a story of dedication and artistry.
                </p>
              </div>
              <Link to="/shop" className="btn-hero mt-8 inline-flex">
                Shop Our Collection
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="order-1 lg:order-2 image-zoom aspect-[4/5]">
              <img
                src={lookbook2}
                alt="Traditional embroidery"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-charcoal">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-brand-ivory mb-6">
              Join the StyledByNazima Family
            </h2>
            <p className="font-body text-brand-ivory/70 mb-8">
              Follow us on Instagram for daily inspiration, new arrivals, and
              exclusive offers.
            </p>
            <a
              href="https://instagram.com/itsafrozmirza"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-charcoal font-body font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-brand-champagne"
            >
              Follow @itsafrozmirza
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
