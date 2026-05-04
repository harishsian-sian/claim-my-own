import { Link } from "@tanstack/react-router";
import { useCollections } from "@/hooks/useCollections";
import { BRAND_COLLECTION_HANDLES } from "@/lib/storeData";

export function BrandStrip() {
  const { collections } = useCollections();
  const brands = collections.filter(
    (c) => BRAND_COLLECTION_HANDLES.has(c.handle) && c.image?.url
  );
  if (brands.length === 0) return null;

  // Duplicate list for seamless marquee
  const loop = [...brands, ...brands];

  return (
    <section className="bg-background border-y overflow-hidden py-6">
      <div className="container mx-auto px-4 mb-4 flex items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">
            Trusted by athletes
          </span>
          <h2 className="font-display text-xl md:text-2xl font-black uppercase mt-1">
            The Brands We Stock
          </h2>
        </div>
        <Link
          to="/brands"
          className="text-xs md:text-sm font-bold uppercase tracking-wider hover:text-brand transition-colors"
        >
          View all
        </Link>
      </div>
      <div className="relative group">
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
