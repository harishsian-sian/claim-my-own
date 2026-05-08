import { createFileRoute } from "@tanstack/react-router";
import { CategoriesPageContent } from "./categories";

export const Route = createFileRoute("/collections/")({
  component: CollectionsIndexPage,
});

function CollectionsIndexPage() {
  return <CategoriesPageContent />;
}