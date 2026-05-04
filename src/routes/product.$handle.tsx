import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Loader2, ChevronLeft, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import {
  storefrontApiRequest,
  PRODUCT_BY_HANDLE_QUERY,
  formatMoney,
  type ShopifyProduct,
} from "@/lib/shopify";

export const Route = createFileRoute("/product/$handle")({
  component: ProductDetail,
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground mt-2">{error.message}</p>
        <Button asChild className="mt-6 bg-brand hover:bg-brand-dark text-brand-foreground"><Link to="/products">Back to shop</Link></Button>
      </main>
      <SiteFooter />
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Product not found</h1>
        <Button asChild className="mt-6 bg-brand hover:bg-brand-dark text-brand-foreground"><Link to="/products">Back to shop</Link></Button>
      </main>
      <SiteFooter />
    </div>
  ),
});

type ProductNode = ShopifyProduct["node"] & { descriptionHtml?: string };

function ProductDetail() {
  const { handle } = Route.useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    setLoading(true);
    setError(null);
    storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle })
      .then((res) => {
        const p = res?.data?.product;
        if (!p) {
          setError("not_found");
          return;
        }
        setProduct(p);
        const initial: Record<string, string> = {};
        p.options?.forEach((o: any) => { initial[o.name] = o.values[0]; });
        setSelectedOptions(initial);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [handle]);

  const selectedVariant = useMemo(() => {
    if (!product) return null;
    return product.variants.edges.find((v) =>
      v.node.selectedOptions.every((o) => selectedOptions[o.name] === o.value),
    )?.node ?? product.variants.edges[0]?.node;
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => router.history.back()}
            className="inline-flex items-center text-xs uppercase tracking-wider text-muted-foreground hover:text-brand"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </button>
        </div>
        <div className="container mx-auto px-4 pb-16 grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center p-8">
              {heroImg ? (
                <img src={heroImg.url} alt={heroImg.altText ?? product.title} className="max-h-full object-contain" />
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
                    className={`aspect-square bg-muted rounded overflow-hidden p-2 border-2 transition-colors ${i === selectedImg ? "border-brand" : "border-transparent"}`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.vendor && (
              <span className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">
                {product.vendor}
              </span>
            )}
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-2 leading-tight">
              {product.title}
            </h1>
            <p className="font-display text-3xl font-bold mt-4 text-foreground">
              {formatMoney(price.amount, price.currencyCode)}
            </p>
            {!available && (
              <p className="mt-2 text-sm text-destructive font-medium">Out of stock</p>
            )}

            {/* Options */}
            {product.options.map((opt) => {
              if (opt.values.length === 1 && opt.values[0] === "Default Title") return null;
              return (
                <div key={opt.name} className="mt-6">
                  <p className="text-xs uppercase tracking-wider font-semibold mb-2">
                    {opt.name}: <span className="text-muted-foreground font-normal normal-case">{selectedOptions[opt.name]}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {opt.values.map((v) => {
                      const selected = selectedOptions[opt.name] === v;
                      return (
                        <button
                          key={v}
                          onClick={() => setSelectedOptions((s) => ({ ...s, [opt.name]: v }))}
                          className={`px-3.5 py-2 text-sm rounded-md border transition-colors ${selected ? "border-brand bg-brand/10 text-brand font-medium" : "border-border hover:border-foreground"}`}
                        >
                          {v}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Quantity + Add */}
            <div className="mt-8 flex gap-3">
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" className="h-12 w-12" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-12 w-12" onClick={() => setQuantity((q) => q + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={handleAdd}
                disabled={isLoading || !available}
                className="flex-1 h-12 bg-brand hover:bg-brand-dark text-brand-foreground uppercase tracking-wider text-sm font-semibold"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : available ? "Add to Cart" : "Sold Out"}
              </Button>
            </div>

            {/* Description */}
            {(product.descriptionHtml || product.description) && (
              <div className="mt-10 pt-8 border-t">
                <h2 className="font-display text-lg font-bold uppercase mb-3">Description</h2>
                {product.descriptionHtml ? (
                  <div
                    className="prose prose-sm max-w-none text-muted-foreground leading-relaxed [&_p]:mb-3 [&_li]:mb-1 [&_strong]:text-foreground"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
