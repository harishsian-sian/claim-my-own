import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/collections")({
  component: CollectionsRedirect,
});

function CollectionsRedirect() {
  return <Navigate to="/categories" replace />;
}