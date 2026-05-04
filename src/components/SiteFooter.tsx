import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Truck, ShieldCheck, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

      {/* Newsletter */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="font-display text-2xl font-black uppercase">Join the <span className="text-brand">Squad</span></h3>
            <p className="text-sm text-background/70 mt-1">Exclusive deals, restocks and training tips. No spam.</p>
          </div>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="Your email address" className="bg-background/10 border-background/20 text-background placeholder:text-background/50" required />
            <Button type="submit" className="bg-brand hover:bg-brand-dark text-brand-foreground font-bold uppercase">Subscribe</Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 grid gap-10 md:grid-cols-6">
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
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /><a href="mailto:info@meltonsupps.com.au" className="hover:text-brand">info@meltonsupps.com.au</a></li>
            <li className="flex items-start gap-2"><MapPin className="h-3.5 w-3.5 mt-0.5" /><span>Melton, VIC, Australia</span></li>
          </ul>

          <div className="flex gap-3 mt-5">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-9 w-9 rounded-full bg-background/10 hover:bg-brand flex items-center justify-center transition-colors"><Facebook className="h-4 w-4" /></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-full bg-background/10 hover:bg-brand flex items-center justify-center transition-colors"><Instagram className="h-4 w-4" /></a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="h-9 w-9 rounded-full bg-background/10 hover:bg-brand flex items-center justify-center transition-colors"><Youtube className="h-4 w-4" /></a>
          </div>
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
            <li><Link to="/faq" className="hover:text-brand">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-brand">Shipping &amp; Delivery</Link></li>
            <li><Link to="/returns" className="hover:text-brand">Returns &amp; Refunds</Link></li>
            <li><Link to="/track-order" className="hover:text-brand">Track Order</Link></li>
            <li><Link to="/price-match" className="hover:text-brand">Price Match</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/about" className="hover:text-brand">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brand">Contact</Link></li>
            <li><Link to="/blog" className="hover:text-brand">Blog &amp; Guides</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/disclaimer" className="hover:text-brand">Health Disclaimer</Link></li>
            <li><Link to="/privacy" className="hover:text-brand">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-brand">Terms of Service</Link></li>
          </ul>

          <h4 className="font-display text-sm uppercase tracking-wider mt-6 mb-3">We Accept</h4>
          <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
            {["VISA", "MC", "AMEX", "PayPal", "AfterPay", "ZipPay", "Apple Pay"].map((p) => (
              <span key={p} className="px-2 py-1 bg-background/10 rounded">{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-background/70">
          <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-brand" /> Free shipping over $150</div>
          <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand" /> 100% genuine stock</div>
          <div className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-brand" /> Secure Shopify checkout</div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-5 text-xs text-background/50 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} MeltonSupps. All rights reserved. ABN registered Australian business.</span>
          <span>Secure checkout powered by Shopify.</span>
        </div>
      </div>
    </footer>
  );
}
