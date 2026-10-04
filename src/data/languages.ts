import type { Language, LanguageCode } from "@/types/learning";

export const languages: Language[] = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "https://flagcdn.com/w320/es.png",
    learners: "28.4M",
    greeting: "Hola",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "https://flagcdn.com/w320/fr.png",
    learners: "19.4M",
    greeting: "Bonjour",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "https://flagcdn.com/w320/jp.png",
    learners: "12.7M",
    greeting: "こんにちは",
  },
];

export function getLanguage(code: LanguageCode): Language | undefined {
  return languages.find((language) => language.code === code);
}
