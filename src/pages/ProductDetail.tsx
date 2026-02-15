import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Star, Truck, RotateCcw, Ruler, ShieldCheck } from "lucide-react";
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

interface ProductFull {
  id: string;
  name: string;
  price: string;
  images: string[];
  category: string;
  tag?: string;
  fabric: string;
  description: string;
  careInstructions: string[];
  modelHeight: string;
  deliveryTime: string;
  sizes: string[];
}

const allProducts: ProductFull[] = [
  {
    id: "1", name: "Champagne Embroidered Abaya", price: "₹8,999",
    images: [productAbaya1, productAbaya2, productAbaya3],
    category: "Abayas", tag: "Best Seller",
    fabric: "Premium Korean Nida with chiffon inner lining",
    description: "A timeless champagne abaya featuring hand-stitched floral embroidery along the sleeves and hem. Designed with a relaxed A-line silhouette for effortless modesty.",
    careInstructions: ["Dry clean recommended", "Iron on low heat", "Do not bleach", "Store on padded hanger"],
    modelHeight: "Model is 5'6\" wearing size M",
    deliveryTime: "5–7 business days across India",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "2", name: "Ivory Lace Abaya", price: "₹7,499",
    images: [productAbaya2, productAbaya1, productAbaya4],
    category: "Abayas", tag: "New Arrival",
    fabric: "Soft Nida Silk with lace overlay",
    description: "An elegant ivory abaya adorned with delicate lace trim. The flowing silhouette and breathable fabric make it perfect for summer occasions.",
    careInstructions: ["Hand wash in cold water", "Iron on low heat inside out", "Do not tumble dry", "Hang to dry in shade"],
    modelHeight: "Model is 5'7\" wearing size S",
    deliveryTime: "5–7 business days across India",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "3", name: "Olive Belted A-Line Abaya", price: "₹6,999",
    images: [productAbaya3, productAbaya1, productAbaya2],
    category: "Abayas",
    fabric: "Premium Crepe with satin belt",
    description: "A structured olive abaya with a detachable satin belt. The clean A-line cut adds definition while maintaining a modest silhouette.",
    careInstructions: ["Dry clean only", "Iron on medium heat", "Do not wring", "Store flat"],
    modelHeight: "Model is 5'5\" wearing size M",
    deliveryTime: "5–7 business days across India",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "4", name: "Black Open Layered Abaya", price: "₹9,499",
    images: [productAbaya4, productAbaya3, productAbaya1],
    category: "Abayas", tag: "Premium",
    fabric: "Double-layered Chiffon with Nida base",
    description: "A luxurious open-front abaya featuring cascading chiffon layers over a Nida base. The cape-style sleeves add dramatic elegance perfect for events.",
    careInstructions: ["Dry clean recommended", "Steam to remove wrinkles", "Do not bleach", "Store on hanger"],
    modelHeight: "Model is 5'8\" wearing size L",
    deliveryTime: "5–7 business days across India",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "5", name: "Sage Embroidered Dress", price: "₹6,999",
    images: [productDress1, productDress2, productAbaya2],
    category: "Modest Dresses",
    fabric: "Cotton blend with thread embroidery",
    description: "A breezy sage modest dress with intricate thread embroidery on the bodice. Designed for everyday elegance with a relaxed fit.",
    careInstructions: ["Machine wash cold", "Iron on medium heat", "Do not bleach", "Tumble dry low"],
    modelHeight: "Model is 5'6\" wearing size M",
    deliveryTime: "5–7 business days across India",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "6", name: "Dusty Rose Maxi Dress", price: "₹5,999",
    images: [productDress2, productDress1, productOccasion1],
    category: "Modest Dresses", tag: "New Arrival",
    fabric: "Flowing Georgette with satin cuffs",
    description: "A romantic dusty rose maxi dress with subtle pleating and satin-finished cuffs. Perfect for gatherings and casual celebrations.",
    careInstructions: ["Hand wash recommended", "Iron on low heat", "Do not wring", "Hang dry"],
    modelHeight: "Model is 5'4\" wearing size S",
    deliveryTime: "5–7 business days across India",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "7", name: "Blush Pearl Occasion Gown", price: "₹12,999",
    images: [productOccasion1, productOccasion2, productDress1],
    category: "Occasion Wear", tag: "Exclusive",
    fabric: "Premium Silk Chiffon with pearl beadwork",
    description: "A stunning blush occasion gown featuring hand-sewn pearl beadwork along the neckline and sleeves. Ideal for weddings, walimas, and festive celebrations.",
    careInstructions: ["Dry clean only", "Do not iron directly on beadwork", "Store in garment bag", "Handle pearls with care"],
    modelHeight: "Model is 5'7\" wearing size M",
    deliveryTime: "7–10 business days across India",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "8", name: "Burgundy Embroidered Kaftan", price: "₹14,999",
    images: [productOccasion2, productOccasion1, productAbaya4],
    category: "Occasion Wear", tag: "Limited Edition",
    fabric: "Velvet blend with gold thread embroidery",
    description: "A regal burgundy kaftan with intricate gold thread embroidery. The relaxed kaftan cut makes it luxuriously comfortable while looking exceptionally festive.",
    careInstructions: ["Dry clean only", "Do not iron on embroidery", "Store flat or on padded hanger", "Avoid prolonged sun exposure"],
    modelHeight: "Model is 5'6\" wearing size L",
    deliveryTime: "7–10 business days across India",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "9", name: "Mocha Jilbab Set", price: "₹5,499",
    images: [productJilbab1, productJilbab2, productKhimar1],
    category: "Jilbab & Makhna", tag: "Best Seller",
    fabric: "Premium Medina Silk",
    description: "A two-piece mocha jilbab set with matching makhna. The flowing cut provides full coverage with effortless grace, perfect for daily wear and prayer.",
    careInstructions: ["Hand wash in cold water", "Iron on low heat", "Do not bleach", "Air dry"],
    modelHeight: "Model is 5'5\" wearing standard size",
    deliveryTime: "5–7 business days across India",
    sizes: ["Standard", "Large"],
  },
  {
    id: "10", name: "Olive Jilbab Makhna Set", price: "₹5,999",
    images: [productJilbab2, productJilbab1, productKhimar2],
    category: "Jilbab & Makhna",
    fabric: "Nida with Lycra makhna",
    description: "An olive green jilbab set paired with a comfortable Lycra makhna. The semi-fitted design gives a modern look while maintaining full modesty.",
    careInstructions: ["Machine wash cold gentle cycle", "Do not wring", "Iron on low heat", "Air dry flat"],
    modelHeight: "Model is 5'6\" wearing standard size",
    deliveryTime: "5–7 business days across India",
    sizes: ["Standard", "Large"],
  },
  {
    id: "11", name: "Ivory Lace Khimar", price: "₹3,999",
    images: [productKhimar1, productKhimar2, productJilbab1],
    category: "Khimar & Prayer", tag: "Premium",
    fabric: "Soft Chiffon with lace edging",
    description: "A graceful ivory khimar with delicate lace edging. Designed for prayer and everyday modesty with lightweight breathable fabric.",
    careInstructions: ["Hand wash gently", "Do not wring", "Iron on lowest heat", "Store folded"],
    modelHeight: "One size fits most",
    deliveryTime: "4–6 business days across India",
    sizes: ["One Size"],
  },
  {
    id: "12", name: "Sage Prayer Gown", price: "₹4,499",
    images: [productKhimar2, productKhimar1, productJilbab2],
    category: "Khimar & Prayer", tag: "New Arrival",
    fabric: "Cotton Nida blend",
    description: "A serene sage prayer gown that slips on easily over any outfit. The generous cut ensures full coverage and comfort during salah.",
    careInstructions: ["Machine wash cold", "Tumble dry low", "Iron on low heat", "Easy to maintain"],
    modelHeight: "One size fits most",
    deliveryTime: "4–6 business days across India",
    sizes: ["One Size"],
  },
  {
    id: "13", name: "Champagne Silk Hijab", price: "₹1,499",
    images: [productHijab1, collectionHijabs, productKhimar1],
    category: "Hijabs & Scarves",
    fabric: "Pure Silk Satin",
    description: "A luxurious champagne silk hijab with a natural sheen. The premium silk drapes beautifully and stays in place throughout the day.",
    careInstructions: ["Hand wash in cold water", "Do not wring", "Iron on silk setting", "Store rolled, not folded"],
    modelHeight: "Standard size 180cm × 70cm",
    deliveryTime: "3–5 business days across India",
    sizes: ["Standard"],
  },
  {
    id: "14", name: "Premium Hijab Collection", price: "₹2,999",
    images: [collectionHijabs, productHijab1, productKhimar2],
    category: "Hijabs & Scarves", tag: "Best Seller",
    fabric: "Premium Jersey and Chiffon mix",
    description: "A curated set of 3 premium hijabs in complementary neutral tones. Includes one jersey, one chiffon, and one cotton blend for versatile everyday styling.",
    careInstructions: ["Wash separately by fabric", "Iron as per fabric type", "Do not bleach", "Store neatly folded"],
    modelHeight: "Standard size 180cm × 70cm each",
    deliveryTime: "3–5 business days across India",
    sizes: ["Standard Set"],
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="section-container text-center">
            <h1 className="heading-section mb-4">Product Not Found</h1>
            <Link to="/shop" className="btn-hero">Back to Shop</Link>
          </div>
        </section>
      </Layout>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${product.name} (${product.price})${selectedSize ? `, Size: ${selectedSize}` : ""}. Is it available?`
  );

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="bg-brand-cream py-4">
        <div className="section-container">
          <nav className="flex items-center gap-2 text-xs font-body text-brand-warm-gray">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-brand-charcoal">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Content */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Images */}
            <div>
              <div className="relative aspect-[3/4] overflow-hidden mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.tag && (
                  <span className="absolute top-4 left-4 bg-brand-charcoal text-brand-ivory px-3 py-1 text-xs font-body uppercase tracking-wide">
                    {product.tag}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square overflow-hidden border-2 transition-all ${
                      selectedImage === i ? "border-brand-gold" : "border-transparent hover:border-brand-champagne"
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <span className="text-caption mb-2">{product.category}</span>
              <h1 className="font-display text-3xl md:text-4xl text-brand-charcoal mb-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <span className="text-xs font-body text-brand-warm-gray">(24 reviews)</span>
              </div>

              <p className="font-display text-2xl text-brand-charcoal font-medium mb-6">{product.price}</p>

              <p className="text-body mb-8">{product.description}</p>

              {/* Fabric */}
              <div className="mb-6">
                <h3 className="font-body text-sm uppercase tracking-wide text-brand-charcoal font-medium mb-2">
                  Fabric
                </h3>
                <p className="font-body text-sm text-brand-warm-gray">{product.fabric}</p>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-body text-sm uppercase tracking-wide text-brand-charcoal font-medium">
                    Select Size
                  </h3>
                  <Link to="/size-guide" className="text-xs text-brand-gold hover:underline font-body flex items-center gap-1">
                    <Ruler size={12} /> Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 font-body text-sm border transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-brand-charcoal text-brand-ivory border-brand-charcoal"
                          : "border-border text-brand-charcoal hover:border-brand-charcoal"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Model Height */}
              <p className="font-body text-xs text-brand-warm-gray mb-6 italic">{product.modelHeight}</p>

              {/* CTA */}
              <a
                href={`https://wa.me/919502509455?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero w-full text-center mb-4"
              >
                Order via WhatsApp
              </a>
              <Link
                to="/checkout"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-brand-charcoal text-brand-charcoal font-body font-medium tracking-wide uppercase text-sm bg-transparent transition-all duration-300 ease-out hover:bg-brand-charcoal hover:text-brand-ivory w-full text-center"
              >
                Proceed to Payment
              </Link>

              {/* Trust Icons */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-brand-gold" />
                  <span className="font-body text-xs text-brand-warm-gray">{product.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={16} className="text-brand-gold" />
                  <span className="font-body text-xs text-brand-warm-gray">7-day easy returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-brand-gold" />
                  <span className="font-body text-xs text-brand-warm-gray">Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler size={16} className="text-brand-gold" />
                  <span className="font-body text-xs text-brand-warm-gray">True to size</span>
                </div>
              </div>

              {/* Care Instructions */}
              <div className="mt-8 pt-6 border-t border-border/30">
                <h3 className="font-body text-sm uppercase tracking-wide text-brand-charcoal font-medium mb-3">
                  Care Instructions
                </h3>
                <ul className="space-y-1.5">
                  {product.careInstructions.map((care, i) => (
                    <li key={i} className="font-body text-sm text-brand-warm-gray flex items-start gap-2">
                      <span className="text-brand-gold mt-0.5">•</span>
                      {care}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Back to Shop */}
          <div className="mt-16 text-center">
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-body text-brand-warm-gray hover:text-brand-gold transition-colors">
              <ArrowLeft size={16} /> Back to Shop
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
