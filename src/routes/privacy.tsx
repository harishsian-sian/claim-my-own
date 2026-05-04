import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — MeltonSupps" },
      {
        name: "description",
        content: "How MeltonSupps collects, uses and protects your personal information under Australian privacy law.",
      },
    ],
  }),
});

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase">Privacy Policy</h1>
        <div className="space-y-5 mt-6 text-foreground/90">
          <p>
            MeltonSupps is committed to protecting your privacy in accordance with the Privacy Act
            1988 (Cth) and the Australian Privacy Principles.
          </p>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">What we collect</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Name, email, phone and delivery address (for order fulfilment)</li>
              <li>Payment details (processed securely by Shopify Payments — we do not store card numbers)</li>
              <li>Order history and customer support communications</li>
              <li>Website analytics data (anonymised)</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">How we use your information</h2>
            <p className="mt-2">
              We use your information solely to process orders, provide customer service, comply with
              legal obligations, and (with your consent) send marketing emails. You can unsubscribe at
              any time.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Sharing</h2>
            <p className="mt-2">
              We share data only with trusted service providers who help us run the store
              (e.g. Shopify, Australia Post, payment processors). We do not sell your data to third
              parties.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Your rights</h2>
            <p className="mt-2">
              You can request access to, correction of, or deletion of your personal information at
              any time by emailing <a className="text-brand hover:underline" href="mailto:hello@meltonsupps.com.au">hello@meltonsupps.com.au</a>.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
