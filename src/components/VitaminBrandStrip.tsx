import { Link } from "@tanstack/react-router";
import { useCollections } from "@/hooks/useCollections";
import { BRAND_COLLECTION_HANDLES } from "@/lib/storeData";
import {
  Pill,
  Heart,
  Brain,
  Bone,
  Shield,
  Sun,
  Moon,
  Leaf,
  Droplet,
  Sparkles,
  Activity,
  FlaskConical,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Vitamin / wellness CATEGORY collections (not brands).
// Match against handle keywords so we catch variants like
// "vitamins", "vitamin-c", "multi-vitamins", etc.
type VitaminCategory = {
  match: (handle: string, title: string) => boolean;
  label: string;
  icon: LucideIcon;
  // Optional override handle to link to if a real collection exists
  preferredHandle?: string;
};

const CATEGORIES: VitaminCategory[] = [
  { label: "Multivitamins", icon: Pill, match: (h, t) => /multi[-\s]?vit/i.test(h) || /multi[-\s]?vit/i.test(t) },
  { label: "Vitamin C", icon: Sun, match: (h, t) => /vitamin[-\s]?c\b/i.test(h) || /vitamin\s?c\b/i.test(t) },
  { label: "Vitamin D", icon: Sun, match: (h, t) => /vitamin[-\s]?d\b/i.test(h) || /vitamin\s?d\b/i.test(t) },
  { label: "Vitamin B / Energy", icon: Activity, match: (h, t) => /vitamin[-\s]?b\b/i.test(h) || /b[-\s]?complex/i.test(h) || /b[-\s]?complex/i.test(t) },
  { label: "Magnesium", icon: Bone, match: (h, t) => /magnesium/i.test(h) || /magnesium/i.test(t) },
  { label: "Zinc", icon: Shield, match: (h, t) => /\bzinc\b/i.test(h) || /\bzinc\b/i.test(t) },
  { label: "Fish Oil & Omega", icon: Droplet, match: (h, t) => /fish[-\s]?oil|omega/i.test(h) || /fish\s?oil|omega/i.test(t) },
  { label: "Greens & Superfoods", icon: Leaf, match: (h, t) => /green|superfood|spirulina/i.test(h) || /green|superfood/i.test(t) },
  { label: "Immunity", icon: Shield, match: (h, t) => /immun/i.test(h) || /immun/i.test(t) },
  { label: "Sleep & Recovery", icon: Moon, match: (h, t) => /sleep|melatonin/i.test(h) || /sleep|recovery/i.test(t) },
  { label: "Joint & Bone", icon: Bone, match: (h, t) => /joint|collagen|glucosamine/i.test(h) || /joint|collagen/i.test(t) },
  { label: "Gut & Digestion", icon: FlaskConical, match: (h, t) => /probiotic|gut|digest|enzyme/i.test(h) || /gut|digest|probiotic/i.test(t) },
  { label: "Brain & Focus", icon: Brain, match: (h, t) => /nootropic|brain|focus|cogni/i.test(h) || /brain|focus|nootropic/i.test(t) },
  { label: "Heart Health", icon: Heart, match: (h, t) => /heart|cardio[-\s]?health|coq10/i.test(h) || /heart|coq10/i.test(t) },
  { label: "Skin Hair Nails", icon: Sparkles, match: (h, t) => /skin|hair|nail|biotin/i.test(h) || /skin|hair|nail|biotin/i.test(t) },
  { label: "Womens Health", icon: Heart, match: (h, t) => /women|female|prenatal/i.test(h) || /women|female|prenatal/i.test(t) },
  { label: "Mens Health", icon: Shield, match: (h, t) => /\bmen[s\b-]|male/i.test(h) || /\bmen'?s\b|male/i.test(t) },
];

export function VitaminBrandStrip() {
  const { collections } = useCollections();

  // Only category collections (exclude brand collections)
  const catCollections = collections.filter(
    (c) => !BRAND_COLLECTION_HANDLES.has(c.handle)
  );

  // Resolve each vitamin category to a real collection if one exists
  const resolved = CATEGORIES.map((cat) => {
    const match = catCollections.find((c) => cat.match(c.handle, c.title));
    return match
      ? { label: cat.label, icon: cat.icon, handle: match.handle, title: match.title }
      : null;
  }).filter(Boolean) as Array<{
    label: string;
    icon: LucideIcon;
    handle: string;
    title: string;
  }>;

  if (resolved.length === 0) return null;

  // Duplicate list for seamless marquee
  const loop = [...resolved, ...resolved, ...resolved];

  return (
    <section className="bg-muted/40 border-y overflow-hidden py-8">
      <div className="container mx-auto px-4 mb-5 flex items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">
            Health &amp; Wellness
          </span>
          <h2 className="font-display text-xl md:text-2xl font-black uppercase mt-1">
            Shop Vitamins &amp; Wellness
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Daily essentials — vitamins, minerals, immunity, sleep &amp; more.
          </p>
        </div>
        <Link
          to="/categories"
          className="text-xs md:text-sm font-bold uppercase tracking-wider hover:text-brand transition-colors"
        >
          View all
        </Link>
      </div>
      <div className="relative group">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-muted/40 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-muted/40 to-transparent z-10" />
        <div className="flex gap-4 animate-marquee will-change-transform group-hover:[animation-play-state:paused]">
          {loop.map((c, idx) => {
            const Icon = c.icon;
            return (
              <Link
                key={`${c.handle}-${idx}`}
                to="/products"
                search={{ collection: c.handle }}
                aria-label={c.label}
                className="flex-shrink-0 w-40 h-24 md:w-48 md:h-28 rounded-xl border bg-background flex flex-col items-center justify-center gap-2 px-3 hover:border-brand hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <Icon className="h-6 w-6 text-brand" />
                <span className="text-xs md:text-sm font-bold uppercase tracking-wide text-center leading-tight">
                  {c.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
