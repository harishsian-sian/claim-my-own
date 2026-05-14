import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import {
  storefrontApiRequest,
  COLLECTION_PRODUCTS_QUERY,
  type ShopifyProduct,
} from "@/lib/shopify";
import { getLegacyCategoryHandle } from "@/lib/legacyLinks";
import { BRAND_COLLECTION_HANDLES } from "@/lib/storeData";

export const Route = createFileRoute("/collections/$handle")({
  component: CollectionPage,
  head: ({ params }) => {
    const title = params.handle
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const legacyCategoryHandle = getLegacyCategoryHandle(params.handle);
    const canonicalPath = BRAND_COLLECTION_HANDLES.has(params.handle)
      ? `/collections/${params.handle}`
      : `/product-category/${legacyCategoryHandle}`;
    return {
      meta: [
        { title: `${title} — MeltonSupps` },
        {
          name: "description",
          content: `Shop ${title} at MeltonSupps.`,
        },
      ],
      links: [{ rel: "canonical", href: `https://www.meltonsupps.com.au${canonicalPath}` }],
    };
  },
});

const PAGE_SIZE = 24;

function CollectionPage() {
  const { handle } = Route.useParams();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [collectionTitle, setCollectionTitle] = useState<string | null>(null);

  const fetchPage = async (after: string | null) => {
    const res = await storefrontApiRequest(COLLECTION_PRODUCTS_QUERY, {
      handle,
      first: PAGE_SIZE,
      after,
    });
    const c = res?.data?.collection;
    return {
      title: c?.title ?? null,
      edges: (c?.products?.edges ?? []) as ShopifyProduct[],
      endCursor: c?.products?.pageInfo?.endCursor ?? null,
      hasNext: c?.products?.pageInfo?.hasNextPage ?? false,
    };
  };

  useEffect(() => {
    setLoading(true);
    setProducts([]);
    setCursor(null);
    setHasMore(true);
    setCollectionTitle(null);
    fetchPage(null)
      .then((r) => {
        setProducts(r.edges);
        setCursor(r.endCursor);
        setHasMore(r.hasNext);
        setCollectionTitle(r.title);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

  const loadMore = async () => {
    if (!cursor || !hasMore || loadingMore) return;
    setLoadingMore(true);
    try {
      const r = await fetchPage(cursor);
      setProducts((prev) => [...prev, ...r.edges]);
      setCursor(r.endCursor);
      setHasMore(r.hasNext);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase">
            {collectionTitle ?? handle}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {loading ? "Loading…" : `${products.length}${hasMore ? "+" : ""} products`}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-brand" />
          </div>
        ) : (
          <>
            <ProductGrid products={products} />
            {hasMore && (
              <div className="flex justify-center mt-12">
                <Button
                  onClick={loadMore}
                  disabled={loadingMore}
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 uppercase tracking-wider text-xs font-semibold"
                >
                  {loadingMore ? <Loader2 className="h-4 w-4 animate-spin" /> : "Load more"}
                </Button>
              </div>
            )}
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
