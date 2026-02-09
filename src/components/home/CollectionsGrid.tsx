import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import collectionAbayas from "@/assets/collection-abayas.jpg";
import collectionDresses from "@/assets/collection-dresses.jpg";
import collectionHijabs from "@/assets/collection-hijabs.jpg";
import collectionOccasion from "@/assets/collection-occasion.jpg";

interface Collection {
  title: string;
  description: string;
  image: string;
  link: string;
}

const collections: Collection[] = [
  {
    title: "Abayas",
    description: "Flowing elegance with refined cuts and premium fabrics",
    image: collectionAbayas,
    link: "/shop?category=abayas",
  },
  {
    title: "Modest Dresses",
    description: "Graceful silhouettes for everyday sophistication",
    image: collectionDresses,
    link: "/shop?category=dresses",
  },
  {
    title: "Hijabs & Scarves",
    description: "Luxurious silk and premium fabrics in timeless colors",
    image: collectionHijabs,
    link: "/shop?category=hijabs",
  },
  {
    title: "Occasion Wear",
    description: "Exquisite pieces for your most special moments",
    image: collectionOccasion,
    link: "/shop?category=occasion",
  },
];

const CollectionsGrid = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="text-caption mb-4 block">Curated With Love</span>
          <h2 className="heading-section">Shop Collections</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.title}
              to={collection.link}
              className="group relative overflow-hidden"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl text-brand-ivory mb-2">
                  {collection.title}
                </h3>
                <p className="font-body text-sm text-brand-ivory/70 mb-4 line-clamp-2">
                  {collection.description}
                </p>
                <span className="inline-flex items-center gap-2 text-brand-champagne text-sm font-body uppercase tracking-wide group-hover:gap-3 transition-all duration-300">
                  Shop Now
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;
