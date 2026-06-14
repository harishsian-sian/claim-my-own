import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, lazy, Suspense } from "react";
import { ArrowRight, Truck, ShieldCheck, Headset, Tag, Loader2, Flame, Percent, Mail, Star, Boxes } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroSlider } from "@/components/HeroSlider";
import { ShopByGoal } from "@/components/ShopByGoal";
import { Button } from "@/components/ui/button";
import { storefrontApiRequest, PRODUCTS_QUERY, BEST_SELLERS_QUERY, COLLECTION_PRODUCTS_QUERY, shopifyImage, type ShopifyProduct } from "@/lib/shopify";
import { useCollections } from "@/hooks/useCollections";
import { BRAND_COLLECTION_HANDLES } from "@/lib/storeData";
import { getLegacyCategoryHandle } from "@/lib/legacyLinks";

const ProductCarousel = lazy(() =>
  import("@/components/ProductCarousel").then((m) => ({ default: m.ProductCarousel })),
);
const BrandStrip = lazy(() =>
  import("@/components/BrandStrip").then((m) => ({ default: m.BrandStrip })),
);
const VitaminBrandStrip = lazy(() =>
  import("@/components/VitaminBrandStrip").then((m) => ({ default: m.VitaminBrandStrip })),
);

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
      { property: "og:url", content: "https://www.meltonsupps.com.au/" },
    ],
    links: [{ rel: "canonical", href: "https://www.meltonsupps.com.au/" }],
  }),
});

