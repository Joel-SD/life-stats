/**
 * page.tsx - Landing Page principal de Life Stats
 *
 * Página de inicio con un diseño atractivo que invita al usuario
 * a ingresar su fecha de nacimiento para ver sus estadísticas de vida.
 */
"use client";

import DateInput from "@/components/DateInput";
import { useI18n } from "@/lib/i18n-context";

export default function Home() {
  const { t } = useI18n();

  const teasers = [
    { icon: "❤️", label: t.landing.teaserHeartbeats },
    { icon: "🫁", label: t.landing.teaserBreaths },
    { icon: "🌍", label: t.landing.teaserSpace },
    { icon: "🗓️", label: t.landing.teaserWeeks },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
        <div className="text-6xl md:text-8xl mb-6 animate-float">{t.landing.heroEmoji}</div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
          <span className="gradient-text">{t.landing.title}</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/60 mb-2">
          {t.landing.subtitle}{" "}
          <span className="text-purple-400 font-semibold">{t.landing.subtitleHighlight}</span>
        </p>
        <p className="text-base md:text-lg text-white/40 max-w-xl mx-auto">
          {t.landing.description}
        </p>
      </div>

      {/* ============================================================
          DATE INPUT SECTION
          ============================================================ */}
      <div className="w-full max-w-md animate-fade-in-up stagger-2">
        <DateInput />
      </div>

      {/* ============================================================
          PREVIEW / TEASER STATS
          ============================================================ */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto animate-fade-in stagger-4">
        {teasers.map((item) => (
          <div
            key={item.label}
            className="glass-card p-4 text-center hover:bg-white/10 transition-all duration-300"
          >
            <div className="text-2xl mb-1">{item.icon}</div>
            <p className="text-xs text-white/40">{item.label}</p>
            <p className="text-lg font-bold text-white/20 font-mono">???</p>
          </div>
        ))}
      </div>

      {/* ============================================================
          FEATURES HIGHLIGHT
          ============================================================ */}
      <div className="mt-16 text-center max-w-2xl mx-auto animate-fade-in stagger-6">
        <div className="flex flex-wrap justify-center gap-3 text-sm text-white/30">
          {t.landing.features.map((feature) => (
            <span
              key={feature}
              className="px-3 py-1.5 bg-white/5 rounded-full border border-white/10
                         hover:bg-white/10 hover:text-white/50 transition-all duration-300"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
