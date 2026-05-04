import { Link, useNavigate } from "@tanstack/react-router";
import { Search, User, Heart, MapPin, Package, Tag, Sparkles, Dumbbell, Truck } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "./CartDrawer";

const CATEGORY_PILLS = [
  { label: "Find a Store", q: "" },
  { label: "Stack & Save", q: "tag:bundle" },
  { label: "Protein", q: "protein" },
  { label: "Creatine", q: "creatine" },
  { label: "Pre-Workout", q: "pre-workout" },
  { label: "Fat Burner", q: "fat burner" },
  { label: "BCAA's/Aminos", q: "bcaa" },
  { label: "Collagen", q: "collagen" },
];

const TOP_NAV: Array<{ label: string; icon: typeof Package; to: string; search?: { q: string } }> = [
  { label: "Categories", icon: Package, to: "/categories" },
  { label: "Brands", icon: Tag, to: "/brands" },
  { label: "Clearance", icon: Sparkles, to: "/products", search: { q: "tag:clearance OR tag:sale" } },
  { label: "Specials", icon: Dumbbell, to: "/products", search: { q: "tag:special" } },
  { label: "Bundle", icon: Package, to: "/products", search: { q: "tag:bundle OR stack" } },
  { label: "Pickup & Delivery", icon: Truck, to: "/products" },
  { label: "Find a Store", icon: MapPin, to: "/products" },
];

export function SiteHeader() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate({ to: "/products", search: { q: search.trim() } });
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Top promo bar */}
      <div className="bg-ink text-background text-center text-xs md:text-sm py-2.5 px-4 font-medium">
        Spend $99 and get FREE shipping Australia-wide
      </div>

      {/* Main header */}
      <div className="bg-ink text-background">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="font-display text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none">
              <span className="text-background">Melton</span>
              <span className="text-brand">Supps</span>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for products..."
                className="w-full h-11 pl-11 pr-4 rounded-full bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <button className="hidden md:flex h-10 w-10 items-center justify-center rounded-full hover:bg-background/10 transition-colors" aria-label="Account">
              <User className="h-5 w-5" />
            </button>
            <button className="hidden md:flex h-10 w-10 items-center justify-center rounded-full hover:bg-background/10 transition-colors" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </button>
            <CartDrawer />
            <Link
              to="/products"
              className="hidden md:inline-flex items-center justify-center h-10 px-5 rounded-full bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-bold uppercase tracking-wide transition-colors"
            >
              Shop
            </Link>
          </div>
        </div>

        {/* Top icon nav */}
        <div className="border-t border-background/10">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-start md:justify-center gap-2 md:gap-8 overflow-x-auto py-3 text-xs md:text-sm font-semibold uppercase tracking-wide scrollbar-hide">
              {TOP_NAV.map(({ label, icon: Icon, to, search }) => (
                <Link
                  key={label}
                  to={to}
                  search={search as never}
                  className="flex items-center gap-2 whitespace-nowrap text-background/85 hover:text-brand transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-hide">
            {CATEGORY_PILLS.map(({ label, q }) => (
              <Link
                key={label}
                to="/products"
                search={q ? { q } : undefined}
                className="flex-shrink-0 inline-flex items-center justify-center h-10 px-5 rounded-full border-2 border-ink bg-background text-ink text-xs md:text-sm font-bold uppercase tracking-wide hover:bg-ink hover:text-background transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
