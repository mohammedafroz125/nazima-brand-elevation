import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

import productAbaya1 from "@/assets/product-abaya-1.jpg";
import productAbaya2 from "@/assets/product-abaya-2.jpg";
import productDress1 from "@/assets/product-dress-1.jpg";
import productDress2 from "@/assets/product-dress-2.jpg";
import productHijab1 from "@/assets/product-hijab-1.jpg";
import productOccasion1 from "@/assets/product-occasion-1.jpg";
import productOccasion2 from "@/assets/product-occasion-2.jpg";
import collectionHijabs from "@/assets/collection-hijabs.jpg";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  tag?: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Navy Embroidered Abaya",
    price: "₹8,999",
    image: productAbaya1,
    category: "abayas",
    tag: "Best Seller",
  },
  {
    id: "2",
    name: "Ivory Lace Abaya",
    price: "₹7,499",
    image: productAbaya2,
    category: "abayas",
    tag: "New Arrival",
  },
  {
    id: "3",
    name: "Sage Embroidered Dress",
    price: "₹6,999",
    image: productDress1,
    category: "dresses",
  },
  {
    id: "4",
    name: "Dusty Rose Maxi Dress",
    price: "₹5,999",
    image: productDress2,
    category: "dresses",
    tag: "New Arrival",
  },
  {
    id: "5",
    name: "Champagne Silk Hijab",
    price: "₹1,499",
    image: productHijab1,
    category: "hijabs",
  },
  {
    id: "6",
    name: "Premium Hijab Collection",
    price: "₹2,999",
    image: collectionHijabs,
    category: "hijabs",
    tag: "Best Seller",
  },
  {
    id: "7",
    name: "Blush Pearl Occasion Gown",
    price: "₹12,999",
    image: productOccasion1,
    category: "occasion",
    tag: "Premium",
  },
  {
    id: "8",
    name: "Burgundy Embroidered Kaftan",
    price: "₹14,999",
    image: productOccasion2,
    category: "occasion",
    tag: "Exclusive",
  },
];

const categories = [
  { id: "all", label: "All" },
  { id: "abayas", label: "Abayas" },
  { id: "dresses", label: "Modest Dresses" },
  { id: "hijabs", label: "Hijabs & Scarves" },
  { id: "occasion", label: "Occasion Wear" },
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-brand-cream py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-caption mb-4 block">Our Collections</span>
            <h1 className="heading-display mb-6">Shop</h1>
            <p className="text-body">
              Discover our curated selection of premium modest fashion, 
              from elegant abayas to luxurious occasion wear.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border/50">
        <div className="section-container">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 font-body text-sm uppercase tracking-wide transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-brand-charcoal text-brand-ivory"
                    : "bg-transparent text-brand-charcoal border border-brand-charcoal/20 hover:border-brand-charcoal/50"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/shop?product=${product.id}`}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.tag && (
                    <span className="absolute top-4 left-4 bg-brand-charcoal text-brand-ivory px-3 py-1 text-xs font-body uppercase tracking-wide">
                      {product.tag}
                    </span>
                  )}
                  
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/20 transition-all duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-ivory text-brand-charcoal px-6 py-3 font-body text-sm uppercase tracking-wide">
                      View Details
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-brand-warm-gray font-body uppercase tracking-wide">
                    {categories.find((c) => c.id === product.category)?.label}
                  </span>
                  <h3 className="font-display text-lg text-brand-charcoal mt-1 mb-2 group-hover:text-brand-gold transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="font-body text-brand-charcoal font-medium">
                    {product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-body">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-12 bg-brand-cream">
        <div className="section-container">
          <div className="text-center">
            <p className="text-body mb-4">
              Want to place an order or have questions?
            </p>
            <a
              href="https://wa.me/919502509455"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
