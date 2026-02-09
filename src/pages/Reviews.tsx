import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";

interface Review {
  quote: string;
  author: string;
  location: string;
  rating: number;
  product?: string;
}

const reviews: Review[] = [
  {
    quote:
      "The quality of the abayas is exceptional. I've never felt so elegant and comfortable at the same time. JazakAllah khair for such beautiful pieces! The fabric drapes perfectly and the embroidery is stunning.",
    author: "Fatima Ahmed",
    location: "Dubai, UAE",
    rating: 5,
    product: "Navy Embroidered Abaya",
  },
  {
    quote:
      "StyledByNazima understands what modest fashion should be. The fabrics are premium, the designs are timeless, and the fit is perfect. I've received so many compliments!",
    author: "Aisha Rahman",
    location: "Hyderabad, India",
    rating: 5,
    product: "Ivory Lace Abaya",
  },
  {
    quote:
      "I wore the blush occasion gown to my sister's wedding and received so many compliments. It's my go-to brand for special occasions now. The attention to detail is remarkable.",
    author: "Mariam Khan",
    location: "London, UK",
    rating: 5,
    product: "Blush Pearl Occasion Gown",
  },
  {
    quote:
      "Finally found a brand that offers truly modest fashion without compromising on style. The hijabs are so soft and luxurious. I'm ordering more colors!",
    author: "Sara Ali",
    location: "Toronto, Canada",
    rating: 5,
    product: "Champagne Silk Hijab",
  },
  {
    quote:
      "As a mother, I am so happy to see such graceful modest dresses. May Allah put more barakah in this business! My daughter and I both love shopping here.",
    author: "Khadija Begum",
    location: "Mumbai, India",
    rating: 5,
    product: "Sage Embroidered Dress",
  },
  {
    quote:
      "The burgundy kaftan exceeded all my expectations. The gold embroidery is intricate and the fabric is so comfortable. Perfect for Eid celebrations!",
    author: "Zainab Hassan",
    location: "New York, USA",
    rating: 5,
    product: "Burgundy Embroidered Kaftan",
  },
  {
    quote:
      "I've been searching for premium modest wear for years. StyledByNazima delivers exactly what they promise - elegance, quality, and modesty. Highly recommend!",
    author: "Noor Fatima",
    location: "Jeddah, Saudi Arabia",
    rating: 5,
  },
  {
    quote:
      "The packaging was beautiful, shipping was fast, and the dress fits like a dream. Customer service was also very helpful. Will definitely order again!",
    author: "Amina Yusuf",
    location: "Melbourne, Australia",
    rating: 5,
    product: "Dusty Rose Maxi Dress",
  },
];

const Reviews = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-brand-cream py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-caption mb-4 block">Testimonials</span>
            <h1 className="heading-display mb-6">What Our Sisters Say</h1>
            <p className="text-body">
              Read genuine reviews from our valued customers around the world
              who have experienced the elegance of StyledByNazima.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-brand-cream p-8 border border-border/30"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-brand-gold text-brand-gold"
                    />
                  ))}
                </div>

                <blockquote className="font-display text-lg italic text-brand-charcoal leading-relaxed mb-6">
                  "{review.quote}"
                </blockquote>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <cite className="text-sm font-body font-medium text-brand-charcoal not-italic block">
                      {review.author}
                    </cite>
                    <span className="text-xs font-body text-brand-warm-gray">
                      {review.location}
                    </span>
                  </div>
                  {review.product && (
                    <span className="text-xs font-body text-brand-gold uppercase tracking-wide">
                      {review.product}
                    </span>
                  )}
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
            <h2 className="heading-section mb-6">Join Our Community</h2>
            <p className="text-body max-w-xl mx-auto mb-8">
              Experience the elegance of StyledByNazima and become part of our
              growing family of confident, modest Muslim women.
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
