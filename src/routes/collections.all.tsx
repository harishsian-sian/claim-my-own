import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/collections/all")({
  component: CollectionsAllRedirect,
});

function CollectionsAllRedirect() {
  return <Navigate to="/products" replace />;
}