/**
 * i18n-context.tsx - React Context para internacionalización
 *
 * Provee el idioma actual y las traducciones a toda la app.
 * Persiste la preferencia en localStorage.
 */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  startTransition,
  type ReactNode,
} from "react";
import {
  type Locale,
  type Translations,
  DEFAULT_LOCALE,
  getTranslations,
  detectBrowserLocale,
} from "./i18n";

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType>({
  locale: DEFAULT_LOCALE,
  t: getTranslations(DEFAULT_LOCALE),
  setLocale: () => {},
});

const STORAGE_KEY = "life-stats-locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  // Al montar, leer preferencia guardada o detectar del navegador
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    const detected =
      saved && ["en", "es", "pt", "hi", "fr"].includes(saved) ? saved : detectBrowserLocale();
    // Usar startTransition para evitar cascading render warning
    startTransition(() => {
      setLocaleState(detected);
      setMounted(true);
    });
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    // Actualizar el atributo lang del HTML
    document.documentElement.lang = newLocale;
  }, []);

  const t = getTranslations(locale);

  // Evitar flash de idioma incorrecto en SSR
  if (!mounted) {
    return (
      <I18nContext.Provider
        value={{ locale: DEFAULT_LOCALE, t: getTranslations(DEFAULT_LOCALE), setLocale }}
      >
        {children}
      </I18nContext.Provider>
    );
  }

  return <I18nContext.Provider value={{ locale, t, setLocale }}>{children}</I18nContext.Provider>;
}

/**
 * Hook para acceder al contexto de internacionalización.
 *
 * @returns { locale, t, setLocale }
 *
 * @example
 * const { t, locale, setLocale } = useI18n();
 * <h1>{t.landing.title}</h1>
 */
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
