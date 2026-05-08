import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/policies/$handle")({
  component: PoliciesRedirect,
});

function PoliciesRedirect() {
  const { handle } = Route.useParams();

  if (handle === "privacy-policy") return <Navigate to="/privacy" replace />;
  if (handle === "refund-policy") return <Navigate to="/returns" replace />;
  if (handle === "shipping-policy") return <Navigate to="/shipping" replace />;

  return <Navigate to="/terms" replace />;
}