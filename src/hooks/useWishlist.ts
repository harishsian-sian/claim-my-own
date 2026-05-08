import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface WishlistItem {
  id: string;
  product_handle: string;
  product_title: string | null;
  product_image: string | null;
  product_price: number | null;
}

export function useWishlist() {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("wishlist_items")
      .select("id, product_handle, product_title, product_image, product_price")
      .order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(
    async (item: Omit<WishlistItem, "id">) => {
      if (!user) {
        toast.error("Please sign in to save items to your wishlist");
        return;
      }
      const existing = items.find((i) => i.product_handle === item.product_handle);
      if (existing) {
        await supabase.from("wishlist_items").delete().eq("id", existing.id);
        toast.success("Removed from wishlist");
      } else {
        await supabase.from("wishlist_items").insert({ ...item, user_id: user.id });
        toast.success("Added to wishlist");
      }
      refresh();
    },
    [user, items, refresh]
  );

  const has = useCallback(
    (handle: string) => items.some((i) => i.product_handle === handle),
    [items]
  );

  return { items, loading, toggle, has, refresh };
}
