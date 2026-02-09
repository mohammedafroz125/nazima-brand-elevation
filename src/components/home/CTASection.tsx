import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-brand-charcoal">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-brand-champagne mb-6">
            Begin Your Journey
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-brand-ivory mb-6 leading-tight">
            Embrace Elegance,<br />Honor Modesty
          </h2>
          <p className="font-body text-brand-ivory/70 mb-10 text-lg">
            Discover our curated collection of premium modest fashion 
            designed for the modern Muslim woman.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-gold text-brand-charcoal font-body font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-brand-champagne"
            >
              Explore Collection
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-brand-ivory/30 text-brand-ivory font-body font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-brand-ivory/10"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
