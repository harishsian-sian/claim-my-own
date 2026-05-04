import { useEffect, useState } from "react";

const MESSAGES = [
  "Spend $99 and get FREE shipping Australia-wide",
  "AfterPay & ZipPay available at checkout",
  "Price match guarantee — found it cheaper? We'll match it",
];

export function PromoBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % MESSAGES.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-ink text-background text-center text-xs md:text-sm py-2.5 px-4 font-medium overflow-hidden">
      <div key={i} className="animate-fade-in">
        {MESSAGES[i]}
      </div>
    </div>
  );
}
