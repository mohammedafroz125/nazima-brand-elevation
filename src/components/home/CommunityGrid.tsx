import { Instagram } from "lucide-react";

import lookbook1 from "@/assets/lookbook-1.jpg";

import lookbook3 from "@/assets/lookbook-3.jpg";
import lookbookModest1 from "@/assets/lookbook-modest-1.jpg";
import lookbookModest2 from "@/assets/lookbook-modest-2.jpg";
import lookbookModest3 from "@/assets/lookbook-modest-3.jpg";

const communityImages = [
  { src: lookbook1, alt: "Customer styled in luxury abaya" },
  { src: lookbookModest1, alt: "Community member in modest wear" },
  
  { src: lookbookModest2, alt: "Styled jilbab from our collection" },
  { src: lookbook3, alt: "Customer in occasion abaya" },
  { src: lookbookModest3, alt: "Community styling with hijab" },
];

const CommunityGrid = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="text-caption mb-4 block">Community</span>
          <h2 className="heading-section mb-4">Styled by Our Community</h2>
          <p className="text-body max-w-xl mx-auto">
            Real women, real elegance. See how our sisters style their
            StyledByNazima pieces.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {communityImages.map((img, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/30 transition-all duration-500 flex items-center justify-center">
                <Instagram
                  size={28}
                  className="text-brand-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://instagram.com/styledbynazima"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hero-outline"
          >
            <Instagram size={18} />
            Follow @styledbynazima
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunityGrid;
