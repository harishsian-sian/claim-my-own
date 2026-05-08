import { createFileRoute, Navigate } from "@tanstack/react-router";

const PAGE_REDIRECTS: Record<string, string> = {
  "about-us": "/about",
  about: "/about",
  "contact-us": "/contact",
  contact: "/contact",
  faq: "/faq",
  faqs: "/faq",
  "shipping-policy": "/shipping",
  shipping: "/shipping",
  "shipping-delivery": "/shipping",
  "shipping-and-delivery": "/shipping",
  "refund-policy": "/returns",
  returns: "/returns",
  "returns-refunds": "/returns",
  "returns-and-refunds": "/returns",
  "price-match-guarantee": "/price-match",
  "price-match": "/price-match",
  "health-disclaimer": "/disclaimer",
  disclaimer: "/disclaimer",
  "privacy-policy": "/privacy",
  privacy: "/privacy",
  "terms-of-service": "/terms",
  "terms-conditions": "/terms",
  "terms-and-conditions": "/terms",
  "track-order": "/track-order",
  "order-tracking": "/track-order",
  brands: "/brands",
  categories: "/categories",
  blog: "/blog",
  blogs: "/blog",
  news: "/blog",
};

export const Route = createFileRoute("/pages/$handle")({
  component: PagesRedirect,
});

function PagesRedirect() {
  const { handle } = Route.useParams();
  const to = PAGE_REDIRECTS[handle] ?? "/";

  return <Navigate to={to} replace />;
}