import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  storefrontApiRequest,
  COLLECTION_PRODUCTS_QUERY,
  type ShopifyProduct,
} from "@/lib/shopify";

interface Slide {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  badge: string;
  collection: string;
  ctaLabel: string;
  gradient: string;
}

const SLIDES: Slide[] = [
  {
    eyebrow: "Premium whey",
    title: (
      <>
        Whey<br />Protein<br /><span className="text-brand-foreground">Range</span>
      </>
    ),
    subtitle: "Top-rated whey from EHP Labs, Optimum Nutrition, Rule 1 and more.",
    badge: "Free shipping $99+",
    collection: "whey-protein",
    ctaLabel: "Shop Whey",
    gradient: "from-ink via-brand-dark to-brand",
  },
  {
    eyebrow: "Unleash the pump",
    title: (
      <>
        Pre-Workout<br /><span className="text-brand-foreground">Power Up</span>
      </>
    ),
    subtitle: "Top-rated formulas from the brands that hit hardest. Energy, focus, pump.",
    badge: "Best sellers",
    collection: "pre-workouts",
    ctaLabel: "Shop Pre-Workout",
    gradient: "from-brand-dark via-ink to-brand",
  },
  {
    eyebrow: "Build serious size",
    title: (
      <>
        Weight<br />Gainers<br /><span className="text-brand-foreground">In Stock</span>
      </>
    ),
    subtitle: "Pack on quality muscle with high-calorie blends from Rule 1 and more.",
    badge: "Shop the range",
    collection: "weight-gainer",
    ctaLabel: "Shop Gainers",
    gradient: "from-ink via-brand to-brand-dark",
  },
];

// Per-collection cache so we don't re-fetch on every slide change
const productCache: Record<string, ShopifyProduct[]> = {};

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [productsByCol, setProductsByCol] = useState<Record<string, ShopifyProduct[]>>({});
  const slide = SLIDES[i];

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  // Fetch the active slide's collection products on demand
  useEffect(() => {
    const handle = slide.collection;
    if (productCache[handle]) {
      setProductsByCol((prev) => (prev[handle] ? prev : { ...prev, [handle]: productCache[handle] }));
      return;
    }
    let cancelled = false;
    storefrontApiRequest(COLLECTION_PRODUCTS_QUERY, { handle, first: 6 })
      .then((res) => {
        const edges: ShopifyProduct[] = res?.data?.collection?.products?.edges ?? [];
        productCache[handle] = edges;
        if (!cancelled) setProductsByCol((prev) => ({ ...prev, [handle]: edges }));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slide.collection]);

  const prev = () => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setI((p) => (p + 1) % SLIDES.length);

  const slideProducts = (productsByCol[slide.collection] ?? []).slice(0, 3);

  return (
    <section className="bg-ink">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${slide.gradient} transition-all duration-700`}>
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: "radial-gradient(ellipse at 30% 50%, oklch(0.7 0.2 250 / 0.4) 0%, transparent 60%)" }}
          />

          <div key={i} className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-14 min-h-[420px] md:min-h-[480px] animate-fade-in">
            <div className="text-background">
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-brand-foreground/90 font-bold mb-4">
                {slide.eyebrow}
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-black uppercase leading-[0.95] text-background drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="mt-5 text-lg text-background/90 max-w-md">{slide.subtitle}</p>
              <div className="mt-7 flex items-center gap-4 flex-wrap">
                <div className="bg-background text-ink rounded-full px-5 py-2 font-display font-black text-lg uppercase">
                  {slide.badge}
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-background hover:bg-background/90 text-ink h-12 px-7 text-sm uppercase tracking-wider font-bold rounded-full"
                >
                  <Link to="/products" search={{ collection: slide.collection }}>
                    {slide.ctaLabel} <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="hidden md:flex justify-center items-center">
              <div className="grid grid-cols-3 gap-3">
                {slideProducts.length > 0 ? (
                  slideProducts.map((p, idx) => {
                    const img = p.node.images.edges[0]?.node;
                    return (
                      <Link
                        key={p.node.id}
                        to="/product/$handle"
                        params={{ handle: p.node.handle }}
                        className={`aspect-[3/4] bg-background/95 rounded-xl overflow-hidden p-4 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform ${
                          idx === 1 ? "scale-110 z-10" : ""
                        }`}
                      >
                        {img ? (
                          <img src={img.url} alt={img.altText ?? p.node.title} className="max-h-full object-contain" />
                        ) : (
                          <Zap className="h-10 w-10 text-brand" />
                        )}
                      </Link>
                    );
                  })
                ) : (
                  // Skeleton placeholders while products load — never show wrong products
                  [0, 1, 2].map((idx) => (
                    <div
                      key={idx}
                      className={`aspect-[3/4] bg-background/20 rounded-xl animate-pulse ${
                        idx === 1 ? "scale-110 z-10" : ""
                      }`}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Slider controls */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/20 hover:bg-background/40 text-background flex items-center justify-center backdrop-blur transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/20 hover:bg-background/40 text-background flex items-center justify-center backdrop-blur transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? "w-8 bg-background" : "w-2 bg-background/50 hover:bg-background/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
