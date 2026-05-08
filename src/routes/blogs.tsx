import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/blogs")({
  component: BlogsIndexRedirect,
});

function BlogsIndexRedirect() {
  return <Navigate to="/blog" replace />;
}