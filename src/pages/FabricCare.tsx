import Layout from "@/components/layout/Layout";
import { Droplets, Wind, Sun, Shirt } from "lucide-react";

const careGuides = [
  {
    icon: Droplets,
    title: "Washing",
    tips: [
      "Hand wash in cold water with mild detergent",
      "Turn garment inside out before washing",
      "Avoid bleach and harsh chemicals",
      "Machine wash on delicate cycle in a mesh bag",
    ],
  },
  {
    icon: Wind,
    title: "Drying",
    tips: [
      "Air dry flat or on a padded hanger",
      "Avoid direct sunlight to prevent fading",
      "Do not tumble dry — heat damages delicate fabrics",
      "Reshape while damp for best results",
    ],
  },
  {
    icon: Sun,
    title: "Ironing",
    tips: [
      "Iron on low heat with garment inside out",
      "Use a pressing cloth for embroidered areas",
      "Steam is preferred over direct contact",
      "Avoid ironing over embellishments directly",
    ],
  },
  {
    icon: Shirt,
    title: "Storage",
    tips: [
      "Hang abayas and jilbabs on padded hangers",
      "Store hijabs folded in a cool, dry place",
      "Use breathable garment bags for special occasions",
      "Keep away from strong perfumes and moisture",
    ],
  },
];

const fabrics = [
  { name: "Premium Korean Nida", care: "Cold hand wash, low iron, air dry" },
  { name: "Chiffon", care: "Gentle hand wash, steam only, hang dry" },
  { name: "Crepe", care: "Cold wash, medium iron inside out, flat dry" },
  { name: "Silk Blend", care: "Dry clean recommended, steam, padded hanger" },
  { name: "Cotton Jersey", care: "Machine wash cold, medium iron, tumble dry low" },
  { name: "Georgette", care: "Hand wash cold, low iron with cloth, hang dry" },
];

const FabricCare = () => {
  return (
    <Layout>
      <section className="bg-brand-cream py-16 md:py-24">
        <div className="section-container text-center">
          <span className="text-caption mb-4 block">Care Guide</span>
          <h1 className="heading-display mb-4">Fabric Care</h1>
          <p className="text-body max-w-xl mx-auto">
            Preserve the beauty and longevity of your StyledByNazima pieces with
            our fabric care guide.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8">
            {careGuides.map((guide) => (
              <div key={guide.title} className="bg-brand-cream p-8 border border-border/30">
                <div className="flex items-center gap-3 mb-6">
                  <guide.icon size={24} className="text-brand-gold" />
                  <h2 className="heading-card">{guide.title}</h2>
                </div>
                <ul className="space-y-3">
                  {guide.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-body text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-caption mb-4 block">By Fabric</span>
            <h2 className="heading-section">Care by Fabric Type</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-4">
              {fabrics.map((f) => (
                <div
                  key={f.name}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 bg-background border border-border/30"
                >
                  <span className="font-display text-lg text-brand-charcoal">{f.name}</span>
                  <span className="text-sm text-brand-warm-gray font-body">{f.care}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FabricCare;
