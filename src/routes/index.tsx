import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Truck, ShieldCheck, Headset, Zap, Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "MeltonSupps — Australia's Health & Sports Supplements Store" },
      {
        name: "description",
        content:
          "Premium supplements at honest prices. Protein, pre-workout, vitamins and more from EHP Labs, ATP Science, Now Foods and other trusted brands.",
      },
    ],
  }),
});

function Index() {
  const [featured, setFeatured] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storefrontApiRequest(PRODUCTS_QUERY, { first: 10 })
      .then((res) => {
        const edges = res?.data?.products?.edges ?? [];
        setFeatured(edges);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-ink text-background">
          <div className="absolute inset-0 opacity-20"
               style={{ background: "radial-gradient(ellipse at top right, var(--brand) 0%, transparent 60%)" }} />
          <div className="container relative mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-brand font-semibold mb-5">
                Trusted by athletes since 2015
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] uppercase">
                Fuel your <span className="text-brand">performance.</span>
              </h1>
              <p className="mt-5 text-lg text-background/75 max-w-lg leading-relaxed">
                Premium health & sports supplements from the brands you trust.
                Protein, pre-workout, vitamins and more — shipped Australia-wide.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-brand hover:bg-brand-dark text-brand-foreground h-12 px-7 text-sm uppercase tracking-wider font-semibold">
                  <Link to="/products">
                    Shop All Products <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-7 text-sm uppercase tracking-wider font-semibold bg-transparent border-background/30 text-background hover:bg-background hover:text-ink">
                  <Link to="/products" search={{ q: "tag:sale" }}>View Specials</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                {featured.slice(0, 4).map((p) => {
                  const img = p.node.images.edges[0]?.node;
                  return (
                    <div key={p.node.id} className="aspect-square bg-background rounded-lg overflow-hidden p-6 flex items-center justify-center">
                      {img ? (
                        <img src={img.url} alt={img.altText ?? p.node.title} className="max-h-full object-contain" />
                      ) : (
                        <Zap className="h-10 w-10 text-brand" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="border-b">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 divide-x">
            {[
              { icon: Truck, title: "Free shipping", desc: "Orders over $99" },
              { icon: ShieldCheck, title: "Secure checkout", desc: "Powered by Shopify" },
              { icon: Zap, title: "Genuine brands", desc: "100% authentic" },
              { icon: Headset, title: "Expert support", desc: "03 8746 4680" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 px-4 py-5">
                <Icon className="h-6 w-6 text-brand flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold leading-tight">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">
                Hand-picked
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mt-2">
                Featured Products
              </h2>
            </div>
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center text-sm font-medium uppercase tracking-wider hover:text-brand transition-colors"
            >
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-brand" />
            </div>
          ) : (
            <ProductGrid products={featured} />
          )}
        </section>

        {/* CTA */}
        <section className="bg-muted">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase">
              Browse our <span className="text-brand">full range</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Hundreds of products across protein, pre-workout, recovery, vitamins and more.
            </p>
            <Button asChild size="lg" className="mt-7 bg-brand hover:bg-brand-dark text-brand-foreground h-12 px-8 text-sm uppercase tracking-wider font-semibold">
              <Link to="/products">
                Shop All Products <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
