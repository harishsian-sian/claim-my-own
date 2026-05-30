import { createFileRoute } from "@tanstack/react-router";

const SHOP = "ded508-e8.myshopify.com";
const API = "2025-07";

type ShopifyLocation = { id: number; name: string; city?: string; active?: boolean };
type ShopifyVariantInventory = { id: number; inventory_item_id: number };
type ShopifyInventoryLevel = {
  inventory_item_id: number;
  location_id: number;
  available: number | null;
};

function getAdminTokens() {
  const tokens: string[] = [];
  const add = (value?: string) => {
    if (value && !tokens.includes(value)) tokens.push(value);
  };

  add(process.env.SHOPIFY_ADMIN_TOKEN);
  add(process.env.SHOPIFY_ACCESS_TOKEN);
  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith("SHOPIFY_ONLINE_ACCESS_TOKEN")) add(value);
  }

  return tokens;
}

async function fetchAdminJson(path: string, token: string) {
  const response = await fetch(`https://${SHOP}/admin/api/${API}${path}`, {
    headers: { "X-Shopify-Access-Token": token },
  });

  if (!response.ok) {
    return { ok: false as const, status: response.status, data: null };
  }

  return { ok: true as const, status: response.status, data: await response.json() };
}

const MAX_VARIANT_IDS = 100;
const VARIANT_GID_RE = /^gid:\/\/shopify\/ProductVariant\/\d+$/;
const GENERIC_ERROR = "Inventory unavailable";

export const Route = createFileRoute("/api/public/inventory")({
  // @ts-ignore - server handlers supported at runtime by TanStack Start
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const url = new URL(request.url);
        const rawIds = url.searchParams.get("variantIds")?.split(",").filter(Boolean) ?? [];

        if (rawIds.length > MAX_VARIANT_IDS) {
          return Response.json(
            { error: "Too many variant IDs", locations: [], inventory: {} },
            { status: 400 },
          );
        }

        const variantIds = rawIds.filter((id) => VARIANT_GID_RE.test(id));
        if (rawIds.length > 0 && variantIds.length !== rawIds.length) {
          return Response.json(
            { error: "Invalid variant ID format", locations: [], inventory: {} },
            { status: 400 },
          );
        }

        const tokens = getAdminTokens();
        if (tokens.length === 0) {
          console.error("[inventory] Shopify admin token not configured");
          return Response.json(
            { error: GENERIC_ERROR, locations: [], inventory: {} },
            { status: 503 },
          );
        }

        try {
          let token = tokens[0];
          let locJson: { locations?: ShopifyLocation[] } | null = null;
          let lastLocationStatus = 0;

          for (const candidate of tokens) {
            const result = await fetchAdminJson("/locations.json", candidate);
            lastLocationStatus = result.status;
            if (result.ok) {
              token = candidate;
              locJson = result.data as { locations?: ShopifyLocation[] };
              break;
            }
          }

          if (!locJson) {
            console.error("[inventory] locations request failed", lastLocationStatus);
            return Response.json(
              { error: GENERIC_ERROR, locations: [], inventory: {} },
              { status: 503 },
            );
          }

          const locations = (locJson.locations ?? [])
            .filter((l: ShopifyLocation) => l.active !== false)
            .map((l: ShopifyLocation) => ({ id: String(l.id), name: l.name, city: l.city }));

          if (variantIds.length === 0) {
            return Response.json({ locations, inventory: {} });
          }

          const numericIds = variantIds
            .map((v) => v.split("/").pop())
            .filter((id): id is string => Boolean(id));

          if (numericIds.length === 0) {
            return Response.json({ locations, inventory: {} });
          }

          const variantGidByNumericId = new Map(
            variantIds
              .map((gid) => [gid.split("/").pop(), gid] as const)
              .filter(([id]) => Boolean(id)),
          );

          const variantResults = await Promise.all(
            numericIds.map((id) => fetchAdminJson(`/variants/${id}.json?fields=id,inventory_item_id`, token)),
          );
          const variants: ShopifyVariantInventory[] = variantResults
            .filter((result) => result.ok)
            .map((result) => (result.data as { variant?: ShopifyVariantInventory }).variant)
            .filter((variant): variant is ShopifyVariantInventory => Boolean(variant));
          const itemToVariant = new Map<number, string>();
          variants.forEach((v) => {
            itemToVariant.set(
              v.inventory_item_id,
              variantGidByNumericId.get(String(v.id)) ?? `gid://shopify/ProductVariant/${v.id}`,
            );
          });

          const inventoryItemIds = variants.map((v) => v.inventory_item_id).join(",");
          if (!inventoryItemIds) {
            return Response.json({ locations, inventory: {} });
          }

          const invResult = await fetchAdminJson(
            `/inventory_levels.json?inventory_item_ids=${inventoryItemIds}`,
            token,
          );
          if (!invResult.ok) {
            return Response.json({ locations, inventory: {} });
          }
          const levels: ShopifyInventoryLevel[] =
            (invResult.data as { inventory_levels?: ShopifyInventoryLevel[] })?.inventory_levels ??
            [];

          const inventory: Record<string, Record<string, number>> = {};
          for (const lvl of levels) {
            const vid = itemToVariant.get(lvl.inventory_item_id);
            if (!vid) continue;
            inventory[vid] ??= {};
            inventory[vid][String(lvl.location_id)] = lvl.available ?? 0;
          }

          return Response.json({ locations, inventory });
        } catch (err: unknown) {
          console.error("[inventory] unexpected error", err);
          return Response.json(
            { error: GENERIC_ERROR, locations: [], inventory: {} },
            { status: 503 },
          );
        }
      },
    },
  },
});
