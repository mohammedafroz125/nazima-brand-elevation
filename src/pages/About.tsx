import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

import lookbookModest2 from "@/assets/lookbook-modest-2.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-brand-cream py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-caption mb-4 block">Our Story</span>
            <h1 className="heading-display mb-6">About StyledByNazima</h1>
            <p className="text-body">
              Celebrating Muslim women's elegance through premium modest fashion,
              where tradition meets contemporary sophistication.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-caption mb-4 block">The Beginning</span>
              <h2 className="heading-section mb-6">Our Journey</h2>
              <p className="text-body mb-4">
                StyledByNazima was born from a deep understanding that Muslim women 
                deserve fashion that honors their faith without compromising on style. 
                Our founder, Nazima, recognized a gap in the market for truly premium 
                modest wear that combines Islamic values with contemporary elegance.
              </p>
              <p className="text-body mb-4">
                What started as a passion project has grown into a trusted brand 
                serving Muslim women across the globe. We believe that modesty is 
                beautiful, and every woman deserves to feel confident and graceful 
                in her attire.
              </p>
              <p className="text-body">
                Today, StyledByNazima continues to curate collections that celebrate 
                the beauty of modest fashion, one elegant piece at a time.
              </p>
            </div>
            <div className="relative">
              <img
                src={lookbookModest2}
                alt="StyledByNazima collection"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-brand-cream">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-caption mb-4 block">What We Believe</span>
            <h2 className="heading-section">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <h3 className="font-display text-2xl text-brand-charcoal mb-4">
                Modesty with Elegance
              </h3>
              <p className="text-body">
                We design with Islamic modesty principles at the forefront, 
                creating pieces that allow women to express their faith through 
                beautiful, sophisticated fashion.
              </p>
            </div>
            <div className="text-center p-8">
              <h3 className="font-display text-2xl text-brand-charcoal mb-4">
                Premium Quality
              </h3>
              <p className="text-body">
                Every piece is crafted with the finest fabrics and meticulous 
                attention to detail. We believe quality is non-negotiable when 
                it comes to modest fashion.
              </p>
            </div>
            <div className="text-center p-8">
              <h3 className="font-display text-2xl text-brand-charcoal mb-4">
                Timeless Design
              </h3>
              <p className="text-body">
                Our collections are designed to transcend seasonal trends, 
                offering timeless pieces that will remain elegant and relevant 
                for years to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-caption mb-4 block">Our Craft</span>
            <h2 className="heading-section mb-8">The Art of Modest Fashion</h2>
            <p className="text-body mb-4">
              At StyledByNazima, we believe that true luxury lies in the details. 
              From the selection of premium fabrics to the intricate embroidery 
              work, every element of our pieces is thoughtfully considered.
            </p>
            <p className="text-body mb-8">
              Our artisans bring decades of experience to each garment, combining 
              traditional craftsmanship with modern techniques to create pieces 
              that are both timeless and contemporary.
            </p>
            <Link to="/shop" className="btn-hero">
              Explore Our Collections
              <ArrowRight size={18} />
            </Link>
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
              href="https://instagram.com/styledbynazima"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-charcoal font-body font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-brand-champagne"
            >
              Follow @styledbynazima
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
