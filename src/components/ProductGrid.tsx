import type { ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: ShopifyProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 border rounded-md bg-muted/30">
        <p className="font-display text-xl font-semibold">No products found</p>
        <p className="text-sm text-muted-foreground mt-2">
          Try a different search or browse the full catalog.
        </p>
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((p) => (
        <ProductCard key={p.node.id} product={p} />
      ))}
    </div>
  );
}
