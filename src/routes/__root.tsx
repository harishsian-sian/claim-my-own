import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { useCartSync } from "@/hooks/useCartSync";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand-dark transition-colors uppercase tracking-wide"
          >
            Back to shop
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MeltonSupps — Health & Sports Supplements" },
      {
        name: "description",
        content:
          "Australia's trusted source for health and sports supplements. Shop protein, pre-workout, vitamins and more from EHP Labs, ATP Science, Now Foods and more.",
      },
      { property: "og:title", content: "MeltonSupps — Health & Sports Supplements" },
      {
        property: "og:description",
        content:
          "Shop protein, pre-workout, vitamins and more. Free shipping on orders over $99.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MeltonSupps — Health & Sports Supplements" },
      { name: "description", content: "Claim your store and connect your Shopify store to a new project." },
      { property: "og:description", content: "Claim your store and connect your Shopify store to a new project." },
      { name: "twitter:description", content: "Claim your store and connect your Shopify store to a new project." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/56bdd6f7-4765-4e7c-a6f6-20340155efa1/id-preview-86041fa9--401d9b5b-6ddd-4fe0-aa67-6a71076141a6.lovable.app-1777886783909.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/56bdd6f7-4765-4e7c-a6f6-20340155efa1/id-preview-86041fa9--401d9b5b-6ddd-4fe0-aa67-6a71076141a6.lovable.app-1777886783909.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useCartSync();
  return (
    <>
      <Outlet />
      <Toaster position="top-right" />
    </>
  );
}
