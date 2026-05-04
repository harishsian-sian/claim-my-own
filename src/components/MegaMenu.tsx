import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useCollections } from "@/hooks/useCollections";
import { BRAND_COLLECTION_HANDLES } from "@/lib/storeData";

interface MegaMenuProps {
  type: "categories" | "brands";
  onNavigate?: () => void;
}

export function MegaMenu({ type, onNavigate }: MegaMenuProps) {
  const { collections, loading } = useCollections();

  const items = collections
    .filter((c) =>
      type === "brands"
        ? BRAND_COLLECTION_HANDLES.has(c.handle)
        : !BRAND_COLLECTION_HANDLES.has(c.handle)
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  // Featured (first 4 with images) for the right panel
  const featured = items.filter((c) => c.image?.url).slice(0, 4);

  return (
    <div className="absolute left-0 right-0 top-full bg-background text-foreground shadow-2xl border-t border-border z-50 animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h3 className="font-display text-xs uppercase tracking-[0.3em] text-brand font-bold mb-4">
              All {type === "brands" ? "Brands" : "Categories"}
            </h3>
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading…</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1.5 max-h-[60vh] overflow-y-auto">
                {items.map((c) => (
                  <Link
                    key={c.handle}
                    to="/products"
                    search={{ collection: c.handle }}
                    onClick={onNavigate}
                    className="text-sm py-1.5 hover:text-brand transition-colors truncate"
                  >
                    {c.title}
                  </Link>
                ))}
                <Link
                  to={type === "brands" ? "/brands" : "/categories"}
                  onClick={onNavigate}
                  className="text-sm py-1.5 font-bold text-brand uppercase tracking-wide inline-flex items-center gap-1"
                >
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>

          {featured.length > 0 && (
            <div>
              <h3 className="font-display text-xs uppercase tracking-[0.3em] text-brand font-bold mb-4">
                Featured
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {featured.map((c) => (
                  <Link
                    key={c.handle}
                    to="/products"
                    search={{ collection: c.handle }}
                    onClick={onNavigate}
                    className="group aspect-square rounded-lg overflow-hidden bg-muted flex items-center justify-center p-2 border hover:border-brand transition-colors"
                  >
                    {c.image?.url && (
                      <img
                        src={c.image.url}
                        alt={c.title}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
