import type { LanguageCode, Unit } from "@/types/learning";

export const units: Unit[] = [
  // Spanish
  {
    id: "es-u1",
    languageCode: "es",
    order: 1,
    level: "A1",
    title: "First Steps",
    description: "Say hello, introduce yourself, and talk about your day.",
  },
  {
    id: "es-u2",
    languageCode: "es",
    order: 2,
    level: "A1",
    title: "At the Café",
    description: "Order drinks and snacks like a local.",
  },

  // French
  {
    id: "fr-u1",
    languageCode: "fr",
    order: 1,
    level: "A1",
    title: "First Steps",
    description: "Greet people politely and introduce yourself.",
  },
  {
    id: "fr-u2",
    languageCode: "fr",
    order: 2,
    level: "A1",
    title: "Around Town",
    description: "Order at a café, find your way, and go shopping.",
  },
  {
    id: "fr-u3",
    languageCode: "fr",
    order: 3,
    level: "A1",
    title: "People I Know",
    description: "Talk about your family and friends.",
  },

  // Japanese
  {
    id: "ja-u1",
    languageCode: "ja",
    order: 1,
    level: "A1",
    title: "First Steps",
    description: "Learn basic greetings and simple introductions.",
  },
  {
    id: "ja-u2",
    languageCode: "ja",
    order: 2,
    level: "A1",
    title: "Around Town",
    description: "Order at a café, find your way, and go shopping.",
  },
  {
    id: "ja-u3",
    languageCode: "ja",
    order: 3,
    level: "A1",
    title: "People I Know",
    description: "Talk about your family and friends.",
  },
];

export function getUnitsByLanguage(code: LanguageCode): Unit[] {
  return units
    .filter((unit) => unit.languageCode === code)
    .sort((a, b) => a.order - b.order);
}

export function getUnit(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}
