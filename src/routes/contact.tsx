import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Us — MeltonSupps" },
      {
        name: "description",
        content: "Get in touch with MeltonSupps. Call, email or visit our Melton, VIC store.",
      },
    ],
  }),
});

function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase">Contact Us</h1>
        <p className="mt-4 text-muted-foreground">
          Questions about a product, an order, or want supplement advice? Reach out — we're happy to help.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          <div className="border rounded-2xl p-6 bg-muted/30">
            <Phone className="h-6 w-6 text-brand" />
            <h3 className="font-display text-lg font-bold uppercase mt-3">Phone</h3>
            <a href="tel:0387464680" className="text-sm hover:text-brand">03 8746 4680</a>
          </div>
          <div className="border rounded-2xl p-6 bg-muted/30">
            <Mail className="h-6 w-6 text-brand" />
            <h3 className="font-display text-lg font-bold uppercase mt-3">Email</h3>
            <a href="mailto:info@meltonsupps.com.au" className="text-sm hover:text-brand">
              info@meltonsupps.com.au
            </a>
          </div>
          <div className="border rounded-2xl p-6 bg-muted/30">
            <MapPin className="h-6 w-6 text-brand" />
            <h3 className="font-display text-lg font-bold uppercase mt-3">Store</h3>
            <p className="text-sm">Melton, VIC, Australia</p>
          </div>
          <div className="border rounded-2xl p-6 bg-muted/30">
            <Clock className="h-6 w-6 text-brand" />
            <h3 className="font-display text-lg font-bold uppercase mt-3">Hours</h3>
            <p className="text-sm">Mon–Fri 9am–6pm<br />Sat 9am–4pm<br />Sun Closed</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
