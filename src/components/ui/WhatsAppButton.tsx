import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919502509455"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      aria-label="Order via WhatsApp"
    >
      <MessageCircle size={24} className="fill-white" />
      <span className="hidden sm:inline font-body text-sm font-medium">
        WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
