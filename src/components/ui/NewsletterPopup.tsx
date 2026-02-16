import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("sbn_newsletter_dismissed")) return;
    const timer = setTimeout(() => setIsOpen(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("sbn_newsletter_dismissed", "1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    sessionStorage.setItem("sbn_newsletter_dismissed", "1");
    setTimeout(() => setIsOpen(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-charcoal/40 backdrop-blur-sm z-[60]"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
          >
            <div className="relative bg-background border border-border w-full max-w-md p-8 md:p-10 text-center">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {!submitted ? (
                <>
                  <span className="text-caption mb-3 block">Exclusive Offer</span>
                  <h3 className="font-display text-2xl md:text-3xl text-brand-charcoal mb-3">
                    Get 10% Off
                  </h3>
                  <p className="text-body text-sm mb-6">
                    Join the StyledByNazima family and receive 10% off your first
                    order. Be the first to know about new collections and exclusive
                    offers.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-brand-gold transition-colors"
                    />
                    <button type="submit" className="btn-hero w-full justify-center">
                      Claim My 10% Off
                    </button>
                  </form>
                  <p className="text-xs text-muted-foreground mt-4">
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                <div className="py-4">
                  <span className="text-caption mb-3 block">Welcome</span>
                  <h3 className="font-display text-2xl text-brand-charcoal mb-3">
                    JazakAllah Khair! ✨
                  </h3>
                  <p className="text-body text-sm">
                    Your 10% discount code has been sent to your inbox.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
