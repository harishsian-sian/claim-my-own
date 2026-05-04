import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/track-order")({
  component: Track,
  head: () => ({
    meta: [
      { title: "Track Your Order — MeltonSupps" },
      { name: "description", content: "Track the status of your MeltonSupps order in real time." },
    ],
  }),
});

function Track() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-xl">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase">Track Order</h1>
        <p className="text-muted-foreground mt-3">Enter your order number and email to view tracking details.</p>
        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input placeholder="Order number (e.g. #1024)" required />
          <Input type="email" placeholder="Email address" required />
          <Button type="submit" className="w-full bg-brand hover:bg-brand-dark text-brand-foreground">Track Order</Button>
        </form>
        <p className="text-xs text-muted-foreground mt-6">Tracking links are also emailed to you the moment your order ships.</p>
      </main>
      <SiteFooter />
    </div>
  );
}
