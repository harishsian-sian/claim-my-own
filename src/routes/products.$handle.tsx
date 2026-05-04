import { createFileRoute, Navigate } from "@tanstack/react-router";

// Mirror route so Shopify's "View" button (which links to /products/{handle})
// works on the custom domain. Redirects to the canonical /product/{handle}.
export const Route = createFileRoute("/products/$handle")({
  component: ProductsHandleRedirect,
});

function ProductsHandleRedirect() {
  const { handle } = Route.useParams();
  return <Navigate to="/product/$handle" params={{ handle }} replace />;
}