function Index() {
  const [featured, setFeatured] = useState<ShopifyProduct[]>([]);
  const [bestSellers, setBestSellers] = useState<ShopifyProduct[]>([]);
  const [bundles, setBundles] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { collections } = useCollections();

  useEffect(() => {
    storefrontApiRequest(PRODUCTS_QUERY, { first: 12 })
      .then((res) => setFeatured(res?.data?.products?.edges ?? []))
      .finally(() => setLoading(false));

    const idle = (cb: () => void) =>
      "requestIdleCallback" in window
        ? (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(cb)
        : setTimeout(cb, 1500);

    idle(() => {
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
      const dateStr = twoMonthsAgo.toISOString().split("T")[0];
      storefrontApiRequest(BEST_SELLERS_QUERY, {
        first: 12,
        query: `created_at:>${dateStr}`,
      }).then((res) => setBestSellers(res?.data?.products?.edges ?? []));

      storefrontApiRequest(COLLECTION_PRODUCTS_QUERY, {
        handle: "bundles",
        first: 12,
      }).then(async (res) => {
        const edges = res?.data?.collection?.products?.edges ?? [];
        if (edges.length > 0) {
          setBundles(edges);
          return;
        }
        // Fallback: collection may be empty or product not yet on the
        // storefront sales channel. Search products by title instead so
        // bundles like "Legit Muscle Stack" still appear.
        const fb = await storefrontApiRequest(PRODUCTS_QUERY, {
          first: 12,
          query: "title:bundle OR title:stack",
        });
        setBundles(fb?.data?.products?.edges ?? []);
      });
    });
  }, []);

  const homeCategories = collections
    .filter((c) => !BRAND_COLLECTION_HANDLES.has(c.handle) && c.image?.url)
    .slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <HeroSlider />

        {/* TRUST BAR */}
        <section className="border-b bg-muted/30">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x py-2">
            {[
              { icon: Truck, title: "Free shipping", desc: "Orders over $150" },
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

        <ShopByGoal />

        {/* SHOP BY CATEGORY */}
        <section className="container mx-auto px-4 pb-12 md:pb-16">
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
                to="/collections/$handle"
                params={{ handle: getLegacyCategoryHandle(c.handle) }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-brand-dark to-ink flex items-end p-4 md:p-5 hover:scale-[1.03] transition-transform"
              >
                {c.image?.url && (
                  <img
                    src={shopifyImage(c.image.url, 500, 500)}
                    alt={c.image.altText ?? c.title}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={400}
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

        {/* FEATURED CAROUSEL */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-brand" />
          </div>
        ) : (
          <Suspense fallback={<div className="py-20" />}>
            <ProductCarousel
              products={featured}
              eyebrow="Hand-picked"
              title="Featured Products"
              viewAllTo="/products"
            />
          </Suspense>
        )}

        {bundles.length > 0 && (
          <Suspense fallback={null}>
            <ProductCarousel
              products={bundles}
              eyebrow="Stack & save"
              title="Bundles"
              viewAllTo="/product-category/bundles"
            />
          </Suspense>
        )}

        <Suspense fallback={null}>
          <BrandStrip />
        </Suspense>

        <Suspense fallback={null}>
          <VitaminBrandStrip />
        </Suspense>

        {/* PROMO STRIP */}
        <section className="bg-ink text-background">
          <div className="container mx-auto px-4 py-10 md:py-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="border-r-0 md:border-r border-background/10 pr-0 md:pr-6">
              <h3 className="font-display text-xl md:text-2xl font-black uppercase text-brand">Genuine Stock</h3>
              <p className="text-sm text-background/70 mt-2">100% authentic products sourced from official Australian distributors</p>
            </div>
            <div className="border-r-0 md:border-r border-background/10 pr-0 md:pr-6">
              <h3 className="font-display text-xl md:text-2xl font-black uppercase text-brand">Pickup &amp; Delivery</h3>
              <p className="text-sm text-background/70 mt-2">Fast Australia-wide shipping or local Melton pickup</p>
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-black uppercase text-brand">Price Match</h3>
              <p className="text-sm text-background/70 mt-2">Found it cheaper? We'll match the price</p>
            </div>
          </div>
        </section>

        {/* DEALS DUO BANNER */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <Link
              to="/collections/$handle"
              params={{ handle: "bundles" }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink to-brand-dark p-8 md:p-10 min-h-[220px] flex flex-col justify-between text-background hover:shadow-xl transition-shadow"
            >
              <div>
                <Boxes className="h-8 w-8 mb-3" />
                <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-90">Stack &amp; save</span>
                <h3 className="font-display text-2xl md:text-3xl font-black uppercase mt-2">Bundles</h3>
                <p className="text-sm opacity-90 mt-2 max-w-xs">Hand-picked stacks — protein + creatine, pre + pump, recovery combos.</p>
              </div>
              <span className="inline-flex items-center text-sm font-bold uppercase tracking-wider mt-4 group-hover:translate-x-1 transition-transform">
                Shop bundles <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
            <Link
              to="/collections/$handle"
              params={{ handle: "clearance" }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-brand-dark p-8 md:p-10 min-h-[220px] flex flex-col justify-between text-background hover:shadow-xl transition-shadow"
            >
              <div>
                <Flame className="h-8 w-8 mb-3" />
                <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-90">Up to 50% off</span>
                <h3 className="font-display text-2xl md:text-3xl font-black uppercase mt-2">Clearance Bin</h3>
                <p className="text-sm opacity-90 mt-2 max-w-xs">Last-chance bargains on protein, pre-workout and more — while stocks last.</p>
              </div>
              <span className="inline-flex items-center text-sm font-bold uppercase tracking-wider mt-4 group-hover:translate-x-1 transition-transform">
                Shop clearance <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
            <Link
              to="/collections/$handle"
              params={{ handle: "specials" }}
              className="group relative overflow-hidden rounded-2xl bg-ink p-8 md:p-10 min-h-[220px] flex flex-col justify-between text-background hover:shadow-xl transition-shadow border border-background/10"
            >
              <div>
                <Percent className="h-8 w-8 mb-3 text-brand-light" />
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-light">This week only</span>
                <h3 className="font-display text-2xl md:text-3xl font-black uppercase mt-2">Weekly Specials</h3>
                <p className="text-sm text-background/75 mt-2 max-w-xs">Fresh deals dropped every Monday — top brands at our lowest prices.</p>
              </div>
              <span className="inline-flex items-center text-sm font-bold uppercase tracking-wider mt-4 text-brand-light group-hover:translate-x-1 transition-transform">
                Shop specials <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </div>
        </section>

        {/* BEST SELLERS CAROUSEL */}
        {!loading && bestSellers.length > 0 && (
          <Suspense fallback={null}>
            <ProductCarousel
              products={bestSellers}
              eyebrow="Last 60 days · Customer favourites"
              title="Best Sellers"
              viewAllTo="/products"
            />
          </Suspense>
        )}

        {/* WHY MELTONSUPPS */}
        <section className="bg-muted/40 border-y">
          <div className="container mx-auto px-4 py-14 md:py-16">
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">Why shop with us</span>
              <h2 className="font-display text-3xl md:text-4xl font-black uppercase mt-2">Built for Aussie Athletes</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: ShieldCheck, title: "100% Genuine", desc: "Sourced direct from official Australian distributors." },
                { icon: Truck, title: "Free Shipping $150+", desc: "Fast Australia-wide dispatch from our Melton warehouse." },
                { icon: Star, title: "Locally Owned", desc: "Family-run from Melton, VIC. Real advice, real people." },
                { icon: Tag, title: "Best Price Promise", desc: "Found it cheaper? We'll match the price." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-background rounded-2xl p-6 border hover:border-brand transition-colors">
                  <Icon className="h-7 w-7 text-brand" />
                  <h3 className="font-display text-lg font-bold uppercase mt-3">{title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="bg-ink text-background">
          <div className="container mx-auto px-4 py-14 md:py-16 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Mail className="h-9 w-9 text-brand" />
              <h2 className="font-display text-3xl md:text-4xl font-black uppercase mt-3">
                Get <span className="text-brand">10% off</span> your first order
              </h2>
              <p className="text-background/70 mt-3 max-w-md">
                Join the MeltonSupps crew for early access to drops, weekly deals and training tips.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 h-12 px-5 rounded-full bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <button
                type="submit"
                className="h-12 px-7 rounded-full bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-bold uppercase tracking-wider transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
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
