import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/returns")({
  component: ReturnsPage,
  head: () => ({
    meta: [
      { title: "Returns & Refunds — MeltonSupps" },
      {
        name: "description",
        content: "Our returns and refunds policy for MeltonSupps customers, in line with Australian Consumer Law.",
      },
    ],
  }),
});

function ReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase">Returns &amp; Refunds</h1>
        <div className="space-y-5 mt-6 text-foreground/90">
          <p>
            We want you to be happy with your purchase. Our returns policy is consistent with the
            consumer guarantees provided under the Australian Consumer Law.
          </p>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Change of mind</h2>
            <p className="mt-2">
              For health and safety reasons, we cannot accept returns on opened or used supplement
              products simply for change of mind. Unopened products with intact factory seals may be
              returned within 14 days of delivery for a store credit (shipping costs are not refunded).
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Damaged or faulty items</h2>
            <p className="mt-2">
              If your order arrives damaged, or a product is faulty, contact us within 7 days of
              delivery at <a className="text-brand hover:underline" href="mailto:info@meltonsupps.com.au">info@meltonsupps.com.au</a>{" "}
              with your order number and photos. We'll arrange a replacement, exchange or refund.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Incorrect items</h2>
            <p className="mt-2">
              If we've sent the wrong item, we'll cover return shipping and send the correct product
              as a priority.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">How to lodge a return</h2>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>Email info@meltonsupps.com.au with your order number and reason</li>
              <li>We'll respond within 1–2 business days with return instructions</li>
              <li>Once received and inspected, refunds are processed within 5 business days</li>
            </ol>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
