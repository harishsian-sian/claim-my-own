import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service — MeltonSupps" },
      {
        name: "description",
        content: "Terms and conditions of using MeltonSupps and purchasing from our store.",
      },
    ],
  }),
});

function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase">Terms of Service</h1>
        <div className="space-y-5 mt-6 text-foreground/90">
          <p>
            By using meltonsupps.com.au and placing an order, you agree to the following terms.
          </p>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Use of site</h2>
            <p className="mt-2">
              You must be 18 years or older to purchase from this site. Information on this site is
              provided for general purposes and is not medical advice.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Pricing &amp; availability</h2>
            <p className="mt-2">
              All prices are in Australian Dollars (AUD) and include GST where applicable. We reserve
              the right to update prices and product availability without notice. If a pricing error
              occurs we may cancel the order and issue a full refund.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Product information</h2>
            <p className="mt-2">
              Product images and descriptions are provided by manufacturers and brand partners.
              Formulations, packaging or flavours may change without notice. Always read the label
              before use.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase">Limitation of liability</h2>
            <p className="mt-2">
              To the maximum extent permitted by law, MeltonSupps is not liable for indirect or
              consequential loss arising from use of this site or our products. Nothing in these
              terms limits the consumer guarantees provided under Australian Consumer Law.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
