import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/best-sellers")({
  component: BestSellersPage,
  head: () => ({
    meta: [
      { title: "Best Sellers — Top Supplements at MeltonSupps" },
      { name: "description", content: "Australia's most popular supplements, ranked. Whey protein, pre-workout, creatine and more — voted best by MeltonSupps customers." },
      { property: "og:title", content: "Best Sellers — MeltonSupps" },
      { property: "og:description", content: "The most popular supplements ranked by MeltonSupps customers." },
    ],
  }),
});

const CATS = [
  { handle: "whey-protein", title: "Whey Protein", desc: "Australia's #1 selling protein category" },
  { handle: "pre-workouts", title: "Pre-Workouts", desc: "Hit PRs with our top-selling pre-workouts" },
  { handle: "creatine", title: "Creatine", desc: "The most-bought strength supplement on the planet" },
  { handle: "weight-gainer", title: "Weight Gainers", desc: "For hard-gainers chasing serious size" },
  { handle: "bcaa", title: "Aminos / BCAA", desc: "Recovery sippers loved by lifters" },
  { handle: "vitamins-and-mineral", title: "Vitamins", desc: "Daily essentials trusted by customers" },
];

function BestSellersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-ink text-background">
          <div className="container mx-auto px-4 py-14">
            <Breadcrumbs items={[{ label: "Best Sellers" }]} />
            <p className="text-xs uppercase tracking-widest text-brand font-bold mt-6 flex items-center gap-2">
              <Flame className="h-4 w-4" /> Bestsellers
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-black uppercase mt-2">Best Selling Supplements</h1>
            <p className="mt-4 text-background/80 text-lg max-w-2xl">
              Browse our most popular categories — voted with their wallets by thousands of MeltonSupps customers.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATS.map((c) => (
              <Link
                key={c.handle}
                to="/product-category/$handle"
                params={{ handle: c.handle }}
                className="border rounded-2xl p-6 bg-muted/20 hover:border-brand transition-colors"
              >
                <h2 className="font-display text-xl font-bold uppercase">{c.title}</h2>
                <p className="text-sm text-muted-foreground mt-2">{c.desc}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-brand text-xs font-bold uppercase">
                  Shop now <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 text-center">
          <Link to="/products" className="inline-flex items-center h-11 px-6 rounded-full bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-bold uppercase tracking-wide">Shop All Products</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
