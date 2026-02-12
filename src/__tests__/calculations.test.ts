/**
 * Tests para calculations.ts - Todas las fórmulas de Life Stats
 */
import { describe, it, expect } from "vitest";
import { calculateLifeStats, formatNumber, formatCompact } from "@/lib/calculations";

describe("calculateLifeStats", () => {
  // Usamos una fecha fija para obtener resultados determinísticos
  const birthDate = "2000-01-01";

  it("should return a valid LifeStats object", () => {
    const stats = calculateLifeStats(birthDate);

    expect(stats).toBeDefined();
    expect(stats.years).toBeGreaterThanOrEqual(24);
    expect(stats.months).toBeGreaterThanOrEqual(0);
    expect(stats.months).toBeLessThan(12);
    expect(stats.days).toBeGreaterThanOrEqual(0);
    expect(stats.days).toBeLessThan(31);
  });

  it("should calculate positive heartbeats", () => {
    const stats = calculateLifeStats(birthDate);
    expect(stats.heartbeats).toBeGreaterThan(0);
    // 25 years ≈ 9,125 days × 100,000 = ~912,500,000
    expect(stats.heartbeats).toBeGreaterThan(800_000_000);
  });

  it("should calculate positive breaths", () => {
    const stats = calculateLifeStats(birthDate);
    expect(stats.breaths).toBeGreaterThan(0);
    // 25 years ≈ 9,125 days × 20,000 = ~182,500,000
    expect(stats.breaths).toBeGreaterThan(150_000_000);
  });

  it("should calculate positive blinks", () => {
    const stats = calculateLifeStats(birthDate);
    expect(stats.blinks).toBeGreaterThan(0);
  });

  it("should calculate distance traveled through space", () => {
    const stats = calculateLifeStats(birthDate);
    // La Tierra viaja ~940M km/año
    expect(stats.distanceTraveledKm).toBeGreaterThan(20_000_000_000);
  });

  it("should calculate life percentage between 0 and 100", () => {
    const stats = calculateLifeStats(birthDate);
    expect(stats.lifePercentage).toBeGreaterThan(0);
    expect(stats.lifePercentage).toBeLessThanOrEqual(100);
  });

  it("should calculate weeks lived correctly", () => {
    const stats = calculateLifeStats(birthDate);
    // ~25 years × 52 weeks ≈ 1300
    expect(stats.weeksLived).toBeGreaterThan(1200);
    expect(stats.weeksTotal).toBe(80 * 52); // 4160
  });

  it("should calculate remaining days as positive", () => {
    const stats = calculateLifeStats(birthDate);
    expect(stats.daysRemaining).toBeGreaterThanOrEqual(0);
  });

  it("should calculate sleep years", () => {
    const stats = calculateLifeStats(birthDate);
    // ~8h/day ÷ 24h = 1/3 of life sleeping
    expect(stats.sleepYears).toBeGreaterThan(7);
    expect(stats.sleepYears).toBeLessThan(12);
  });

  it("should calculate meals eaten", () => {
    const stats = calculateLifeStats(birthDate);
    // 3 meals/day × ~9125 days ≈ 27,375
    expect(stats.mealsEaten).toBeGreaterThan(25_000);
  });

  it("should calculate water liters consumed", () => {
    const stats = calculateLifeStats(birthDate);
    expect(stats.waterLiters).toBeGreaterThan(15_000);
  });

  it("should calculate sunrises equal to days lived", () => {
    const stats = calculateLifeStats(birthDate);
    expect(stats.sunrises).toBe(stats.daysLived);
  });

  it("should calculate full moons", () => {
    const stats = calculateLifeStats(birthDate);
    // ~12-13 full moons per year × 25 years
    expect(stats.fullMoons).toBeGreaterThan(280);
    expect(stats.fullMoons).toBeLessThan(400);
  });

  it("should generate fun facts as FunFactData array", () => {
    const stats = calculateLifeStats(birthDate);
    expect(Array.isArray(stats.funFacts)).toBe(true);
    expect(stats.funFacts.length).toBeLessThanOrEqual(4);
    expect(stats.funFacts.length).toBeGreaterThan(0);

    for (const fact of stats.funFacts) {
      expect(fact).toHaveProperty("key");
      expect(fact).toHaveProperty("value");
      expect(typeof fact.key).toBe("string");
      expect(typeof fact.value).toBe("string");
    }
  });

  it("should handle very recent birth date", () => {
    const today = new Date();
    const recentDate = new Date(today);
    recentDate.setDate(recentDate.getDate() - 1);
    const dateStr = recentDate.toISOString().split("T")[0];

    const stats = calculateLifeStats(dateStr);
    expect(stats.years).toBe(0);
    expect(stats.daysLived).toBe(1);
    expect(stats.heartbeats).toBe(100_000);
  });

  it("should handle old birth date", () => {
    const stats = calculateLifeStats("1940-01-01");
    expect(stats.years).toBeGreaterThanOrEqual(84);
    // lifePercentage is capped at 100 via Math.min
    expect(stats.lifePercentage).toBe(100);
    expect(stats.daysRemaining).toBe(0);
  });
});

describe("formatNumber", () => {
  it("should format numbers with commas", () => {
    expect(formatNumber(1234567)).toBe("1,234,567");
    expect(formatNumber(1000)).toBe("1,000");
    expect(formatNumber(42)).toBe("42");
    expect(formatNumber(0)).toBe("0");
  });

  it("should floor decimal numbers", () => {
    expect(formatNumber(1234.56)).toBe("1,234");
  });
});

describe("formatCompact", () => {
  it("should format billions", () => {
    expect(formatCompact(2_500_000_000)).toBe("2.5B");
    expect(formatCompact(1_000_000_000)).toBe("1.0B");
  });

  it("should format millions", () => {
    expect(formatCompact(5_500_000)).toBe("5.5M");
    expect(formatCompact(1_000_000)).toBe("1.0M");
  });

  it("should format thousands", () => {
    expect(formatCompact(5_500)).toBe("5.5K");
    expect(formatCompact(1_000)).toBe("1.0K");
  });

  it("should handle small numbers", () => {
    expect(formatCompact(42)).toBe("42");
    expect(formatCompact(0)).toBe("0");
  });
});
