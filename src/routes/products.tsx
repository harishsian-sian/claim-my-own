import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  storefrontApiRequest,
  PRODUCTS_QUERY,
  COLLECTION_PRODUCTS_QUERY,
  type ShopifyProduct,
} from "@/lib/shopify";

interface Search {
  q?: string;
  collection?: string;
}

export const Route = createFileRoute("/products")({
  component: Products,
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search.q === "string" ? search.q : undefined,
    collection: typeof search.collection === "string" ? search.collection : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All Products — MeltonSupps" },
      {
        name: "description",
        content:
          "Browse our full catalog of health and sports supplements. Protein, pre-workout, vitamins and more.",
      },
    ],
  }),
});

const PAGE_SIZE = 24;

function Products() {
  const { q, collection } = Route.useSearch();
  const navigate = useNavigate({ from: "/products" });
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [collectionTitle, setCollectionTitle] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState(q ?? "");
  const initial = useRef(true);

  const fetchPage = async (after: string | null) => {
    if (collection) {
      const res = await storefrontApiRequest(COLLECTION_PRODUCTS_QUERY, {
        handle: collection,
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
    }
    const res = await storefrontApiRequest(PRODUCTS_QUERY, {
      first: PAGE_SIZE,
      after,
      query: q || null,
    });
    const data = res?.data?.products;
    return {
      title: null,
      edges: (data?.edges ?? []) as ShopifyProduct[],
      endCursor: data?.pageInfo?.endCursor ?? null,
      hasNext: data?.pageInfo?.hasNextPage ?? false,
    };
  };

  // Reset when q or collection changes
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
  }, [q, collection]);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    setSearchInput(q ?? "");
  }, [q]);

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
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const v = searchInput.trim();
    navigate({ search: v ? { q: v } : {} });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase">
            {collectionTitle ?? (q ? `Search: ${q}` : "Shop All Products")}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {loading
              ? "Loading…"
              : `${products.length}${hasMore ? "+" : ""} products`}
          </p>
        </div>

        <form onSubmit={handleSearch} className="mb-8 flex gap-2 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products, brands, categories…"
              className="pl-9 h-11"
            />
          </div>
          <Button type="submit" className="h-11 px-6 bg-brand hover:bg-brand-dark text-brand-foreground uppercase tracking-wider text-xs font-semibold">
            Search
          </Button>
          {q && (
            <Button type="button" variant="outline" className="h-11" onClick={() => { setSearchInput(""); navigate({ search: {} }); }}>
              Clear
            </Button>
          )}
        </form>

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
                  {loadingMore ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Load more"
                  )}
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
