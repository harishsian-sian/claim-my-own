import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-background mt-20">
      <div className="container mx-auto px-4 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-display text-2xl font-bold tracking-tight uppercase">
            Melton<span className="text-brand">Supps</span>
          </span>
          <p className="mt-4 text-sm text-background/70 max-w-md leading-relaxed">
            Australia's trusted source for health and sports supplements.
            Performance, recovery and wellness — backed by real brands.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-wider mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/" className="hover:text-brand">Home</Link></li>
            <li><Link to="/products" className="hover:text-brand">Shop All</Link></li>
            <li><Link to="/products" search={{ q: "tag:sale" }} className="hover:text-brand">Specials</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /><span>03 8746 4680</span></li>
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /><span>hello@meltonsupps.com.au</span></li>
            <li className="flex items-start gap-2"><MapPin className="h-3.5 w-3.5 mt-0.5" /><span>Melton, VIC, Australia</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-5 text-xs text-background/50 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} MeltonSupps. All rights reserved.</span>
          <span>Secure checkout powered by Shopify.</span>
        </div>
      </div>
    </footer>
  );
}
