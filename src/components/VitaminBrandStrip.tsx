import { Link } from "@tanstack/react-router";
import { useCollections } from "@/hooks/useCollections";
import { BRAND_COLLECTION_HANDLES } from "@/lib/storeData";

// Brands we carry that focus on vitamins / wellness / health
const VITAMIN_BRAND_HANDLES = new Set<string>([
  "now-foods",
  "atp-science",
  "pillar-performance",
  "switch-nutrition",
  "gentec",
  "biokey",
  "welltech-nutrition",
  "macro-mike",
  "pranaon",
  "nutricost-1",
]);

export function VitaminBrandStrip() {
  const { collections } = useCollections();
  const brands = collections.filter(
    (c) =>
      BRAND_COLLECTION_HANDLES.has(c.handle) &&
      VITAMIN_BRAND_HANDLES.has(c.handle) &&
      c.image?.url
  );
  if (brands.length === 0) return null;

  // Duplicate list for seamless marquee
  const loop = [...brands, ...brands, ...brands];

  return (
    <section className="bg-muted/40 border-y overflow-hidden py-8">
      <div className="container mx-auto px-4 mb-5 flex items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">
            Health &amp; Wellness
          </span>
          <h2 className="font-display text-xl md:text-2xl font-black uppercase mt-1">
            Trusted Vitamin Brands
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Newly stocked — premium vitamins, minerals &amp; daily wellness essentials.
          </p>
        </div>
        <Link
          to="/brands"
          className="text-xs md:text-sm font-bold uppercase tracking-wider hover:text-brand transition-colors"
        >
          View all
        </Link>
      </div>
      <div className="relative group">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-muted/40 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-muted/40 to-transparent z-10" />
        <div className="flex gap-6 animate-marquee will-change-transform group-hover:[animation-play-state:paused]">
          {loop.map((b, idx) => (
            <Link
              key={`${b.handle}-${idx}`}
              to="/products"
              search={{ collection: b.handle }}
              aria-label={b.title}
              className="flex-shrink-0 w-32 h-20 md:w-40 md:h-24 rounded-xl border bg-background flex items-center justify-center p-3 hover:border-brand hover:shadow-md transition-all"
            >
              <img
                src={b.image!.url}
                alt={b.title}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
