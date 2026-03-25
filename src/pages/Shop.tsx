import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

import productAbaya1 from "@/assets/product-abaya-1.jpg";
import productAbaya2 from "@/assets/product-abaya-2.jpg";
import productAbaya3 from "@/assets/product-abaya-3.jpg";
import productAbaya4 from "@/assets/product-abaya-4.jpg";
import productDress1 from "@/assets/product-dress-1.jpg";
import productDress2 from "@/assets/product-dress-2.jpg";
import productHijab1 from "@/assets/product-hijab-1.jpg";
import productOccasion1 from "@/assets/product-occasion-1.jpg";
import productOccasion2 from "@/assets/product-occasion-2.jpg";
import productJilbab1 from "@/assets/product-jilbab-1.jpg";
import productJilbab2 from "@/assets/product-jilbab-2.jpg";
import productKhimar1 from "@/assets/product-khimar-1.jpg";
import productKhimar2 from "@/assets/product-khimar-2.jpg";
import collectionHijabs from "@/assets/collection-hijabs.jpg";
import genericProduct1 from "@/assets/product-1.jpg";
import genericProduct2 from "@/assets/product-2.jpg";
import genericProduct3 from "@/assets/product-3.jpg";
import genericProduct4 from "@/assets/product-4.jpg";
import genericProduct5 from "@/assets/product-5.jpg";

interface ProductApi {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  tag?: string;
}

const categories = [
  { id: "all", label: "All" },
  { id: "abayas", label: "Abayas" },
  { id: "jilbab", label: "Jilbab & Makhna" },
  { id: "khimar", label: "Khimar & Prayer" },
  { id: "dresses", label: "Modest Dresses" },
  { id: "hijabs", label: "Hijabs & Scarves" },
  { id: "occasion", label: "Occasion Wear" },
];

const staticProducts: ProductApi[] = [
  { id: "1", name: "Champagne Embroidered Abaya", price: 8999, imageUrl: productAbaya1, category: "abayas", tag: "Best Seller" },
  { id: "2", name: "Ivory Lace Abaya", price: 7499, imageUrl: productAbaya2, category: "abayas", tag: "New Arrival" },
  { id: "3", name: "Olive Belted A-Line Abaya", price: 6999, imageUrl: productAbaya3, category: "abayas" },
  { id: "4", name: "Black Open Layered Abaya", price: 9499, imageUrl: productAbaya4, category: "abayas", tag: "Premium" },
  { id: "5", name: "Sage Embroidered Dress", price: 6999, imageUrl: productDress1, category: "dresses" },
  { id: "6", name: "Dusty Rose Maxi Dress", price: 5999, imageUrl: productDress2, category: "dresses", tag: "New Arrival" },
  { id: "7", name: "Blush Pearl Occasion Gown", price: 12999, imageUrl: productOccasion1, category: "occasion", tag: "Exclusive" },
  { id: "8", name: "Burgundy Embroidered Kaftan", price: 14999, imageUrl: productOccasion2, category: "occasion", tag: "Limited Edition" },
  { id: "9", name: "Mocha Jilbab Set", price: 5499, imageUrl: productJilbab1, category: "jilbab", tag: "Best Seller" },
  { id: "10", name: "Olive Jilbab Makhna Set", price: 5999, imageUrl: productJilbab2, category: "jilbab" },
  { id: "11", name: "Ivory Lace Khimar", price: 3999, imageUrl: productKhimar1, category: "khimar", tag: "Premium" },
  { id: "12", name: "Sage Prayer Gown", price: 4499, imageUrl: productKhimar2, category: "khimar", tag: "New Arrival" },
  { id: "13", name: "Champagne Silk Hijab", price: 1499, imageUrl: productHijab1, category: "hijabs" },
  { id: "14", name: "Premium Hijab Collection", price: 2999, imageUrl: collectionHijabs, category: "hijabs", tag: "Best Seller" },
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [apiProducts, setApiProducts] = useState<ProductApi[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        const fromApi: ProductApi[] = Array.isArray(data)
          ? data.map((p: any) => ({
              id: String(p.id || ""),
              name: String(p.name || ""),
              price: Number(p.price || 0),
              imageUrl: String(p.imageUrl || ""),
              category: String(p.category || ""),
            }))
          : [];
        setApiProducts(fromApi);
      } catch {
        setApiProducts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const allProducts = useMemo(() => {
    const combined = [...apiProducts, ...staticProducts];
    const unique: ProductApi[] = [];
    const seen = new Set<string>();
    for (const product of combined) {
      const key = product.id || product.name;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(product);
      }
    }
    return unique;
  }, [apiProducts]);

  const imageMap: Record<string, string> = {
    "/assets/product-abaya-1.jpg": productAbaya1,
    "/assets/product-abaya-2.jpg": productAbaya2,
    "/assets/product-abaya-3.jpg": productAbaya3,
    "/assets/product-abaya-4.jpg": productAbaya4,
    "/assets/product-dress-1.jpg": productDress1,
    "/assets/product-dress-2.jpg": productDress2,
    "/assets/product-hijab-1.jpg": productHijab1,
    "/assets/product-occasion-1.jpg": productOccasion1,
    "/assets/product-occasion-2.jpg": productOccasion2,
    "/assets/product-jilbab-1.jpg": productJilbab1,
    "/assets/product-jilbab-2.jpg": productJilbab2,
    "/assets/product-khimar-1.jpg": productKhimar1,
    "/assets/product-khimar-2.jpg": productKhimar2,
    "/assets/collection-hijabs.jpg": collectionHijabs,
    "/assets/product-1.jpg": genericProduct1,
    "/assets/product-2.jpg": genericProduct2,
    "/assets/product-3.jpg": genericProduct3,
    "/assets/product-4.jpg": genericProduct4,
    "/assets/product-5.jpg": genericProduct5,
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-brand-cream py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-caption mb-4 block">Our Collections</span>
            <h1 className="heading-display mb-6">Shop</h1>
            <p className="text-body">
              Discover our curated selection of premium modest fashion — from luxury abayas and jilbab sets to prayer wear and bridal pieces.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border/50">
        <div className="section-container">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 font-body text-xs md:text-sm uppercase tracking-wide transition-all duration-300 ${
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
          {loading ? (
            <div className="text-center py-16">
              <p className="text-body">Loading products…</p>
            </div>
          ) : allProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-body">No products found.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {allProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden mb-4">
                    <img
                      src={imageMap[product.imageUrl] ?? product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/20 transition-all duration-500 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-ivory text-brand-charcoal px-6 py-3 font-body text-sm uppercase tracking-wide">
                        View Details
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-brand-warm-gray font-body uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h3 className="font-display text-lg text-brand-charcoal mt-1 mb-2 group-hover:text-brand-gold transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="font-body text-brand-charcoal font-medium">₹{product.price.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-12 bg-brand-cream">
        <div className="section-container">
          <div className="text-center">
            <p className="text-body mb-4">Want to place an order or have questions?</p>
            <a href="https://wa.me/919502509455" target="_blank" rel="noopener noreferrer" className="btn-hero">
              Order via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
