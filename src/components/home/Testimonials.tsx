import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The quality of the abayas is exceptional. I've never felt so elegant and comfortable at the same time. JazakAllah khair for such beautiful pieces!",
    author: "Salma Afreen",
    location: "Hyderabad, India",
    rating: 5,
    avatar: lookbook1,
  },
  {
    quote:
      "StyledByNazima understands what modest fashion should be. The fabrics are premium, the designs are timeless, and the fit is perfect.",
    author: "Fatima Begum",
    location: "Dubai, UAE",
    rating: 5,
    avatar: lookbook2,
  },
  {
    quote:
      "I wore the blush occasion gown to my sister's wedding and received so many compliments. It's my go-to brand for special occasions now.",
    author: "Afreen Khan",
    location: "London, UK",
    rating: 5,
    avatar: lookbook3,
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="text-caption mb-4 block">Testimonials</span>
          <h2 className="heading-section">What Our Sisters Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-brand-cream p-8 border border-border/30"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-brand-gold text-brand-gold"
                  />
                ))}
              </div>
              
              <blockquote className="font-display text-lg italic text-brand-charcoal leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-11 h-11 rounded-full object-cover object-top border border-brand-gold/30 flex-shrink-0"
                />
                <div>
                  <cite className="text-sm font-body font-medium text-brand-charcoal not-italic block">
                    {testimonial.author}
                  </cite>
                  <span className="text-xs font-body text-brand-warm-gray">
                    {testimonial.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/reviews" className="btn-hero-outline">
            Read All Reviews
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
