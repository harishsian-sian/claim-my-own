import { Link } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { formatMoney, shopifyImage, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const node = product.node;
  const variant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const discountedPrice = (parseFloat(price.amount) * 0.95).toFixed(2);
  const hasMultipleVariants = node.variants.edges.length > 1;
  const available = variant?.availableForSale ?? false;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    if (hasMultipleVariants) {
      // route to product page to choose
      window.location.href = `/product/${node.handle}`;
      return;
    }
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: node.title, position: "top-right" });
  };

  return (
    <Link
      to="/products/$handle"
      params={{ handle: node.handle }}
      className="group flex flex-col bg-card border rounded-md overflow-hidden hover:shadow-lg hover:border-brand/40 transition-all"
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
        {image ? (
          <img
            src={shopifyImage(image.url, 500, 500)}
            alt={image.altText ?? node.title}
            loading="lazy"
            decoding="async"
            width={500}
            height={500}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
            No image
          </div>
        )}
        {!available && (
          <span className="absolute top-3 left-3 bg-foreground/90 text-background text-[10px] uppercase tracking-wider px-2 py-1 rounded">
            Sold out
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        {node.vendor && (
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1">
            {node.vendor}
          </span>
        )}
        <h3 className="font-medium text-sm leading-snug line-clamp-2 flex-1 group-hover:text-brand transition-colors">
          {node.title}
        </h3>
        <div className="flex items-center justify-between mt-3 pt-3 border-t">
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-foreground">
              {formatMoney(price.amount, price.currencyCode)}
            </span>
            <span className="text-xs font-semibold text-brand leading-snug">
              Use code MAY5 — pay {formatMoney(discountedPrice, price.currencyCode)}
            </span>
            <div className="flex flex-wrap gap-1 mt-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wide bg-brand/10 text-brand px-1.5 py-0.5 rounded">
                Buy 2 · 10% OFF
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wide bg-brand text-brand-foreground px-1.5 py-0.5 rounded">
                Buy 3 · 15% OFF
              </span>
            </div>
          </div>
          <Button
            size="icon"
            onClick={handleAdd}
            disabled={isLoading || !available}
            className="h-9 w-9 bg-brand hover:bg-brand-dark text-brand-foreground rounded-full"
            aria-label="Add to cart"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </Link>
  );
}
