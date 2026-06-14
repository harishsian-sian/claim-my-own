import { createFileRoute, redirect } from "@tanstack/react-router";
import { resolveLegacyCategoryHandle } from "@/lib/legacyLinks";

// Legacy category URL — 301 redirect to canonical /collections/{shopify-handle}.
export const Route = createFileRoute("/product-category/$handle")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/collections/$handle",
      params: { handle: resolveLegacyCategoryHandle(params.handle) },
      replace: true,
      statusCode: 301,
    });
  },
  component: () => null,
});
