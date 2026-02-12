/**
 * calculations.ts - Todas las fórmulas para Life Stats
 *
 * Este módulo contiene todas las funciones de cálculo que transforman
 * una fecha de nacimiento en estadísticas sorprendentes sobre la vida.
 *
 * Constantes basadas en promedios médicos/científicos:
 * - Latidos del corazón: ~100,000 por día
 * - Respiraciones: ~20,000 por día
 * - Parpadeos: ~28,800 por día (1,200/hora despierto, ~16h)
 * - Velocidad de la Tierra en el espacio: ~940 millones km/año
 * - Expectativa de vida promedio global: ~80 años
 */

// ============================================================
// CONSTANTES
// ============================================================

/** Latidos del corazón promedio por día */
const HEARTBEATS_PER_DAY = 100_000;

/** Respiraciones promedio por día */
const BREATHS_PER_DAY = 20_000;

/** Parpadeos promedio por día (~1,200/hora × 16 horas despierto) */
const BLINKS_PER_DAY = 28_800;

/** Distancia que la Tierra recorre en el espacio por año (en km) */
const EARTH_TRAVEL_KM_PER_YEAR = 940_000_000;

/** Expectativa de vida promedio en años */
const LIFE_EXPECTANCY_YEARS = 80;

/** Semanas en un año */
const WEEKS_PER_YEAR = 52;

/** Milisegundos en un día */
const MS_PER_DAY = 1000 * 60 * 60 * 24;

/** Milisegundos en una hora */
const MS_PER_HOUR = 1000 * 60 * 60;

/** Milisegundos en un minuto */
const MS_PER_MINUTE = 1000 * 60;

/** Milisegundos en un segundo */
const MS_PER_SECOND = 1000;

/** Horas de sueño promedio por día */
const SLEEP_HOURS_PER_DAY = 8;

/** Cantidad de comidas promedio por día */
const MEALS_PER_DAY = 3;

/** Litros de agua que bebe una persona promedio por día */
const WATER_LITERS_PER_DAY = 2;

/** Pasos promedio por día */
const STEPS_PER_DAY = 7_500;

/** Longitud promedio de un paso en km */
const STEP_LENGTH_KM = 0.000762;

/** Horas de risa promedio por día */
const LAUGHS_PER_DAY = 15;

/** Sueños promedio por noche */
const DREAMS_PER_NIGHT = 4;

// ============================================================
// TIPOS
// ============================================================

export interface LifeStats {
  // Edad exacta
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;

  // Estadísticas corporales
  heartbeats: number;
  breaths: number;
  blinks: number;

  // Viaje espacial
  distanceTraveledKm: number;

  // Vida y expectativa
  daysLived: number;
  daysRemaining: number;
  lifePercentage: number;
  weeksLived: number;
  weeksTotal: number;

  // Stats extra divertidos
  sleepHours: number;
  sleepYears: number;
  mealsEaten: number;
  waterLiters: number;
  stepsWalked: number;
  distanceWalkedKm: number;
  laughs: number;
  dreams: number;
  fullMoons: number;
  sunrises: number;

  // Fun facts (datos para construir textos traducidos)
  funFacts: FunFactData[];
}

// ============================================================
// FUNCIONES DE CÁLCULO
// ============================================================

/**
 * Calcula la edad exacta desglosada en años, meses, días, horas, minutos y segundos.
 */
function calculateExactAge(birthDate: Date, now: Date) {
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = now.getTime() - birthDate.getTime();
  const totalDays = Math.floor(diffMs / MS_PER_DAY);
  const remainingMs = diffMs % MS_PER_DAY;

  const hours = Math.floor(remainingMs / MS_PER_HOUR);
  const minutes = Math.floor((remainingMs % MS_PER_HOUR) / MS_PER_MINUTE);
  const seconds = Math.floor((remainingMs % MS_PER_MINUTE) / MS_PER_SECOND);

  return { years, months, days, hours, minutes, seconds, totalDays };
}

/**
 * Genera fun facts aleatorios basados en la edad y estadísticas.
 * NOTA: Estos facts se generan con las claves del i18n, no con texto directo.
 * Retorna datos numéricos para que el componente construya el texto traducido.
 */
export interface FunFactData {
  key: string;
  value: string;
}

