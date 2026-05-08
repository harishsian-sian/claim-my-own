export interface StoreLocation {
  handle: string;
  name: string;
  shortName: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  phone: string;
  phoneHref: string;
  email: string;
  instagram?: string;
  instagramHandle?: string;
  hours: { day: string; time: string }[];
  mapsUrl: string;
  embedUrl: string;
  tagline: string;
  intro: string;
}

export const STORES: StoreLocation[] = [
  {
    handle: "melton",
    name: "MeltonSupps Melton",
    shortName: "Melton",
    address: "Shop 5, 270 High Street",
    suburb: "Melton",
    state: "Victoria",
    postcode: "3337",
    phone: "03 8746 4680",
    phoneHref: "tel:0387464680",
    email: "melton@meltonsupps.com.au",
    instagram: "https://www.instagram.com/meltonsupps/",
    instagramHandle: "@meltonsupps",
    hours: [
      { day: "Monday", time: "09:00 – 18:00" },
      { day: "Tuesday", time: "09:00 – 18:00" },
      { day: "Wednesday", time: "09:00 – 18:00" },
      { day: "Thursday", time: "09:00 – 18:00" },
      { day: "Friday", time: "09:00 – 18:00" },
      { day: "Saturday", time: "09:00 – 16:00" },
      { day: "Sunday", time: "Closed" },
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=MeltonSupps+Melton+High+Street+Melton+VIC+3337",
    embedUrl: "https://www.google.com/maps?q=270+High+Street+Melton+VIC+3337&output=embed",
    tagline: "Your local supplement HQ in Melton.",
    intro:
      "Visit MeltonSupps in the heart of Melton for Australia's best sports nutrition, vitamins and wellness brands — all at unbeatable prices. Friendly expert staff are ready to help you smash your goals.",
  },
  {
    handle: "braybrook",
    name: "MeltonSupps Braybrook",
    shortName: "Braybrook",
    address: "Shop 12, 220 Ballarat Road",
    suburb: "Braybrook",
    state: "Victoria",
    postcode: "3019",
    phone: "03 9317 2200",
    phoneHref: "tel:0393172200",
    email: "braybrook@meltonsupps.com.au",
    instagram: "https://www.instagram.com/meltonsupps/",
    instagramHandle: "@meltonsupps",
    hours: [
      { day: "Monday", time: "09:00 – 19:00" },
      { day: "Tuesday", time: "09:00 – 19:00" },
      { day: "Wednesday", time: "09:00 – 19:00" },
      { day: "Thursday", time: "09:00 – 19:00" },
      { day: "Friday", time: "09:00 – 19:00" },
      { day: "Saturday", time: "09:00 – 17:00" },
      { day: "Sunday", time: "10:00 – 16:00" },
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=MeltonSupps+Braybrook+Ballarat+Road+VIC+3019",
    embedUrl: "https://www.google.com/maps?q=220+Ballarat+Road+Braybrook+VIC+3019&output=embed",
    tagline: "Now serving Melbourne's inner west.",
    intro:
      "Our Braybrook store brings the same trusted MeltonSupps range to Melbourne's inner west. Drop in for protein, pre-workout, creatine, vitamins and personalised advice from our team.",
  },
];

export const getStore = (handle: string) => STORES.find((s) => s.handle === handle);
