import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, User, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { getPostBySlug, getRelatedPosts, CATEGORY_META, DEFAULT_AUTHOR, type BlogPost, type BlogSection } from "@/lib/blogData";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    const related = getRelatedPosts(post.slug, post.category, 3);
    return { post, related };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return { meta: [{ title: "Blog — MeltonSupps" }] };
    const title = p.metaTitle ?? `${p.title} — MeltonSupps Blog`;
    const desc = p.metaDescription ?? p.excerpt;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: p.date },
        { property: "article:section", content: CATEGORY_META[p.category].label },
      ],
    };
  },
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
  component: BlogPostPage,
});

function BlogPostPage() {
  const data = Route.useLoaderData() as { post: BlogPost; related: BlogPost[] };
  const { post, related } = data;
  const author = post.author ?? DEFAULT_AUTHOR;
  const url = typeof window !== "undefined" ? window.location.href : `https://meltonsupps.com.au/blog/${post.slug}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <article className="container mx-auto px-4 py-10 max-w-3xl">
          <Breadcrumbs items={[{ label: "Blog", to: "/blog" }, { label: post.title }]} />

          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brand mt-6">
            <ArrowLeft className="h-3.5 w-3.5" /> All articles
          </Link>

          <span className="inline-block mt-4 text-[10px] uppercase tracking-widest text-brand font-bold">
            {CATEGORY_META[post.category].label}
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-black uppercase mt-2">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {author.name}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.minutes} min read</span>
            <span>{new Date(post.date).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>

          {/* Share */}
          <div className="flex items-center gap-2 mt-5">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Share:</span>
            <ShareBtn href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} icon={<Facebook className="h-3.5 w-3.5" />} label="Facebook" />
            <ShareBtn href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`} icon={<Twitter className="h-3.5 w-3.5" />} label="Twitter" />
            <ShareBtn href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} icon={<Linkedin className="h-3.5 w-3.5" />} label="LinkedIn" />
            <button
              onClick={() => navigator.clipboard?.writeText(url)}
              aria-label="Copy link"
              className="h-8 w-8 rounded-full border flex items-center justify-center hover:border-brand hover:text-brand"
            >
              <Link2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="mt-6 text-lg text-foreground/85 leading-relaxed">{post.intro}</p>

          {/* Table of contents */}
          {post.toc && post.toc.length > 0 && (
            <nav className="mt-8 border rounded-2xl p-5 bg-muted/30">
              <p className="text-xs uppercase tracking-widest text-brand font-bold">In this article</p>
              <ol className="mt-3 space-y-1.5 text-sm list-decimal pl-5">
                {post.toc.map((t: string) => (
                  <li key={t}><a href={`#${slugify(t)}`} className="hover:text-brand">{t}</a></li>
                ))}
              </ol>
            </nav>
          )}

          {/* Sections */}
          {post.sections.map((s: BlogSection) => (
            <section key={s.h} id={slugify(s.h)} className="mt-10">
              <h2 className="font-display text-2xl font-bold uppercase">{s.h}</h2>
              <p className="mt-3 text-foreground/90 leading-relaxed">{s.p}</p>
              {s.paragraphs?.map((para, idx) => (
                <p key={idx} className="mt-3 text-foreground/90 leading-relaxed">{para}</p>
              ))}
              {s.bullets && s.bullets.length > 0 && (
                <ul className="mt-4 space-y-2 list-disc pl-6 text-foreground/90 leading-relaxed">
                  {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
              {s.callout && (
                <div className="mt-4 border-l-4 border-brand bg-brand/10 px-4 py-3 rounded-r-md text-sm text-foreground/90 italic">
                  {s.callout}
                </div>
              )}
            </section>
          ))}

          {/* Related products */}
          {post.relatedProducts && post.relatedProducts.length > 0 && (
            <section className="mt-12 border rounded-2xl p-6 bg-muted/30">
              <h3 className="font-display text-lg font-black uppercase">Featured Products</h3>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                {post.relatedProducts.map((rp: { title: string; to: string }) => (
                  <a
                    key={rp.title}
                    href={rp.to}
                    className="border rounded-xl p-4 bg-background hover:border-brand transition-colors flex items-center justify-between"
                  >
                    <span className="font-bold text-sm">{rp.title}</span>
                    <ArrowRight className="h-4 w-4 text-brand" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Author */}
          <section className="mt-12 border rounded-2xl p-6 bg-muted/20 flex gap-4 items-start">
            <div className="h-12 w-12 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0">
              <User className="h-6 w-6 text-brand" />
            </div>
            <div>
              <p className="font-bold">{author.name}</p>
              <p className="text-xs text-muted-foreground">{author.role}</p>
              <p className="text-sm text-foreground/80 mt-2">{author.bio}</p>
            </div>
          </section>

          {/* FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <FAQAccordion items={post.faqs} />
          )}

          {/* CTA */}
          <section className="mt-12 rounded-2xl bg-ink text-background p-8 text-center">
            <h3 className="font-display text-2xl font-black uppercase">Ready to take the next step?</h3>
            <p className="text-background/70 mt-2">Shop our full range or visit a MeltonSupps store today.</p>
            <div className="mt-5 flex justify-center gap-3 flex-wrap">
              <Link to="/products" className="inline-flex items-center h-11 px-6 rounded-full bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-bold uppercase tracking-wide">Shop Now</Link>
              <Link to="/stores" className="inline-flex items-center h-11 px-6 rounded-full border-2 border-background/30 text-background text-sm font-bold uppercase tracking-wide hover:bg-background/10">Find a Store</Link>
            </div>
          </section>

          <div className="mt-8 p-5 rounded-2xl bg-muted/40 border text-sm text-muted-foreground">
            General information only. Always read the label and follow the directions for use. If symptoms persist,
            talk to your healthcare professional. See our{" "}
            <Link to="/disclaimer" className="text-brand hover:underline">health disclaimer</Link>.
          </div>

          {/* JSON-LD Article schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                description: post.excerpt,
                datePublished: post.date,
                author: { "@type": "Organization", name: author.name },
                publisher: { "@type": "Organization", name: "MeltonSupps" },
              }),
            }}
          />
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="container mx-auto px-4 py-12 max-w-5xl">
            <h2 className="font-display text-2xl font-black uppercase">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-5 mt-6">
              {related.map((p: BlogPost) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="border rounded-2xl p-5 bg-muted/20 hover:border-brand transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-widest text-brand font-bold">
                    {CATEGORY_META[p.category].label}
                  </span>
                  <h3 className="font-display text-base font-bold mt-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function ShareBtn({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Share on ${label}`}
      className="h-8 w-8 rounded-full border flex items-center justify-center hover:border-brand hover:text-brand"
    >
      {icon}
    </a>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
