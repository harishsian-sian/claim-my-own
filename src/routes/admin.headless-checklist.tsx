import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, ExternalLink, Loader2, RefreshCw, Search } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  getHeadlessChecklist,
  SHOPIFY_ADMIN_STORE_DOMAIN,
  type ChecklistProduct,
} from "@/lib/shopifyAdmin.functions";

export const Route = createFileRoute("/admin/headless-checklist")({
  component: HeadlessChecklistPage,
  head: () => ({
    meta: [
      { title: "Headless Publishing Checklist — Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

type Filter = "missing-headless" | "all" | "missing-online" | "fully-published";

function HeadlessChecklistPage() {
  const fetchChecklist = useServerFn(getHeadlessChecklist);
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["headless-checklist"],
    queryFn: () => fetchChecklist(),
    staleTime: 30_000,
  });

  const [filter, setFilter] = useState<Filter>("missing-headless");
  const [search, setSearch] = useState("");

  const products = data?.products ?? [];
  const error = data?.error ?? null;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products
      .filter((p) => {
        if (filter === "missing-headless") return !p.onHeadless;
        if (filter === "missing-online") return !p.onOnlineStore;
        if (filter === "fully-published") return p.onHeadless && p.onOnlineStore;
        return true;
      })
      .filter((p) => !q || p.title.toLowerCase().includes(q) || p.handle.toLowerCase().includes(q));
  }, [products, filter, search]);

  const counts = useMemo(
    () => ({
      total: products.length,
      missingHeadless: products.filter((p) => !p.onHeadless).length,
      missingOnline: products.filter((p) => !p.onOnlineStore).length,
      fully: products.filter((p) => p.onHeadless && p.onOnlineStore).length,
    }),
    [products],
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-6xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase">
            Headless Publishing Checklist
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Products missing from <strong>Headless</strong> won't show on this website. Click any
            product to open it in Shopify Admin and tick the missing sales channel.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard
            label="Total products"
            value={counts.total}
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          <StatCard
            label="Missing Headless"
            value={counts.missingHeadless}
            tone="warn"
            active={filter === "missing-headless"}
            onClick={() => setFilter("missing-headless")}
          />
          <StatCard
            label="Missing Online Store"
            value={counts.missingOnline}
            tone="warn"
            active={filter === "missing-online"}
            onClick={() => setFilter("missing-online")}
          />
          <StatCard
            label="Fully published"
            value={counts.fully}
            tone="ok"
            active={filter === "fully-published"}
            onClick={() => setFilter("fully-published")}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by title or handle…"
              className="pl-9 h-11"
            />
          </div>
          <Button
            variant="outline"
            className="h-11"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span className="ml-2">Refresh</span>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-brand" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            No products match this filter.
          </div>
        ) : (
          <ul className="divide-y border rounded-md bg-card">
            {filtered.map((p) => (
              <ProductRow key={p.id} product={p} />
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
  active,
  onClick,
}: {
  label: string;
  value: number;
  tone?: "warn" | "ok";
  active?: boolean;
  onClick?: () => void;
}) {
  const toneClass =
    tone === "warn"
      ? "text-amber-600 dark:text-amber-400"
      : tone === "ok"
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-foreground";

  return (
    <button
      onClick={onClick}
      className={`text-left rounded-md border p-4 transition hover:bg-muted/50 ${
        active ? "ring-2 ring-brand border-brand" : ""
      }`}
    >
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${toneClass}`}>{value}</div>
    </button>
  );
}

function ProductRow({ product }: { product: ChecklistProduct }) {
  const adminUrl = `https://${SHOPIFY_ADMIN_STORE_DOMAIN}/admin/products/${product.numericId}`;

  return (
    <li className="flex items-center gap-4 p-4">
      <div className="h-12 w-12 rounded bg-muted flex-shrink-0 overflow-hidden">
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold truncate">{product.title}</span>
          <Badge variant={product.status === "ACTIVE" ? "secondary" : "outline"} className="text-[10px]">
            {product.status}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground truncate">/{product.handle}</div>
        <div className="flex gap-4 mt-2 text-xs">
          <ChannelPill label="Online Store" on={product.onOnlineStore} />
          <ChannelPill label="Headless" on={product.onHeadless} />
        </div>
      </div>
      <a
        href={adminUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brand hover:underline whitespace-nowrap"
      >
        Fix in Shopify <ExternalLink className="h-3 w-3" />
      </a>
    </li>
  );
}

function ChannelPill({ label, on }: { label: string; on: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 ${
        on ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
      }`}
    >
      {on ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
      {label}
    </span>
  );
}
