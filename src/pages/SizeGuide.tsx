import Layout from "@/components/layout/Layout";
import { Ruler } from "lucide-react";

const sizeData = [
  { size: "S", bust: "34", waist: "28", hips: "36", length: "56" },
  { size: "M", bust: "36", waist: "30", hips: "38", length: "57" },
  { size: "L", bust: "38", waist: "32", hips: "40", length: "58" },
  { size: "XL", bust: "40", waist: "34", hips: "42", length: "59" },
  { size: "XXL", bust: "42", waist: "36", hips: "44", length: "60" },
];

const measurements = [
  {
    name: "Bust",
    instruction: "Measure around the fullest part of your bust, keeping the tape level.",
  },
  {
    name: "Waist",
    instruction: "Measure around your natural waistline, the narrowest part of your torso.",
  },
  {
    name: "Hips",
    instruction: "Measure around the widest part of your hips, about 8 inches below your waist.",
  },
  {
    name: "Length",
    instruction: "Measure from the top of your shoulder down to your desired hemline.",
  },
];

const SizeGuide = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-brand-cream py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-caption mb-4 block">Fit Guide</span>
            <h1 className="heading-display mb-6">Size Guide</h1>
            <p className="text-body">
              Find your perfect fit. All measurements are in inches. We recommend measuring
              over lightweight clothing for the most accurate results.
            </p>
          </div>
        </div>
      </section>

      {/* Size Chart */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-section mb-8 text-center">Size Chart</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-brand-charcoal text-brand-ivory">
                    <th className="px-6 py-4 font-body text-sm uppercase tracking-wide text-left">Size</th>
                    <th className="px-6 py-4 font-body text-sm uppercase tracking-wide text-center">Bust (in)</th>
                    <th className="px-6 py-4 font-body text-sm uppercase tracking-wide text-center">Waist (in)</th>
                    <th className="px-6 py-4 font-body text-sm uppercase tracking-wide text-center">Hips (in)</th>
                    <th className="px-6 py-4 font-body text-sm uppercase tracking-wide text-center">Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((row, i) => (
                    <tr
                      key={row.size}
                      className={`border-b border-border/30 ${i % 2 === 0 ? "bg-brand-cream/50" : "bg-background"}`}
                    >
                      <td className="px-6 py-4 font-display text-lg text-brand-charcoal font-medium">{row.size}</td>
                      <td className="px-6 py-4 font-body text-brand-warm-gray text-center">{row.bust}</td>
                      <td className="px-6 py-4 font-body text-brand-warm-gray text-center">{row.waist}</td>
                      <td className="px-6 py-4 font-body text-brand-warm-gray text-center">{row.hips}</td>
                      <td className="px-6 py-4 font-body text-brand-warm-gray text-center">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs font-body text-brand-warm-gray text-center">
              * Measurements may vary slightly. If you fall between two sizes, we recommend sizing up for a comfortable fit.
            </p>
          </div>
        </div>
      </section>

      {/* How to Measure */}
      <section className="section-padding bg-brand-cream">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-caption mb-4 block">How To Measure</span>
              <h2 className="heading-section">Measuring Guide</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {measurements.map((m) => (
                <div key={m.name} className="flex items-start gap-4 p-6 bg-background border border-border/30">
                  <div className="w-10 h-10 flex items-center justify-center border border-brand-gold/30 text-brand-gold flex-shrink-0">
                    <Ruler size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-brand-charcoal mb-1">{m.name}</h3>
                    <p className="font-body text-sm text-brand-warm-gray leading-relaxed">
                      {m.instruction}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-section mb-8">Fit Tips</h2>
            <div className="space-y-4 text-left">
              {[
                "Use a soft measuring tape for accuracy.",
                "Stand straight and breathe normally while measuring.",
                "For abayas and jilbabs, we suggest measuring your current best-fitting garment and comparing with our chart.",
                "Khimar and hijab sizes are standard — one size fits most.",
                "If in doubt, message us on WhatsApp with your measurements and we'll recommend a size.",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-brand-cream/50 border border-border/20">
                  <span className="text-brand-gold font-display text-lg font-medium">{i + 1}.</span>
                  <p className="font-body text-sm text-brand-warm-gray">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SizeGuide;
