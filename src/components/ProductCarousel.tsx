import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import type { ShopifyProduct } from "@/lib/shopify";

interface ProductCarouselProps {
  products: ShopifyProduct[];
  title: string;
  eyebrow?: string;
  viewAllTo?: string;
  viewAllSearch?: Record<string, string>;
}

export function ProductCarousel({ products, title, eyebrow, viewAllTo, viewAllSearch }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex items-end justify-between mb-6 md:mb-8 gap-4">
        <div>
          {eyebrow && (
            <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">{eyebrow}</span>
          )}
          <h2 className="font-display text-2xl md:text-4xl font-black uppercase mt-2">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {viewAllTo && (
            <Link
              to={viewAllTo}
              search={viewAllSearch as never}
              className="hidden sm:inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-brand transition-colors mr-3"
            >
              View all
            </Link>
          )}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="h-10 w-10 rounded-full border-2 border-ink bg-background text-ink flex items-center justify-center hover:bg-ink hover:text-background transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="h-10 w-10 rounded-full border-2 border-ink bg-background text-ink flex items-center justify-center hover:bg-ink hover:text-background transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-4 px-4 pb-2"
      >
        {products.map((p) => (
          <div key={p.node.id} className="flex-shrink-0 w-[70%] sm:w-[45%] md:w-[30%] lg:w-[23%] snap-start">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
