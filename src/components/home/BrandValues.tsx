import { Heart, Award, Sparkles, Shield } from "lucide-react";

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Modesty First",
    description: "Every piece designed with Islamic modesty principles at heart",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Premium Quality",
    description: "Only the finest fabrics selected for lasting elegance",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Timeless Design",
    description: "Classic styles that transcend seasonal trends",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Trusted Brand",
    description: "Serving Muslim women with care and authenticity",
  },
];

const BrandValues = () => {
  return (
    <section className="section-padding bg-brand-cream">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="text-caption mb-4 block">Why Choose Us</span>
          <h2 className="heading-section">Our Promise</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="text-center p-8 bg-background border border-border/30 transition-all duration-300 hover:shadow-lg hover:border-brand-gold/30"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-cream text-brand-gold mb-6">
                {value.icon}
              </div>
              <h3 className="font-display text-xl text-brand-charcoal mb-3">
                {value.title}
              </h3>
              <p className="font-body text-sm text-brand-warm-gray leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandValues;
