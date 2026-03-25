import { useState } from "react";
import { MapPin, Phone, Mail, Instagram, Send, MessageCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-brand-cream py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-caption mb-4 block">Get in Touch</span>
            <h1 className="heading-display mb-6">Contact Us</h1>
            <p className="text-body">
              Have questions about our collection or want to place an order? We'd
              love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="heading-section mb-8">Visit & Connect</h2>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-champagne/20 flex items-center justify-center">
                    <MapPin size={20} className="text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-brand-charcoal mb-2">
                      Store Address
                    </h3>
                    <p className="text-sm text-brand-warm-gray leading-relaxed">
                      PATEL'S RESIDENCY, H NO.xxx-xx-xx,
                      <br />
                      BORABANDA, HYDERABAD, 500018
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-champagne/20 flex items-center justify-center">
                    <Phone size={20} className="text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-brand-charcoal mb-2">
                      Call Us
                    </h3>
                    <a
                      href="tel:+919502509455"
                      className="text-sm text-brand-warm-gray hover:text-brand-gold transition-colors"
                    >
                      +91 9502509455
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-champagne/20 flex items-center justify-center">
                    <Mail size={20} className="text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-brand-charcoal mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:hello@styledbynazima.com"
                      className="text-sm text-brand-warm-gray hover:text-brand-gold transition-colors"
                    >
                      hello@styledbynazima.com
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-champagne/20 flex items-center justify-center">
                    <Instagram size={20} className="text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-brand-charcoal mb-2">
                      Follow Us
                    </h3>
                    <a
                      href="https://instagram.com/styledbynazima"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-warm-gray hover:text-brand-gold transition-colors"
                    >
                      @styledbynazima
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-12 p-6 bg-brand-cream border border-border/50">
                <h3 className="font-display text-lg text-brand-charcoal mb-3">
                  Quick Order via WhatsApp
                </h3>
                <p className="text-sm text-brand-warm-gray mb-4">
                  For the fastest response and to place orders directly, message us
                  on WhatsApp.
                </p>
                <a
                  href="https://wa.me/919502509455"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero inline-flex"
                >
                  <MessageCircle size={18} />
                  WhatsApp Order
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="heading-section mb-8">Send a Message</h2>

              {submitted ? (
                <div className="bg-brand-cream p-8 text-center">
                  <div className="w-16 h-16 bg-brand-gold/20 text-brand-gold mx-auto mb-4 flex items-center justify-center">
                    <Send size={28} />
                  </div>
                  <h3 className="heading-card mb-2">Thank You!</h3>
                  <p className="text-body">
                    We've received your message and will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-body font-medium text-brand-charcoal mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border text-brand-charcoal font-body placeholder:text-brand-warm-gray/50 focus:outline-none focus:border-brand-gold transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-body font-medium text-brand-charcoal mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border text-brand-charcoal font-body placeholder:text-brand-warm-gray/50 focus:outline-none focus:border-brand-gold transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-body font-medium text-brand-charcoal mb-2"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border text-brand-charcoal font-body placeholder:text-brand-warm-gray/50 focus:outline-none focus:border-brand-gold transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-body font-medium text-brand-charcoal mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-border text-brand-charcoal font-body placeholder:text-brand-warm-gray/50 focus:outline-none focus:border-brand-gold transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-hero w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
