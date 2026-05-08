import { createFileRoute } from "@tanstack/react-router";

const SHOP = "ded508-e8.myshopify.com";
const API = "2025-07";
const TOKEN = "33b408a7018fba50742f111f637c4485";
const SITE = "https://meltonsupps.com.au";

const STATIC_PATHS = [
  "/",
  "/products",
  "/categories",
  "/brands",
  "/about",
  "/contact",
  "/faq",
  "/shipping",
  "/returns",
  "/price-match",
  "/blog",
  "/privacy",
  "/terms",
  "/disclaimer",
];

const QUERY = `
  query Sitemap($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      edges { node { handle updatedAt } }
    }
  }
`;

async function fetchAllProducts(): Promise<Array<{ handle: string; updatedAt: string }>> {
  const all: Array<{ handle: string; updatedAt: string }> = [];
  let after: string | null = null;
  for (let i = 0; i < 20; i++) {
    const res: Response = await fetch(`https://${SHOP}/api/${API}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN,
      },
      body: JSON.stringify({ query: QUERY, variables: { first: 250, after } }),
    });
    if (!res.ok) break;
    const json: any = await res.json();
    const products = json?.data?.products;
    if (!products) break;
    for (const e of products.edges ?? []) {
      all.push({ handle: e.node.handle, updatedAt: e.node.updatedAt });
    }
    if (!products.pageInfo?.hasNextPage) break;
    after = products.pageInfo.endCursor;
  }
  return all;
}

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!));
}

export const Route = createFileRoute("/sitemap.xml")({
  // @ts-expect-error - server handlers supported at runtime by TanStack Start
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];
        const staticUrls = STATIC_PATHS.map(
          (p) =>
            `<url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod><changefreq>${p === "/" ? "daily" : "weekly"}</changefreq><priority>${p === "/" ? "1.0" : "0.7"}</priority></url>`,
        ).join("\n");

        let productUrls = "";
        try {
          const products = await fetchAllProducts();
          productUrls = products
            .map(
              (p) =>
                `<url><loc>${SITE}/product/${escapeXml(p.handle)}</loc><lastmod>${(p.updatedAt || today).split("T")[0]}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
            )
            .join("\n");
        } catch {
          // ignore — return static-only sitemap
        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${productUrls}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
