import { createFileRoute, Navigate } from "@tanstack/react-router";

interface SearchParams {
  q?: string;
}

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  component: SearchRedirect,
});

function SearchRedirect() {
  const { q } = Route.useSearch();

  return <Navigate to="/products" search={q ? { q } : {}} replace />;
}