/**
 * LifeGrid.tsx - Canvas-based Life in Weeks visualization
 *
 * Ultra-performant: renders all 4160 cells on a single <canvas> element
 * instead of 4160+ DOM nodes. Decade labels are overlaid via CSS.
 *
 * Responsive: canvas fills available width. Cells auto-scale.
 * Minimal DOM: ~10 nodes total instead of thousands.
 *
 * Inspired by: "Your Life in Weeks" by Wait But Why
 */
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useI18n } from "@/lib/i18n-context";

interface LifeGridProps {
  weeksLived: number;
  weeksTotal: number;
  lifePercentage: number;
}

const COLS = 52;
const ROWS = 80;
const DECADES = [0, 10, 20, 30, 40, 50, 60, 70];
const GAP = 1; // px gap between cells
const DECADE_GAP = 4; // extra px gap between decades
const LABEL_WIDTH_DESKTOP = 52; // px for decade labels on desktop
const LABEL_WIDTH_MOBILE = 38;

/** Color constants */
const COLOR_LIVED_START = [139, 92, 246]; // #8b5cf6
const COLOR_LIVED_END = [236, 72, 153]; // #ec4899
const COLOR_REMAINING = "rgba(255,255,255,0.06)";
const COLOR_HERE = "#22d3ee";

function lerpColor(c1: number[], c2: number[], t: number): string {
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
  return `rgb(${r},${g},${b})`;
}

export default function LifeGrid({ weeksLived, weeksTotal, lifePercentage }: LifeGridProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const animatedWeeksRef = useRef(0);
  const { t } = useI18n();

  const currentYear = Math.floor(weeksLived / COLS);
  const currentWeekInYear = weeksLived % COLS;

  // Intersection Observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /** Core canvas render function */
  const drawGrid = useCallback(
    (filledWeeks: number, pulsePhase: number) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const dpr = window.devicePixelRatio || 1;
      const isMobile = window.innerWidth < 640;
      const labelW = isMobile ? LABEL_WIDTH_MOBILE : LABEL_WIDTH_DESKTOP;

      // Compute available width for the grid area
      const containerW = container.clientWidth - (isMobile ? 32 : 64); // subtract padding
      const gridAreaW = containerW - labelW - 8;

      // Compute cell size — cap at MAX_CELL to keep the classic "tiny grid" look
      const MAX_CELL = isMobile ? 5 : 8;
      const cellSize = Math.min(
        MAX_CELL,
        Math.max(2, Math.floor((gridAreaW - (COLS - 1) * GAP) / COLS)),
      );
      const actualGridW = cellSize * COLS + (COLS - 1) * GAP;

      // Compute canvas height
      const rowH = cellSize + GAP;
      const decadeH = 10 * rowH - GAP;
      const totalH = 8 * decadeH + 7 * DECADE_GAP;

      const canvasW = labelW + 8 + actualGridW;
      const canvasH = totalH;

      canvas.width = canvasW * dpr;
      canvas.height = canvasH * dpr;
      canvas.style.width = `${canvasW}px`;
      canvas.style.height = `${canvasH}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, canvasW, canvasH);

      // Draw decade labels
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      const fontSize = isMobile ? 9 : 11;
      ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;

      const gridX = labelW + 8;

      let yOffset = 0;
      for (let d = 0; d < DECADES.length; d++) {
        const startYear = DECADES[d];
        const decadeY = yOffset;
        const dH = decadeH;

        // Label centered vertically in the decade block
        ctx.fillStyle = "rgba(255,255,255,0.45)";
        const labelText = `${startYear}y-${startYear + 10}y`;
        ctx.fillText(labelText, labelW, decadeY + dH / 2 - fontSize / 2);

        // Draw 10 years of cells
        for (let yr = 0; yr < 10; yr++) {
          const year = startYear + yr;
          const rowY = decadeY + yr * rowH;

          for (let w = 0; w < COLS; w++) {
            const globalWeek = year * COLS + w;
            const cx = gridX + w * (cellSize + GAP);
            const cy = rowY;

            const isHere = year === currentYear && w === currentWeekInYear;

            if (isHere) {
              // Pulsing "you are here" marker
              const glow = 3 + 3 * Math.sin(pulsePhase);
              ctx.shadowColor = COLOR_HERE;
              ctx.shadowBlur = glow;
              ctx.fillStyle = COLOR_HERE;
              ctx.beginPath();
              ctx.arc(cx + cellSize / 2, cy + cellSize / 2, cellSize / 2 + 0.5, 0, Math.PI * 2);
              ctx.fill();
              ctx.shadowBlur = 0;
            } else if (globalWeek < filledWeeks) {
              // Lived cell — gradient from purple to pink based on progress
              const progress = globalWeek / (ROWS * COLS);
              ctx.fillStyle = lerpColor(COLOR_LIVED_START, COLOR_LIVED_END, progress);
              ctx.fillRect(cx, cy, cellSize, cellSize);
            } else {
              // Remaining cell
              ctx.fillStyle = COLOR_REMAINING;
              ctx.fillRect(cx, cy, cellSize, cellSize);
            }
          }
        }

        yOffset += decadeH + DECADE_GAP;
      }
    },
    [currentYear, currentWeekInYear],
  );

  /** Animation loop: fill-in animation + pulsing marker */
  useEffect(() => {
    if (!isVisible) return;

    const target = Math.min(weeksLived, ROWS * COLS);
    const animDuration = 1800; // ms for fill animation
    let startTime: number | null = null;
    let done = false;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (!done) {
        const progress = Math.min(elapsed / animDuration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
        animatedWeeksRef.current = Math.floor(target * eased);
        if (progress >= 1) done = true;
      }

      const pulsePhase = (timestamp / 400) % (Math.PI * 2);
      drawGrid(animatedWeeksRef.current, pulsePhase);

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isVisible, weeksLived, drawGrid]);

  /** Resize handler — redraw on window resize */
  useEffect(() => {
    if (!isVisible) return;

    const handleResize = () => {
      drawGrid(animatedWeeksRef.current, 0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isVisible, drawGrid]);

  return (
    <div
      ref={containerRef}
      className={`glass-card p-4 sm:p-6 md:p-8 opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
    >
      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{t.lifeGrid.title}</h3>
      <p className="text-sm text-white/50 mb-1">
        {t.lifeGrid.description(weeksLived.toLocaleString(), weeksTotal.toLocaleString())}
      </p>
      <p className="text-xs text-white/30 mb-5">{t.lifeGrid.weeksPerYear}</p>

      {/* Life progress bar */}
      <div className="mb-5">
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

      {/* Canvas grid — single element, zero DOM overhead */}
      <div className="flex justify-center">
        <canvas ref={canvasRef} style={{ imageRendering: "pixelated" }} />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-4 text-xs text-white/40">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
          />
          <span>{t.lifeGrid.weeksLived}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ background: "rgba(255,255,255,0.08)" }} />
          <span>{t.lifeGrid.weeksRemaining}</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "#22d3ee", boxShadow: "0 0 6px rgba(34,211,238,0.6)" }}
          />
          <span>{t.lifeGrid.youAreHere}</span>
        </div>
      </div>
    </div>
  );
}
