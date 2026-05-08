
CREATE TABLE public.wishlist_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_handle TEXT NOT NULL,
  product_title TEXT,
  product_image TEXT,
  product_price NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_handle)
);

ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own wishlist" ON public.wishlist_items
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users add own wishlist" ON public.wishlist_items
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own wishlist" ON public.wishlist_items
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX wishlist_items_user_idx ON public.wishlist_items(user_id);
