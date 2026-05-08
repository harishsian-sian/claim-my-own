import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { STORES } from "@/lib/stores";

export const Route = createFileRoute("/stores")({
  component: StoresPage,
  head: () => ({
    meta: [
      { title: "Find a Store — MeltonSupps" },
      { name: "description", content: "Find your nearest MeltonSupps store in Melton and Braybrook, Victoria. Address, phone, opening hours and directions." },
      { property: "og:title", content: "Find a Store — MeltonSupps" },
      { property: "og:description", content: "Visit MeltonSupps in Melton or Braybrook, VIC for Australia's best supplement brands." },
    ],
  }),
});

function StoresPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-brand font-bold">Store Locator</p>
          <h1 className="font-display text-4xl md:text-5xl font-black uppercase mt-2">Find a Store</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Visit one of our Victorian stores for expert advice and the full MeltonSupps range.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {STORES.map((s) => (
            <div key={s.handle} className="border rounded-2xl overflow-hidden bg-muted/20 flex flex-col">
              <iframe
                src={s.embedUrl}
                title={`Map of ${s.name}`}
                className="w-full h-48 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="font-display text-2xl font-black uppercase">{s.name}</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-brand mt-0.5" /><span>{s.address}, {s.suburb} {s.state} {s.postcode}</span></li>
                  <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand" /><a href={s.phoneHref} className="hover:text-brand">{s.phone}</a></li>
                  <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-brand" /><span>Mon–Fri {s.hours[0].time}</span></li>
                </ul>
                <div className="mt-6 flex gap-3">
                  <Link
                    to="/stores/$handle"
                    params={{ handle: s.handle }}
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-bold uppercase tracking-wide transition-colors"
                  >
                    View Store <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={s.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-full border-2 border-ink text-ink text-sm font-bold uppercase tracking-wide hover:bg-ink hover:text-background transition-colors"
                  >
                    Directions
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
