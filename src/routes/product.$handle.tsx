import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  ChevronLeft,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Store,
  Award,
  Heart,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductCard } from "@/components/ProductCard";
import { useCartStore } from "@/stores/cartStore";
import {
  storefrontApiRequest,
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
  formatMoney,
  type ShopifyProduct,
} from "@/lib/shopify";

export const Route = createFileRoute("/product/$handle")({
  loader: async ({ params }) => {
    try {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle: params.handle });
      const p = data?.data?.productByHandle;
      if (!p) return { seo: null };
      const img = p.images?.edges?.[0]?.node?.url ?? null;
      const price = p.priceRange?.minVariantPrice?.amount ?? null;
      const currency = p.priceRange?.minVariantPrice?.currencyCode ?? "AUD";
      const desc = (p.description ?? "").replace(/\s+/g, " ").trim().slice(0, 160);
      return {
        seo: {
          handle: params.handle,
          title: p.title as string,
          description: desc,
          image: img as string | null,
          price,
          currency,
          available: !!p.availableForSale,
        },
      };
    } catch {
      return { seo: null };
    }
  },
  head: ({ loaderData, params }) => {
    const seo = loaderData?.seo;
    const url = `https://meltonsupps.com.au/product/${params.handle}`;
    if (!seo) {
      return {
        meta: [
          { title: "Product — MeltonSupps" },
          { name: "robots", content: "noindex" },
        ],
        links: [{ rel: "canonical", href: url }],
      };
    }
    const title = `${seo.title} — MeltonSupps`;
    const desc = seo.description || `Buy ${seo.title} online at MeltonSupps. Free shipping over $150.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        ...(seo.image ? [{ property: "og:image", content: seo.image }] : []),
        ...(seo.image ? [{ name: "twitter:image", content: seo.image }] : []),
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        ...(seo.price ? [{ property: "product:price:amount", content: String(seo.price) }] : []),
        { property: "product:price:currency", content: seo.currency },
        { property: "product:availability", content: seo.available ? "in stock" : "out of stock" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: seo.title,
            description: desc,
            image: seo.image ? [seo.image] : undefined,
            url,
            offers: seo.price
              ? {
                  "@type": "Offer",
                  price: seo.price,
                  priceCurrency: seo.currency,
                  availability: seo.available
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
                  url,
                }
              : undefined,
          }),
        },
      ],
    };
  },
  component: ProductDetail,
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground mt-2">{error.message}</p>
        <Button asChild className="mt-6 bg-brand hover:bg-brand-dark text-brand-foreground">
          <Link to="/products">Back to shop</Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Product not found</h1>
        <Button asChild className="mt-6 bg-brand hover:bg-brand-dark text-brand-foreground">
          <Link to="/products">Back to shop</Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  ),
});

type ProductNode = ShopifyProduct["node"] & { descriptionHtml?: string };

// Map product category -> complementary product search terms (the "stack")
const COMBO_MAP: Record<string, string[]> = {
  preworkout: ["protein", "creatine", "shaker", "amino", "eaa"],
  protein: ["creatine", "shaker", "preworkout", "glutamine"],
  whey: ["creatine", "shaker", "preworkout", "glutamine"],
  creatine: ["protein", "preworkout", "shaker"],
  gainer: ["creatine", "shaker", "protein"],
  fatburner: ["preworkout", "protein", "l-carnitine", "shaker"],
  bcaa: ["protein", "preworkout", "shaker"],
  amino: ["protein", "preworkout", "shaker"],
  eaa: ["protein", "preworkout", "shaker"],
  vitamin: ["protein", "fish oil", "magnesium"],
  shaker: ["protein", "preworkout", "creatine"],
};

function detectCategory(p: ProductNode): string | null {
  const anyP = p as any;
  const text = `${p.title} ${anyP.productType ?? ""} ${(anyP.tags ?? []).join(" ")} ${p.description ?? ""}`.toLowerCase();
  if (/pre[-\s]?workout|pre\s?wo\b/.test(text)) return "preworkout";
  if (/whey|isolate|wpi|wpc/.test(text)) return "whey";
  if (/protein/.test(text)) return "protein";
  if (/creatine/.test(text)) return "creatine";
  if (/gainer|mass/.test(text)) return "gainer";
  if (/fat[\s-]?burn|thermogenic|l[\s-]?carnitine/.test(text)) return "fatburner";
  if (/\beaa\b/.test(text)) return "eaa";
  if (/\bbcaa\b|amino/.test(text)) return "bcaa";
  if (/vitamin|multi|mineral/.test(text)) return "vitamin";
  if (/shaker|bottle/.test(text)) return "shaker";
  return null;
}

async function fetchRelated(p: ProductNode): Promise<ShopifyProduct[]> {
  const out: ShopifyProduct[] = [];
  const seen = new Set<string>([p.handle]);

  const push = (edges: ShopifyProduct[], max: number) => {
    let n = 0;
    for (const e of edges) {
      if (n >= max) break;
      if (seen.has(e.node.handle)) continue;
      // Skip sold-out products (no available variants)
      const hasStock = e.node.variants.edges.some((v) => v.node.availableForSale);
      if (!hasStock) continue;
      seen.add(e.node.handle);
      out.push(e);
      n++;
    }
  };

  // 1) Complementary categories (combo stack) — 2 products
  const cat = detectCategory(p);
  const combos = cat ? COMBO_MAP[cat] ?? [] : [];
  for (const term of combos) {
    if (out.length >= 2) break;
    try {
      const r = await storefrontApiRequest(PRODUCTS_QUERY, {
        first: 4,
        query: `${term} AND -vendor:"${p.vendor ?? ""}"`,
      });
      push(r?.data?.products?.edges ?? [], 2 - out.length);
    } catch {}
  }

  // 2) Same brand — fill up to 4
  if (p.vendor && out.length < 4) {
    try {
      const r = await storefrontApiRequest(PRODUCTS_QUERY, {
        first: 8,
        query: `vendor:"${p.vendor}"`,
      });
      push(r?.data?.products?.edges ?? [], 4 - out.length);
    } catch {}
  }

  // 3) Generic fallback
  if (out.length < 4) {
    try {
      const r = await storefrontApiRequest(PRODUCTS_QUERY, { first: 8 });
      push(r?.data?.products?.edges ?? [], 4 - out.length);
    } catch {}
  }

  return out.slice(0, 4);
}


function ProductDetail() {
  const { handle } = Route.useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductNode | null>(null);
  const [related, setRelated] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [locations, setLocations] = useState<Array<{ id: string; name: string; city?: string }>>([]);
  const [inventory, setInventory] = useState<Record<string, Record<string, number>>>({});
  const [resyncing, setResyncing] = useState(false);

  const fetchInventory = async (variantIds: string) => {
    const r = await fetch(
      `/api/public/inventory?variantIds=${encodeURIComponent(variantIds)}&t=${Date.now()}`,
      { cache: "no-store" },
    );
    const j = await r.json();
    setLocations(j.locations ?? []);
    setInventory(j.inventory ?? {});
    return j;
  };

  const handleResync = async () => {
    if (!product || resyncing) return;
    setResyncing(true);
    try {
      const variantIds = product.variants.edges.map((v: any) => v.node.id).join(",");
      const j = await fetchInventory(variantIds);
      if (j?.error) {
        toast.error("Re-sync failed", { description: String(j.error) });
      } else {
        toast.success("Inventory re-synced", {
          description: `${(j.locations ?? []).length} locations updated`,
        });
      }
    } catch (e: any) {
      toast.error("Re-sync failed", { description: e?.message ?? "Unknown error" });
    } finally {
      setResyncing(false);
    }
  };

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSelectedImg(0);
    setQuantity(1);
    setRelated([]);
    storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle })
      .then((res) => {
        const p = res?.data?.product;
        if (!p) {
          setError("not_found");
          return;
        }
        setProduct(p);
        // Pick the first AVAILABLE variant so users don't land on a sold-out combo
        const firstAvailable =
          p.variants.edges.find((v: any) => v.node.availableForSale)?.node ??
          p.variants.edges[0]?.node;
        const initial: Record<string, string> = {};
        if (firstAvailable) {
          firstAvailable.selectedOptions.forEach((o: any) => {
            initial[o.name] = o.value;
          });
        } else {
          p.options?.forEach((o: any) => {
            initial[o.name] = o.values[0];
          });
        }
        setSelectedOptions(initial);

        // Fetch related products: complementary categories + same brand
        fetchRelated(p).then(setRelated).catch(() => {});

        // Fetch live per-location inventory from Admin API
        const variantIds = p.variants.edges.map((v: any) => v.node.id).join(",");
        fetchInventory(variantIds).catch(() => {});
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [handle]);

  const selectedVariant = useMemo(() => {
    if (!product) return null;
    return (
      product.variants.edges.find((v) =>
        v.node.selectedOptions.every((o) => selectedOptions[o.name] === o.value),
      )?.node ?? null
    );
  }, [product, selectedOptions]);

  const handleAdd = async () => {
    if (!selectedVariant || !product) return;
    await addItem({
      product: { node: product as ShopifyProduct["node"] },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions,
    });
    toast.success("Added to cart", { description: product.title, position: "top-right" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (error === "not_found" || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold">Product not found</h1>
          <Button asChild className="mt-6 bg-brand hover:bg-brand-dark text-brand-foreground">
            <Link to="/products">Back to shop</Link>
          </Button>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const images = product.images.edges;
  const heroImg = images[selectedImg]?.node ?? images[0]?.node;
  const available = selectedVariant?.availableForSale ?? false;
  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const cashback = (parseFloat(price.amount) * 0.05).toFixed(2);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-xs uppercase tracking-wider">
            <button
              onClick={() => router.history.back()}
              className="inline-flex items-center text-muted-foreground hover:text-brand"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </button>
            <span className="text-muted-foreground/50">/</span>
            <Link to="/products" className="text-muted-foreground hover:text-brand">
              Shop
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-foreground font-semibold truncate">{product.title}</span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 grid lg:grid-cols-12 gap-8">
          {/* Gallery */}
          <div className="lg:col-span-5">
            <div className="aspect-square bg-muted rounded-2xl overflow-hidden flex items-center justify-center p-8 border">
              {heroImg ? (
                <img
                  src={heroImg.url}
                  alt={heroImg.altText ?? product.title}
                  className="max-h-full object-contain"
                />
              ) : (
                <span className="text-muted-foreground text-sm">No image</span>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {images.map((img, i) => (
                  <button
                    key={img.node.url}
                    onClick={() => setSelectedImg(i)}
                    className={`aspect-square bg-muted rounded-lg overflow-hidden p-2 border-2 transition-colors ${
                      i === selectedImg ? "border-brand" : "border-transparent"
                    }`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:col-span-4">
            {product.vendor && (
              <Link
                to="/products"
                className="text-xs uppercase tracking-[0.2em] text-brand font-bold hover:underline"
              >
                {product.vendor}
              </Link>
            )}
            <h1 className="font-display text-3xl md:text-5xl font-black uppercase mt-2 leading-[0.95]">
              {product.title}
            </h1>

            {/* Trust badge strip */}
            <div className="mt-4 inline-flex items-center gap-2 bg-brand/10 text-brand px-3 py-1.5 rounded-full text-xs font-semibold">
              <Award className="h-3.5 w-3.5" /> 100% Genuine Stock
            </div>

            {/* Push performance bullets */}
            <div className="mt-6">
              <h2 className="font-display text-base font-black uppercase tracking-wide">
                Why You'll Love It
              </h2>
              <ul className="mt-3 space-y-2">
                {[
                  "Premium quality, sourced from trusted brands",
                  "Fast Australia-wide shipping",
                  "Local pickup available in Melton, VIC",
                  "Price match guarantee",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description / Nutrition / Shipping accordion */}
            <Accordion type="multiple" defaultValue={["desc"]} className="mt-8 border-t">
              {(product.descriptionHtml || product.description) && (
                <AccordionItem value="desc">
                  <AccordionTrigger className="font-display uppercase font-bold text-sm tracking-wide">
                    Description
                  </AccordionTrigger>
                  <AccordionContent>
                    {product.descriptionHtml ? (
                      <div
                        className="prose prose-sm max-w-none text-muted-foreground leading-relaxed [&_p]:mb-3 [&_li]:mb-1 [&_strong]:text-foreground [&_h2]:font-display [&_h2]:uppercase [&_h2]:text-foreground [&_h3]:text-foreground"
                        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {product.description}
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )}
              <AccordionItem value="ship">
                <AccordionTrigger className="font-display uppercase font-bold text-sm tracking-wide">
                  Shipping & Pickup
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    <strong className="text-foreground">Free shipping</strong> on orders over $150
                    Australia-wide.
                  </p>
                  <p>
                    <strong className="text-foreground">Click & Collect</strong> available from our
                    Melton, VIC store — usually ready within the hour.
                  </p>
                  <p>Standard orders ship same-day if placed before 2pm AEST.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="returns">
                <AccordionTrigger className="font-display uppercase font-bold text-sm tracking-wide">
                  Returns & Authenticity
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    All products are sourced directly from Australian distributors — guaranteed
                    100% genuine.
                  </p>
                  <p>
                    Unopened items can be returned within 14 days. See our{" "}
                    <Link to="/returns" className="text-brand hover:underline">
                      returns policy
                    </Link>
                    .
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Sticky purchase card */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24 border-2 rounded-2xl p-5 bg-card shadow-sm space-y-4">
              <div>
                <p className="font-display text-3xl font-black text-destructive">
                  {formatMoney(price.amount, price.currencyCode)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  or 4 interest-free payments of{" "}
                  <span className="font-semibold text-foreground">
                    {formatMoney(parseFloat(price.amount) / 4, price.currencyCode)}
                  </span>
                </p>
              </div>

              {/* Options */}
              {product.options.map((opt, idx) => {
                if (opt.values.length === 1 && opt.values[0] === "Default Title") return null;
                return (
                  <div key={opt.name} className="border-t pt-4">
                    <p className="text-[11px] uppercase tracking-wider font-bold mb-2 flex items-center justify-between">
                      <span>
                        {idx + 1}. Select {opt.name}
                      </span>
                      <span className="text-muted-foreground font-normal normal-case">
                        {opt.values.length} option{opt.values.length > 1 ? "s" : ""}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {opt.values.map((v) => {
                        const selected = selectedOptions[opt.name] === v;
                        // Check if any variant exists with this option value (combined with currently selected other options) that is in stock
                        const trial = { ...selectedOptions, [opt.name]: v };
                        const matching = product.variants.edges.find((ve) =>
                          ve.node.selectedOptions.every((o) => trial[o.name] === o.value),
                        );
                        const valueAvailable = matching?.node.availableForSale ?? false;
                        return (
                          <button
                            key={v}
                            onClick={() =>
                              setSelectedOptions((s) => ({ ...s, [opt.name]: v }))
                            }
                            className={`px-3 py-1.5 text-xs rounded-md border transition-colors relative ${
                              selected
                                ? "border-brand bg-brand/10 text-brand font-semibold"
                                : "border-border hover:border-foreground"
                            } ${!valueAvailable ? "opacity-50 line-through" : ""}`}
                            title={!valueAvailable ? "Out of stock" : undefined}
                          >
                            {v}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Quantity */}
              <div className="border-t pt-4">
                <p className="text-[11px] uppercase tracking-wider font-bold mb-2">Quantity</p>
                <div className="flex items-center border rounded-md w-fit">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Availability */}
              <div className="border-t pt-4 flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Availability:</span>
                {available ? (
                  <span className="font-semibold text-brand inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-brand inline-block" /> In stock
                  </span>
                ) : (
                  <span className="font-semibold text-destructive">Out of stock</span>
                )}
              </div>

              <Button
                onClick={handleAdd}
                disabled={isLoading || !available}
                className="w-full h-14 bg-ink hover:bg-ink/90 text-background uppercase tracking-wider text-sm font-bold rounded-xl"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : available ? (
                  "Add to Cart"
                ) : (
                  "Sold Out"
                )}
              </Button>

              {/* In-store availability — live per-location inventory from Shopify */}
              {locations.length > 0 && selectedVariant && (
                <div className="border rounded-lg p-3 bg-muted/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider">
                      In-Store Availability
                    </p>
                    <button
                      type="button"
                      onClick={handleResync}
                      disabled={resyncing}
                      className="text-[10px] uppercase tracking-wider text-brand hover:text-brand/80 inline-flex items-center gap-1 disabled:opacity-50"
                      aria-label="Re-sync inventory"
                    >
                      <RefreshCw className={`h-3 w-3 ${resyncing ? "animate-spin" : ""}`} />
                      {resyncing ? "Syncing…" : "Re-sync"}
                    </button>
                  </div>
                  {locations.map((loc) => {
                    const qty = inventory[selectedVariant.id]?.[loc.id] ?? 0;
                    const status =
                      qty <= 0
                        ? { label: "Out of stock", color: "text-muted-foreground" }
                        : qty < 5
                          ? { label: `Low stock (${qty} left)`, color: "text-amber-600" }
                          : { label: "In stock", color: "text-green-600" };
                    return (
                      <p
                        key={loc.id}
                        className="text-xs text-muted-foreground inline-flex items-center gap-1.5 w-full"
                      >
                        <Store className="h-3.5 w-3.5 text-brand shrink-0" />
                        <span>
                          <strong className="text-foreground">{loc.name}</strong>
                          {loc.city ? `, ${loc.city}` : ""} —{" "}
                          <span className={status.color}>{status.label}</span>
                        </span>
                      </p>
                    );
                  })}
                </div>
              )}

              <button className="w-full text-xs uppercase tracking-wider text-muted-foreground hover:text-brand inline-flex items-center justify-center gap-1.5">
                <Heart className="h-4 w-4" /> Save to wishlist
              </button>

              {/* Trust icons */}
              <div className="border-t pt-4 grid grid-cols-3 gap-2 text-[10px] text-center text-muted-foreground">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="h-4 w-4 text-brand" />
                  <span className="font-semibold uppercase">Free $150+</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-brand" />
                  <span className="font-semibold uppercase">Genuine</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Award className="h-4 w-4 text-brand" />
                  <span className="font-semibold uppercase">Price Match</span>
                </div>
              </div>

              <p className="text-[10px] text-muted-foreground text-center pt-1">
                You'll earn{" "}
                <span className="text-destructive font-semibold">${cashback}</span> in store credit.
              </p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="bg-muted/30 border-t">
            <div className="container mx-auto px-4 py-12">
              <div className="flex items-end justify-between mb-6">
                <h2 className="font-display text-2xl md:text-3xl font-black uppercase">
                  Stack It With
                </h2>
                {product.vendor && (
                  <Link
                    to="/products"
                    className="text-xs uppercase tracking-wider font-bold text-brand hover:underline"
                  >
                    Shop all {product.vendor} →
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p) => (
                  <ProductCard key={p.node.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
