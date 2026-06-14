import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProductsPageContent } from "./products";

export const Route = createFileRoute("/collections/$handle")({
  component: CollectionPage,
  head: ({ params }) => {
    const title = params.handle
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      meta: [
        { title: `${title} — MeltonSupps` },
        { name: "description", content: `Shop ${title} at MeltonSupps.` },
        {
          property: "og:url",
          content: `https://www.meltonsupps.com.au/collections/${params.handle}`,
        },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://www.meltonsupps.com.au/collections/${params.handle}`,
        },
      ],
    };
  },
});

function CollectionPage() {
  const { handle } = Route.useParams();
  const navigate = useNavigate({ from: "/collections/$handle" });

  return (
    <ProductsPageContent
      collection={handle}
      onSearchChange={(search) => navigate({ to: "/products", search })}
    />
  );
}
