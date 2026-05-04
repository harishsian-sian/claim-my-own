import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Truck, ShieldCheck, Headset, Zap, Loader2, Tag } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import {
  storefrontApiRequest,
  PRODUCTS_QUERY,
  COLLECTIONS_QUERY,
  type ShopifyProduct,
  type ShopifyCollection,
} from "@/lib/shopify";
import { BRAND_COLLECTION_HANDLES } from "@/lib/storeData";

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
  const [bestSellers, setBestSellers] = useState<ShopifyProduct[]>([]);
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      storefrontApiRequest(PRODUCTS_QUERY, { first: 20 }),
      storefrontApiRequest(COLLECTIONS_QUERY, { first: 100, after: null }),
    ])
      .then(([prodRes, colRes]) => {
        const edges: ShopifyProduct[] = prodRes?.data?.products?.edges ?? [];
        setFeatured(edges.slice(0, 8));
        setBestSellers(edges.slice(8, 16));
        const cols: ShopifyCollection[] =
          colRes?.data?.collections?.edges?.map((e: { node: ShopifyCollection }) => e.node) ?? [];
        setCollections(cols);
      })
      .finally(() => setLoading(false));
  }, []);

  const homeCategories = collections
    .filter((c) => !BRAND_COLLECTION_HANDLES.has(c.handle) && c.image?.url)
    .slice(0, 6);
  const homeBrands = collections
    .filter((c) => BRAND_COLLECTION_HANDLES.has(c.handle) && c.image?.url)
    .slice(0, 12);


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* HERO BANNER */}
        <section className="bg-ink">
          <div className="container mx-auto px-4 py-8 md:py-10">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-ink via-brand-dark to-brand">
              <div className="absolute inset-0 opacity-30"
                   style={{ background: "radial-gradient(ellipse at 30% 50%, oklch(0.7 0.2 250 / 0.4) 0%, transparent 60%)" }} />
              <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-14 min-h-[420px] md:min-h-[480px]">
                <div className="text-background">
                  <span className="inline-block text-xs uppercase tracking-[0.3em] text-brand-foreground/90 font-bold mb-4">
                    Limited time offer
                  </span>
                  <h1 className="font-display text-5xl md:text-7xl font-black uppercase leading-[0.95] text-background drop-shadow-lg">
                    Triple<br />Protein<br /><span className="text-brand-foreground">Stack Deal</span>
                  </h1>
                  <p className="mt-5 text-lg text-background/90 max-w-md">
                    Mix &amp; match flavours. Premium whey blend at an unbeatable price.
                  </p>
                  <div className="mt-7 flex items-center gap-4 flex-wrap">
                    <div className="bg-background text-ink rounded-full px-5 py-2 font-display font-black text-lg uppercase">
                      Save $150
                    </div>
                    <Button asChild size="lg" className="bg-background hover:bg-background/90 text-ink h-12 px-7 text-sm uppercase tracking-wider font-bold rounded-full">
                      <Link to="/products">
                        Shop Now <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="hidden md:flex justify-center items-center">
                  <div className="grid grid-cols-3 gap-3">
                    {featured.slice(0, 3).map((p, i) => {
                      const img = p.node.images.edges[0]?.node;
                      return (
                        <div key={p.node.id} className={`aspect-[3/4] bg-background/95 rounded-xl overflow-hidden p-4 flex items-center justify-center shadow-2xl ${i === 1 ? "scale-110 z-10" : ""}`}>
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
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="border-b bg-muted/30">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x py-2">
            {[
              { icon: Truck, title: "Free shipping", desc: "Orders over $99" },
              { icon: ShieldCheck, title: "Secure checkout", desc: "Powered by Shopify" },
              { icon: Tag, title: "Price match", desc: "We match competitors" },
              { icon: Headset, title: "Expert support", desc: "03 8746 4680" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 px-4 py-4">
                <Icon className="h-6 w-6 text-brand flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold leading-tight">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SHOP BY CATEGORY */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">
                Browse the range
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-black uppercase mt-2">
                Shop by Category
              </h2>
            </div>
            <Link
              to="/categories"
              className="hidden sm:inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-brand transition-colors"
            >
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {homeCategories.map((c) => (
              <Link
                key={c.handle}
                to="/products"
                search={{ collection: c.handle }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-brand-dark to-ink flex items-end p-4 md:p-5 hover:scale-[1.03] transition-transform"
              >
                {c.image?.url && (
                  <img
                    src={c.image.url}
                    alt={c.image.altText ?? c.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="relative">
                  <h3 className="font-display text-base md:text-xl font-black uppercase text-background leading-tight drop-shadow-lg">
                    {c.title}
                  </h3>
                  <span className="text-xs text-background/90 uppercase tracking-wider font-semibold inline-flex items-center gap-1 mt-1 group-hover:text-background">
                    Shop now <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SHOP BY BRAND */}
        <section className="bg-muted/40 border-y">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="flex items-end justify-between mb-6 md:mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">
                  Trusted brands
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-black uppercase mt-2">
                  Shop by Brand
                </h2>
              </div>
              <Link
                to="/brands"
                className="hidden sm:inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-brand transition-colors"
              >
                All {BRANDS.length} brands <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
              {HOME_BRANDS.map((b) => (
                <Link
                  key={b.name}
                  to="/products"
                  search={{ q: b.query }}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-background border hover:border-brand hover:shadow-md transition-all flex flex-col"
                >
                  <div className="flex-1 flex items-center justify-center p-3">
                    {b.img ? (
                      <img
                        src={b.img}
                        alt={b.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Tag className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="bg-ink text-background px-2 py-1.5 text-center">
                    <p className="font-bold text-[10px] md:text-xs uppercase tracking-wide truncate group-hover:text-brand transition-colors">
                      {b.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">
                Hand-picked
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-black uppercase mt-2">
                Featured Products
              </h2>
            </div>
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-brand transition-colors"
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

        {/* PROMO STRIP */}
        <section className="bg-ink text-background">
          <div className="container mx-auto px-4 py-10 md:py-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="border-r-0 md:border-r border-background/10 pr-0 md:pr-6">
              <h3 className="font-display text-xl md:text-2xl font-black uppercase text-brand">Stack &amp; Save</h3>
              <p className="text-sm text-background/70 mt-2">Bundle deals across protein, pre-workout & more</p>
            </div>
            <div className="border-r-0 md:border-r border-background/10 pr-0 md:pr-6">
              <h3 className="font-display text-xl md:text-2xl font-black uppercase text-brand">Pickup &amp; Delivery</h3>
              <p className="text-sm text-background/70 mt-2">Fast Australia-wide shipping or local pickup</p>
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-black uppercase text-brand">Price Match</h3>
              <p className="text-sm text-background/70 mt-2">Found it cheaper? We'll match the price</p>
            </div>
          </div>
        </section>

        {/* BEST SELLERS */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">
                Customer favourites
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-black uppercase mt-2">
                Best Sellers
              </h2>
            </div>
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-brand transition-colors"
            >
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-brand" />
            </div>
          ) : (
            <ProductGrid products={bestSellers} />
          )}
        </section>

        {/* CTA */}
        <section className="bg-muted">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase">
              Browse our <span className="text-brand">full range</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Hundreds of products across protein, pre-workout, recovery, vitamins and more.
            </p>
            <Button asChild size="lg" className="mt-7 bg-brand hover:bg-brand-dark text-brand-foreground h-12 px-8 text-sm uppercase tracking-wider font-bold rounded-full">
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
