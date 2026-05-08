import { Star } from "lucide-react";

export interface Review {
  name: string;
  rating: number;
  text: string;
  location?: string;
}

const DEFAULT_REVIEWS: Review[] = [
  { name: "Jake R.", rating: 5, location: "Melton", text: "Best supplement store in the west. Always stocked, fair pricing and the team actually knows their stuff." },
  { name: "Priya S.", rating: 5, location: "Caroline Springs", text: "Switched from Chemist Warehouse — better range and prices. Order arrived next day." },
  { name: "Tom W.", rating: 5, location: "Braybrook", text: "Got real advice on my pre-workout instead of being upsold. Won me over." },
];

export function ReviewsSection({ reviews = DEFAULT_REVIEWS }: { reviews?: Review[] }) {
  return (
    <section className="py-10">
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-brand font-bold">What Our Customers Say</p>
        <h2 className="font-display text-3xl font-black uppercase mt-2">Trusted by Local Lifters</h2>
        <div className="flex items-center justify-center gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-brand text-brand" />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">4.9 / 5 from 500+ reviews</span>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {reviews.map((r, i) => (
          <div key={i} className="border rounded-2xl p-5 bg-muted/20">
            <div className="flex gap-0.5">
              {[...Array(r.rating)].map((_, j) => (
                <Star key={j} className="h-3.5 w-3.5 fill-brand text-brand" />
              ))}
            </div>
            <p className="text-sm mt-3 text-foreground/90">"{r.text}"</p>
            <p className="text-xs text-muted-foreground mt-3 font-semibold">
              — {r.name}{r.location ? `, ${r.location}` : ""}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
