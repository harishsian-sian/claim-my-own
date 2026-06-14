import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy singular URL — 301 redirect to canonical /products/{handle}.
export const Route = createFileRoute("/product/$handle")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/products/$handle",
      params: { handle: params.handle },
      replace: true,
      statusCode: 301,
    });
  },
  component: () => null,
});
