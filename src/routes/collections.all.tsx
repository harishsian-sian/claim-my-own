import { createFileRoute } from "@tanstack/react-router";
import { ProductsPageContent } from "./products";

export const Route = createFileRoute("/collections/all")({
  component: CollectionsAllPage,
});

function CollectionsAllPage() {
  return <ProductsPageContent />;
}