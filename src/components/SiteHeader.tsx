import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background border-b">
      <div className="bg-ink text-background text-xs">
        <div className="container mx-auto px-4 h-9 flex items-center justify-between">
          <span className="hidden sm:inline tracking-wider uppercase">
            Free shipping on orders over $99 · Australia-wide
          </span>
          <a
            href="tel:0387464680"
            className="flex items-center gap-1.5 hover:text-brand transition-colors"
          >
            <Phone className="h-3 w-3" />
            <span className="font-medium">03 8746 4680</span>
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-baseline gap-2 group">
          <span className="font-display text-2xl md:text-3xl font-bold tracking-tight uppercase">
            Melton<span className="text-brand">Supps</span>
          </span>
          <span className="hidden md:inline text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Health & Sports Supplements
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link to="/" className="hover:text-brand transition-colors uppercase tracking-wide text-xs">
            Home
          </Link>
          <Link to="/products" className="hover:text-brand transition-colors uppercase tracking-wide text-xs">
            Shop All
          </Link>
          <Link
            to="/products"
            search={{ q: "tag:sale" }}
            className="hover:text-brand transition-colors uppercase tracking-wide text-xs"
          >
            Specials
          </Link>
        </nav>
        <div className="flex items-center gap-1">
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
