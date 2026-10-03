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
    flag: "https://flagcdn.com/w320/ja.png",
    learners: "12.7M",
    greeting: "こんにちは",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "https://flagcdn.com/w320/ko.png",
    learners: "9.3M",
    greeting: "안녕하세요",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "https://flagcdn.com/w320/de.png",
    learners: "8.1M",
    greeting: "Hallo",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "https://flagcdn.com/w320/zh.png",
    learners: "7.4M",
    greeting: "你好",
  },
];

export function getLanguage(code: LanguageCode): Language | undefined {
  return languages.find((language) => language.code === code);
}
