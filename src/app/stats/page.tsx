/**
 * stats/page.tsx - Página de resultados de Life Stats
 *
 * Esta página recibe la fecha de nacimiento como query parameter,
 * calcula todas las estadísticas y las muestra usando StatsDisplay.
 *
 * Ruta: /stats?birth=YYYY-MM-DD
 */
"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import { calculateLifeStats } from "@/lib/calculations";
import { useI18n } from "@/lib/i18n-context";
import StatsDisplay from "@/components/StatsDisplay";
import Link from "next/link";

function StatsContent() {
  const searchParams = useSearchParams();
  const birthDate = searchParams.get("birth");
  const { t } = useI18n();

  // Calcular estadísticas (memoizado para evitar recálculos innecesarios)
  const stats = useMemo(() => {
    if (!birthDate) return null;

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(birthDate)) return null;

    const date = new Date(birthDate + "T00:00:00");
    if (isNaN(date.getTime())) return null;

    if (date > new Date()) return null;

    return calculateLifeStats(birthDate);
  }, [birthDate]);

  // Si no hay fecha válida, mostrar error
  if (!birthDate || !stats) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center glass-card p-12 max-w-md">
          <div className="text-6xl mb-6">🤔</div>
          <h1 className="text-2xl font-bold text-white mb-4">{t.stats.noDateTitle}</h1>
          <p className="text-white/50 mb-8">{t.stats.noDateDescription}</p>
          <Link
            href="/"
            className="inline-block px-8 py-4 gradient-bg rounded-xl font-bold text-lg text-white
                       hover:opacity-90 transition-all duration-300
                       shadow-lg shadow-purple-500/25"
          >
            {t.stats.goBack}
          </Link>
        </div>
      </div>
    );
  }

  return <StatsDisplay stats={stats} birthDate={birthDate} />;
}

export default function StatsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-float">🧬</div>
            <p className="text-white/50 text-lg">
              <StatsLoadingText />
            </p>
            <div className="mt-4 w-48 h-1 mx-auto progress-bar">
              <div className="progress-bar-fill h-full" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      }
    >
      <StatsContent />
    </Suspense>
  );
}

function StatsLoadingText() {
  const { t } = useI18n();
  return <>{t.stats.loadingMessage}</>;
}
