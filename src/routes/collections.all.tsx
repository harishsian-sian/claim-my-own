import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProductsPageContent } from "./products";

export const Route = createFileRoute("/collections/all")({
  component: CollectionsAllPage,
});

function CollectionsAllPage() {
  const navigate = useNavigate({ from: "/collections/all" });

  return <ProductsPageContent onSearchChange={(search) => navigate({ to: "/products", search })} />;
}