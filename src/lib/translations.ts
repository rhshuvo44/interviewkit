import en from "@/locales/en.json";
import bn from "@/locales/bn.json";
import type { Locale } from "./i18n";

const translations = { en, bn } as const;

export type Translations = typeof en;

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations.en;
}
