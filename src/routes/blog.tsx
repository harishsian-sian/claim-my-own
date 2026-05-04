import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog — MeltonSupps" },
      {
        name: "description",
        content: "Supplement guides, training tips and nutrition advice from the team at MeltonSupps.",
      },
    ],
  }),
});

export const POSTS = [
  {
    slug: "how-to-choose-a-whey-protein",
    title: "How to choose the right whey protein",
    excerpt:
      "WPC, WPI, hydrolysate, blends — we break down the differences so you can pick the right whey for your goals and budget.",
    date: "2026-04-22",
    minutes: 5,
  },
  {
    slug: "creatine-monohydrate-explained",
    title: "Creatine monohydrate: what it does and how to use it",
    excerpt:
      "The most studied sports supplement on earth. Here's what creatine actually does, the right dose, and why fancy versions are usually a waste.",
    date: "2026-04-08",
    minutes: 4,
  },
  {
    slug: "pre-workout-buying-guide",
    title: "Pre-workout buying guide: stim, non-stim and everything in between",
    excerpt:
      "Caffeine, beta-alanine, citrulline — what to look for on the label and how to match a pre-workout to your training style.",
    date: "2026-03-19",
    minutes: 6,
  },
  {
    slug: "lean-vs-mass-gainer",
    title: "Lean gainer vs. mass gainer — which one do you actually need?",
    excerpt:
      "If the scale isn't moving, a gainer can help. Here's how to tell whether a lean gainer or full mass gainer fits your goals.",
    date: "2026-03-04",
    minutes: 4,
  },
];

function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">The MeltonSupps blog</span>
          <h1 className="font-display text-4xl md:text-5xl font-black uppercase mt-2">Guides &amp; Articles</h1>
          <p className="text-muted-foreground mt-3">
            Honest, jargon-free supplement and training advice from the team in Melton.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group border rounded-2xl p-6 hover:border-brand transition-colors bg-muted/20"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {new Date(p.date).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })} · {p.minutes} min read
              </p>
              <h2 className="font-display text-xl font-bold mt-2 group-hover:text-brand transition-colors">
                {p.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">{p.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-brand uppercase tracking-wider mt-4">
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
