import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AboutPreview = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-caption mb-4 block">Our Story</span>
          <h2 className="heading-section mb-8">About StyledByNazima</h2>
          <p className="text-body mb-4">
            StyledByNazima was born from a passion for celebrating Muslim women's 
            elegance through modest fashion. We believe that modesty and beauty 
            go hand in hand, and every woman deserves to feel confident and 
            graceful in her attire.
          </p>
          <p className="text-body mb-8">
            Our collections are thoughtfully curated with premium fabrics, 
            intricate craftsmanship, and designs that honor Islamic values 
            while embracing contemporary sophistication. Each piece tells a 
            story of tradition, quality, and timeless elegance.
          </p>
          <Link to="/about" className="btn-hero-outline">
            Learn More About Us
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
