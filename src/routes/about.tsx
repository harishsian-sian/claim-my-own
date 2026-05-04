import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us — MeltonSupps" },
      {
        name: "description",
        content:
          "MeltonSupps is a locally owned Australian supplement store based in Melton, VIC. Genuine products, expert advice and honest pricing.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase">About MeltonSupps</h1>
        <div className="prose prose-neutral mt-6 space-y-4 text-foreground/90">
          <p>
            MeltonSupps is a locally owned and operated sports nutrition store based in Melton, Victoria.
            We stock a curated range of supplements from trusted Australian and international brands —
            EHP Labs, ATP Science, Optimum Nutrition, Rule 1, Now Foods, Switch Nutrition, Primabolics
            and many more.
          </p>
          <p>
            Our focus is simple: genuine stock, honest advice and fair pricing. Every product we sell
            is sourced from official Australian distributors, so you can shop with confidence knowing
            it's the real thing.
          </p>
          <h2 className="font-display text-2xl font-bold uppercase mt-8">Why shop with us</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>100% authentic products from official Australian distributors</li>
            <li>Free shipping on orders over $150 Australia-wide</li>
            <li>Local pickup available in Melton, VIC</li>
            <li>Friendly, knowledgeable staff to help you choose what fits your goals</li>
            <li>Price match on like-for-like items</li>
          </ul>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
