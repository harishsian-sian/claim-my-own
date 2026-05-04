import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/price-match")({
  component: PriceMatch,
  head: () => ({
    meta: [
      { title: "Price Match Guarantee — MeltonSupps" },
      { name: "description", content: "Found it cheaper from another authorised Australian retailer? We'll match the price." },
    ],
  }),
});

function PriceMatch() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase">Price Match Guarantee</h1>
        <div className="space-y-4 mt-6 text-foreground/90">
          <p>Find the same product cheaper from another authorised Australian retailer? We'll match it.</p>
          <h2 className="font-display text-xl font-bold uppercase mt-6">Conditions</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Identical product, brand, size and flavour</li>
            <li>In stock at the competitor at time of request</li>
            <li>Competitor must be an authorised Australian retailer</li>
            <li>Excludes clearance, marketplace and overseas sellers</li>
          </ul>
          <p className="mt-4">Send the link to <Link to="/contact" className="text-brand hover:underline">our team</Link> and we'll sort it.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
