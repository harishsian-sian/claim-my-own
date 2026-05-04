import { Link } from "@tanstack/react-router";
import { ArrowRight, Dumbbell, Flame, Zap, Heart } from "lucide-react";

const GOALS = [
  {
    label: "Build Muscle",
    desc: "Whey protein & gainers",
    icon: Dumbbell,
    collection: "whey-protein",
    bg: "from-brand to-brand-dark",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=70",
  },
  {
    label: "Burn Fat",
    desc: "Weight management & L-carnitine",
    icon: Flame,
    collection: "weight-management",
    bg: "from-brand-dark to-ink",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=70",
  },
  {
    label: "More Energy",
    desc: "Pre-workout formulas",
    icon: Zap,
    collection: "pre-workouts",
    bg: "from-ink to-brand",
    image:
      "https://images.unsplash.com/photo-1583500178690-f7fd39ed27ad?auto=format&fit=crop&w=900&q=70",
  },
  {
    label: "Recovery & Health",
    desc: "Aminos, vitamins, sleep",
    icon: Heart,
    collection: "vitamins-and-mineral",
    bg: "from-brand to-ink",
    image:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=900&q=70",
  },
];

export function ShopByGoal() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">
          Find what fits you
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-black uppercase mt-2">
          Shop by Goal
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {GOALS.map(({ label, desc, icon: Icon, collection, bg, image }) => (
          <Link
            key={label}
            to="/products"
            search={{ collection }}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${bg} p-6 md:p-7 aspect-[4/5] flex flex-col justify-between text-background hover:scale-[1.03] transition-transform`}
          >
            <img
              src={image}
              alt={label}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-110 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <Icon className="relative h-10 w-10 md:h-12 md:w-12 text-background drop-shadow-lg" />
            <div className="relative">
              <h3 className="font-display text-xl md:text-2xl font-black uppercase leading-tight drop-shadow-lg">
                {label}
              </h3>
              <p className="text-xs md:text-sm text-background/90 mt-1 drop-shadow">{desc}</p>
              <span className="text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1 mt-3 opacity-95 group-hover:opacity-100">
                Shop now <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
