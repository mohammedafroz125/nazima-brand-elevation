import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

const ReturnPolicy = () => {
  return (
    <Layout>
      <section className="bg-brand-cream py-16 md:py-24">
        <div className="section-container text-center">
          <span className="text-caption mb-4 block">Policies</span>
          <h1 className="heading-display mb-4">Return & Exchange Policy</h1>
          <p className="text-body max-w-xl mx-auto">
            Your satisfaction is our priority. We want you to love every piece.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl mx-auto space-y-12">
          {/* Return Window */}
          <div>
            <h2 className="heading-card mb-4">Return Window</h2>
            <p className="text-body text-sm">
              We accept returns and exchanges within <strong>7 days</strong> of
              delivery. Please contact us via WhatsApp or email within this
              period to initiate a return.
            </p>
          </div>

          {/* Eligible */}
          <div>
            <h2 className="heading-card mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-brand-gold" />
              Eligible for Return
            </h2>
            <ul className="space-y-3">
              {[
                "Items in original, unworn, and unwashed condition",
                "Items with all original tags and packaging intact",
                "Items that are defective or damaged upon arrival",
                "Wrong size or wrong item received",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-body text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Not Eligible */}
          <div>
            <h2 className="heading-card mb-4 flex items-center gap-2">
              <XCircle size={20} className="text-brand-rose" />
              Not Eligible for Return
            </h2>
            <ul className="space-y-3">
              {[
                "Items worn, washed, or altered in any way",
                "Items without original tags or packaging",
                "Customized or made-to-order pieces",
                "Items returned after the 7-day window",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-body text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-rose mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div>
            <h2 className="heading-card mb-4">How to Return</h2>
            <ol className="space-y-4">
              {[
                "Message us on WhatsApp (+91 9502509455) or email hello@styledbynazima.com with your order details.",
                "Our team will confirm eligibility and provide return shipping instructions.",
                "Ship the item back in its original packaging.",
                "Once received and inspected, we'll process your refund or exchange within 3–5 business days.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4 text-body text-sm">
                  <span className="w-7 h-7 rounded-full bg-brand-cream border border-border flex items-center justify-center flex-shrink-0 font-display text-sm text-brand-charcoal">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Refund */}
          <div className="bg-brand-cream p-8 border border-border/30">
            <h2 className="heading-card mb-4">Refund Information</h2>
            <p className="text-body text-sm">
              Refunds are processed to the original payment method within 3–5
              business days after we receive the returned item. Shipping charges
              are non-refundable unless the return is due to a defect or error
              on our part.
            </p>
          </div>

          <div className="text-center pt-4">
            <Link to="/contact" className="btn-hero-outline">
              Contact Us for Help
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReturnPolicy;
