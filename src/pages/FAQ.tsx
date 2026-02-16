import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do I place an order?",
    a: "Browse our collection, select your size, and add items to your cart. You can also place orders directly via WhatsApp by messaging us at +91 9502509455.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, bank transfer, and cash on delivery (select locations). Online payment options will be available soon.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 5–7 business days across India. Express shipping (2–3 days) is available for select cities.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes! We ship to the UAE, UK, US, and other countries. International delivery takes 10–15 business days. Contact us for exact rates.",
  },
  {
    q: "How do I find my size?",
    a: "Please refer to our Size Guide page for detailed measurements. If you're between sizes, we recommend going one size up for a comfortable modest fit.",
  },
  {
    q: "Can I return or exchange an item?",
    a: "Yes, we accept returns and exchanges within 7 days of delivery. Items must be unworn, unwashed, and in original packaging. Please see our Return Policy page for full details.",
  },
  {
    q: "Are your fabrics suitable for hot weather?",
    a: "Absolutely. We use breathable fabrics like Premium Korean Nida and light chiffon that are comfortable even in warm climates.",
  },
  {
    q: "Do you offer custom sizing or alterations?",
    a: "Yes, we offer custom sizing for select pieces. Please contact us via WhatsApp with your measurements and we'll accommodate your request.",
  },
  {
    q: "How do I care for my abaya?",
    a: "We recommend hand washing in cold water and air drying. Visit our Fabric Care page for detailed care instructions for each fabric type.",
  },
  {
    q: "Can I see more photos of a product before ordering?",
    a: "Of course! Message us on WhatsApp and we'll send you additional photos, videos, and fabric close-ups of any product.",
  },
];

const FAQ = () => {
  return (
    <Layout>
      <section className="bg-brand-cream py-16 md:py-24">
        <div className="section-container text-center">
          <span className="text-caption mb-4 block">Help</span>
          <h1 className="heading-display mb-4">Frequently Asked Questions</h1>
          <p className="text-body max-w-xl mx-auto">
            Everything you need to know about shopping with StyledByNazima.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border/50">
                <AccordionTrigger className="font-display text-left text-brand-charcoal text-base md:text-lg hover:no-underline hover:text-brand-gold transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-body text-sm leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="section-container text-center">
          <h2 className="heading-section mb-4">Still Have Questions?</h2>
          <p className="text-body mb-8">
            Our team is happy to help. Reach out to us anytime.
          </p>
          <a
            href="https://wa.me/919502509455"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hero"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
