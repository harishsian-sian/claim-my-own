import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Loader2, Package } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  storefrontApiRequest,
  COLLECTIONS_QUERY,
  type ShopifyCollection,
} from "@/lib/shopify";
import { BRAND_COLLECTION_HANDLES } from "@/lib/storeData";

export const Route = createFileRoute("/categories")({
  component: CategoriesPageContent,
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

export function CategoriesPageContent() {
  const [cats, setCats] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let cursor: string | null = null;
      const all: ShopifyCollection[] = [];
      while (true) {
        const res = await storefrontApiRequest(COLLECTIONS_QUERY, {
          first: 100,
          after: cursor,
        });
        const data = res?.data?.collections;
        if (!data) break;
        for (const e of data.edges) all.push(e.node);
        if (!data.pageInfo.hasNextPage) break;
        cursor = data.pageInfo.endCursor;
      }
      setCats(
        all
          .filter((c) => !BRAND_COLLECTION_HANDLES.has(c.handle))
          .sort((a, b) => a.title.localeCompare(b.title))
      );
      setLoading(false);
    })();
  }, []);

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
              {loading
                ? "Loading categories from store…"
                : `${cats.length} categories — every supplement type we stock, in one place.`}
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 md:py-14">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-brand" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {cats.map((c) => (
                <Link
                  key={c.handle}
                  to="/products"
                  search={{ collection: c.handle }}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-dark to-ink flex items-end p-4 md:p-5 hover:scale-[1.02] transition-transform"
                >
                  {c.image?.url ? (
                    <img
                      src={c.image.url}
                      alt={c.image.altText ?? c.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                    />
                  ) : (
                    <Package className="absolute top-6 right-6 h-10 w-10 text-background/40" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="relative">
                    <h3 className="font-display text-lg md:text-xl font-black uppercase text-background leading-tight drop-shadow-lg">
                      {c.title}
                    </h3>
                    <span className="text-xs text-background/90 uppercase tracking-wider font-semibold inline-flex items-center gap-1 mt-1">
                      Shop now <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
