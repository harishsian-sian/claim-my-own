import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/loyalty")({
  component: Loyalty,
  head: () => ({
    meta: [
      { title: "Rewards & Loyalty — MeltonSupps" },
      { name: "description", content: "Earn points on every purchase and unlock exclusive member discounts." },
    ],
  }),
});

function Loyalty() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase">Rewards Program</h1>
        <div className="space-y-5 mt-6 text-foreground/90">
          <p>Get rewarded every time you stack up. Earn points on purchases, reviews and referrals — redeem for store credit.</p>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            <div className="border rounded-xl p-5"><p className="font-display font-black text-3xl text-brand">1pt</p><p className="text-sm mt-1">per $1 spent</p></div>
            <div className="border rounded-xl p-5"><p className="font-display font-black text-3xl text-brand">50pt</p><p className="text-sm mt-1">for signing up</p></div>
            <div className="border rounded-xl p-5"><p className="font-display font-black text-3xl text-brand">100pt</p><p className="text-sm mt-1">per friend referred</p></div>
          </div>
          <p className="text-sm text-muted-foreground mt-6">Create an account at checkout to start earning automatically.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
