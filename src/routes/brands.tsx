import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Tag } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  storefrontApiRequest,
  COLLECTIONS_QUERY,
  type ShopifyCollection,
} from "@/lib/shopify";
import { BRAND_COLLECTION_HANDLES } from "@/lib/storeData";

export const Route = createFileRoute("/brands")({
  component: BrandsPage,
  head: () => ({
    meta: [
      { title: "Shop by Brand — MeltonSupps" },
      {
        name: "description",
        content:
          "Browse all supplement brands stocked at MeltonSupps — Switch Nutrition, EHP Labs, ATP Science, Optimum Nutrition, Rule 1 and more.",
      },
    ],
  }),
});

function BrandsPage() {
  const [brands, setBrands] = useState<ShopifyCollection[]>([]);
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
      setBrands(
        all
          .filter((c) => BRAND_COLLECTION_HANDLES.has(c.handle))
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
              The full lineup
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-black uppercase mt-2">
              Shop by Brand
            </h1>
            <p className="mt-3 text-background/70 max-w-2xl">
              {loading
                ? "Loading brands from store…"
                : `${brands.length} trusted supplement brands. Tap a brand to view its products.`}
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 md:py-14">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-brand" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {brands.map((b) => (
                <Link
                  key={b.handle}
                  to="/collections/$handle"
                  params={{ handle: b.handle }}
                  aria-label={b.title}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-background border hover:border-brand hover:shadow-lg transition-all flex items-center justify-center p-4"
                >
                  {b.image?.url ? (
                    <img
                      src={b.image.url}
                      alt={b.image.altText ?? b.title}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Tag className="h-10 w-10 text-muted-foreground" />
                  )}
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
