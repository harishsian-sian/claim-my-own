import { useEffect, useState } from "react";
import {
  storefrontApiRequest,
  COLLECTIONS_QUERY,
  type ShopifyCollection,
} from "@/lib/shopify";

let cache: ShopifyCollection[] | null = null;
let inflight: Promise<ShopifyCollection[]> | null = null;

async function load(): Promise<ShopifyCollection[]> {
  if (cache) return cache;
  if (inflight) return inflight;
  inflight = (async () => {
    let cursor: string | null = null;
    const all: ShopifyCollection[] = [];
    while (true) {
      const res = await storefrontApiRequest(COLLECTIONS_QUERY, {
        first: 100,
        after: cursor,
      });
      const data = res?.data?.collections;
      if (!data) break;
      for (const e of data.edges) all.push(e.node);
      if (!data.pageInfo.hasNextPage) break;
      cursor = data.pageInfo.endCursor;
    }
    cache = all;
    return all;
  })();
  return inflight;
}

export function useCollections() {
  const [collections, setCollections] = useState<ShopifyCollection[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) return;
    load()
      .then(setCollections)
      .finally(() => setLoading(false));
  }, []);

  return { collections, loading };
}
