import { createFileRoute } from "@tanstack/react-router";
import { CategoriesPageContent } from "./categories";

export const Route = createFileRoute("/collections")({
  component: CollectionsPage,
});

function CollectionsPage() {
  return <CategoriesPageContent />;
}