import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Truck, Award, Users, Tag, Heart } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrustBadges } from "@/components/TrustBadges";
import { ReviewsSection } from "@/components/ReviewsSection";

export const Route = createFileRoute("/why-choose-us")({
  component: WhyChoose,
  head: () => ({
    meta: [
      { title: "Why Choose MeltonSupps — Australia's Most Trusted Supplement Store" },
      { name: "description", content: "100% authentic supplements, expert advice, lowest prices guaranteed and same-day local pickup. Here's why thousands choose MeltonSupps." },
      { property: "og:title", content: "Why Choose MeltonSupps" },
      { property: "og:description", content: "Authentic supplements, expert advice, lowest prices. Trusted by thousands across Australia." },
    ],
  }),
});

const REASONS = [
  { icon: ShieldCheck, title: "100% Authentic Products", desc: "Every product sourced direct from approved Australian distributors. We never sell grey-market or counterfeit stock." },
  { icon: Tag, title: "Lowest Prices Guaranteed", desc: "We price-match every major Australian supplement retailer — and beat most of them every day." },
  { icon: Truck, title: "Fast & Free Shipping", desc: "Same-day dispatch on orders before 2pm AEST. Free standard shipping over $150 Australia-wide." },
  { icon: Users, title: "Real Expert Advice", desc: "Our staff are gym-goers, athletes and qualified supplement specialists — never commission-driven sales people." },
  { icon: Award, title: "Trusted by 50,000+ Lifters", desc: "Thousands of 5-star reviews from customers across Melbourne and Australia." },
  { icon: Heart, title: "Community Focused", desc: "We sponsor local gyms, athletes and competitions across the western suburbs of Melbourne." },
];

function WhyChoose() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-ink text-background">
          <div className="container mx-auto px-4 py-16">
            <Breadcrumbs items={[{ label: "Why Choose Us" }]} />
            <p className="text-xs uppercase tracking-widest text-brand font-bold mt-6">Why MeltonSupps</p>
            <h1 className="font-display text-4xl md:text-6xl font-black uppercase mt-2 max-w-3xl">Why Thousands Choose MeltonSupps</h1>
            <p className="mt-4 text-background/80 text-lg max-w-2xl">
              Authentic supplements, expert advice, lowest prices guaranteed. Here's what sets us apart.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REASONS.map((r) => (
              <div key={r.title} className="border rounded-2xl p-6 bg-muted/20">
                <r.icon className="h-7 w-7 text-brand" />
                <h3 className="font-display text-lg font-bold uppercase mt-3">{r.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12">
          <TrustBadges />
        </section>

        <section className="bg-muted/20 border-y">
          <div className="container mx-auto px-4">
            <ReviewsSection />
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 text-center max-w-2xl">
          <h2 className="font-display text-3xl font-black uppercase">Ready to feel the difference?</h2>
          <p className="text-muted-foreground mt-3">Shop our range or visit one of our Victorian stores.</p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <Link to="/products" className="inline-flex items-center h-11 px-6 rounded-full bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-bold uppercase tracking-wide">Shop Now</Link>
            <Link to="/stores" className="inline-flex items-center h-11 px-6 rounded-full border-2 border-ink text-ink text-sm font-bold uppercase tracking-wide hover:bg-ink hover:text-background">Find a Store</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
