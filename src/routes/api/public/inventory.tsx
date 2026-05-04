import { createFileRoute } from "@tanstack/react-router";

const SHOP = "ded508-e8.myshopify.com";
const API = "2025-07";

export const Route = createFileRoute("/api/public/inventory")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const variantIds = url.searchParams.get("variantIds")?.split(",").filter(Boolean) ?? [];
        const token = process.env.SHOPIFY_ACCESS_TOKEN;
        if (!token) {
          return Response.json({ error: "Missing SHOPIFY_ACCESS_TOKEN" }, { status: 500 });
        }

        try {
          // Fetch active locations
          const locRes = await fetch(`https://${SHOP}/admin/api/${API}/locations.json`, {
            headers: { "X-Shopify-Access-Token": token },
          });
          if (!locRes.ok) {
            return Response.json(
              { error: `locations ${locRes.status}`, locations: [], inventory: {} },
              { status: 200 }
            );
          }
          const locJson: any = await locRes.json();
          const locations = (locJson.locations ?? [])
            .filter((l: any) => l.active)
            .map((l: any) => ({ id: l.id, name: l.name, city: l.city }));

          if (variantIds.length === 0) {
            return Response.json({ locations, inventory: {} });
          }

          // Convert Storefront variant GIDs (gid://shopify/ProductVariant/123) to numeric IDs
          const numericIds = variantIds
            .map((v) => v.split("/").pop())
            .filter(Boolean)
            .join(",");

          // Get variants -> inventory_item_id
          const varRes = await fetch(
            `https://${SHOP}/admin/api/${API}/variants.json?ids=${numericIds}&fields=id,inventory_item_id`,
            { headers: { "X-Shopify-Access-Token": token } }
          );
          if (!varRes.ok) {
            return Response.json({ locations, inventory: {} });
          }
          const varJson: any = await varRes.json();
          const variants: Array<{ id: number; inventory_item_id: number }> = varJson.variants ?? [];
          const itemToVariant = new Map<number, string>();
          variants.forEach((v, i) => {
            itemToVariant.set(v.inventory_item_id, variantIds[i] ?? String(v.id));
          });

          const inventoryItemIds = variants.map((v) => v.inventory_item_id).join(",");
          if (!inventoryItemIds) {
            return Response.json({ locations, inventory: {} });
          }

          // Fetch inventory levels at all locations
          const invRes = await fetch(
            `https://${SHOP}/admin/api/${API}/inventory_levels.json?inventory_item_ids=${inventoryItemIds}`,
            { headers: { "X-Shopify-Access-Token": token } }
          );
          if (!invRes.ok) {
            return Response.json({ locations, inventory: {} });
          }
          const invJson: any = await invRes.json();
          const levels: Array<{ inventory_item_id: number; location_id: number; available: number | null }> =
            invJson.inventory_levels ?? [];

          // Build map: variantGid -> { locationId -> available }
          const inventory: Record<string, Record<string, number>> = {};
          for (const lvl of levels) {
            const vid = itemToVariant.get(lvl.inventory_item_id);
            if (!vid) continue;
            inventory[vid] ??= {};
            inventory[vid][String(lvl.location_id)] = lvl.available ?? 0;
          }

          return Response.json({
            locations: locations.map((l: any) => ({ ...l, id: String(l.id) })),
            inventory,
          });
        } catch (err: any) {
          return Response.json(
            { error: err?.message ?? "unknown", locations: [], inventory: {} },
            { status: 200 }
          );
        }
      },
    },
  },
});
