import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/pages/$handle")({
  component: PagesRedirect,
});

function PagesRedirect() {
  const { handle } = Route.useParams();

  if (["about-us", "about"].includes(handle)) return <Navigate to="/about" replace />;
  if (["contact-us", "contact"].includes(handle)) return <Navigate to="/contact" replace />;
  if (["faq", "faqs"].includes(handle)) return <Navigate to="/faq" replace />;
  if (["shipping-policy", "shipping", "shipping-delivery", "shipping-and-delivery"].includes(handle)) return <Navigate to="/shipping" replace />;
  if (["refund-policy", "returns", "returns-refunds", "returns-and-refunds"].includes(handle)) return <Navigate to="/returns" replace />;
  if (["price-match-guarantee", "price-match"].includes(handle)) return <Navigate to="/price-match" replace />;
  if (["health-disclaimer", "disclaimer"].includes(handle)) return <Navigate to="/disclaimer" replace />;
  if (["privacy-policy", "privacy"].includes(handle)) return <Navigate to="/privacy" replace />;
  if (["terms-of-service", "terms-conditions", "terms-and-conditions"].includes(handle)) return <Navigate to="/terms" replace />;
  if (["track-order", "order-tracking"].includes(handle)) return <Navigate to="/track-order" replace />;
  if (handle === "brands") return <Navigate to="/brands" replace />;
  if (handle === "categories") return <Navigate to="/categories" replace />;
  if (["blog", "blogs", "news"].includes(handle)) return <Navigate to="/blog" replace />;

  return <Navigate to="/" replace />;
}