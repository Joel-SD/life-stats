/**
 * ShareableCard.tsx - Tarjeta para redes sociales (Instagram Story)
 *
 * Formato 1080×1920 (9:16) — Instagram/TikTok Story.
 * Se renderiza fuera de pantalla y html2canvas la captura.
 *
 * NOTA: html2canvas NO soporta background-clip:text, así que
 * el título usa color sólido en lugar de gradiente de texto.
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
    {
      emoji: "💓",
      label: t.shareableCard.heartbeats,
      value: formatCompact(stats.heartbeats),
      color: "#f472b6",
    },
    {
      emoji: "🌬️",
      label: t.shareableCard.breaths,
      value: formatCompact(stats.breaths),
      color: "#22d3ee",
    },
    {
      emoji: "🌍",
      label: t.shareableCard.spaceKm,
      value: formatCompact(stats.distanceTraveledKm),
      color: "#a78bfa",
    },
    {
      emoji: "☀️",
      label: t.shareableCard.daysLived,
      value: formatNumber(stats.daysLived),
      color: "#fbbf24",
    },
    {
      emoji: "😴",
      label: t.shareableCard.sleepYears,
      value: stats.sleepYears.toFixed(1),
      color: "#818cf8",
    },
    {
      emoji: "🌕",
      label: t.shareableCard.fullMoons,
      value: formatNumber(stats.fullMoons),
      color: "#f9a8d4",
    },
  ];

  return (
    <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
      <div
        id="shareable-card"
        style={{
          width: "1080px",
          height: "1920px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
          color: "white",
        }}
      >
        {/* === Background === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(165deg, #0a0118 0%, #1a0533 25%, #12062e 50%, #0c1445 75%, #071130 100%)",
          }}
        />
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(139,92,246,0.35), transparent 65%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "300px",
            left: "-120px",
            width: "450px",
            height: "450px",
            background: "radial-gradient(circle, rgba(236,72,153,0.25), transparent 65%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            right: "-80px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(6,182,212,0.2), transparent 65%)",
            borderRadius: "50%",
          }}
        />

        {/* === Content === */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "80px 60px 56px",
          }}
        >
          {/* ── Title ── */}
          {/* html2canvas can't do background-clip:text, so use solid color */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              letterSpacing: "-2px",
              color: "#e0b3ff",
              lineHeight: 1.1,
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            ✨ Life Stats ✨
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "rgba(255,255,255,0.4)",
              fontWeight: 300,
              textAlign: "center",
              marginBottom: "56px",
            }}
          >
            {t.shareableCard.born} {birthFormatted}
          </div>

          {/* ── Stats Grid: 2×3 ── */}
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
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: "28px",
                  padding: "24px 16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "10px", lineHeight: 1 }}>
                  {item.emoji}
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    color: "rgba(255,255,255,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "2.5px",
                    fontWeight: 700,
                    marginBottom: "12px",
                    textAlign: "center",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "52px",
                    fontWeight: 900,
                    color: item.color,
                    letterSpacing: "-2px",
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* ── Life Progress ── */}
          <div style={{ marginTop: "44px", marginBottom: "28px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "22px",
                color: "rgba(255,255,255,0.35)",
                marginBottom: "16px",
                fontWeight: 600,
              }}
            >
              <span>{t.shareableCard.lifeProgress}</span>
              <span style={{ color: "#c084fc", fontWeight: 900, fontSize: "28px" }}>
                {stats.lifePercentage.toFixed(1)}%
              </span>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "999px",
                height: "24px",
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

          {/* ── Age ── */}
          <div
            style={{
              textAlign: "center",
              fontSize: "30px",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 500,
              marginBottom: "36px",
            }}
          >
            {t.shareableCard.ageText(stats.years, stats.months, stats.days)}
          </div>

          {/* ── Watermark ── */}
          <div
            style={{
              textAlign: "center",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: "24px",
              fontSize: "22px",
              color: "rgba(255,255,255,0.2)",
              fontWeight: 500,
              letterSpacing: "0.5px",
            }}
          >
            {t.shareableCard.watermark}
          </div>
        </div>
      </div>
    </div>
  );
}
