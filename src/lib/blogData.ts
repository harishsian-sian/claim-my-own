export type BlogCategory =
  | "muscle-growth"
  | "fat-loss"
  | "recovery"
  | "liver-health"
  | "beginner-guides"
  | "supplement-comparisons"
  | "performance"
  | "vitamins"
  | "gym-lifestyle";

export const CATEGORY_META: Record<BlogCategory, { label: string; description: string }> = {
  "muscle-growth": { label: "Muscle Growth", description: "Build size, strength and mass with the right supplement strategy." },
  "fat-loss": { label: "Fat Loss", description: "Cut smart with science-backed nutrition and supplements." },
  recovery: { label: "Recovery", description: "Bounce back faster with the right post-workout protocol." },
  "liver-health": { label: "Liver Health", description: "Support detox, hormones and overall wellbeing with liver-care supplements." },
  "beginner-guides": { label: "Beginner Guides", description: "Just starting out? Begin here." },
  "supplement-comparisons": { label: "Supplement Comparisons", description: "Side-by-side breakdowns to help you pick the right product." },
  performance: { label: "Performance", description: "Train harder, hit PBs and dominate your sport." },
  vitamins: { label: "Vitamins", description: "Everyday health and wellness essentials." },
  "gym-lifestyle": { label: "Gym Lifestyle", description: "Training, mindset and culture from the floor." },
};

export interface BlogAuthor {
  name: string;
  role: string;
  bio: string;
}

export const DEFAULT_AUTHOR: BlogAuthor = {
  name: "MeltonSupps Team",
  role: "Supplement Specialists",
  bio: "Our team of qualified supplement advisors and gym athletes has been helping Melbourne lifters reach their goals since day one.",
};

