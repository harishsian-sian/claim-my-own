import { createServerFn } from "@tanstack/react-start";

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

export const getHeadlessChecklist = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ products: ChecklistProduct[]; error: string | null }> => {
    const token = process.env.SHOPIFY_ADMIN_TOKEN;
    if (!token) {
      return { products: [], error: "SHOPIFY_ADMIN_TOKEN secret not set." };
    }

    const url = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;
    const all: ChecklistProduct[] = [];
    let cursor: string | null = null;

    try {
      while (true) {
        const res = await fetch(url, {
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
          return { products: all, error: `Admin API ${res.status}: ${text.slice(0, 200)}` };
        }

        const json = await res.json();
        if (json.errors) {
          return {
            products: all,
            error: json.errors.map((e: any) => e.message).join(", "),
          };
        }

        const data = json.data?.products;
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
    } catch (e: any) {
      return { products: all, error: e?.message ?? "Unknown error" };
    }
  },
);

export const SHOPIFY_ADMIN_STORE_DOMAIN = SHOPIFY_STORE_PERMANENT_DOMAIN;
