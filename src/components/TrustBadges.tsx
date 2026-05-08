import { ShieldCheck, Truck, RefreshCw, BadgeCheck } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "100% Authentic", desc: "Sourced direct from approved Australian distributors." },
  { icon: Truck, title: "Fast Shipping", desc: "Same-day dispatch on orders before 2pm AEST." },
  { icon: RefreshCw, title: "Easy Returns", desc: "30-day hassle-free returns on unopened products." },
  { icon: BadgeCheck, title: "Price Match", desc: "Found it cheaper? We'll match it." },
];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((it) => (
        <div key={it.title} className="border rounded-xl p-4 bg-muted/20 text-center">
          <it.icon className="h-6 w-6 text-brand mx-auto" />
          <h4 className="font-display text-sm font-bold uppercase mt-2">{it.title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{it.desc}</p>
        </div>
      ))}
    </div>
  );
}
