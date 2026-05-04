import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-background mt-20">
      {/* TGA / health disclaimer band */}
      <div className="bg-brand-dark text-background/95">
        <div className="container mx-auto px-4 py-3 text-xs md:text-sm text-center">
          <strong>Always read the label and follow the directions for use.</strong>{" "}
          If symptoms persist, talk to your healthcare professional. Supplements should not replace a balanced diet.
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <span className="font-display text-2xl font-bold tracking-tight uppercase">
            Melton<span className="text-brand">Supps</span>
          </span>
          <p className="mt-4 text-sm text-background/70 max-w-md leading-relaxed">
            Australia's trusted source for health and sports supplements.
            Performance, recovery and wellness — backed by real brands.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-background/80">
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /><a href="tel:0387464680" className="hover:text-brand">03 8746 4680</a></li>
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /><a href="mailto:hello@meltonsupps.com.au" className="hover:text-brand">hello@meltonsupps.com.au</a></li>
            <li className="flex items-start gap-2"><MapPin className="h-3.5 w-3.5 mt-0.5" /><span>Melton, VIC, Australia</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/products" className="hover:text-brand">Shop All</Link></li>
            <li><Link to="/categories" className="hover:text-brand">Categories</Link></li>
            <li><Link to="/brands" className="hover:text-brand">Brands</Link></li>
            <li><Link to="/products" search={{ collection: "specials" }} className="hover:text-brand">Specials</Link></li>
            <li><Link to="/products" search={{ collection: "clearance" }} className="hover:text-brand">Clearance</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider mb-4">Help</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/contact" className="hover:text-brand">Contact Us</Link></li>
            <li><Link to="/shipping" className="hover:text-brand">Shipping &amp; Delivery</Link></li>
            <li><Link to="/returns" className="hover:text-brand">Returns &amp; Refunds</Link></li>
            <li><Link to="/blog" className="hover:text-brand">Blog &amp; Guides</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/about" className="hover:text-brand">About Us</Link></li>
            <li><Link to="/disclaimer" className="hover:text-brand">Health Disclaimer</Link></li>
            <li><Link to="/privacy" className="hover:text-brand">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-brand">Terms of Service</Link></li>
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
