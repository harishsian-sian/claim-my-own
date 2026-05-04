import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/shipping")({
  component: ShippingPage,
  head: () => ({
    meta: [
      { title: "Shipping & Delivery — MeltonSupps" },
      {
        name: "description",
        content: "Shipping rates, delivery times and pickup options for MeltonSupps orders.",
      },
    ],
  }),
});

function ShippingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase">Shipping &amp; Delivery</h1>
        <div className="space-y-5 mt-6 text-foreground/90">
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Free shipping</h2>
            <p className="mt-2">Free standard shipping Australia-wide on orders over $99.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Standard rates</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Orders under $99: flat rate $9.95</li>
              <li>Express shipping available at checkout</li>
              <li>Local pickup from Melton, VIC: free</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Delivery times</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Metro VIC: 1–3 business days</li>
              <li>Other capital cities: 2–5 business days</li>
              <li>Regional &amp; remote: 3–8 business days</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3">
              Orders placed before 1pm AEST on a business day are typically dispatched the same day.
              Tracking details are emailed once your order ships.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">International orders</h2>
            <p className="mt-2">
              We currently ship within Australia only. Some products may be subject to import
              restrictions if you arrange your own forwarding.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
