import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/wishlist")({
  component: WishlistRedirect,
});

function WishlistRedirect() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    navigate({ to: user ? "/account" : "/auth" });
  }, [user, loading, navigate]);
  return null;
}
