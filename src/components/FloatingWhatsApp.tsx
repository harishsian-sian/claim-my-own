import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const PHONE = "61387464680"; // +61 3 8746 4680

export function FloatingWhatsApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Hi MeltonSupps, I have a question…")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 transition-transform"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