function generateFunFactsData(
  totalDays: number,
  heartbeats: number,
  distanceKm: number,
  years: number,
): FunFactData[] {
  const facts: FunFactData[] = [];

  const distanceToMoon = 384_400;
  const moonTrips = distanceKm / distanceToMoon;
  facts.push({ key: "moonTrips", value: moonTrips.toFixed(0) });

  const distanceToSun = 149_600_000;
  const sunTrips = distanceKm / distanceToSun;
  facts.push({ key: "sunTrips", value: sunTrips.toFixed(1) });

  if (heartbeats > 1_000_000_000) {
    facts.push({ key: "heartBillion", value: (heartbeats / 1_000_000_000).toFixed(1) });
  } else {
    facts.push({ key: "heartMillion", value: (heartbeats / 1_000_000).toFixed(0) });
  }

  if (years >= 1) {
    const booksCouldRead = Math.floor(totalDays / 7);
    facts.push({ key: "books", value: booksCouldRead.toLocaleString() });
  }

  const pizzaSlices = totalDays * 0.3;
  facts.push({ key: "pizza", value: Math.floor(pizzaSlices).toLocaleString() });

  const hairGrowthCm = totalDays * 0.035;
  facts.push({ key: "hair", value: (hairGrowthCm / 100).toFixed(1) });

  const nailGrowthMm = totalDays * 0.1;
  facts.push({ key: "nails", value: (nailGrowthMm / 10).toFixed(1) });

  const wordsSpoken = totalDays * 16_000;
  facts.push({ key: "words", value: (wordsSpoken / 1_000_000).toFixed(0) });

  return facts.sort(() => Math.random() - 0.5).slice(0, 4);
}

/**
 * Función principal: calcula TODAS las estadísticas de vida.
 *
 * @param birthDateString - Fecha de nacimiento en formato ISO (YYYY-MM-DD)
 * @returns Objeto con todas las estadísticas calculadas
 */
export function calculateLifeStats(birthDateString: string): LifeStats {
  const birthDate = new Date(birthDateString + "T00:00:00");
  const now = new Date();

  // Edad exacta
  const age = calculateExactAge(birthDate, now);

  // Estadísticas corporales
  const heartbeats = age.totalDays * HEARTBEATS_PER_DAY;
  const breaths = age.totalDays * BREATHS_PER_DAY;
  const blinks = age.totalDays * BLINKS_PER_DAY;

  // Viaje en el espacio
  const yearsExact = age.totalDays / 365.25;
  const distanceTraveledKm = yearsExact * EARTH_TRAVEL_KM_PER_YEAR;

  // Vida y expectativa
  const totalExpectedDays = LIFE_EXPECTANCY_YEARS * 365.25;
  const daysRemaining = Math.max(0, Math.floor(totalExpectedDays - age.totalDays));
  const lifePercentage = Math.min(100, (age.totalDays / totalExpectedDays) * 100);
  const weeksLived = Math.floor(age.totalDays / 7);
  const weeksTotal = LIFE_EXPECTANCY_YEARS * WEEKS_PER_YEAR;

  // Stats extra
  const sleepHours = age.totalDays * SLEEP_HOURS_PER_DAY;
  const sleepYears = sleepHours / (365.25 * 24);
  const mealsEaten = age.totalDays * MEALS_PER_DAY;
  const waterLiters = age.totalDays * WATER_LITERS_PER_DAY;
  const stepsWalked = age.totalDays * STEPS_PER_DAY;
  const distanceWalkedKm = stepsWalked * STEP_LENGTH_KM;
  const laughs = age.totalDays * LAUGHS_PER_DAY;
  const dreams = age.totalDays * DREAMS_PER_NIGHT;
  const fullMoons = Math.floor(age.totalDays / 29.53); // Ciclo lunar ~29.53 días
  const sunrises = age.totalDays;

  // Fun facts
  const funFacts = generateFunFactsData(age.totalDays, heartbeats, distanceTraveledKm, age.years);

  return {
    years: age.years,
    months: age.months,
    days: age.days,
    hours: age.hours,
    minutes: age.minutes,
    seconds: age.seconds,
    totalDays: age.totalDays,
    heartbeats,
    breaths,
    blinks,
    distanceTraveledKm,
    daysLived: age.totalDays,
    daysRemaining,
    lifePercentage,
    weeksLived,
    weeksTotal,
    sleepHours,
    sleepYears,
    mealsEaten,
    waterLiters,
    stepsWalked,
    distanceWalkedKm,
    laughs,
    dreams,
    fullMoons,
    sunrises,
    funFacts,
  };
}

/**
 * Formatea un número grande con separadores de miles para mejor legibilidad.
 * Ejemplo: 1234567 → "1,234,567"
 */
export function formatNumber(num: number): string {
  return Math.floor(num).toLocaleString("en-US");
}

/**
 * Formatea un número muy grande de forma compacta.
 * Ejemplo: 2500000000 → "2.5B"
 */
export function formatCompact(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K";
  }
  return num.toFixed(0);
}
