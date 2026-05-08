import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Check } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrustBadges } from "@/components/TrustBadges";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { getLocalPage } from "@/lib/localSeo";
import { getStore } from "@/lib/stores";

export const Route = createFileRoute("/local/$slug")({
  loader: ({ params }) => {
    const page = getLocalPage(params.slug);
    if (!page) throw notFound();
    const store = getStore(page.storeFocus);
    return { page, store };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.page;
    const s = loaderData?.store;
    if (!p) return {};
    const url = `https://meltonsupps.com.au/local/${p.slug}`;
    const ld: object[] = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://meltonsupps.com.au/" },
          { "@type": "ListItem", position: 2, name: "Local", item: "https://meltonsupps.com.au/stores" },
          { "@type": "ListItem", position: 3, name: p.h1, item: url },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: p.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ];
    if (s) {
      ld.push({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `MeltonSupps ${s.shortName}`,
        url,
        telephone: s.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: s.address,
          addressLocality: s.suburb,
          addressRegion: s.state,
          postalCode: s.postcode,
          addressCountry: "AU",
        },
        priceRange: "$$",
      });
    }
    return {
      meta: [
        { title: p.metaTitle },
        { name: "description", content: p.metaDescription },
        { name: "keywords", content: p.keywords.join(", ") },
        { property: "og:title", content: p.metaTitle },
        { property: "og:description", content: p.metaDescription },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: ld.map((obj) => ({ type: "application/ld+json", children: JSON.stringify(obj) })),
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-black uppercase">Page not found</h1>
        <Link to="/" className="text-brand mt-6 inline-block">Back home</Link>
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
  component: LocalSeoPage,
});

function LocalSeoPage() {
  const { page, store } = Route.useLoaderData();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-ink text-background">
          <div className="container mx-auto px-4 py-16">
            <Breadcrumbs items={[{ label: "Local", to: "/stores" }, { label: page.h1 }]} />
            <p className="text-xs uppercase tracking-widest text-brand font-bold mt-6">{page.hero.eyebrow}</p>
            <h1 className="font-display text-4xl md:text-6xl font-black uppercase mt-2 max-w-3xl">{page.hero.heading}</h1>
            <p className="mt-4 text-background/80 text-lg max-w-2xl">{page.hero.subheading}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to={page.ctaPrimary.to}
                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-bold uppercase tracking-wide transition-colors"
              >
                {page.ctaPrimary.label}
              </Link>
              {store && (
                <a
                  href={store.phoneHref}
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-full border-2 border-background/30 text-background text-sm font-bold uppercase tracking-wide hover:bg-background/10 transition-colors"
                >
                  <Phone className="h-4 w-4" /> Call {store.phone}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <p className="text-lg text-foreground/85 leading-relaxed">{page.intro}</p>
        </section>

        {/* Highlights */}
        <section className="container mx-auto px-4 pb-12">
          <h2 className="font-display text-3xl font-black uppercase text-center">Why Locals Choose MeltonSupps</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {page.highlights.map((h: { title: string; desc: string }) => (
              <div key={h.title} className="border rounded-2xl p-5 bg-muted/20">
                <Check className="h-5 w-5 text-brand" />
                <h3 className="font-display text-lg font-bold uppercase mt-2">{h.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{h.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust */}
        <section className="container mx-auto px-4 pb-12">
          <TrustBadges />
        </section>

        {/* Map + Store info */}
        {store && (
          <section className="container mx-auto px-4 py-12 grid lg:grid-cols-2 gap-8 items-start">
            <iframe
              src={store.embedUrl}
              title={`Map of ${store.name}`}
              className="w-full h-[400px] rounded-2xl border"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div>
              <h2 className="font-display text-3xl font-black uppercase">Visit Us In-Store</h2>
              <p className="text-muted-foreground mt-2">Get expert advice and the full range of brands at our local store.</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-brand mt-0.5" /><span>{store.address}, {store.suburb} {store.state} {store.postcode}</span></li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand" /><a href={store.phoneHref} className="hover:text-brand">{store.phone}</a></li>
                <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-brand" /><span>Mon–Fri {store.hours[0].time}</span></li>
              </ul>
              <div className="mt-6 flex gap-3">
                <a
                  href={store.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center h-11 px-5 rounded-full bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-bold uppercase tracking-wide transition-colors"
                >
                  Get Directions
                </a>
                <Link
                  to="/stores/$handle"
                  params={{ handle: store.handle }}
                  className="inline-flex items-center h-11 px-5 rounded-full border-2 border-ink text-ink text-sm font-bold uppercase tracking-wide hover:bg-ink hover:text-background transition-colors"
                >
                  Store Details
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Reviews */}
        <section className="bg-muted/20 border-y">
          <div className="container mx-auto px-4">
            <ReviewsSection />
          </div>
        </section>

        {/* FAQs */}
        <section className="container mx-auto px-4">
          <FAQAccordion items={page.faqs} />
        </section>

        {/* Newsletter */}
        <section className="container mx-auto px-4 py-12 max-w-3xl">
          <NewsletterCTA />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
