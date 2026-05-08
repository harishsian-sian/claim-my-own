import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LOCAL_PAGES } from "@/lib/localSeo";

export const Route = createFileRoute("/local/")({
  component: LocalIndexPage,
  head: () => ({
    meta: [
      { title: "Local Supplement Stores in Melbourne — MeltonSupps" },
      { name: "description", content: "Local supplement guides for Melton, Caroline Springs, Braybrook and across Melbourne. Find your closest MeltonSupps store." },
    ],
  }),
});

function LocalIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
        <Breadcrumbs items={[{ label: "Local" }]} />
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase mt-6">Local Supplements in Melbourne</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          MeltonSupps proudly serves lifters and athletes across Melbourne's western suburbs.
          Pick your area below for a tailored guide.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-10">
          {LOCAL_PAGES.map((p) => (
            <Link
              key={p.slug}
              to="/local/$slug"
              params={{ slug: p.slug }}
              className="border rounded-2xl p-6 bg-muted/20 hover:border-brand transition-colors"
            >
              <h2 className="font-display text-xl font-bold uppercase">{p.h1}</h2>
              <p className="text-sm text-muted-foreground mt-2">{p.metaDescription}</p>
              <span className="inline-flex items-center gap-1 mt-4 text-brand text-xs font-bold uppercase">
                Read more <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
