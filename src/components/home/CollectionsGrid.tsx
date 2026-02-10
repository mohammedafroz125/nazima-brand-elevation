import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import collectionAbayas from "@/assets/collection-abayas.jpg";
import collectionJilbab from "@/assets/collection-jilbab.jpg";
import collectionKhimar from "@/assets/collection-khimar.jpg";
import collectionDresses from "@/assets/collection-dresses.jpg";
import collectionHijabs from "@/assets/collection-hijabs.jpg";
import collectionBridal from "@/assets/collection-bridal.jpg";
import collectionWinter from "@/assets/collection-winter.jpg";

interface Collection {
  title: string;
  image: string;
  link: string;
  size: "large" | "medium" | "tall" | "normal";
}

const collections: Collection[] = [
  {
    title: "Luxury Abayas",
    image: collectionAbayas,
    link: "/shop?category=abayas",
    size: "large",
  },
  {
    title: "Jilbab & Makhna",
    image: collectionJilbab,
    link: "/shop?category=jilbab",
    size: "medium",
  },
  {
    title: "Khimar & Prayer Wear",
    image: collectionKhimar,
    link: "/shop?category=khimar",
    size: "medium",
  },
  {
    title: "Modest Dresses",
    image: collectionDresses,
    link: "/shop?category=dresses",
    size: "tall",
  },
  {
    title: "Hijabs & Scarves",
    image: collectionHijabs,
    link: "/shop?category=hijabs",
    size: "normal",
  },
  {
    title: "Bridal & Occasion",
    image: collectionBridal,
    link: "/shop?category=occasion",
    size: "normal",
  },
  {
    title: "Winter Modest Wear",
    image: collectionWinter,
    link: "/shop?category=winter",
    size: "normal",
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

        {/* Mixed-size grid inspired by anahco */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[220px] lg:auto-rows-[260px]">
          {collections.map((collection) => {
            const sizeClasses = {
              large: "col-span-2 row-span-2",
              medium: "col-span-1 row-span-1",
              tall: "col-span-1 row-span-2",
              normal: "col-span-1 row-span-1",
            };

            return (
              <Link
                key={collection.title}
                to={collection.link}
                className={`group relative overflow-hidden ${sizeClasses[collection.size]}`}
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-brand-charcoal/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-display text-lg md:text-2xl text-brand-ivory mb-2">
                    {collection.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-brand-champagne text-xs md:text-sm font-body uppercase tracking-wide group-hover:gap-3 transition-all duration-300">
                    Shop Now
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;
