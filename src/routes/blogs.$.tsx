import { createFileRoute, Navigate } from "@tanstack/react-router";

const BLOG_INDEX_HANDLES = new Set(["", "blog", "blogs", "news", "articles"]);

export const Route = createFileRoute("/blogs/$")({
  component: BlogsRedirect,
});

function BlogsRedirect() {
  const { _splat } = Route.useParams();
  const parts = (_splat ?? "").split("/").filter(Boolean);
  const lastPart = parts.at(-1) ?? "";

  if (!lastPart || BLOG_INDEX_HANDLES.has(lastPart)) {
    return <Navigate to="/blog" replace />;
  }

  return <Navigate to="/blog/$slug" params={{ slug: lastPart }} replace />;
}