import { Link, useNavigate } from "@tanstack/react-router";
import { Search, User, Heart, MapPin, Package, Tag, Sparkles, Dumbbell, Truck, ChevronDown } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "./CartDrawer";
import { PromoBar } from "./PromoBar";
import { MegaMenu } from "./MegaMenu";
import { getLegacyCategoryHandle } from "@/lib/legacyLinks";

const CATEGORY_PILLS = [
  { label: "Whey Protein", to: "whey-protein" },
  { label: "Pre-Workouts", to: "pre-workouts" },
  { label: "Creatine", to: "creatine" },
  { label: "Weight Gainer", to: "weight-gainer" },
  { label: "Aminos / BCAA", to: "bcaa" },
  { label: "Collagen", to: "collagen" },
  { label: "Vitamins", to: "vitamins-and-mineral" },
];

export function SiteHeader() {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState<"categories" | "brands" | null>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate({ to: "/products", search: { q: search.trim() } });
  };

  return (
    <header className="sticky top-0 z-40">
      <PromoBar />

      {/* Main header */}
      <div className="bg-ink text-background">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="flex-shrink-0">
            <div className="font-display text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none">
              <span className="text-background">Melton</span>
              <span className="text-brand">Supps</span>
            </div>
          </Link>

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

          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <Link to="/account" className="hidden md:flex h-10 w-10 items-center justify-center rounded-full hover:bg-background/10 transition-colors" aria-label="Account">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/wishlist" className="hidden md:flex h-10 w-10 items-center justify-center rounded-full hover:bg-background/10 transition-colors" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Link>
            <CartDrawer />
            <Link
              to="/products"
              className="hidden md:inline-flex items-center justify-center h-10 px-5 rounded-full bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-bold uppercase tracking-wide transition-colors"
            >
              Shop
            </Link>
          </div>
        </div>

        {/* Top icon nav with mega-menu triggers */}
        <div className="border-t border-background/10 relative" onMouseLeave={() => setOpenMenu(null)}>
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-start md:justify-center gap-2 md:gap-8 overflow-x-auto py-3 text-xs md:text-sm font-semibold uppercase tracking-wide scrollbar-hide">
              <button
                type="button"
                onMouseEnter={() => setOpenMenu("categories")}
                onClick={() => setOpenMenu(openMenu === "categories" ? null : "categories")}
                className={`flex items-center gap-2 whitespace-nowrap transition-colors ${openMenu === "categories" ? "text-brand" : "text-background/85 hover:text-brand"}`}
              >
                <Package className="h-4 w-4" />
                CATEGORIES
                <ChevronDown className="h-3 w-3" />
              </button>
              <button
                type="button"
                onMouseEnter={() => setOpenMenu("brands")}
                onClick={() => setOpenMenu(openMenu === "brands" ? null : "brands")}
                className={`flex items-center gap-2 whitespace-nowrap transition-colors ${openMenu === "brands" ? "text-brand" : "text-background/85 hover:text-brand"}`}
              >
                <Tag className="h-4 w-4" />
                BRANDS
                <ChevronDown className="h-3 w-3" />
              </button>
              <Link
                to="/product-category/$handle"
                params={{ handle: "clearance" }}
                onMouseEnter={() => setOpenMenu(null)}
                className="flex items-center gap-2 whitespace-nowrap text-background/85 hover:text-brand transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                Clearance
              </Link>
              <Link
                to="/product-category/$handle"
                params={{ handle: "specials" }}
                onMouseEnter={() => setOpenMenu(null)}
                className="flex items-center gap-2 whitespace-nowrap text-background/85 hover:text-brand transition-colors"
              >
                <Dumbbell className="h-4 w-4" />
                Specials
              </Link>
              <Link
                to="/products"
                onMouseEnter={() => setOpenMenu(null)}
                className="flex items-center gap-2 whitespace-nowrap text-background/85 hover:text-brand transition-colors"
              >
                <Truck className="h-4 w-4" />
                Pickup & Delivery
              </Link>
            </nav>
          </div>

          {openMenu && <MegaMenu type={openMenu} onNavigate={() => setOpenMenu(null)} />}
        </div>
      </div>

      {/* Category pills */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-hide">
            {CATEGORY_PILLS.map(({ label, to }) => (
              <Link
                key={label}
                to="/product-category/$handle"
                params={{ handle: getLegacyCategoryHandle(to) }}
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
