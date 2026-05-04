import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/wholesale")({
  component: Wholesale,
  head: () => ({
    meta: [
      { title: "Wholesale & Trade — MeltonSupps" },
      { name: "description", content: "Wholesale and trade supplement supply for gyms, PTs and resellers across Australia." },
    ],
  }),
});

function Wholesale() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase">Wholesale & Trade</h1>
        <div className="space-y-5 mt-6 text-foreground/90">
          <p>We supply gyms, personal trainers, health clubs and resellers across Australia with genuine supplements at competitive trade prices.</p>
          <h2 className="font-display text-xl font-bold uppercase mt-8">Who qualifies</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Registered gyms and fitness studios</li>
            <li>Certified personal trainers and coaches</li>
            <li>Allied health clinics</li>
            <li>Resellers with valid ABN</li>
          </ul>
          <h2 className="font-display text-xl font-bold uppercase mt-8">Apply</h2>
          <p>Email <a className="text-brand hover:underline" href="mailto:wholesale@meltonsupps.com.au">wholesale@meltonsupps.com.au</a> with your business name, ABN and the brands you're interested in. Or use our <Link to="/contact" className="text-brand hover:underline">contact form</Link>.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
