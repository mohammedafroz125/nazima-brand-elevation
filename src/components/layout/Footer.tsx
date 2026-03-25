import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-cream border-t border-border">
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl italic text-brand-charcoal">
                StyledByNazima
              </span>
            </Link>
            <p className="mt-4 text-sm text-brand-warm-gray leading-relaxed">
              Premium modest fashion for the modern Muslim woman. Abayas, modest 
              dresses, hijabs, and occasion wear crafted with elegance and care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-brand-charcoal mb-6">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/shop" className="text-sm text-brand-warm-gray hover:text-brand-gold transition-colors">
                Shop Collection
              </Link>
              <Link to="/lookbook" className="text-sm text-brand-warm-gray hover:text-brand-gold transition-colors">
                Lookbook
              </Link>
              <Link to="/about" className="text-sm text-brand-warm-gray hover:text-brand-gold transition-colors">
                Our Story
              </Link>
              <Link to="/reviews" className="text-sm text-brand-warm-gray hover:text-brand-gold transition-colors">
                Customer Reviews
              </Link>
              <Link to="/size-guide" className="text-sm text-brand-warm-gray hover:text-brand-gold transition-colors">
                Size Guide
              </Link>
              <Link to="/fabric-care" className="text-sm text-brand-warm-gray hover:text-brand-gold transition-colors">
                Fabric Care
              </Link>
              <Link to="/faq" className="text-sm text-brand-warm-gray hover:text-brand-gold transition-colors">
                FAQ
              </Link>
              <Link to="/return-policy" className="text-sm text-brand-warm-gray hover:text-brand-gold transition-colors">
                Return Policy
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-brand-charcoal mb-6">
              Contact Us
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm text-brand-warm-gray">
                  PATEL'S RESIDENCY, H NO.xxx-xx-xx, BORABANDA,
                  HYDERABAD, 500018
                </span>
              </div>
              <a
                href="tel:+919502509455"
                className="flex items-center gap-3 text-sm text-brand-warm-gray hover:text-brand-gold transition-colors"
              >
                <Phone size={18} className="text-brand-gold flex-shrink-0" />
                +91 9502509455
              </a>
              <a
                href="mailto:hello@styledbynazima.com"
                className="flex items-center gap-3 text-sm text-brand-warm-gray hover:text-brand-gold transition-colors"
              >
                <Mail size={18} className="text-brand-gold flex-shrink-0" />
                hello@styledbynazima.com
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg text-brand-charcoal mb-6">
              Follow Us
            </h4>
            <a
              href="https://instagram.com/styledbynazima"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-brand-warm-gray hover:text-brand-gold transition-colors"
            >
              <Instagram size={20} className="text-brand-gold" />
              @styledbynazima
            </a>
            <div className="mt-8">
              <a
                href="https://wa.me/919502509455"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-outline text-xs"
              >
                WhatsApp Order
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <p className="text-center text-sm text-brand-warm-gray">
            © {currentYear} StyledByNazima. All rights reserved. Crafted with ❤️
            in Hyderabad.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
