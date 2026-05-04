import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/gift-cards")({
  component: GiftCards,
  head: () => ({
    meta: [
      { title: "Gift Cards — MeltonSupps" },
      { name: "description", content: "The perfect gift for every athlete. Digital gift cards from $25 to $500." },
    ],
  }),
});

function GiftCards() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase">Gift Cards</h1>
        <p className="text-muted-foreground mt-3">The perfect gift for the gym junkie in your life.</p>
        <div className="mt-8 space-y-4 text-foreground/90">
          <ul className="list-disc pl-6 space-y-1">
            <li>Available from $25 to $500</li>
            <li>Delivered instantly via email</li>
            <li>Never expire</li>
            <li>Redeemable on any product in store</li>
          </ul>
          <Link to="/contact" className="inline-block mt-4 text-brand hover:underline">Contact us to purchase →</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
