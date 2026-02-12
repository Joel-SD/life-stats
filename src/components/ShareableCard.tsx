/**
 * ShareableCard.tsx - Tarjeta optimizada para redes sociales
 *
 * Diseño tipo "Instagram Story" / post viral.
 * Formato 1080×1350 (4:5, ideal para Instagram/Facebook feed).
 * Colores vibrantes, tipografía grande, datos impactantes.
 */
"use client";

import { LifeStats, formatNumber, formatCompact } from "@/lib/calculations";
import { useI18n } from "@/lib/i18n-context";

interface ShareableCardProps {
  stats: LifeStats;
  birthDate: string;
}

export default function ShareableCard({ stats, birthDate }: ShareableCardProps) {
  const { t, locale } = useI18n();

  const localeMap: Record<string, string> = {
    en: "en-US",
    es: "es-ES",
    pt: "pt-BR",
    hi: "hi-IN",
    fr: "fr-FR",
  };
  const dateLocale = localeMap[locale] || "en-US";

  const birthFormatted = new Date(birthDate + "T00:00:00").toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const statItems = [
    { emoji: "💓", label: t.shareableCard.heartbeats, value: formatCompact(stats.heartbeats), color: "#ec4899" },
    { emoji: "🌬️", label: t.shareableCard.breaths, value: formatCompact(stats.breaths), color: "#06b6d4" },
    { emoji: "🌍", label: t.shareableCard.spaceKm, value: formatCompact(stats.distanceTraveledKm), color: "#8b5cf6" },
    { emoji: "☀️", label: t.shareableCard.daysLived, value: formatNumber(stats.daysLived), color: "#f59e0b" },
    { emoji: "😴", label: t.shareableCard.sleepYears, value: stats.sleepYears.toFixed(1), color: "#6366f1" },
    { emoji: "🌕", label: t.shareableCard.fullMoons, value: formatNumber(stats.fullMoons), color: "#fbbf24" },
  ];

  return (
    <div className="overflow-hidden" style={{ height: 0 }}>
      <div
        id="shareable-card"
        style={{
          width: "1080px",
          height: "1350px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        {/* === Background === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, #0f0c29 0%, #1a0a3e 30%, #24243e 60%, #0f3460 100%)",
          }}
        />
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(236,72,153,0.25), transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* === Content Container === */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "60px 56px",
          }}
        >
          {/* Header: Title + Birth */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div
              style={{
                fontSize: "52px",
                fontWeight: 900,
                letterSpacing: "-1px",
                background: "linear-gradient(135deg, #a78bfa, #ec4899, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
                marginBottom: "16px",
              }}
            >
              {t.shareableCard.title}
            </div>
            <div
              style={{
                fontSize: "22px",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 300,
              }}
            >
              {t.shareableCard.born} {birthFormatted}
            </div>
          </div>

          {/* Stats Grid: 2 columns × 3 rows */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              flex: 1,
            }}
          >
            {statItems.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "24px",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div style={{ fontSize: "36px", marginBottom: "8px" }}>{item.emoji}</div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.45)",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    fontWeight: 600,
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "40px",
                    fontWeight: 900,
                    color: item.color,
                    letterSpacing: "-1px",
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Life Progress Bar */}
          <div style={{ margin: "36px 0 28px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "16px",
                color: "rgba(255,255,255,0.35)",
                marginBottom: "12px",
                fontWeight: 500,
              }}
            >
              <span>{t.shareableCard.lifeProgress}</span>
              <span
                style={{
                  color: "#a78bfa",
                  fontWeight: 800,
                  fontSize: "20px",
                }}
              >
                {stats.lifePercentage.toFixed(1)}%
              </span>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "999px",
                height: "16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4)",
                  height: "100%",
                  borderRadius: "999px",
                  width: `${Math.min(stats.lifePercentage, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Age line */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                color: "rgba(255,255,255,0.65)",
                fontWeight: 500,
              }}
            >
              {t.shareableCard.ageText(stats.years, stats.months, stats.days)}
            </span>
          </div>

          {/* Watermark / Branding */}
          <div
            style={{
              textAlign: "center",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "20px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                color: "rgba(255,255,255,0.25)",
                fontWeight: 500,
                letterSpacing: "0.5px",
              }}
            >
              {t.shareableCard.watermark}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
