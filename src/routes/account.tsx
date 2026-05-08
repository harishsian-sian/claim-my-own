import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Heart, LogOut, Package, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/account")({
  component: AccountPage,
  head: () => ({ meta: [{ title: "My Account — MeltonSupps" }] }),
});

function AccountPage() {
  const { user, loading } = useAuth();
  const { items } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-12">Loading…</main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-black uppercase">My Account</h1>
            <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
              <UserIcon className="h-4 w-4" /> {user.email}
            </p>
          </div>
          <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/" }); }}>
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </div>

        <section className="mb-10">
          <h2 className="font-display text-xl font-bold uppercase flex items-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-brand" /> Wishlist ({items.length})
          </h2>
          {items.length === 0 ? (
            <p className="text-muted-foreground text-sm">No items yet. Tap the heart on any product to save it here.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.map((item) => (
                <Link
                  key={item.id}
                  to="/product/$handle"
                  params={{ handle: item.product_handle }}
                  className="group border rounded-lg p-3 hover:shadow-md transition"
                >
                  {item.product_image && (
                    <img src={item.product_image} alt={item.product_title ?? ""} className="w-full aspect-square object-contain mb-2" />
                  )}
                  <div className="text-xs font-semibold line-clamp-2">{item.product_title}</div>
                  {item.product_price != null && (
                    <div className="text-sm font-bold text-brand mt-1">${Number(item.product_price).toFixed(2)}</div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-display text-xl font-bold uppercase flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-brand" /> Orders
          </h2>
          <p className="text-muted-foreground text-sm">
            Order history is processed through our secure checkout. <Link to="/track-order" className="underline">Track an order</Link>.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
