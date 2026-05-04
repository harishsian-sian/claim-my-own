import { createFileRoute, Link } from "@tanstack/react-router";
import { Tag } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BRANDS } from "@/lib/storeData";

export const Route = createFileRoute("/brands")({
  component: BrandsPage,
  head: () => ({
    meta: [
      { title: "Shop by Brand — MeltonSupps" },
      {
        name: "description",
        content:
          "Browse all supplement brands stocked at MeltonSupps — Switch Nutrition, EHP Labs, ATP Science, Optimum Nutrition, Rule 1 and more.",
      },
    ],
  }),
});

function BrandsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-ink text-background">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">
              The full lineup
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-black uppercase mt-2">
              Shop by Brand
            </h1>
            <p className="mt-3 text-background/70 max-w-2xl">
              {BRANDS.length} trusted supplement brands in stock. Tap any brand to view its products.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 md:py-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {BRANDS.map((b) => (
              <Link
                key={b.name}
                to="/products"
                search={{ q: b.query }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-muted border hover:border-brand hover:shadow-lg transition-all flex flex-col"
              >
                <div className="flex-1 flex items-center justify-center p-4 bg-background">
                  {b.img ? (
                    <img
                      src={b.img}
                      alt={b.name}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Tag className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                <div className="bg-ink text-background px-3 py-2.5">
                  <h3 className="font-bold text-xs md:text-sm uppercase tracking-wide truncate group-hover:text-brand transition-colors">
                    {b.name}
                  </h3>
                  <p className="text-[10px] text-background/60 uppercase tracking-wider">
                    {b.count} {b.count === 1 ? "product" : "products"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
