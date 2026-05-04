import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CATEGORIES } from "@/lib/storeData";

export const Route = createFileRoute("/categories")({
  component: CategoriesPage,
  head: () => ({
    meta: [
      { title: "Shop by Category — MeltonSupps" },
      {
        name: "description",
        content:
          "Browse supplements by category — protein, pre-workout, creatine, fat burners, vitamins, BCAAs, collagen and more.",
      },
    ],
  }),
});

function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-ink text-background">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">
              The full range
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-black uppercase mt-2">
              Shop by Category
            </h1>
            <p className="mt-3 text-background/70 max-w-2xl">
              From protein to vitamins — every supplement category we stock, in one place.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.name}
                to="/products"
                search={{ q: c.query }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-dark to-ink flex items-end p-4 md:p-5 hover:scale-[1.02] transition-transform"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-contain object-center p-6 mix-blend-luminosity opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative">
                  <h3 className="font-display text-lg md:text-xl font-black uppercase text-background leading-tight drop-shadow-lg">
                    {c.name}
                  </h3>
                  <span className="text-xs text-background/90 uppercase tracking-wider font-semibold inline-flex items-center gap-1 mt-1">
                    Shop now <ArrowRight className="h-3 w-3" />
                  </span>
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
