import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProductsPageContent } from "./products";
import { resolveLegacyCategoryHandle } from "@/lib/legacyLinks";

export const Route = createFileRoute("/product-category/$handle")({
  component: ProductCategoryPage,
  head: ({ params }) => {
    const title = params.handle
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      meta: [
        { title: `${title} — MeltonSupps` },
        {
          name: "description",
          content: `Shop ${title} at MeltonSupps. Use code JAN10 at checkout for 10% off.`,
        },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://meltonsupps.com.au/product-category/${params.handle}`,
        },
      ],
    };
  },
});

function ProductCategoryPage() {
  const { handle } = Route.useParams();
  const navigate = useNavigate({ from: "/product-category/$handle" });
  const collection = resolveLegacyCategoryHandle(handle);

  return (
    <ProductsPageContent
      collection={collection}
      onSearchChange={(search) => navigate({ to: "/products", search })}
    />
  );
}