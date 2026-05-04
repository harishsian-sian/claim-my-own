import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    meta: [
      { title: "FAQ — MeltonSupps" },
      { name: "description", content: "Answers to common questions about orders, shipping, returns and supplements." },
    ],
  }),
});

const FAQS = [
  { q: "When do I get free shipping?", a: "All orders over $150 ship free Australia-wide. Orders under $150 are a flat $9.95." },
  { q: "How long does delivery take?", a: "Metro VIC: 1–3 business days. Other capital cities: 2–5 business days. Regional: 3–7 business days." },
  { q: "Do you offer local pickup?", a: "Yes — free local pickup is available from our Melton, VIC location. You'll get a notification when your order is ready." },
  { q: "Are your products genuine?", a: "100% — every product is sourced directly from official Australian distributors and brand partners." },
  { q: "What payment methods do you accept?", a: "Visa, Mastercard, Amex, Apple Pay, Google Pay, PayPal, AfterPay and ZipPay." },
  { q: "Can I return a product?", a: "Unopened products in original condition can be returned within 30 days. See our Returns page for details." },
  { q: "Do you price match?", a: "Yes. If you find the same product cheaper from another authorised Australian retailer, we'll match it. Contact us with the link." },
  { q: "How do I know which supplement is right for me?", a: "Start with our blog and goal guides, or contact our team — we're happy to help. Always consult your healthcare professional for personal advice." },
];

function FAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase">FAQ</h1>
        <p className="text-muted-foreground mt-3">Quick answers to the questions we get most.</p>
        <Accordion type="single" collapsible className="mt-8">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-bold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      <SiteFooter />
    </div>
  );
}
