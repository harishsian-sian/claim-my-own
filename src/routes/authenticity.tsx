import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, BadgeCheck, FileCheck, AlertTriangle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";

export const Route = createFileRoute("/authenticity")({
  component: AuthenticityPage,
  head: () => ({
    meta: [
      { title: "100% Authentic Supplements Guarantee — MeltonSupps" },
      { name: "description", content: "Our 100% Authenticity Guarantee. Every supplement at MeltonSupps is sourced direct from approved Australian distributors." },
      { property: "og:title", content: "Authentic Supplements Guarantee — MeltonSupps" },
      { property: "og:description", content: "Every product sourced direct from approved Australian distributors. Zero counterfeits." },
    ],
  }),
});

function AuthenticityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-ink text-background">
          <div className="container mx-auto px-4 py-16">
            <Breadcrumbs items={[{ label: "Authenticity Guarantee" }]} />
            <p className="text-xs uppercase tracking-widest text-brand font-bold mt-6">Our Promise</p>
            <h1 className="font-display text-4xl md:text-6xl font-black uppercase mt-2 max-w-3xl">100% Authentic Supplements. Guaranteed.</h1>
            <p className="mt-4 text-background/80 text-lg max-w-2xl">
              Every product sold by MeltonSupps is sourced direct from approved Australian distributors.
              No grey-market stock. No counterfeits. Ever.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-5">
            <Card icon={<ShieldCheck className="h-6 w-6 text-brand" />} title="Direct distributor sourcing" desc="We buy direct from authorised Australian distributors and manufacturers — never from third-party marketplaces." />
            <Card icon={<BadgeCheck className="h-6 w-6 text-brand" />} title="Batch tracking" desc="Every product is logged by batch number. If a recall is issued, we contact affected customers immediately." />
            <Card icon={<FileCheck className="h-6 w-6 text-brand" />} title="Compliant labelling" desc="All stock carries Australian labelling, ingredient lists and listed ARTG/AUST L numbers where applicable." />
            <Card icon={<AlertTriangle className="h-6 w-6 text-brand" />} title="Counterfeit-free promise" desc="If you ever receive a product you suspect isn't authentic, we'll refund you in full and personally investigate." />
          </div>

          <div className="mt-12 prose-spec">
            <h2 className="font-display text-2xl font-black uppercase">How we verify authenticity</h2>
            <ul className="mt-4 space-y-2 text-foreground/85 list-disc pl-5">
              <li>Direct purchasing relationships with brand owners and authorised Australian distributors only</li>
              <li>Tamper-evident seals checked on receipt and at dispatch</li>
              <li>Batch numbers logged in our inventory system for full traceability</li>
              <li>Storage in temperature-controlled, food-safe warehousing</li>
              <li>Random batch verification with brand reps to confirm authenticity</li>
            </ul>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <FAQAccordion items={[
            { q: "How do I know my product is authentic?", a: "Every order ships from our Australian warehouses with sealed, batch-tracked stock. You can verify authenticity by contacting the brand with your batch number." },
            { q: "What if I think my product is fake?", a: "Contact us immediately at info@meltonsupps.com.au. We'll refund you in full and investigate the batch with the manufacturer at no cost to you." },
            { q: "Do you sell US-import or grey-market stock?", a: "No — only Australian-distributor stock with proper labelling and ARTG/AUST L compliance where applicable." },
          ]} />
        </section>

        <section className="container mx-auto px-4 py-12 text-center">
          <Link to="/products" className="inline-flex items-center h-11 px-6 rounded-full bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-bold uppercase tracking-wide">Shop with Confidence</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Card({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="border rounded-2xl p-6 bg-muted/20">
      {icon}
      <h3 className="font-display text-lg font-bold uppercase mt-2">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
    </div>
  );
}
