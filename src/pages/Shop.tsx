import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import collectionBridal from "@/assets/collection-bridal.jpg";
import collectionAbaya from "@/assets/collection-abaya.jpg";
import collectionScarfs from "@/assets/collection-scarfs.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import lookbook1 from "@/assets/lookbook-1.jpg";

type Category = "all" | "ethnic" | "abayas" | "scarfs";

interface Product {
  id: number;
  name: string;
  category: Category;
  price: string;
  image: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const categories: { key: Category; label: string }[] = [
    { key: "all", label: "All" },
    { key: "ethnic", label: "Ethnic Wear" },
    { key: "abayas", label: "Abayas" },
    { key: "scarfs", label: "Scarfs & Hijabs" },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "Burgundy Velvet Anarkali",
      category: "ethnic",
      price: "₹8,999",
      image: collectionBridal,
      isNew: true,
    },
    {
      id: 2,
      name: "Navy Blue Classic Abaya",
      category: "abayas",
      price: "₹4,999",
      image: collectionAbaya,
      isBestSeller: true,
    },
    {
      id: 3,
      name: "Pastel Silk Scarf Set",
      category: "scarfs",
      price: "₹1,499",
      image: collectionScarfs,
      isNew: true,
    },
    {
      id: 4,
      name: "Coral Gold Embroidered Suit",
      category: "ethnic",
      price: "₹7,499",
      image: product1,
      isBestSeller: true,
    },
    {
      id: 5,
      name: "Black Embroidered Abaya",
      category: "abayas",
      price: "₹5,999",
      image: product2,
    },
    {
      id: 6,
      name: "Ivory Pink Kurta Set",
      category: "ethnic",
      price: "₹4,499",
      image: product3,
      isNew: true,
    },
    {
      id: 7,
      name: "Sage Green Flowing Abaya",
      category: "abayas",
      price: "₹5,499",
      image: product4,
    },
    {
      id: 8,
      name: "Royal Blue Silk Saree",
      category: "ethnic",
      price: "₹12,999",
      image: product5,
      isBestSeller: true,
    },
    {
      id: 9,
      name: "Dusty Rose Pashmina Hijab",
      category: "scarfs",
      price: "₹999",
      image: lookbook1,
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-brand-cream py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-caption mb-4 block">Our Collection</span>
            <h1 className="heading-display mb-6">Shop Premium Ethnic Wear</h1>
            <p className="text-body">
              Discover our curated selection of handcrafted ethnic wear, elegant
              abayas, and luxurious scarfs.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 md:top-24 z-40 bg-background border-b border-border py-4">
        <div className="section-container">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-6 py-2 text-sm font-body uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat.key
                    ? "bg-brand-charcoal text-brand-ivory"
                    : "bg-secondary text-brand-charcoal hover:bg-brand-champagne/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/shop/${product.id}`}
                className="group card-luxury"
              >
                <div className="relative image-zoom aspect-[3/4]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && <span className="badge-new">New Arrival</span>}
                    {product.isBestSeller && (
                      <span className="badge-premium">Best Seller</span>
                    )}
                  </div>
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/20 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background px-6 py-3 text-sm font-body uppercase tracking-wider text-brand-charcoal">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg text-brand-charcoal mb-2 group-hover:text-brand-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-body text-brand-gold font-medium">
                    {product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
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
