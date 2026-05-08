import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, Instagram, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getStore, STORES } from "@/lib/stores";

export const Route = createFileRoute("/stores/$handle")({
  loader: ({ params }) => {
    const store = getStore(params.handle);
    if (!store) throw notFound();
    return { store };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.store;
    if (!s) return {};
    const title = `${s.name} — Store Location`;
    const desc = `Visit ${s.name} at ${s.address}, ${s.suburb} ${s.state} ${s.postcode}. ${s.tagline}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-black uppercase">Store not found</h1>
        <Link to="/stores" className="inline-block mt-6 text-brand font-bold uppercase">View all stores</Link>
      </main>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-black uppercase">Something went wrong</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
      </main>
      <SiteFooter />
    </div>
  ),
  component: StorePage,
});

function StorePage() {
  const { store: s } = Route.useLoaderData();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-ink text-background">
          <div className="container mx-auto px-4 py-12">
            <Link to="/stores" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-background/70 hover:text-brand">
              <ArrowLeft className="h-3 w-3" /> All Stores
            </Link>
            <p className="text-xs uppercase tracking-widest text-brand font-bold mt-4">Store Location</p>
            <h1 className="font-display text-4xl md:text-6xl font-black uppercase mt-2">{s.name}</h1>
            <p className="mt-3 text-background/80 text-lg">
              {s.address}, {s.suburb} {s.state} {s.postcode}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={s.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-bold uppercase tracking-wide transition-colors"
              >
                Get Directions
              </a>
              <Link
                to="/stores"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full border-2 border-background/30 text-background text-sm font-bold uppercase tracking-wide hover:bg-background/10 transition-colors"
              >
                View All Stores
              </Link>
              <a
                href={s.phoneHref}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full border-2 border-background/30 text-background text-sm font-bold uppercase tracking-wide hover:bg-background/10 transition-colors"
              >
                Call Store
              </a>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl font-black uppercase">Store Information</h2>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Address</dt>
                <dd className="mt-1 flex items-start gap-2"><MapPin className="h-4 w-4 text-brand mt-0.5" /><span>{s.address}, {s.suburb} {s.state} {s.postcode}, Australia</span></dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Phone</dt>
                <dd className="mt-1 flex items-center gap-2"><Phone className="h-4 w-4 text-brand" /><a href={s.phoneHref} className="hover:text-brand">{s.phone}</a></dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Email</dt>
                <dd className="mt-1 flex items-center gap-2"><Mail className="h-4 w-4 text-brand" /><a href={`mailto:${s.email}`} className="hover:text-brand">{s.email}</a></dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Opening Hours</dt>
                <dd className="mt-2">
                  <table className="w-full text-sm">
                    <tbody>
                      {s.hours.map((h: { day: string; time: string }) => (
                        <tr key={h.day} className="border-b last:border-0">
                          <td className="py-2 font-semibold">{h.day}</td>
                          <td className="py-2 text-right text-muted-foreground">{h.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </dd>
              </div>
              {s.instagram && (
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Instagram</dt>
                  <dd className="mt-1 flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-brand" />
                    <a href={s.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand">{s.instagramHandle}</a>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div>
            <iframe
              src={s.embedUrl}
              title={`Map of ${s.name}`}
              className="w-full h-[400px] rounded-2xl border"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>

        <section className="bg-muted/30 border-y">
          <div className="container mx-auto px-4 py-14 max-w-3xl text-center">
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase">{s.tagline}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{s.intro}</p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Get your favourite supplement brands for less — <strong>Optimum Nutrition, Rule 1, EHP Labs, Ghost, Max's, International Protein</strong> and more.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center mt-6 h-11 px-6 rounded-full bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-bold uppercase tracking-wide transition-colors"
            >
              Shop the Range
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14">
          <h2 className="font-display text-2xl font-black uppercase text-center">Other Stores</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-3xl mx-auto">
            {STORES.filter((o) => o.handle !== s.handle).map((o) => (
              <Link
                key={o.handle}
                to="/stores/$handle"
                params={{ handle: o.handle }}
                className="border rounded-2xl p-6 bg-background hover:border-brand transition-colors"
              >
                <h3 className="font-display text-xl font-bold uppercase">{o.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{o.address}, {o.suburb}</p>
                <span className="inline-block mt-3 text-brand text-xs font-bold uppercase tracking-wide">View Store →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
