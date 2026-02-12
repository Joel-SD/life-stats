/**
 * StatsDisplay.tsx - Componente principal de visualización de estadísticas
 *
 * Orquesta la presentación de TODAS las estadísticas de vida,
 * incluyendo el contador en vivo, las cards de stats, la cuadrícula
 * de semanas, fun facts y el botón de compartir.
 *
 * Este componente recibe los stats calculados y los distribuye
 * en los sub-componentes correspondientes.
 */
"use client";

import { LifeStats } from "@/lib/calculations";
import { useI18n } from "@/lib/i18n-context";
import Link from "next/link";
import StatCard from "./StatCard";
import LifeGrid from "./LifeGrid";
import LiveCounter from "./LiveCounter";
import FunFacts from "./FunFacts";
import ShareButton from "./ShareButton";
import ShareableCard from "./ShareableCard";

interface StatsDisplayProps {
  stats: LifeStats;
  birthDate: string;
}

export default function StatsDisplay({ stats, birthDate }: StatsDisplayProps) {
  const { t, locale } = useI18n();

  // Format birth date using locale
  const localeMap: Record<string, string> = {
    en: "en-US",
    es: "es-ES",
    pt: "pt-BR",
    hi: "hi-IN",
    fr: "fr-FR",
  };
  const dateLocale = localeMap[locale] || "en-US";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* ============================================================
          SECCIÓN 1: Header con edad y contador en vivo
          ============================================================ */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold">
          <span className="gradient-text">{t.stats.title}</span>
        </h1>
        <p className="text-white/50 text-lg">
          {t.stats.bornOn}{" "}
          <span className="text-white/80 font-semibold">
            {new Date(birthDate + "T00:00:00").toLocaleDateString(dateLocale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>{" "}
          {t.stats.youAre}{" "}
          <span className="text-purple-400 font-semibold">
            {t.stats.yearsMonthsDays(stats.years, stats.months, stats.days)}
          </span>{" "}
          {t.stats.old}
        </p>
      </section>

      {/* ============================================================
          SECCIÓN 2: Contador en vivo de segundos
          ============================================================ */}
      <section>
        <LiveCounter birthDate={birthDate} />
      </section>

      {/* ============================================================
          AD SPACE - Espacio para anuncio (futuro)
          ============================================================ */}
      {/* <div className="ad-space">Ad Space - Top Banner</div> */}

      {/* ============================================================
          SECCIÓN 3: Cards de estadísticas principales
          ============================================================ */}
      <section>
        <h2 className="text-xl font-bold text-white/80 mb-4">{t.bodyStats.sectionTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            icon="❤️"
            value={stats.heartbeats}
            label={t.bodyStats.heartbeats}
            description={t.bodyStats.heartbeatsDesc}
            format="compact"
            accentColor="pink"
            delay="stagger-1"
          />
          <StatCard
            icon="🫁"
            value={stats.breaths}
            label={t.bodyStats.breaths}
            description={t.bodyStats.breathsDesc}
            format="compact"
            accentColor="cyan"
            delay="stagger-2"
          />
          <StatCard
            icon="👁️"
            value={stats.blinks}
            label={t.bodyStats.blinks}
            description={t.bodyStats.blinksDesc}
            format="compact"
            accentColor="purple"
            delay="stagger-3"
          />
          <StatCard
            icon="😴"
            value={stats.sleepYears}
            label={t.bodyStats.sleepYears}
            description={t.bodyStats.sleepYearsDesc(Math.floor(stats.sleepHours).toLocaleString())}
            format="full"
            suffix="years"
            accentColor="purple"
            delay="stagger-4"
          />
          <StatCard
            icon="🍽️"
            value={stats.mealsEaten}
            label={t.bodyStats.meals}
            description={t.bodyStats.mealsDesc}
            format="full"
            accentColor="orange"
            delay="stagger-5"
          />
          <StatCard
            icon="💧"
            value={stats.waterLiters}
            label={t.bodyStats.water}
            description={t.bodyStats.waterDesc}
            format="full"
            suffix="L"
            accentColor="cyan"
            delay="stagger-6"
          />
        </div>
      </section>

      {/* ============================================================
          SECCIÓN 4: Viaje y movimiento
          ============================================================ */}
      <section>
        <h2 className="text-xl font-bold text-white/80 mb-4">{t.journey.sectionTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            icon="🌍"
            value={stats.distanceTraveledKm}
            label={t.journey.spaceKm}
            description={t.journey.spaceKmDesc}
            format="compact"
            suffix="km"
            accentColor="cyan"
            delay="stagger-1"
          />
          <StatCard
            icon="🚶"
            value={stats.distanceWalkedKm}
            label={t.journey.walked}
            description={t.journey.walkedDesc(Math.floor(stats.stepsWalked).toLocaleString())}
            format="full"
            suffix="km"
            accentColor="green"
            delay="stagger-2"
          />
          <StatCard
            icon="🌅"
            value={stats.sunrises}
            label={t.journey.sunrises}
            description={t.journey.sunrisesDesc}
            format="full"
            accentColor="orange"
            delay="stagger-3"
          />
          <StatCard
            icon="🌕"
            value={stats.fullMoons}
            label={t.journey.fullMoons}
            description={t.journey.fullMoonsDesc}
            format="full"
            accentColor="purple"
            delay="stagger-4"
          />
          <StatCard
            icon="😄"
            value={stats.laughs}
            label={t.journey.laughs}
            description={t.journey.laughsDesc}
            format="full"
            accentColor="pink"
            delay="stagger-5"
          />
          <StatCard
            icon="💭"
            value={stats.dreams}
            label={t.journey.dreams}
            description={t.journey.dreamsDesc}
            format="full"
            accentColor="purple"
            delay="stagger-6"
          />
        </div>
      </section>

      {/* ============================================================
          AD SPACE - Espacio para anuncio entre secciones (futuro)
          ============================================================ */}
      {/* <div className="ad-space">Ad Space - Mid Content</div> */}

      {/* ============================================================
          SECCIÓN 5: Life Grid - Tu vida en semanas
          ============================================================ */}
      <section>
        <LifeGrid
          weeksLived={stats.weeksLived}
          weeksTotal={stats.weeksTotal}
          lifePercentage={stats.lifePercentage}
        />
      </section>

      {/* ============================================================
          SECCIÓN 6: Tiempo restante (motivacional)
          ============================================================ */}
      <section className="glass-card p-6 md:p-8 text-center animate-fade-in-up">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{t.timePerspective.title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-2xl md:text-3xl font-bold text-purple-400 font-mono">
              {stats.daysLived.toLocaleString()}
            </p>
            <p className="text-xs text-white/50 mt-1">{t.timePerspective.daysLived}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-2xl md:text-3xl font-bold text-pink-400 font-mono">
              {stats.daysRemaining.toLocaleString()}
            </p>
            <p className="text-xs text-white/50 mt-1">{t.timePerspective.daysRemaining}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-2xl md:text-3xl font-bold text-cyan-400 font-mono">
              {stats.lifePercentage.toFixed(1)}%
            </p>
            <p className="text-xs text-white/50 mt-1">{t.timePerspective.lifeCompleted}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-2xl md:text-3xl font-bold text-emerald-400 font-mono">
              {(100 - stats.lifePercentage).toFixed(1)}%
            </p>
            <p className="text-xs text-white/50 mt-1">{t.timePerspective.lifeAhead}</p>
          </div>
        </div>
        <p className="text-xs text-white/30 mt-4">{t.timePerspective.disclaimer}</p>
      </section>

      {/* ============================================================
          SECCIÓN 7: Fun Facts
          ============================================================ */}
      <section>
        <FunFacts facts={stats.funFacts} />
      </section>

      {/* ============================================================
          SECCIÓN 8: Shareable Card (oculta, para captura)
          ============================================================ */}
      <ShareableCard stats={stats} birthDate={birthDate} />

      {/* ============================================================
          SECCIÓN 9: Botones de acción
          ============================================================ */}
      <section className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8">
        <ShareButton targetId="shareable-card" fileName="my-life-stats" />

        <Link
          href="/"
          className="px-8 py-4 border border-white/20 rounded-xl font-bold text-lg text-white/60
                     hover:bg-white/5 hover:text-white transition-all duration-300"
        >
          {t.share.tryAnother}
        </Link>
      </section>

      {/* ============================================================
          AD SPACE - Espacio para anuncio al final (futuro)
          ============================================================ */}
      {/* <div className="ad-space">Ad Space - Bottom Banner</div> */}
    </div>
  );
}
