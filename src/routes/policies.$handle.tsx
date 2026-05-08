import { createFileRoute, Navigate } from "@tanstack/react-router";

const POLICY_REDIRECTS: Record<string, string> = {
  "privacy-policy": "/privacy",
  "refund-policy": "/returns",
  "shipping-policy": "/shipping",
  "terms-of-service": "/terms",
  "legal-notice": "/terms",
  "subscription-policy": "/terms",
};

export const Route = createFileRoute("/policies/$handle")({
  component: PoliciesRedirect,
});

function PoliciesRedirect() {
  const { handle } = Route.useParams();
  const to = POLICY_REDIRECTS[handle] ?? "/terms";

  return <Navigate to={to} replace />;
}