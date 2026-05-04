import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/sitemap")({
  component: Sitemap,
  head: () => ({
    meta: [
      { title: "Sitemap — MeltonSupps" },
      { name: "description", content: "Browse every page on the MeltonSupps store." },
    ],
  }),
});

const SECTIONS: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { to: "/products", label: "All Products" },
      { to: "/categories", label: "Categories" },
      { to: "/brands", label: "Brands" },
    ],
  },
  {
    title: "Help",
    links: [
      { to: "/contact", label: "Contact" },
      { to: "/faq", label: "FAQ" },
      { to: "/shipping", label: "Shipping & Delivery" },
      { to: "/returns", label: "Returns & Refunds" },
      { to: "/track-order", label: "Track Order" },
      { to: "/price-match", label: "Price Match" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/wholesale", label: "Wholesale & Trade" },
      { to: "/loyalty", label: "Rewards" },
      { to: "/gift-cards", label: "Gift Cards" },
      { to: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Service" },
      { to: "/disclaimer", label: "Health Disclaimer" },
    ],
  },
];

function Sitemap() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase">Sitemap</h1>
        <div className="grid md:grid-cols-4 gap-8 mt-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-sm uppercase tracking-wider font-bold mb-3">{s.title}</h2>
              <ul className="space-y-2 text-sm">
                {s.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="hover:text-brand">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
