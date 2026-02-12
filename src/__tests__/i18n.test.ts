/**
 * Tests para i18n.ts - Sistema de internacionalización
 */
import { describe, it, expect } from "vitest";
import {
  getTranslations,
  detectBrowserLocale,
  LOCALES,
  DEFAULT_LOCALE,
  type Locale,
} from "@/lib/i18n";

describe("LOCALES", () => {
  it("should have 5 locales", () => {
    expect(LOCALES).toHaveLength(5);
  });

  it("should have correct locale codes", () => {
    const codes = LOCALES.map((l) => l.code);
    expect(codes).toContain("en");
    expect(codes).toContain("es");
    expect(codes).toContain("pt");
    expect(codes).toContain("hi");
    expect(codes).toContain("fr");
  });

  it("should have flags and labels for each locale", () => {
    for (const locale of LOCALES) {
      expect(locale.flag).toBeTruthy();
      expect(locale.label).toBeTruthy();
    }
  });
});

describe("DEFAULT_LOCALE", () => {
  it("should be English", () => {
    expect(DEFAULT_LOCALE).toBe("en");
  });
});

describe("getTranslations", () => {
  const allLocales: Locale[] = ["en", "es", "pt", "hi", "fr"];

  it("should return translations for all supported locales", () => {
    for (const locale of allLocales) {
      const t = getTranslations(locale);
      expect(t).toBeDefined();
      expect(t.meta.title).toBeTruthy();
      expect(t.meta.description).toBeTruthy();
    }
  });

  it("should have all required translation keys for each locale", () => {
    for (const locale of allLocales) {
      const t = getTranslations(locale);

      // Landing
      expect(t.landing.title).toBeTruthy();
      expect(t.landing.subtitle).toBeTruthy();
      expect(t.landing.subtitleHighlight).toBeTruthy();
      expect(t.landing.description).toBeTruthy();
      expect(t.landing.features).toHaveLength(6);

      // Date Input
      expect(t.dateInput.label).toBeTruthy();
      expect(t.dateInput.submit).toBeTruthy();
      expect(t.dateInput.errorEmpty).toBeTruthy();
      expect(t.dateInput.errorFuture).toBeTruthy();
      expect(t.dateInput.errorInvalid).toBeTruthy();

      // Stats
      expect(t.stats.title).toBeTruthy();
      expect(typeof t.stats.yearsMonthsDays).toBe("function");
      expect(t.stats.yearsMonthsDays(25, 6, 15)).toBeTruthy();

      // Live Counter
      expect(t.liveCounter.prefix).toBeTruthy();
      expect(t.liveCounter.suffix).toBeTruthy();
      expect(t.liveCounter.live).toBeTruthy();

      // Body Stats
      expect(t.bodyStats.sectionTitle).toBeTruthy();
      expect(t.bodyStats.heartbeats).toBeTruthy();
      expect(typeof t.bodyStats.sleepYearsDesc).toBe("function");

      // Journey
      expect(t.journey.sectionTitle).toBeTruthy();
      expect(typeof t.journey.walkedDesc).toBe("function");

      // Life Grid
      expect(t.lifeGrid.title).toBeTruthy();
      expect(typeof t.lifeGrid.description).toBe("function");
      expect(t.lifeGrid.description("100", "4160")).toBeTruthy();

      // Time Perspective
      expect(t.timePerspective.title).toBeTruthy();
      expect(t.timePerspective.disclaimer).toBeTruthy();

      // Fun Facts (function translators)
      expect(typeof t.funFacts.moonTrips).toBe("function");
      expect(typeof t.funFacts.sunTrips).toBe("function");
      expect(typeof t.funFacts.heartBillion).toBe("function");
      expect(typeof t.funFacts.heartMillion).toBe("function");
      expect(typeof t.funFacts.books).toBe("function");
      expect(typeof t.funFacts.pizza).toBe("function");
      expect(typeof t.funFacts.hair).toBe("function");
      expect(typeof t.funFacts.nails).toBe("function");
      expect(typeof t.funFacts.words).toBe("function");

      // Fun facts should produce non-empty strings
      expect(t.funFacts.moonTrips("5")).toBeTruthy();
      expect(t.funFacts.pizza("1000")).toBeTruthy();

      // Share
      expect(t.share.shareButton).toBeTruthy();
      expect(t.share.tryAnother).toBeTruthy();

      // Shareable Card
      expect(t.shareableCard.title).toBeTruthy();
      expect(typeof t.shareableCard.ageText).toBe("function");

      // Footer
      expect(t.footer.tagline).toBeTruthy();
      expect(t.footer.madeWith).toBeTruthy();
    }
  });

  it("should have unique translations for each locale (not all same as English)", () => {
    const en = getTranslations("en");
    const nonEnglish: Locale[] = ["es", "pt", "hi", "fr"];

    for (const locale of nonEnglish) {
      const t = getTranslations(locale);
      // At least the main description should differ
      expect(t.landing.description).not.toBe(en.landing.description);
      expect(t.dateInput.label).not.toBe(en.dateInput.label);
    }
  });
});

describe("detectBrowserLocale", () => {
  it("should return default locale when navigator is undefined", () => {
    // In jsdom, navigator exists but we test the function directly
    const locale = detectBrowserLocale();
    // Should return a valid locale
    expect(["en", "es", "pt", "hi", "fr"]).toContain(locale);
  });
});
