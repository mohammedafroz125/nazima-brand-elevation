import { Truck, RotateCcw, ShieldCheck, Heart } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "Free shipping on orders above ₹5,000",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free return policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% safe & encrypted checkout",
  },
  {
    icon: Heart,
    title: "Designed for Modest Muslim Women",
    description: "Faith-first fashion, always",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-12 md:py-16 bg-brand-cream border-y border-border/30">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center border border-brand-gold/30 text-brand-gold">
                <badge.icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-sm md:text-base text-brand-charcoal font-medium">
                {badge.title}
              </h3>
              <p className="font-body text-xs text-brand-warm-gray leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
