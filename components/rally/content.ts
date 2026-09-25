/**
 * RALLY brand content that has no home in the Happily CMS payload.
 * Event details, schedule, guests, partners, FAQs and the RSVP form all
 * come from the CMS — edit those in app.happily.events, not here.
 */

export type CanTone = "cream" | "citrus" | "forest" | "clay";

export const products: {
  name: string;
  line: string;
  function: string;
  flavor: string;
  moment: string;
  tone: CanTone;
  /** Styled product photo: the can on a racket with its flavor ingredients. */
  image: string;
}[] = [
  {
    name: "Hydrate",
    image: "/images/products/rally-hydrate.webp",
    line: "Everyday hydration",
    function: "Electrolytes + minerals",
    flavor: "Cucumber + Lime",
    moment: "All day",
    tone: "cream",
  },
  {
    name: "Energy",
    image: "/images/products/rally-energy.webp",
    line: "Clean lift",
    function: "Electrolytes + green tea caffeine",
    flavor: "Yuzu + Sea Salt",
    moment: "Before play",
    tone: "citrus",
  },
  {
    name: "Recover",
    image: "/images/products/rally-recover.webp",
    line: "Post-movement reset",
    function: "Electrolytes + magnesium",
    flavor: "Meyer Lemon + Mint",
    moment: "After the rally",
    tone: "forest",
  },
  {
    name: "Social",
    image: "/images/products/rally-social.webp",
    line: "Zero-alcohol sparkle",
    function: "Functional botanicals, no alcohol",
    flavor: "White Peach + Ginger",
    moment: "Golden hour",
    tone: "clay",
  },
];

export const benefits = [
  "Electrolytes for hydration",
  "Magnesium + potassium",
  "Vitamin C + B vitamins",
  "Low sugar",
  "Light sparkle",
  "Sophisticated flavor",
];

/** Unsplash photo URL, cropped for the experience cards (used where we have no event photo yet). */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=600&fit=crop&q=80&auto=format`;

export const experiences: {
  name: string;
  description: string;
  image: string;
  /** CSS object-position for photos that need a nudge inside the 4:3 frame. */
  imagePosition?: string;
}[] = [
  {
    name: "The Hydration Bar",
    image: "/images/experiences/hydration-bar.jpg",
    description:
      "Every RALLY flavor, poured into elevated glassware with herb, citrus and fruit garnishes.",
  },
  {
    name: "Rally Sessions",
    image: unsplash("1684443726782-1d5bb1aecbd5"),
    description:
      "A relaxed clinic and social rally on court — all levels, no scoreboard pressure.",
  },
  {
    name: "Recovery Lounge",
    image: "/images/experiences/recovery-lounge.jpg",
    description:
      "Stretching, massage, cold towels and compression boots in a calm reset space.",
  },
  {
    name: "Personalized Lockers",
    image: "/images/experiences/lockers.jpg",
    description:
      "Your name on the door, a branded towel, court accessories and chilled cans inside.",
  },
  {
    name: "Serve Speed Challenge",
    image: unsplash("1545151414-8a948e1ea54f"),
    description:
      "A clean, stylish radar-gun moment on center court — with prizes for the quickest.",
  },
  {
    name: "Fuel Station",
    image: "/images/experiences/fuel-station.jpg",
    description:
      "A grab-and-go refrigerator, always stocked with ice-cold RALLY.",
  },
  {
    name: "Club Portraits",
    image: "/images/experiences/club-portraits.jpg",
    imagePosition: "50% 88%",
    description:
      "Editorial portraits captured courtside in natural Palm Springs light.",
  },
  {
    name: "Courtside Lounge",
    image: "/images/venue-courtside-lounge.jpg",
    imagePosition: "50% 72%",
    description:
      "Umbrellas, towels, tennis magazines and lounge music between sets.",
  },
];

export type MenuItem = { name: string; note: string };

/**
 * The club menu, laid out like a court: four service boxes either side of
 * the net, and the back court for pours.
 */
export const menu: {
  intro: string;
  boxes: { title: string; items: MenuItem[] }[];
  backCourt: { title: string; items: MenuItem[] };
} = {
  intro:
    "Light, seasonal plates made for a warm afternoon — bites through the day, a courtside lunch at 4:30, and RALLY poured chilled from the first serve to the sunset toast.",
  boxes: [
    {
      title: "First Serve",
      items: [
        { name: "Avocado toast points", note: "Sourdough, chili oil, lime" },
        {
          name: "Cucumber & herb sandwiches",
          note: "Whipped chèvre, dill, chive",
        },
        { name: "Ricotta flatbread", note: "Honey, lemon zest, thyme" },
      ],
    },
    {
      title: "Forehand",
      items: [
        { name: "Citrus salad", note: "Blood orange, fennel, mint" },
        { name: "Grilled chicken skewers", note: "Herb yogurt, charred lemon" },
        {
          name: "Chopped market vegetables",
          note: "Green goddess, toasted seeds",
        },
      ],
    },
    {
      title: "Recovery",
      items: [
        { name: "Seasonal fruit", note: "Stone fruit, melon, sea salt" },
        { name: "RALLY Recover", note: "Meyer lemon + mint, magnesium" },
        { name: "RALLY Hydrate", note: "Cucumber + lime, electrolytes" },
      ],
    },
    {
      title: "Tie-Break",
      items: [
        { name: "Lemon olive oil cake", note: "Crème fraîche, candied peel" },
        { name: "RALLY Social", note: "White peach + ginger, zero-proof" },
        { name: "RALLY Energy", note: "Yuzu + sea salt, green tea" },
      ],
    },
  ],
  backCourt: {
    title: "Courtside Pours",
    items: [
      { name: "RALLY, served chilled", note: "All four, all day" },
      { name: "Iced matcha", note: "Oat milk or neat" },
      { name: "Cold brew", note: "Slow-steeped, over ice" },
      { name: "Sparkling water", note: "With citrus & herbs" },
      { name: "Fresh citrus spritzers", note: "Grapefruit, lime, soda" },
      { name: "Sunset toast", note: "RALLY Social, 6:30 pm" },
    ],
  },
};

export const venue = {
  name: "The Racquet House",
  city: "Palm Springs, California",
  description:
    "A design-forward tennis club with sun-washed courts, striped umbrellas, private cabanas and a poolside terrace — intimate by design, never corporate.",
  dressCode: "Court Whites, Resort Sport & Elevated Summer Neutrals",
};

/** Shown right under the hero poster. */
export const launchStatement = {
  headline:
    "The Hydration Club is RALLY’s launch experience: a sun-washed day of product discovery, premium tasting, relaxed rally sessions, recovery rituals, and courtside socializing.",
  body: "Guests will be among the first to explore RALLY Hydrate, Energy, Recover, and Social—lightly sparkling functional drinks made for every kind of day.",
};

export const quote =
  "RALLY is for the ones who move, gather and glow — hydration for the whole day, not just the game.";

/**
 * Host portraits, matched by the speaker's name in Arrived. A photo uploaded
 * to the speaker in the CMS takes priority over these.
 */
export const hostPhotos: Record<string, { src: string; position?: string }> = {
  "Chloe Bennett": {
    src: "/images/hosts/chloe-bennett.jpg",
    position: "50% 25%",
  },
  "Maya Torres": { src: "/images/hosts/maya-torres.jpg", position: "50% 20%" },
  "Olivia Hart": { src: "/images/hosts/olivia-hart.jpg", position: "40% 45%" },
  "Luca James": { src: "/images/hosts/luca-james.jpg", position: "50% 30%" },
};
