import { Link } from "@tanstack/react-router";
import { ArrowRight, Dumbbell, Flame, Zap, Heart } from "lucide-react";

const GOALS = [
  {
    label: "Build Muscle",
    desc: "Protein, gainers & creatine",
    icon: Dumbbell,
    q: "protein OR creatine OR mass gainer",
    bg: "from-brand to-brand-dark",
  },
  {
    label: "Burn Fat",
    desc: "Thermogenics & l-carnitine",
    icon: Flame,
    q: "fat burner OR shred OR l-carnitine",
    bg: "from-brand-dark to-ink",
  },
  {
    label: "More Energy",
    desc: "Pre-workout & energy drinks",
    icon: Zap,
    q: "pre-workout OR energy",
    bg: "from-ink to-brand",
  },
  {
    label: "Recovery & Health",
    desc: "Aminos, vitamins, sleep",
    icon: Heart,
    q: "recovery OR vitamin OR sleep OR magnesium",
    bg: "from-brand to-ink",
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
        {GOALS.map(({ label, desc, icon: Icon, q, bg }) => (
          <Link
            key={label}
            to="/products"
            search={{ q }}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${bg} p-6 md:p-7 aspect-[4/5] flex flex-col justify-between text-background hover:scale-[1.03] transition-transform`}
          >
            <Icon className="h-10 w-10 md:h-12 md:w-12 text-background/90 group-hover:text-background transition-colors" />
            <div>
              <h3 className="font-display text-xl md:text-2xl font-black uppercase leading-tight">
                {label}
              </h3>
              <p className="text-xs md:text-sm text-background/80 mt-1">{desc}</p>
              <span className="text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1 mt-3 opacity-90 group-hover:opacity-100">
                Shop now <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
