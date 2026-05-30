import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_STORE_PERMANENT_DOMAIN = "ded508-e8.myshopify.com";

const ADMIN_QUERY = `
  query HeadlessChecklist($first: Int!, $after: String) {
    products(first: $first, after: $after, sortKey: TITLE) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          id
          title
          handle
          status
          totalInventory
          featuredImage { url altText }
          resourcePublications(first: 25) {
            edges {
              node {
                isPublished
                publication { id name }
              }
            }
          }
        }
      }
    }
  }
`;

export interface ChecklistProduct {
  id: string;
  numericId: string;
  title: string;
  handle: string;
  status: string;
  totalInventory: number | null;
  image: string | null;
  channels: { name: string; isPublished: boolean }[];
  onOnlineStore: boolean;
  onHeadless: boolean;
}

const GENERIC_ERROR = "Admin data unavailable";

export const getHeadlessChecklist = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(
    async ({ context }): Promise<{ products: ChecklistProduct[]; error: string | null }> => {
      // Additional gate: only the configured admin user IDs may access this data.
      // Set ADMIN_USER_IDS to a comma-separated list of Supabase user IDs.
      const allowList = (process.env.ADMIN_USER_IDS ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (allowList.length > 0 && !allowList.includes(context.userId)) {
        console.warn("[admin checklist] denied non-admin user", context.userId);
        return { products: [], error: GENERIC_ERROR };
      }

      const token = process.env.SHOPIFY_ADMIN_TOKEN;
      if (!token) {
        console.error("[admin checklist] Shopify admin token not configured");
        return { products: [], error: GENERIC_ERROR };
      }

      const url = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;
      const all: ChecklistProduct[] = [];
      let cursor: string | null = null;

      try {
        while (true) {
          const res: Response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Access-Token": token,
            },
            body: JSON.stringify({
              query: ADMIN_QUERY,
              variables: { first: 50, after: cursor },
            }),
          });

          if (!res.ok) {
            const text = await res.text();
            console.error("[admin checklist] Shopify HTTP error", res.status, text.slice(0, 500));
            return { products: all, error: GENERIC_ERROR };
          }

          const json: any = await res.json();
          if (json.errors) {
            console.error("[admin checklist] Shopify GraphQL errors", json.errors);
            return { products: all, error: GENERIC_ERROR };
          }

          const data: any = json.data?.products;
          if (!data) break;

          for (const edge of data.edges) {
            const node = edge.node;
            const channels = node.resourcePublications.edges.map((e: any) => ({
              name: e.node.publication?.name ?? "Unknown",
              isPublished: e.node.isPublished,
            }));
            const onOnlineStore = channels.some(
              (c: any) => /online store/i.test(c.name) && c.isPublished,
            );
            const onHeadless = channels.some(
              (c: any) => /headless/i.test(c.name) && c.isPublished,
            );
            const numericId = (node.id as string).split("/").pop() ?? "";
            all.push({
              id: node.id,
              numericId,
              title: node.title,
              handle: node.handle,
              status: node.status,
              totalInventory: node.totalInventory,
              image: node.featuredImage?.url ?? null,
              channels,
              onOnlineStore,
              onHeadless,
            });
          }

          if (!data.pageInfo.hasNextPage) break;
          cursor = data.pageInfo.endCursor;
        }

        return { products: all, error: null };
      } catch (e: unknown) {
        console.error("[admin checklist] unexpected error", e);
        return { products: all, error: GENERIC_ERROR };
      }
    },
  );

export const SHOPIFY_ADMIN_STORE_DOMAIN = SHOPIFY_STORE_PERMANENT_DOMAIN;
