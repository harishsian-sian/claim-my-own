import type { FAQ } from "@/components/FAQAccordion";

export interface Ingredient {
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  benefits: { title: string; desc: string }[];
  usage: { dose: string; timing: string; notes: string };
  faqs: FAQ[];
  relatedCategoryHandle: string;
  relatedLabel: string;
}

export const INGREDIENTS: Ingredient[] = [
  {
    slug: "tudca",
    name: "TUDCA",
    tagline: "Tauroursodeoxycholic Acid — liver & cellular health.",
    metaTitle: "TUDCA — Benefits, Dosage & Best Brands | MeltonSupps",
    metaDescription:
      "TUDCA explained: benefits, dosage, timing and the best Australian-stocked brands. Liver, gut and cellular health support backed by science.",
    intro:
      "TUDCA (tauroursodeoxycholic acid) is a water-soluble bile acid that supports liver function, bile flow, gut health and cellular integrity. It's a staple for lifters running supportive cycles and anyone serious about long-term liver health.",
    benefits: [
      { title: "Liver support", desc: "Supports bile flow and helps protect liver cells from oxidative stress." },
      { title: "Gut & bile health", desc: "Aids fat digestion and reduces gut inflammation markers in studies." },
      { title: "Cellular protection", desc: "Reduces ER stress — a key driver of cellular dysfunction." },
      { title: "Eye & neuro support", desc: "Emerging evidence for retinal and neurological protection." },
    ],
    usage: {
      dose: "250–500mg per day for general support; up to 1000mg/day on cycle.",
      timing: "Split doses with meals containing fat for best absorption.",
      notes: "Stack with NAC for full liver-support synergy.",
    },
    faqs: [
      { q: "Is TUDCA safe?", a: "TUDCA has an excellent safety profile in studies. Standard doses are well-tolerated. Consult your doctor if you have a liver condition." },
      { q: "TUDCA vs milk thistle?", a: "TUDCA acts on bile flow and ER stress; milk thistle (silymarin) is antioxidant. Many users stack both." },
      { q: "When will I notice results?", a: "Liver markers typically improve over 4–8 weeks of daily use." },
    ],
    relatedCategoryHandle: "health-and-wellness",
    relatedLabel: "Shop Liver Support",
  },
  {
    slug: "l-carnitine",
    name: "L-Carnitine",
    tagline: "Fat metabolism, recovery and cognitive support.",
    metaTitle: "L-Carnitine — Benefits, Dosage & Best Forms | MeltonSupps",
    metaDescription:
      "L-Carnitine guide: how it works, dosage, the difference between L-Carnitine, Acetyl-L-Carnitine and L-Carnitine L-Tartrate, and the best Australian brands.",
    intro:
      "L-Carnitine shuttles fatty acids into the mitochondria to be burned for energy. Beyond fat metabolism, it improves recovery, reduces muscle damage and supports cognitive performance — especially as Acetyl-L-Carnitine (ALCAR).",
    benefits: [
      { title: "Fat metabolism", desc: "Transports long-chain fatty acids into mitochondria for energy." },
      { title: "Faster recovery", desc: "L-Carnitine L-Tartrate (LCLT) reduces post-training muscle damage." },
      { title: "Cognitive support", desc: "Acetyl-L-Carnitine crosses the blood-brain barrier for focus and mood." },
      { title: "Endurance", desc: "Improves work capacity in trained athletes over chronic dosing." },
    ],
    usage: {
      dose: "1,500–3,000mg/day for fat metabolism; 500–1,500mg ALCAR for cognition.",
      timing: "Pre-workout or with carbs to enhance uptake into muscle.",
      notes: "Liquid forms absorb fastest; capsules are most convenient.",
    },
    faqs: [
      { q: "Does L-Carnitine actually burn fat?", a: "It supports fat oxidation but isn't magic — pair with a calorie deficit and consistent training for best results." },
      { q: "ALCAR vs LCLT vs Acetyl-L-Carnitine?", a: "ALCAR/Acetyl is best for brain/focus. LCLT (L-Carnitine L-Tartrate) is best for recovery. Plain L-Carnitine works for general fat metabolism." },
      { q: "Can I take it daily?", a: "Yes — L-Carnitine works best with chronic, daily use over weeks." },
    ],
    relatedCategoryHandle: "fat-loss",
    relatedLabel: "Shop Fat Burners",
  },
  {
    slug: "creatine",
    name: "Creatine Monohydrate",
    tagline: "The most-researched supplement in sports nutrition.",
    metaTitle: "Creatine Monohydrate — Benefits, Dosage & FAQ | MeltonSupps",
    metaDescription:
      "Everything you need to know about creatine monohydrate — benefits, dosage, loading, and why every lifter and athlete should use it.",
    intro:
      "Creatine monohydrate is the most extensively researched supplement in sports nutrition. It increases phosphocreatine stores in muscle for more explosive output, more reps, and faster recovery between sets — and it's safe, cheap and effective.",
    benefits: [
      { title: "Strength & power", desc: "Increases 1RM and explosive output across virtually all training styles." },
      { title: "Lean muscle", desc: "Cell volumisation drives long-term hypertrophy alongside training." },
      { title: "Recovery", desc: "Faster ATP regeneration between sets means more quality work." },
      { title: "Cognitive benefit", desc: "Emerging research supports creatine for brain energy and mood." },
    ],
    usage: {
      dose: "5g per day, every day — no need to load if you're patient.",
      timing: "Any time of day. Convenience > timing for creatine.",
      notes: "Always go for pure creatine monohydrate (Creapure preferred).",
    },
    faqs: [
      { q: "Do I need to load creatine?", a: "Loading (20g/day for 5–7 days) saturates muscles faster, but a steady 5g/day reaches the same point in ~3–4 weeks." },
      { q: "Will creatine make me bloated?", a: "Most users see ~1–2kg of intramuscular water gain in the first weeks. It's not subcutaneous bloat." },
      { q: "Best brand of creatine?", a: "Anything using Creapure®, or any reputable Australian brand. Price-per-gram matters more than fancy forms." },
    ],
    relatedCategoryHandle: "creatine",
    relatedLabel: "Shop Creatine",
  },
  {
    slug: "ashwagandha",
    name: "Ashwagandha",
    tagline: "Adaptogenic root for stress, sleep & testosterone.",
    metaTitle: "Ashwagandha — Benefits, Dosage & KSM-66 vs Sensoril | MeltonSupps",
    metaDescription:
      "Ashwagandha guide: how it lowers cortisol, supports testosterone and sleep, and which extract (KSM-66 vs Sensoril) suits your goals.",
    intro:
      "Ashwagandha (Withania somnifera) is an adaptogenic herb that helps the body manage stress, supports healthy testosterone in men, improves sleep quality and reduces cortisol. Look for standardised extracts like KSM-66 or Sensoril for clinically validated dosing.",
    benefits: [
      { title: "Lower cortisol", desc: "Significant reductions in chronic stress markers across multiple studies." },
      { title: "Better sleep", desc: "Improves sleep quality and time to fall asleep — especially Sensoril." },
      { title: "Testosterone support", desc: "KSM-66 has been shown to support healthy T levels in active men." },
      { title: "Recovery", desc: "Reduced cortisol and better sleep both translate to better gym recovery." },
    ],
    usage: {
      dose: "300–600mg of KSM-66 daily, or 250–500mg Sensoril for sleep.",
      timing: "KSM-66 in the morning. Sensoril 30–60 minutes before bed.",
      notes: "Take consistently for 4–8 weeks for full effect.",
    },
    faqs: [
      { q: "KSM-66 vs Sensoril?", a: "KSM-66 (root only) is best for testosterone, focus and morning use. Sensoril (root + leaf) is best for sleep, anxiety and evening use." },
      { q: "Will ashwagandha increase my testosterone?", a: "Studies show modest but real increases in healthy active men using KSM-66 over 8 weeks." },
      { q: "Any side effects?", a: "Generally very well-tolerated. Avoid with hyperthyroidism without medical advice." },
    ],
    relatedCategoryHandle: "test-boosters",
    relatedLabel: "Shop Test Support",
  },
  {
    slug: "nac",
    name: "NAC (N-Acetyl Cysteine)",
    tagline: "Glutathione precursor for liver, lungs and immunity.",
    metaTitle: "NAC — Benefits, Dosage & Best Brands | MeltonSupps",
    metaDescription:
      "NAC (N-Acetyl Cysteine) explained: glutathione support, liver and lung health, mental health benefits, dosage and the best Australian brands.",
    intro:
      "NAC is the precursor to glutathione — your body's master antioxidant. It supports liver detoxification, respiratory health, immune function and has emerging evidence for mood and OCD-related symptoms.",
    benefits: [
      { title: "Glutathione production", desc: "Boosts your body's most important endogenous antioxidant." },
      { title: "Liver detox", desc: "Used clinically for paracetamol overdose; routinely supports liver health." },
      { title: "Respiratory support", desc: "Mucolytic — thins mucus and supports clearer breathing." },
      { title: "Mood & focus", desc: "Emerging research on glutamate balance and mental health." },
    ],
    usage: {
      dose: "600–1,200mg per day, in 1–2 doses.",
      timing: "Empty stomach for fastest absorption; with food if it upsets you.",
      notes: "Stack with TUDCA for full liver-support synergy.",
    },
    faqs: [
      { q: "Is NAC safe long-term?", a: "Yes — NAC has a long-standing clinical safety profile at standard doses." },
      { q: "NAC vs glutathione direct?", a: "Oral glutathione absorbs poorly. NAC reliably raises endogenous glutathione." },
      { q: "When should I take NAC?", a: "Either morning or split AM/PM. Consistency matters more than timing." },
    ],
    relatedCategoryHandle: "health-and-wellness",
    relatedLabel: "Shop Health & Wellness",
  },
];

export const getIngredient = (slug: string) => INGREDIENTS.find((i) => i.slug === slug);
