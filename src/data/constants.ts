export const C = {
  bg: "#FAF8F5",
  surface: "#FFFFFF",
  ink: "#1A1815",
  inkSoft: "#8A8278",
  line: "#ECE6DD",
  lineSoft: "#F3EFE8",
  accent: "#B8390E",
  accentDark: "#8F2C0A",
  accentSoft: "#FAEEE6",
  gold: "#C29A42",
  shadow: "0 1px 3px rgba(26,24,21,0.06), 0 8px 24px -12px rgba(26,24,21,0.12)",
  shadowLg: "0 4px 12px rgba(26,24,21,0.08), 0 24px 48px -20px rgba(26,24,21,0.18)",
};

export const FONT = "https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Inter:wght@400;500;600&display=swap";
export const DISPLAY = "'Fraunces', Georgia, serif";
export const BODY = "'Inter', system-ui, sans-serif";

export const px = (id: number, w = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const GALLERY: Record<string, number[]> = {
  pizza: [6223172, 1878346, 6605187, 9543813],
  sushi: [28559483, 31393434, 4724481, 2098143],
  burger: [5488052, 3727243, 36691286, 4315148],
  steak: [14515091, 27643017, 36683019, 36630840],
  vegetarian: [33323285, 4958946, 6065181, 3026013],
  asian: [24243345, 3054690, 28895978, 29145757],
  mexican: [36498696, 25391591, 36498704, 34289262],
  italian: [546945, 1438672, 8917285, 31637791],
  seafood: [16743486, 14499018, 19524049, 33041124],
  brunch: [8616015, 2874780, 947898, 35160887],
  dessert: [39240983, 39240989, 31928755, 32916204],
};

export const CITIES = ["București", "Craiova", "Cluj-Napoca", "Timișoara", "Brașov", "Constanța", "Iași", "Sibiu", "Oradea", "Galați", "Ploiești", "Arad", "Bacău", "Târgu Mureș"];

export const CUISINES = [
  { id: "pizza", label: "Pizza", icon: "🍕" },
  { id: "sushi", label: "Sushi", icon: "🍣" },
  { id: "burger", label: "Burger", icon: "🍔" },
  { id: "steak", label: "Steak", icon: "🥩" },
  { id: "italian", label: "Italian", icon: "🍝" },
  { id: "asian", label: "Asian", icon: "🍜" },
  { id: "mexican", label: "Mexican", icon: "🌮" },
  { id: "vegetarian", label: "Vegetarian", icon: "🥗" },
  { id: "seafood", label: "Fructe de mare", icon: "🦐" },
  { id: "brunch", label: "Brunch", icon: "🥐" },
  { id: "dessert", label: "Desert", icon: "🍰" },
  { id: "orice", label: "Orice", icon: "✨" },
];

export const BUDGETS = ["€", "€€", "€€€", "€€€€"];

export const MOODS = [
  { id: "romantic", label: "Romantic", icon: "❤️" },
  { id: "familie", label: "Familie", icon: "👨‍👩‍👧" },
  { id: "elegant", label: "Elegant", icon: "🍷" },
  { id: "casual", label: "Casual", icon: "😎" },
  { id: "distractie", label: "Distracție", icon: "🎉" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "rooftop", label: "Rooftop", icon: "🌃" },
];

export type Booking = { type: "online" | "phone" | "website"; url?: string; phone?: string };
export type Restaurant = {
  id: number; name: string; city: string; cuisine: string; cuisineLabel: string;
  mood: string; price: string; rating: number; distance: string; openUntil: string;
  image: string; address: string; hours: string; description: string;
  dishes: string[]; booking: Booking; tags?: string[];
};

export const priceRank: Record<string, number> = { "€": 1, "€€": 2, "€€€": 3, "€€€€": 4 };

export function computeMatch(r: Restaurant, answers: Record<string, any>): number {
  let score = 55;
  if (answers.cuisine && (answers.cuisine === r.cuisine || answers.cuisine === "orice")) score += 22;
  if (answers.mood && answers.mood === r.mood) score += 14;
  if (answers.budget && answers.budget === r.price) score += 9;
  score += Math.round(Math.random() * 4);
  return Math.min(99, score);
}

export function googleMapsUrl(r: Restaurant): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${r.name}, ${r.address}`)}`;
}

const REVIEWERS = ["Andrei P.","Elena M.","Mihai R.","Ioana T.","Cristian D.","Ana V.","George B.","Larisa S.","Bogdan N.","Diana C.","Alexandru F.","Raluca I.","Vlad O.","Simona K.","Radu H."];
const REVIEW_LINES = [
  "Am comandat {dish} și a fost exact ce aveam nevoie. Ne întoarcem sigur.",
  "Atmosfera e superbă, iar {dish} a fost punctul culminant al serii.",
  "Porții generoase și personal amabil. Recomand cu încredere {dish}.",
  "{dish} a fost foarte bun, dar am așteptat puțin mai mult decât mă așteptam.",
  "Locul e mic și cald, perfect pentru o seară liniștită. {dish} — foarte reușit.",
  "Am fost impresionat de prospețimea ingredientelor din {dish}.",
  "Prețul e corect pentru calitate. {dish} merită încercat.",
  "Personalul a fost foarte atent, iar {dish} a venit exact cum a fost descris în meniu.",
  "Revin de fiecare dată pentru {dish} — nu m-a dezamăgit niciodată.",
  "Decor plăcut, muzică potrivită, iar {dish} a fost punctul forte al mesei.",
  "Recomand rezervare din timp, mai ales în weekend. {dish} a fost delicios.",
  "O experiență solidă per total, iar {dish} chiar merită menționat separat.",
];

export function getReviews(r: Restaurant) {
  return Array.from({ length: 3 }).map((_, i) => {
    const lineIdx = (r.id * 3 + i * 2) % REVIEW_LINES.length;
    const authorIdx = (r.id * 5 + i * 3) % REVIEWERS.length;
    const dish = r.dishes[i % r.dishes.length];
    const ratingVariant = Math.max(3.5, Math.min(5, r.rating + (i - 1) * 0.3));
    return {
      author: REVIEWERS[authorIdx],
      rating: Math.round(ratingVariant * 2) / 2,
      text: REVIEW_LINES[lineIdx].replace("{dish}", dish),
      daysAgo: 2 + ((r.id * 7 + i * 13) % 45),
    };
  });
}

export function getReviewCount(r: Restaurant): number { return 38 + ((r.id * 17) % 260); }
export function getGallery(r: Restaurant): string[] { return (GALLERY[r.cuisine] || GALLERY.italian).map((id) => px(id, 600)); }
