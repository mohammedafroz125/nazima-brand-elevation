import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import productAbaya1 from "@/assets/product-abaya-1.jpg";
import productAbaya2 from "@/assets/product-abaya-2.jpg";
import productDress1 from "@/assets/product-dress-1.jpg";
import productOccasion1 from "@/assets/product-occasion-1.jpg";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  tag?: string;
  category: string;
}

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Navy Embroidered Abaya",
    price: "₹8,999",
    image: productAbaya1,
    tag: "Best Seller",
    category: "Abayas",
  },
  {
    id: "2",
    name: "Ivory Lace Abaya",
    price: "₹7,499",
    image: productAbaya2,
    tag: "New Arrival",
    category: "Abayas",
  },
  {
    id: "3",
    name: "Sage Embroidered Dress",
    price: "₹6,999",
    image: productDress1,
    category: "Modest Dresses",
  },
  {
    id: "4",
    name: "Blush Pearl Gown",
    price: "₹12,999",
    image: productOccasion1,
    tag: "Premium",
    category: "Occasion Wear",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-caption mb-4 block">Handpicked For You</span>
            <h2 className="heading-section">Featured Pieces</h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-brand-gold font-body uppercase tracking-wide text-sm mt-4 md:mt-0 hover:gap-3 transition-all duration-300"
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
              </div>
              <div>
                <span className="text-xs text-brand-warm-gray font-body uppercase tracking-wide">
                  {product.category}
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
      </div>
    </section>
  );
};

export default FeaturedProducts;
