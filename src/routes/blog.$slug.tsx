import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { POSTS } from "./blog";

const POST_BODIES: Record<string, { intro: string; sections: { h: string; p: string }[] }> = {
  "how-to-choose-a-whey-protein": {
    intro:
      "Whey protein is the workhorse supplement in most lifters' kitchens. But the label can get confusing fast — here's a plain-English guide to the main types.",
    sections: [
      { h: "Whey Protein Concentrate (WPC)", p: "Around 70–80% protein with a small amount of carbs and fat. Great taste, lower price, ideal as an everyday shake." },
      { h: "Whey Protein Isolate (WPI)", p: "Filtered to 90%+ protein with very little lactose, fat or carbs. A good pick if you're cutting or sensitive to dairy." },
      { h: "Hydrolysate (WPH)", p: "Pre-digested for fast absorption. Premium price, mostly used by serious athletes around training." },
      { h: "Blends", p: "Mix WPC, WPI and sometimes casein for sustained protein delivery — handy for meal replacement style shakes." },
    ],
  },
  "creatine-monohydrate-explained": {
    intro:
      "Creatine is the most researched sports supplement available. Here's the no-nonsense version of how to use it.",
    sections: [
      { h: "What it does", p: "Creatine helps regenerate ATP — your muscles' fast energy currency — supporting strength, power output and recovery between sets." },
      { h: "How to dose it", p: "3–5 g per day, taken at any time. A loading phase isn't necessary; consistency matters more than timing." },
      { h: "Monohydrate vs other forms", p: "Monohydrate is the gold standard. Fancier forms cost more without added benefit for most people." },
      { h: "Side effects", p: "Generally well tolerated. Drink plenty of water. Not recommended for anyone with kidney issues without medical advice." },
    ],
  },
  "pre-workout-buying-guide": {
    intro:
      "Pre-workouts can be a real lift to your training — if you pick one that suits you. Here's what to look for on the label.",
    sections: [
      { h: "Caffeine", p: "150–300 mg is a solid dose for most adults. If you train at night or don't tolerate stimulants, look for a non-stim option." },
      { h: "Citrulline malate", p: "6–8 g supports blood flow and the 'pump'. Lower doses are mostly window dressing." },
      { h: "Beta-alanine", p: "3.2 g per day for the tingles and improved muscular endurance on higher-rep work." },
      { h: "Non-stim picks", p: "Look for citrulline, betaine, taurine and nootropics like L-tyrosine for focus without the buzz." },
    ],
  },
  "lean-vs-mass-gainer": {
    intro:
      "If you're struggling to gain weight, a gainer can fill the calorie gap. The trick is picking the right one for your goals.",
    sections: [
      { h: "Lean gainers", p: "Roughly 2:1 carb-to-protein ratio, typically 400–600 kcal per serve. Good for steady, controlled weight gain without excess fat." },
      { h: "Full mass gainers", p: "Higher carb load, often 800–1200 kcal per serve. Suited to hard-gainers with very high calorie demands." },
      { h: "When to use one", p: "Between meals or post-training to top up calories. Don't use one as a meal replacement long-term." },
      { h: "Don't forget food", p: "Real meals do most of the work. A gainer is just an easy way to add another 500 calories when needed." },
    ],
  },
};

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    const body = POST_BODIES[params.slug];
    return { post, body };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — MeltonSupps Blog` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
        ]
      : [{ title: "Blog — MeltonSupps" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Post not found</h1>
        <Link to="/blog" className="text-brand hover:underline mt-4 inline-block">
          ← Back to blog
        </Link>
      </main>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground mt-2">{error.message}</p>
      </main>
      <SiteFooter />
    </div>
  ),
});

function BlogPostPage() {
  const { post, body } = Route.useLoaderData();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brand mb-6">
          <ArrowLeft className="h-3.5 w-3.5" /> All articles
        </Link>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {new Date(post.date).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })} · {post.minutes} min read
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-black uppercase mt-2">{post.title}</h1>
        <p className="mt-4 text-lg text-foreground/80">{body?.intro ?? post.excerpt}</p>

        {body?.sections.map((s) => (
          <section key={s.h} className="mt-8">
            <h2 className="font-display text-xl font-bold uppercase">{s.h}</h2>
            <p className="mt-2 text-foreground/90">{s.p}</p>
          </section>
        ))}

        <div className="mt-12 p-5 rounded-2xl bg-muted/40 border text-sm text-muted-foreground">
          General information only. Always read the label and follow the directions for use. If symptoms persist,
          talk to your healthcare professional. See our{" "}
          <Link to="/disclaimer" className="text-brand hover:underline">health disclaimer</Link>.
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
