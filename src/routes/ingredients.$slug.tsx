import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Beaker, Clock, Pill, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { TrustBadges } from "@/components/TrustBadges";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { getIngredient } from "@/lib/ingredients";

export const Route = createFileRoute("/ingredients/$slug")({
  loader: ({ params }) => {
    const ingredient = getIngredient(params.slug);
    if (!ingredient) throw notFound();
    return { ingredient };
  },
  head: ({ loaderData }) => {
    const i = loaderData?.ingredient;
    if (!i) return {};
    const url = `https://www.meltonsupps.com.au/ingredients/${i.slug}`;
    const ld = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.meltonsupps.com.au/" },
          { "@type": "ListItem", position: 2, name: "Ingredients", item: "https://www.meltonsupps.com.au/ingredients" },
          { "@type": "ListItem", position: 3, name: i.name, item: url },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: i.metaTitle,
        description: i.metaDescription,
        author: { "@type": "Organization", name: "MeltonSupps" },
        publisher: { "@type": "Organization", name: "MeltonSupps" },
        url,
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: i.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ];
    return {
      meta: [
        { title: i.metaTitle },
        { name: "description", content: i.metaDescription },
        { property: "og:title", content: i.metaTitle },
        { property: "og:description", content: i.metaDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: ld.map((obj) => ({ type: "application/ld+json", children: JSON.stringify(obj) })),
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-black uppercase">Ingredient not found</h1>
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
  component: IngredientPage,
});

function IngredientPage() {
  const { ingredient: i } = Route.useLoaderData();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-ink text-background">
          <div className="container mx-auto px-4 py-16">
            <Breadcrumbs items={[{ label: "Ingredients", to: "/" }, { label: i.name }]} />
            <p className="text-xs uppercase tracking-widest text-brand font-bold mt-6 inline-flex items-center gap-2">
              <Beaker className="h-4 w-4" /> Ingredient Profile
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-black uppercase mt-2">{i.name}</h1>
            <p className="mt-4 text-background/80 text-lg max-w-2xl">{i.tagline}</p>
          </div>
        </section>

        {/* Intro */}
        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <p className="text-lg text-foreground/85 leading-relaxed">{i.intro}</p>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 pb-12">
          <h2 className="font-display text-3xl font-black uppercase">Key Benefits</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {i.benefits.map((b: { title: string; desc: string }) => (
              <div key={b.title} className="border rounded-2xl p-5 bg-muted/20">
                <ShieldCheck className="h-5 w-5 text-brand" />
                <h3 className="font-display text-lg font-bold uppercase mt-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Usage */}
        <section className="container mx-auto px-4 pb-12 max-w-4xl">
          <h2 className="font-display text-3xl font-black uppercase">Usage Guide</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="border rounded-2xl p-5">
              <Pill className="h-5 w-5 text-brand" />
              <h3 className="font-display text-sm font-bold uppercase mt-2">Dose</h3>
              <p className="text-sm text-muted-foreground mt-1">{i.usage.dose}</p>
            </div>
            <div className="border rounded-2xl p-5">
              <Clock className="h-5 w-5 text-brand" />
              <h3 className="font-display text-sm font-bold uppercase mt-2">Timing</h3>
              <p className="text-sm text-muted-foreground mt-1">{i.usage.timing}</p>
            </div>
            <div className="border rounded-2xl p-5">
              <Beaker className="h-5 w-5 text-brand" />
              <h3 className="font-display text-sm font-bold uppercase mt-2">Notes</h3>
              <p className="text-sm text-muted-foreground mt-1">{i.usage.notes}</p>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="container mx-auto px-4 pb-12">
          <TrustBadges />
        </section>

        {/* Related */}
        <section className="container mx-auto px-4 py-8 text-center">
          <a
            href={`/product-category/${i.relatedCategoryHandle}`}
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-bold uppercase tracking-wide transition-colors"
          >
            {i.relatedLabel}
          </a>
        </section>

        {/* FAQs */}
        <section className="container mx-auto px-4">
          <FAQAccordion items={i.faqs} />
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