export interface BlogSection {
  h: string;
  p: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  minutes: number;
  category: BlogCategory;
  metaTitle?: string;
  metaDescription?: string;
  intro: string;
  toc?: string[];
  sections: BlogSection[];
  faqs: { q: string; a: string }[];
  relatedProducts?: { title: string; to: string }[];
  author?: BlogAuthor;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "tudca-vs-nac-which-is-better",
    title: "TUDCA vs NAC: Which Is Better for Liver Support?",
    excerpt: "TUDCA and NAC are the two most popular liver-support supplements. Here's how they differ and which one suits your goals.",
    date: "2026-05-01",
    minutes: 7,
    category: "liver-health",
    metaTitle: "TUDCA vs NAC: Which Is Better? | MeltonSupps",
    metaDescription: "TUDCA vs NAC head-to-head — benefits, dosing, side effects and which liver-support supplement is right for you.",
    intro: "If you're researching liver support supplements, two names dominate the conversation: TUDCA and NAC. Both have strong scientific backing — but they work very differently. Here's the no-nonsense breakdown.",
    toc: ["What is TUDCA?", "What is NAC?", "Key differences", "Dosage & timing", "Stacking TUDCA and NAC", "Verdict"],
    sections: [
      { h: "What is TUDCA?", p: "TUDCA (tauroursodeoxycholic acid) is a bile acid that helps protect liver cells, improves bile flow and supports overall liver function. It's particularly popular among athletes using harsh supplement protocols." },
      { h: "What is NAC?", p: "N-Acetyl Cysteine (NAC) is a precursor to glutathione — the body's master antioxidant. It supports detoxification, respiratory health and overall cellular protection." },
      { h: "Key differences", p: "TUDCA works mostly at the bile-acid level, helping liver cells stay healthy. NAC boosts glutathione production for systemic antioxidant support. They're complementary, not competing." },
      { h: "Dosage & timing", p: "Typical TUDCA dose: 250–500mg per day, taken with meals. NAC: 600–1200mg per day, often split between morning and evening. Both can be taken long-term." },
      { h: "Stacking TUDCA and NAC", p: "Many athletes stack both for comprehensive liver and antioxidant support. Start with one for 4 weeks before adding the other to gauge tolerance." },
      { h: "Verdict", p: "Choose TUDCA if your priority is direct liver-cell protection. Choose NAC for systemic antioxidant and detox support. For serious supplement users, both together cover all bases." },
    ],
    faqs: [
      { q: "Are TUDCA and NAC safe to take together?", a: "Yes — they work via different pathways and are commonly stacked. Always start with the lower end of the dose range." },
      { q: "How long until I notice results?", a: "Liver markers typically improve within 4–8 weeks of consistent use, but always work with your doctor for clinical assessments." },
      { q: "Do I need a prescription?", a: "No — both are sold as dietary supplements in Australia. They are not therapeutic goods." },
    ],
    relatedProducts: [{ title: "Shop Liver Support", to: "/products" }, { title: "Shop NAC", to: "/products" }],
  },
  {
    slug: "best-supplements-for-muscle-recovery",
    title: "Best Supplements for Muscle Recovery in 2026",
    excerpt: "Recovery is where growth happens. These are the most effective recovery supplements backed by real science.",
    date: "2026-04-28",
    minutes: 8,
    category: "recovery",
    metaTitle: "Best Supplements for Muscle Recovery | MeltonSupps",
    metaDescription: "The 7 most effective muscle recovery supplements based on real science. Whey, creatine, magnesium, EAAs and more.",
    intro: "If you train hard, you need to recover harder. Skip the gimmicks — these are the recovery supplements that actually work.",
    toc: ["Whey Protein Isolate", "Creatine Monohydrate", "EAAs", "Magnesium", "Tart Cherry", "L-Glutamine", "Sleep Support"],
    sections: [
      { h: "Whey Protein Isolate", p: "Fast-absorbing protein within 30 minutes of training kickstarts muscle protein synthesis. 25–40g post-workout is the sweet spot." },
      { h: "Creatine Monohydrate", p: "5g per day, every day. Improves recovery between sets, reduces muscle damage and enhances overall training output." },
      { h: "Essential Amino Acids (EAAs)", p: "All 9 essential aminos in one drink. Sip during long training sessions or use between meals to stay anabolic." },
      { h: "Magnesium", p: "Critical for muscle relaxation, sleep quality and over 300 enzymatic processes. Glycinate or bisglycinate forms are best tolerated." },
      { h: "Tart Cherry", p: "Natural anti-inflammatory that reduces DOMS and supports sleep. 480mg of concentrate or 8oz of juice before bed." },
      { h: "L-Glutamine", p: "Supports gut health and immune function during heavy training blocks. 5–10g per day." },
      { h: "Sleep Support", p: "Magnesium, glycine, ashwagandha and L-theanine — sleep IS recovery. Don't overlook it." },
    ],
    faqs: [
      { q: "What's the single most important recovery supplement?", a: "Protein. Without enough total daily protein, no other supplement matters." },
      { q: "Do I need BCAAs if I'm taking whey?", a: "No. Whey contains all the BCAAs you need. EAAs are a better choice if you want intra-workout aminos." },
    ],
    relatedProducts: [{ title: "Shop Recovery", to: "/product-category/recovery" }, { title: "Shop Whey Isolate", to: "/product-category/whey-protein" }],
  },
  {
    slug: "beginner-supplement-stack-guide",
    title: "Beginner Supplement Stack Guide (2026 Edition)",
    excerpt: "New to the gym? Here's the simple, science-backed supplement stack that actually works for beginners.",
    date: "2026-04-22",
    minutes: 6,
    category: "beginner-guides",
    metaTitle: "Beginner Supplement Stack Guide | MeltonSupps",
    metaDescription: "Just starting at the gym? This simple beginner supplement stack covers everything you need without wasting money.",
    intro: "Walk into any supplement store and you'll see hundreds of products. Truth is, beginners only need 4. Here's the stack that gets results without wasting your money.",
    toc: ["Whey Protein", "Creatine Monohydrate", "Multivitamin", "Fish Oil", "Optional add-ons"],
    sections: [
      { h: "1. Whey Protein", p: "The #1 supplement for any lifter. Helps you hit your daily protein target without forcing down extra meals. 1 scoop post-workout." },
      { h: "2. Creatine Monohydrate", p: "5g daily. Increases strength, muscle size and recovery. The most-studied supplement on earth." },
      { h: "3. Multivitamin", p: "Insurance against gaps in your nutrition. Pick a quality whole-food formula." },
      { h: "4. Fish Oil", p: "2–3g of EPA+DHA daily for joint health, recovery and cardiovascular support." },
      { h: "Optional add-ons", p: "Once those four are dialled, consider adding a pre-workout, magnesium for sleep and vitamin D if you don't get sun." },
    ],
    faqs: [
      { q: "Do I need a pre-workout as a beginner?", a: "No — but it can help with motivation. Start with a coffee first; pre-workouts are a bonus, not a necessity." },
      { q: "Can women take the same stack?", a: "Yes — the basics (protein, creatine, multi, fish oil) work the same regardless of gender." },
    ],
    relatedProducts: [{ title: "Shop Whey", to: "/product-category/whey-protein" }, { title: "Shop Creatine", to: "/product-category/creatine" }],
  },
  {
    slug: "how-to-use-l-carnitine-properly",
    title: "How to Use L-Carnitine Properly for Fat Loss",
    excerpt: "L-Carnitine gets hyped as a fat burner — but you have to use it right. Here's the protocol that actually works.",
    date: "2026-04-15",
    minutes: 5,
    category: "fat-loss",
    metaTitle: "How to Use L-Carnitine Properly | MeltonSupps",
    metaDescription: "Learn how to use L-Carnitine the right way for fat loss. Best forms, dosage, timing and what to stack it with.",
    intro: "L-Carnitine is one of the most misunderstood supplements. Used correctly, it can boost fat oxidation and recovery. Used incorrectly, it does nothing. Here's the right way.",
    toc: ["What L-Carnitine actually does", "Best forms", "Dosage & timing", "Stacking", "Common mistakes"],
    sections: [
      { h: "What L-Carnitine actually does", p: "L-Carnitine shuttles fatty acids into mitochondria where they're burned for energy. It supports fat oxidation, recovery and athletic performance." },
      { h: "Best forms", p: "L-Carnitine L-Tartrate (LCLT) for recovery and performance. Acetyl-L-Carnitine (ALCAR) for cognitive and energy benefits. Liquid L-Carnitine for fat loss with cardio." },
      { h: "Dosage & timing", p: "1–3g per day. For fat loss: take 1g pre-cardio. For recovery: 2g post-workout. Consistency matters more than timing." },
      { h: "Stacking", p: "Pairs well with caffeine and green tea extract for enhanced fat oxidation, or with creatine for performance support." },
      { h: "Common mistakes", p: "Skipping it on rest days. Taking it without consistent training and a calorie deficit. Expecting magic without doing the work." },
    ],
    faqs: [
      { q: "Does L-Carnitine work without exercise?", a: "Minimally. It works best when paired with consistent training, especially cardio." },
      { q: "Liquid or capsules — which is better?", a: "Both work. Liquid is faster absorbed; capsules are convenient. Choose what you'll actually take consistently." },
    ],
    relatedProducts: [{ title: "Shop L-Carnitine", to: "/products" }, { title: "Shop Fat Burners", to: "/products" }],
  },
  {
    slug: "best-pre-workout-supplements",
    title: "Best Pre-Workout Supplements (Tested in 2026)",
    excerpt: "We've tested 20+ pre-workouts. Here are the ones that actually deliver clean energy, focus and pump.",
    date: "2026-04-08",
    minutes: 9,
    category: "performance",
    metaTitle: "Best Pre-Workout Supplements 2026 | MeltonSupps",
    metaDescription: "We tested 20+ pre-workouts. Here are the best for energy, pump and focus, plus stim-free options.",
    intro: "A great pre-workout can transform your training. A bad one wastes your money and leaves you jittery. Here are our top picks for 2026.",
    toc: ["What to look for", "Best overall", "Best stim-free", "Best for pump", "Best budget", "How to use"],
    sections: [
      { h: "What to look for", p: "150–300mg caffeine, 6–8g citrulline malate, 3.2g beta-alanine, plus L-tyrosine or alpha-GPC for focus." },
      { h: "Best overall", p: "Look for fully-dosed formulas like Bucked Up, Ghost Legend or EHP Labs OxyShred Hardcore." },
      { h: "Best stim-free", p: "Switch Nutrition Pump Cover or NutraBio PRE Stim-Free deliver pump and focus without caffeine." },
      { h: "Best for pump", p: "High-citrulline formulas with glycerol — perfect for bodybuilding-style training." },
      { h: "Best budget", p: "Optimum Nutrition Gold Standard Pre or Rule 1 Pre — solid formulas under $50." },
      { h: "How to use", p: "Take 20–30 minutes before training. Start with half a scoop to assess tolerance. Don't take after 4pm if you sleep early." },
    ],
    faqs: [
      { q: "Can I take pre-workout every day?", a: "Yes, but cycle the stim portion every 6–8 weeks to maintain caffeine sensitivity." },
      { q: "Is pre-workout safe?", a: "Yes for healthy adults at recommended doses. Avoid if pregnant, under 18, or with heart conditions." },
    ],
    relatedProducts: [{ title: "Shop Pre-Workouts", to: "/product-category/pre-workouts" }],
  },
  {
    slug: "creatine-guide-for-beginners",
    title: "Creatine Guide for Beginners (Everything You Need to Know)",
    excerpt: "The complete beginner's guide to creatine — what it does, how to take it, and why it's the most-studied supplement on earth.",
    date: "2026-04-01",
    minutes: 6,
    category: "beginner-guides",
    metaTitle: "Creatine Guide for Beginners | MeltonSupps",
    metaDescription: "Everything beginners need to know about creatine — what it does, how to dose it, side effects and the best form.",
    intro: "Creatine is the single most-studied supplement in sports nutrition history. Hundreds of studies confirm: it works, it's safe, and you should be taking it.",
    toc: ["What is creatine?", "Benefits", "How to take it", "Loading vs no-load", "Side effects", "Best form"],
    sections: [
      { h: "What is creatine?", p: "Creatine is a naturally-occurring compound stored in your muscles. It helps regenerate ATP — your muscles' fast energy currency." },
      { h: "Benefits", p: "Increased strength, muscle size, power output, recovery, and even cognitive performance. Backed by 700+ studies." },
      { h: "How to take it", p: "5g per day, every day. Mix with water, juice or your protein shake. Timing doesn't matter — consistency does." },
      { h: "Loading vs no-load", p: "Loading (20g/day for 5 days) saturates muscles faster but isn't necessary. 5g daily reaches the same level in 3–4 weeks." },
      { h: "Side effects", p: "Mild water retention in muscles (this is good!). Drink plenty of water. No long-term side effects in healthy adults." },
      { h: "Best form", p: "Creatine monohydrate. Period. Don't waste money on HCl, ethyl ester or 'new' forms — they don't beat monohydrate." },
    ],
    faqs: [
      { q: "Will creatine make me bloated?", a: "It causes intramuscular water retention (full muscles), not bloating. Drink water and you'll be fine." },
      { q: "Do I need to cycle creatine?", a: "No. You can take it indefinitely. Cycling is unnecessary." },
    ],
    relatedProducts: [{ title: "Shop Creatine", to: "/product-category/creatine" }],
  },
  {
    slug: "top-vitamins-for-gym-performance",
    title: "Top Vitamins for Gym Performance",
    excerpt: "Vitamins are the unsung heroes of the supplement world. These are the ones that actually move the needle on your training.",
    date: "2026-03-25",
    minutes: 6,
    category: "vitamins",
    metaTitle: "Top Vitamins for Gym Performance | MeltonSupps",
    metaDescription: "The 6 most important vitamins for gym performance, recovery and overall health. Backed by science, picked by athletes.",
    intro: "You can't out-supplement a vitamin deficiency. These six micronutrients are non-negotiable for serious lifters.",
    toc: ["Vitamin D3", "Magnesium", "Zinc", "B-Complex", "Vitamin C", "Iron"],
    sections: [
      { h: "Vitamin D3", p: "Critical for hormone production, bone health and immune function. 2000–5000 IU daily, especially in winter." },
      { h: "Magnesium", p: "Involved in 300+ enzymatic reactions. Improves sleep, muscle function and recovery. Glycinate form preferred." },
      { h: "Zinc", p: "Supports testosterone, immune function and recovery. 15–30mg per day, ideally with food." },
      { h: "B-Complex", p: "Energy metabolism. Heavy training depletes B vitamins fast — supplementation is wise." },
      { h: "Vitamin C", p: "Antioxidant support and collagen synthesis. 500–1000mg per day." },
      { h: "Iron", p: "Especially critical for women athletes. Get tested before supplementing — too much is harmful." },
    ],
    faqs: [
      { q: "Do I need all of these if I take a multivitamin?", a: "A good multi covers the basics. You may still benefit from extra Vitamin D and magnesium." },
      { q: "When should I take vitamins?", a: "Fat-soluble vitamins (A, D, E, K) with food containing fat. Water-soluble vitamins any time." },
    ],
    relatedProducts: [{ title: "Shop Vitamins", to: "/product-category/vitamins-and-mineral" }],
  },
  {
    slug: "how-to-improve-recovery-naturally",
    title: "How to Improve Recovery Naturally (Without Supplements)",
    excerpt: "Supplements help — but they can't replace the basics. Master these 5 natural recovery strategies first.",
    date: "2026-03-18",
    minutes: 5,
    category: "recovery",
    metaTitle: "How to Improve Recovery Naturally | MeltonSupps",
    metaDescription: "5 evidence-based ways to improve recovery naturally — sleep, nutrition, hydration, mobility and stress management.",
    intro: "No supplement on earth can fix bad recovery habits. Lock these five fundamentals in first, then layer supplements on top.",
    toc: ["Sleep", "Nutrition", "Hydration", "Mobility", "Stress"],
    sections: [
      { h: "Sleep", p: "Aim for 7–9 hours per night. Sleep is when growth hormone peaks and tissue repair happens. It's the #1 recovery tool." },
      { h: "Nutrition", p: "Hit your daily protein (1.6–2.2g/kg), eat enough total calories, and don't fear carbs around training." },
      { h: "Hydration", p: "35ml per kg of bodyweight per day, plus extra around training. Add electrolytes in hot weather or long sessions." },
      { h: "Mobility", p: "10 minutes of dynamic mobility daily prevents niggles, improves recovery and supports better training quality." },
      { h: "Stress", p: "Chronic stress wrecks recovery. Walks, breathwork, meditation — pick one and do it daily." },
    ],
    faqs: [
      { q: "How important is sleep really?", a: "More important than every supplement combined. One bad night's sleep can drop performance by 10–30%." },
      { q: "Should I take a sleep supplement?", a: "Only after dialling in routine, light exposure and bedroom environment. Magnesium glycinate is a safe first step." },
    ],
    relatedProducts: [{ title: "Shop Sleep Support", to: "/products" }],
  },
  {
    slug: "best-supplements-for-energy",
    title: "Best Supplements for Energy & Focus",
    excerpt: "Tired all day? These are the most effective supplements for clean, sustained energy without the crash.",
    date: "2026-03-10",
    minutes: 6,
    category: "performance",
    metaTitle: "Best Supplements for Energy | MeltonSupps",
    metaDescription: "The most effective energy supplements — caffeine, B vitamins, CoQ10, rhodiola and more. Clean energy without the crash.",
    intro: "If you're dragging through the day or hitting a wall during training, these supplements can help — without the jittery crash that comes from energy drinks.",
    toc: ["Caffeine + L-Theanine", "B-Complex", "Rhodiola", "CoQ10", "Iron (if deficient)", "Adaptogen blends"],
    sections: [
      { h: "Caffeine + L-Theanine", p: "100mg caffeine + 200mg L-theanine = clean focus, no jitters. Best stim combo on the planet." },
      { h: "B-Complex", p: "Critical for energy metabolism. Deficiency causes fatigue. A quality B-complex with methylated B12 is a game-changer." },
      { h: "Rhodiola", p: "Adaptogen that reduces fatigue and improves stress resilience. 200–400mg per day in the morning." },
      { h: "CoQ10", p: "Supports mitochondrial energy production. Particularly useful for over-35s and those on statins." },
      { h: "Iron (if deficient)", p: "Iron deficiency is a leading cause of fatigue, especially in women. Get tested first — never supplement blindly." },
      { h: "Adaptogen blends", p: "Ashwagandha, Cordyceps and Eleuthero combined offer stable, sustained energy without stimulants." },
    ],
    faqs: [
      { q: "Are energy supplements safe daily?", a: "Most adaptogens and B vitamins are safe long-term. Cycle stimulants every 6–8 weeks." },
      { q: "What's the cleanest energy supplement?", a: "Caffeine + L-Theanine is hard to beat for clean focused energy without crash." },
    ],
    relatedProducts: [{ title: "Shop Energy", to: "/products" }],
  },
  {
    slug: "whey-protein-beginner-guide",
    title: "Whey Protein: The Complete Beginner Guide",
    excerpt: "Everything a beginner needs to know about whey protein — types, dosing, timing and how to choose the right one.",
    date: "2026-03-04",
    minutes: 7,
    category: "beginner-guides",
    metaTitle: "Whey Protein Beginner Guide | MeltonSupps",
    metaDescription: "The complete beginner guide to whey protein — WPC vs WPI, how much to take, when, and how to pick the best one.",
    intro: "Whey protein is the most popular sports supplement on earth — and for good reason. Here's everything a beginner needs to know.",
    toc: ["What is whey?", "WPC vs WPI vs WPH", "How much do I need?", "When to take it", "How to pick a quality whey"],
    sections: [
      { h: "What is whey?", p: "Whey is the liquid by-product of cheesemaking. It's filtered and dried into a high-quality protein powder containing all 9 essential amino acids." },
      { h: "WPC vs WPI vs WPH", p: "WPC: 70–80% protein, great taste, affordable. WPI: 90%+ protein, low lactose, premium. WPH: pre-digested for ultra-fast absorption — usually overkill for beginners." },
      { h: "How much do I need?", p: "1.6–2.2g of protein per kg bodyweight per day. Whey fills the gaps between meals — typically 1–2 scoops daily." },
      { h: "When to take it", p: "Post-workout is most popular and effective. Other times: morning shake, between meals, or as a snack." },
      { h: "How to pick a quality whey", p: "Look for at least 22g protein per scoop, minimal fillers, and a brand with third-party testing." },
    ],
    faqs: [
      { q: "Will whey make me fat?", a: "No. Excess calories make you fat. Whey is just protein — fewer calories than most snacks." },
      { q: "Is whey safe?", a: "Yes, for the vast majority of healthy adults. Avoid if you have severe dairy allergy and choose isolate if lactose intolerant." },
    ],
    relatedProducts: [{ title: "Shop Whey", to: "/product-category/whey-protein" }],
  },
];

export const getPostBySlug = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);
export const getPostsByCategory = (cat: BlogCategory) => BLOG_POSTS.filter((p) => p.category === cat);
export const getRelatedPosts = (slug: string, cat: BlogCategory, limit = 3) =>
  BLOG_POSTS.filter((p) => p.slug !== slug && p.category === cat).slice(0, limit);
