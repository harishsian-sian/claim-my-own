import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowRight, Search } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { BLOG_POSTS, CATEGORY_META, type BlogCategory } from "@/lib/blogData";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Supplement Blog & Guides — MeltonSupps" },
      { name: "description", content: "Expert supplement guides, training tips and nutrition advice from MeltonSupps. Muscle growth, fat loss, recovery & more." },
      { property: "og:title", content: "MeltonSupps Blog — Supplement Guides & Training Tips" },
      { property: "og:description", content: "Honest, jargon-free supplement guides from Australia's trusted source." },
    ],
  }),
});

// Re-export for backward compatibility with existing slug route
export const POSTS = BLOG_POSTS;

function BlogPage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<BlogCategory | "all">("all");

  const featured = BLOG_POSTS[0];

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((p) => {
      if (activeCat !== "all" && p.category !== activeCat) return false;
      if (query && !`${p.title} ${p.excerpt}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, activeCat]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-6xl">
        <Breadcrumbs items={[{ label: "Blog" }]} />
        <header className="mt-6 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">The MeltonSupps Blog</span>
          <h1 className="font-display text-4xl md:text-5xl font-black uppercase mt-2">Guides &amp; Articles</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Honest, jargon-free supplement, training and nutrition advice from the team at MeltonSupps.
          </p>
        </header>

        {/* Featured */}
        {featured && (
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="block mt-10 border rounded-3xl overflow-hidden bg-ink text-background hover:border-brand transition-colors"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-brand to-brand-dark min-h-[220px] flex items-center justify-center p-8">
                <span className="font-display text-3xl font-black uppercase text-brand-foreground text-center">Featured</span>
              </div>
              <div className="p-8">
                <span className="text-xs uppercase tracking-widest text-brand font-bold">{CATEGORY_META[featured.category].label}</span>
                <h2 className="font-display text-2xl md:text-3xl font-black uppercase mt-3">{featured.title}</h2>
                <p className="text-background/80 mt-3">{featured.excerpt}</p>
                <span className="inline-flex items-center gap-1 mt-5 text-brand text-xs font-bold uppercase tracking-wider">
                  Read article <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Search + categories */}
        <div className="mt-10 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="pl-9"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <CatButton active={activeCat === "all"} onClick={() => setActiveCat("all")}>All</CatButton>
          {(Object.keys(CATEGORY_META) as BlogCategory[]).map((c) => (
            <CatButton key={c} active={activeCat === c} onClick={() => setActiveCat(c)}>
              {CATEGORY_META[c].label}
            </CatButton>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group border rounded-2xl p-6 hover:border-brand transition-colors bg-muted/20 flex flex-col"
            >
              <span className="text-[10px] uppercase tracking-widest text-brand font-bold">
                {CATEGORY_META[p.category].label}
              </span>
              <h2 className="font-display text-lg font-bold mt-2 group-hover:text-brand transition-colors">
                {p.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-2 flex-1">{p.excerpt}</p>
              <p className="text-xs text-muted-foreground mt-3">
                {new Date(p.date).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })} · {p.minutes} min
              </p>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">No articles match your search.</p>
        )}

        <div className="mt-14">
          <NewsletterCTA />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function CatButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`h-9 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${active ? "bg-brand text-brand-foreground" : "border-2 border-ink/20 text-foreground hover:border-brand hover:text-brand"}`}
    >
      {children}
    </button>
  );
}
