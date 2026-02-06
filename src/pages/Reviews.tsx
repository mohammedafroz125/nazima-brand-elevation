import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  product?: string;
}

const Reviews = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: "Salma Tabassum",
      location: "Hyderabad",
      rating: 5,
      review:
        "Beautiful collection with elegant designs and premium quality fabrics. The attention to detail is remarkable. I've purchased multiple pieces and each one has exceeded my expectations.",
      product: "Burgundy Velvet Anarkali",
    },
    {
      id: 2,
      name: "Shama Afreen",
      location: "Mumbai",
      rating: 5,
      review:
        "Loved the detailing and comfort – truly worth every purchase. The fabric quality is exceptional and the fit is perfect. Will definitely be ordering more!",
      product: "Navy Blue Classic Abaya",
    },
    {
      id: 3,
      name: "Fatima",
      location: "Delhi",
      rating: 5,
      review:
        "As a mother, I am so happy to see such graceful dresses. May Allah put more barakah in this business and bless the hands that designed these clothes. Love you mera baccha!",
      product: "Ivory Pink Kurta Set",
    },
    {
      id: 4,
      name: "Ayesha Khan",
      location: "Bangalore",
      rating: 5,
      review:
        "The craftsmanship is absolutely stunning. Every time I wear my abaya from StyledByNazima, I receive so many compliments. The quality truly justifies the premium pricing.",
      product: "Black Embroidered Abaya",
    },
    {
      id: 5,
      name: "Zainab Hussain",
      location: "Chennai",
      rating: 5,
      review:
        "I ordered the silk scarf set and I'm in love! The colors are exactly as shown and the fabric is so soft and luxurious. Perfect for both casual and formal occasions.",
      product: "Pastel Silk Scarf Set",
    },
    {
      id: 6,
      name: "Rukhsar Begum",
      location: "Hyderabad",
      rating: 5,
      review:
        "StyledByNazima has become my go-to for ethnic wear. The designs are unique and the quality is consistently excellent. The customer service is also wonderful – very responsive on WhatsApp.",
    },
    {
      id: 7,
      name: "Mariam Siddiqui",
      location: "Pune",
      rating: 5,
      review:
        "Ordered for my daughter's engagement and everyone was asking where we got the outfit from! The embroidery work is so intricate and beautiful. Highly recommend!",
      product: "Coral Gold Embroidered Suit",
    },
    {
      id: 8,
      name: "Nadia Patel",
      location: "Ahmedabad",
      rating: 5,
      review:
        "Finally found a brand that understands modest fashion without compromising on style. The abayas are elegant and the fit is flattering. Thank you StyledByNazima!",
      product: "Sage Green Flowing Abaya",
    },
  ];

  const renderStars = (rating: number) => {
    return Array(rating)
      .fill(0)
      .map((_, i) => (
        <Star key={i} size={16} className="fill-brand-gold text-brand-gold" />
      ));
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-brand-cream py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-caption mb-4 block">Customer Love</span>
            <h1 className="heading-display mb-6">What Our Customers Say</h1>
            <p className="text-body">
              Real stories from our valued customers. Their words inspire us to
              continue creating beautiful, quality ethnic wear.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-card p-8 border border-border/50 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">{renderStars(review.rating)}</div>

                {/* Review */}
                <blockquote className="font-display text-lg italic text-brand-charcoal leading-relaxed mb-6 flex-1">
                  "{review.review}"
                </blockquote>

                {/* Product */}
                {review.product && (
                  <p className="text-xs text-brand-warm-gray mb-4">
                    Purchased: {review.product}
                  </p>
                )}

                {/* Author */}
                <div className="pt-4 border-t border-border/50">
                  <cite className="not-italic">
                    <span className="block font-body font-medium text-brand-charcoal">
                      {review.name}
                    </span>
                    <span className="text-sm text-brand-gold">
                      {review.location}
                    </span>
                  </cite>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-cream">
        <div className="section-container">
          <div className="text-center">
            <h2 className="heading-section mb-4">Ready to Experience the Quality?</h2>
            <p className="text-body max-w-xl mx-auto mb-8">
              Join our family of satisfied customers and discover the elegance of
              StyledByNazima.
            </p>
            <Link to="/shop" className="btn-hero">
              Shop Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Reviews;
