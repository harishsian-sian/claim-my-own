import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/new-arrivals")({
  component: NewArrivalsPage,
  head: () => ({
    meta: [
      { title: "New Arrivals — Latest Supplements at MeltonSupps" },
      { name: "description", content: "Just in at MeltonSupps. The latest supplements, fresh stock and brand new releases from your favourite brands." },
      { property: "og:title", content: "New Arrivals — MeltonSupps" },
      { property: "og:description", content: "Fresh supplements just landed at MeltonSupps." },
    ],
  }),
});

function NewArrivalsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-ink text-background">
          <div className="container mx-auto px-4 py-14">
            <Breadcrumbs items={[{ label: "New Arrivals" }]} />
            <p className="text-xs uppercase tracking-widest text-brand font-bold mt-6 flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Just Landed
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-black uppercase mt-2">New Arrivals</h1>
            <p className="mt-4 text-background/80 text-lg max-w-2xl">
              The latest supplements, brand-new flavours and fresh stock — straight from the brands you love.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 text-center max-w-3xl">
          <p className="text-muted-foreground">
            Browse all our latest stock or jump straight to your favourite brand or category to see what's new.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/products" className="inline-flex items-center h-11 px-6 rounded-full bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-bold uppercase tracking-wide">All Products</Link>
            <Link to="/brands" className="inline-flex items-center h-11 px-6 rounded-full border-2 border-ink text-ink text-sm font-bold uppercase tracking-wide hover:bg-ink hover:text-background">Browse Brands</Link>
            <Link to="/categories" className="inline-flex items-center h-11 px-6 rounded-full border-2 border-ink text-ink text-sm font-bold uppercase tracking-wide hover:bg-ink hover:text-background">Browse Categories</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
