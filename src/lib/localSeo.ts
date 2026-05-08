import type { FAQ } from "@/components/FAQAccordion";

export interface LocalSeoPage {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    heading: string;
    subheading: string;
  };
  intro: string;
  keywords: string[];
  highlights: { title: string; desc: string }[];
  faqs: FAQ[];
  ctaPrimary: { label: string; to: string };
  storeFocus: "melton" | "braybrook";
}

export const LOCAL_PAGES: LocalSeoPage[] = [
  {
    slug: "best-supplement-store-melton",
    h1: "The Best Supplement Store in Melton, VIC",
    metaTitle: "Best Supplement Store in Melton — MeltonSupps",
    metaDescription:
      "Voted Melton's #1 supplement store. Whey protein, pre-workout, creatine and vitamins from top Australian brands at the lowest prices. Visit us in Melton, VIC.",
    hero: {
      eyebrow: "#1 in Melton",
      heading: "Melton's Most Trusted Supplement Store",
      subheading:
        "Genuine Australian-stocked supplements at unbeatable prices. Visit us in-store or shop online with same-day local pickup.",
    },
    intro:
      "MeltonSupps has been serving lifters, athletes and everyday gym-goers across Melton for years. Whether you train at Plus Fitness, Anytime Fitness, World Gym or in your garage, we've got the gear and advice to get you stronger, leaner and recovering faster.",
    keywords: ["supplement store Melton", "Melton supplements", "protein Melton", "pre workout Melton VIC", "best supplement shop Melton"],
    highlights: [
      { title: "Local Melton store", desc: "Drop in for advice, free samples and expert recommendations." },
      { title: "Same-day pickup", desc: "Order online before 1pm and collect today." },
      { title: "Lowest prices", desc: "We price match every major Australian retailer." },
      { title: "Real expert staff", desc: "No commissions. No upsells. Just real advice." },
    ],
    faqs: [
      { q: "Where is MeltonSupps located?", a: "We're located in central Melton, VIC. See our store locator page for the exact address and directions." },
      { q: "Do you offer same-day pickup in Melton?", a: "Yes — order online before 1pm and your order will be ready to collect from our Melton store the same day." },
      { q: "What brands do you stock?", a: "We stock all the leading Australian and international brands including Optimum Nutrition, EHP Labs, Rule 1, Ghost, Max's, International Protein, ATP Science and many more." },
      { q: "Do you price match?", a: "Yes. If you find a cheaper price at any major Australian supplement retailer, we'll match it. See our price-match page for full details." },
    ],
    ctaPrimary: { label: "View Melton Store", to: "/stores/melton" },
    storeFocus: "melton",
  },
  {
    slug: "supplements-near-me",
    h1: "Supplements Near Me — Melbourne's Local Supplement Store",
    metaTitle: "Supplements Near Me — MeltonSupps Melbourne",
    metaDescription:
      "Looking for supplements near you in Melbourne? MeltonSupps stores in Melton & Braybrook stock protein, pre-workout and vitamins. Walk in or order online.",
    hero: {
      eyebrow: "Find Us",
      heading: "Supplements Near You in Melbourne",
      subheading:
        "Two convenient Victorian locations stocking Australia's biggest supplement brands. Melton and Braybrook — open 7 days.",
    },
    intro:
      "Searching 'supplements near me'? You're in the right place. MeltonSupps has stocked Melbourne's lifters and athletes for years with the freshest, most trusted supplements at the lowest prices in the west.",
    keywords: ["supplements near me", "supplement shop Melbourne", "protein near me", "supplement store near me Melbourne"],
    highlights: [
      { title: "Two Melbourne stores", desc: "Melton & Braybrook — easy parking, friendly staff." },
      { title: "Open 7 days", desc: "Visit before, during or after your training session." },
      { title: "Same-day click & collect", desc: "Reserve online, pick up today." },
      { title: "Free local delivery", desc: "Free delivery on orders over $150 across western Melbourne." },
    ],
    faqs: [
      { q: "Where are your stores?", a: "We have two Victorian stores: MeltonSupps Melton and MeltonSupps Braybrook. See the store locator for addresses and opening hours." },
      { q: "Can I shop online and pick up in store?", a: "Yes — choose 'Click & Collect' at checkout and we'll have it ready within hours." },
      { q: "Do you deliver around Melbourne?", a: "Yes, we ship Australia-wide and offer free standard shipping on orders over $150." },
    ],
    ctaPrimary: { label: "Find a Store", to: "/stores" },
    storeFocus: "melton",
  },
  {
    slug: "whey-protein-melbourne",
    h1: "Whey Protein Melbourne — Best Prices, Trusted Brands",
    metaTitle: "Whey Protein Melbourne — Lowest Prices | MeltonSupps",
    metaDescription:
      "Buy whey protein in Melbourne from MeltonSupps. WPC, WPI, blends and isolates from Optimum Nutrition, EHP Labs, Rule 1, Max's & more. Free shipping over $150.",
    hero: {
      eyebrow: "Whey Protein Melbourne",
      heading: "Premium Whey Protein at Melbourne's Lowest Prices",
      subheading:
        "WPC, WPI, hydrolysate and blends from every brand that matters — in stock and ready to ship across Melbourne.",
    },
    intro:
      "Whether you're chasing lean muscle or need a high-protein meal replacement, MeltonSupps stocks every leading whey protein in Melbourne. From budget-friendly WPCs to ultra-pure isolates, we'll help you pick the right one for your goal and budget.",
    keywords: ["whey protein Melbourne", "WPI Melbourne", "buy whey protein Melbourne", "cheap whey protein Melbourne"],
    highlights: [
      { title: "All major brands", desc: "Optimum Nutrition, EHP Labs, Rule 1, Ghost, Max's, International Protein and more." },
      { title: "Lab-tested authenticity", desc: "Sourced direct from Australian distributors. Zero counterfeits." },
      { title: "Expert recommendations", desc: "Not sure WPC vs WPI? Our team will guide you." },
      { title: "Free shipping over $150", desc: "Or pick up same-day from Melton or Braybrook." },
    ],
    faqs: [
      { q: "What's the best whey protein for beginners?", a: "A WPC (whey protein concentrate) like Optimum Nutrition Gold Standard or Max's Clean Mass is a great all-rounder for beginners — affordable, great taste, and 24g of protein per scoop." },
      { q: "WPC vs WPI — what's the difference?", a: "WPC is around 70-80% protein with some lactose; WPI is filtered to 90%+ protein with very little lactose or fat. WPI suits cutting phases or anyone lactose-sensitive." },
      { q: "How much protein do I need per day?", a: "For active gym-goers, around 1.6–2.2g of protein per kg of bodyweight per day. A whey shake fills the gap when whole food isn't convenient." },
    ],
    ctaPrimary: { label: "Shop Whey Protein", to: "/product-category/whey-protein" },
    storeFocus: "melton",
  },
  {
    slug: "gym-supplements-caroline-springs",
    h1: "Gym Supplements Caroline Springs — Local Delivery & Pickup",
    metaTitle: "Gym Supplements Caroline Springs — MeltonSupps",
    metaDescription:
      "Caroline Springs' go-to for gym supplements. Pre-workout, protein, creatine and vitamins from Australia's top brands. Free local delivery & same-day pickup.",
    hero: {
      eyebrow: "Caroline Springs",
      heading: "Gym Supplements for Caroline Springs Lifters",
      subheading:
        "Just down the road from Caroline Springs — MeltonSupps stocks every supplement you need to crush your goals.",
    },
    intro:
      "If you train at Snap Fitness Caroline Springs, Anytime Fitness or one of the local PT studios, MeltonSupps Melton is your closest legit supplement store. Same-day pickup, fast local delivery, and the lowest prices in the western suburbs.",
    keywords: ["gym supplements Caroline Springs", "supplement store Caroline Springs", "protein Caroline Springs", "pre workout Caroline Springs"],
    highlights: [
      { title: "5 minutes from Caroline Springs", desc: "Quick drive to our Melton flagship." },
      { title: "Same-day local delivery", desc: "Order before noon for same-day delivery to Caroline Springs." },
      { title: "Trusted brands only", desc: "100% authentic. No grey market stock." },
      { title: "Free advice", desc: "Walk in, ask questions, leave with the right product." },
    ],
    faqs: [
      { q: "Do you deliver to Caroline Springs?", a: "Yes — we offer same-day delivery to Caroline Springs on orders placed before noon, plus free delivery on orders over $150." },
      { q: "What's the closest store to Caroline Springs?", a: "MeltonSupps Melton is just a short drive away and stocks our full range." },
      { q: "Do you sell pre-workout in Caroline Springs?", a: "Absolutely — we stock every leading pre-workout brand including EHP Labs, Ghost, C4, Rule 1 and more." },
    ],
    ctaPrimary: { label: "Shop Pre-Workouts", to: "/product-category/pre-workouts" },
    storeFocus: "melton",
  },
  {
    slug: "sports-supplements-melton",
    h1: "Sports Supplements Melton — Performance, Recovery & More",
    metaTitle: "Sports Supplements Melton VIC — MeltonSupps",
    metaDescription:
      "Premium sports supplements in Melton. Performance, recovery, intra-workout and electrolytes from EHP Labs, Optimum Nutrition, Rule 1 and more.",
    hero: {
      eyebrow: "Performance & Recovery",
      heading: "Sports Supplements in Melton",
      subheading:
        "From pre-workouts to BCAAs, recovery formulas and electrolytes — everything an athlete needs, in Melton.",
    },
    intro:
      "MeltonSupps is Melton's home of sports nutrition. We stock the formulas trusted by competitive lifters, footballers, cyclists, CrossFitters and weekend warriors across the western suburbs of Melbourne.",
    keywords: ["sports supplements Melton", "athlete supplements Melton", "BCAA Melton", "intra workout Melton"],
    highlights: [
      { title: "Performance stacks", desc: "Pre, intra, post — built for athletes." },
      { title: "Recovery essentials", desc: "BCAA, EAA, glutamine, magnesium and more." },
      { title: "Hydration & electrolytes", desc: "Stay topped up during long sessions and hot training days." },
      { title: "WADA-aware ranges", desc: "We stock products from brands that batch-test for compliance." },
    ],
    faqs: [
      { q: "Do you stock electrolyte drinks?", a: "Yes, we stock leading electrolyte and hydration brands including Bare Performance Nutrition, Codeage, Switch Nutrition and more." },
      { q: "Are your sports supplements WADA compliant?", a: "We stock several brands that voluntarily batch-test for banned substances. Ask in-store and we'll point you to the right ones for tested athletes." },
      { q: "What's the best post-workout supplement?", a: "A combination of fast-digesting protein (whey isolate) and creatine is the gold standard for most lifters." },
    ],
    ctaPrimary: { label: "Shop Sports Supplements", to: "/products" },
    storeFocus: "melton",
  },
  {
    slug: "vitamins-and-supplements-melbourne",
    h1: "Vitamins and Supplements Melbourne — Health & Wellness",
    metaTitle: "Vitamins & Supplements Melbourne — MeltonSupps",
    metaDescription:
      "Shop vitamins and supplements in Melbourne. Multivitamins, omega-3, magnesium, vitamin D and more from trusted Australian health brands.",
    hero: {
      eyebrow: "Health & Wellness",
      heading: "Vitamins & Supplements in Melbourne",
      subheading:
        "Everyday health essentials backed by science — multivitamins, omega-3, magnesium, vitamin D and gut health support.",
    },
    intro:
      "Sports nutrition is only half the story. MeltonSupps also stocks Melbourne's best range of everyday vitamins and wellness supplements — perfect for energy, immunity, sleep, and overall health.",
    keywords: ["vitamins Melbourne", "supplements Melbourne", "multivitamin Melbourne", "magnesium Melbourne"],
    highlights: [
      { title: "Trusted health brands", desc: "ATP Science, Switch Nutrition, Herbs of Gold and more." },
      { title: "Practitioner-grade options", desc: "We stock pharmacy and practitioner-only ranges." },
      { title: "Bundles & stacks", desc: "Build a daily wellness stack with help from our team." },
      { title: "Honest advice", desc: "We won't sell you what you don't need." },
    ],
    faqs: [
      { q: "What's the best multivitamin?", a: "It depends on your needs — but for active adults, ATP Science Multifood or Bare Performance Nutrition's daily formula are excellent picks." },
      { q: "Do you sell magnesium?", a: "Yes — magnesium glycinate, citrate and bisglycinate from leading Australian brands." },
      { q: "Do you offer vitamins for women?", a: "Absolutely. We stock dedicated women's multivitamins, iron, prenatal and hormone support formulas." },
    ],
    ctaPrimary: { label: "Shop Vitamins", to: "/product-category/vitamins-and-mineral" },
    storeFocus: "braybrook",
  },
];

export const getLocalPage = (slug: string) => LOCAL_PAGES.find((p) => p.slug === slug);
