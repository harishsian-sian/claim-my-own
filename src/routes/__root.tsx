import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { useCartSync } from "@/hooks/useCartSync";
import { AuthProvider } from "@/hooks/useAuth";

const Toaster = lazy(() => import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })));
const FloatingWhatsApp = lazy(() =>
  import("@/components/FloatingWhatsApp").then((m) => ({ default: m.FloatingWhatsApp })),
);

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
      { name: "theme-color", content: "#0a0a0a" },
      { title: "MeltonSupps — Health & Sports Supplements Australia" },
      {
        name: "description",
        content:
          "Australia's trusted source for health and sports supplements. Shop protein, pre-workout, creatine, vitamins and more from EHP Labs, ATP Science, Optimum Nutrition and more. Free shipping over $150.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:site_name", content: "MeltonSupps" },
      { property: "og:locale", content: "en_AU" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "MeltonSupps — Health & Sports Supplements Australia" },
      {
        property: "og:description",
        content: "Shop protein, pre-workout, creatine and more. Free shipping on orders over $150.",
      },
      { property: "og:url", content: "https://meltonsupps.com.au" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MeltonSupps — Health & Sports Supplements Australia" },
      { name: "twitter:description", content: "Shop protein, pre-workout, creatine and more. Free shipping over $150." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://meltonsupps.com.au" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://cdn.shopify.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://cdn.shopify.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@700;900&display=swap",
      },
    ],
    scripts: [
      {
        children:
          "window.addEventListener('load',function(){setTimeout(function(){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KQQ42DK2');},2000);});",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          name: "MeltonSupps",
          url: "https://meltonsupps.com.au",
          telephone: "+61387464680",
          email: "info@meltonsupps.com.au",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Melton",
            addressRegion: "VIC",
            addressCountry: "AU",
          },
          sameAs: [
            "https://www.facebook.com/meltonsupps",
            "https://www.instagram.com/meltonsupps",
          ],
        }),
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
    <AuthProvider>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KQQ42DK2"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <Outlet />
      <Suspense fallback={null}>
        <FloatingWhatsApp />
        <Toaster position="top-right" />
      </Suspense>
    </AuthProvider>
  );
}
