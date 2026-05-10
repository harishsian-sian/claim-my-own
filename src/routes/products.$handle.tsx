import { createFileRoute, redirect } from "@tanstack/react-router";

// Mirror route so Shopify's "View" button and Google search results
// (which link to /products/{handle}) work on the custom domain.
// Issues a 301 redirect to the canonical /product/{handle} URL during SSR
// so crawlers and direct visitors are forwarded immediately.
export const Route = createFileRoute("/products/$handle")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/product/$handle",
      params: { handle: params.handle },
      replace: true,
      statusCode: 301,
    });
  },
  component: () => null,
});
