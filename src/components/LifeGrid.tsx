/**
 * LifeGrid.tsx - Cuadrícula de semanas de vida (Rediseñada)
 *
 * Visualización icónica: muestra CADA semana de una vida de 80 años
 * organizada por décadas. Cada fila = 1 año, cada columna = 1 semana.
 * Las semanas vividas se muestran en color y las restantes en gris,
 * con un indicador claro de "estás aquí".
 *
 * Inspirada en: "Your Life in Weeks" de Wait But Why
 */
"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useI18n } from "@/lib/i18n-context";

interface LifeGridProps {
  /** Semanas vividas */
  weeksLived: number;
  /** Total de semanas (80 años × 52 semanas = 4160) */
  weeksTotal: number;
  /** Porcentaje de vida vivida */
  lifePercentage: number;
}

const COLS = 52; // 52 semanas por año
const ROWS = 80; // 80 años de expectativa
const DECADES = [0, 10, 20, 30, 40, 50, 60, 70];

export default function LifeGrid({ weeksLived, weeksTotal, lifePercentage }: LifeGridProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedWeeks, setAnimatedWeeks] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  const currentYear = Math.floor(weeksLived / COLS);
  const currentWeekInYear = weeksLived % COLS;

  // Intersection Observer para activar la animación
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animación progresiva de llenado
  useEffect(() => {
    if (!isVisible) return;

    const totalCells = ROWS * COLS;
    const target = Math.min(weeksLived, totalCells);
    const duration = 2000;
    const steps = 50;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 2);
      setAnimatedWeeks(Math.floor(target * eased));

      if (step >= steps) {
        setAnimatedWeeks(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, weeksLived]);

  // Pre-compute decades
  const decades = useMemo(
    () =>
      DECADES.map((startYear) => ({
        startYear,
        endYear: startYear + 10,
        years: Array.from({ length: 10 }, (_, i) => startYear + i),
      })),
    [],
  );

  return (
    <div
      ref={gridRef}
      className={`glass-card p-6 md:p-8 opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
    >
      {/* Título de la sección */}
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{t.lifeGrid.title}</h3>
      <p className="text-sm text-white/50 mb-1">
        {t.lifeGrid.description(weeksLived.toLocaleString(), weeksTotal.toLocaleString())}
      </p>
      <p className="text-xs text-white/30 mb-6">{t.lifeGrid.weeksPerYear}</p>

      {/* Barra de progreso de vida */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-white/40 mb-2">
          <span>{t.lifeGrid.born}</span>
          <span className="text-purple-400 font-mono font-bold">{lifePercentage.toFixed(1)}%</span>
          <span>{t.lifeGrid.eightyYears}</span>
        </div>
        <div className="progress-bar h-3">
          <div
            className="progress-bar-fill h-full"
            style={{
              width: isVisible ? `${Math.min(lifePercentage, 100)}%` : "0%",
            }}
          />
        </div>
      </div>

      {/* Cuadrícula organizada por décadas */}
      <div className="space-y-1">
        {decades.map(({ startYear, endYear, years }) => (
          <div key={startYear} className="life-grid-decade">
            {/* Label de la década */}
            <div className="life-grid-decade-label">
              <span className="text-[10px] md:text-xs font-semibold text-white/60 whitespace-nowrap">
                {t.lifeGrid.yearLabel(startYear)}-{t.lifeGrid.yearLabel(endYear)}
              </span>
            </div>

            {/* Filas de años dentro de la década */}
            <div className="flex-1 min-w-0">
              <div className="space-y-px">
                {years.map((year) => {
                  const yearStartWeek = year * COLS;
                  const isCurrentYear = year === currentYear;

                  return (
                    <div key={year} className="flex items-center gap-px">
                      {Array.from({ length: COLS }, (_, weekIdx) => {
                        const globalWeek = yearStartWeek + weekIdx;
                        const isLived = globalWeek < animatedWeeks;
                        const isHereMarker = isCurrentYear && weekIdx === currentWeekInYear;

                        return (
                          <div
                            key={weekIdx}
                            className={`life-grid-cell ${
                              isLived ? "lived" : "remaining"
                            } ${isHereMarker ? "here-marker" : ""}`}
                            title={`Week ${weekIdx + 1}, Year ${year + 1}`}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-5 text-xs text-white/40">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm life-grid-cell lived" />
          <span>{t.lifeGrid.weeksLived}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm life-grid-cell remaining" />
          <span>{t.lifeGrid.weeksRemaining}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm life-grid-cell here-marker" />
          <span>{t.lifeGrid.youAreHere}</span>
        </div>
      </div>
    </div>
  );
}
