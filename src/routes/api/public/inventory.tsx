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

export const Route = createFileRoute("/api/public/inventory")({
  // @ts-expect-error - server handlers supported at runtime by TanStack Start
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const url = new URL(request.url);
        const variantIds = url.searchParams.get("variantIds")?.split(",").filter(Boolean) ?? [];
        const tokens = getAdminTokens();
        if (tokens.length === 0) {
          return Response.json({
            error: "Missing Shopify Admin token",
            locations: [],
            inventory: {},
          });
        }

        try {
          let token = tokens[0];
          let locJson: { locations?: ShopifyLocation[] } | null = null;
          let lastLocationStatus = 0;

          // Connector projects can expose more than one Shopify token. Try each one
          // and keep the token that actually has location/inventory permissions.
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
            return Response.json(
              { error: `locations ${lastLocationStatus || 403}`, locations: [], inventory: {} },
              { status: 200 },
            );
          }

          const locations = (locJson.locations ?? [])
            .filter((l: ShopifyLocation) => l.active !== false)
            .map((l: ShopifyLocation) => ({ id: String(l.id), name: l.name, city: l.city }));

          if (variantIds.length === 0) {
            return Response.json({ locations, inventory: {} });
          }

          // Convert Storefront variant GIDs (gid://shopify/ProductVariant/123) to numeric IDs
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

          // Get variants -> inventory_item_id. Shopify's global variants list can ignore
          // an ids filter, so fetch each requested variant explicitly to avoid mismatches.
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

          // Fetch inventory levels at all locations
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

          // Build map: variantGid -> { locationId -> available }
          const inventory: Record<string, Record<string, number>> = {};
          for (const lvl of levels) {
            const vid = itemToVariant.get(lvl.inventory_item_id);
            if (!vid) continue;
            inventory[vid] ??= {};
            inventory[vid][String(lvl.location_id)] = lvl.available ?? 0;
          }

          return Response.json({
            locations,
            inventory,
          });
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "unknown";
          return Response.json({ error: message, locations: [], inventory: {} }, { status: 200 });
        }
      },
    },
  },
});
