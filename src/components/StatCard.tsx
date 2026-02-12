/**
 * StatCard.tsx - Componente reutilizable para mostrar una estadística
 *
 * Muestra un número grande con animación de conteo, un label descriptivo,
 * un emoji y opcionalmente una descripción adicional.
 */
"use client";

import { useEffect, useState, useRef } from "react";

interface StatCardProps {
  /** Valor numérico a mostrar */
  value: number;
  /** Texto descriptivo de la estadística */
  label: string;
  /** Emoji o icono que acompaña la stat */
  icon: string;
  /** Descripción extra opcional */
  description?: string;
  /** Formato del número: 'full' para completo, 'compact' para abreviado */
  format?: "full" | "compact";
  /** Sufijo opcional (ej: "km", "%", "years") */
  suffix?: string;
  /** Clase CSS adicional para el delay de animación */
  delay?: string;
  /** Color de acento para el borde superior */
  accentColor?: "purple" | "pink" | "cyan" | "green" | "orange";
}

/**
 * Formatea un número según el formato especificado
 */
function formatValue(value: number, format: "full" | "compact"): string {
  if (format === "compact") {
    if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + "B";
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
    if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
    return value.toFixed(0);
  }
  return Math.floor(value).toLocaleString("en-US");
}

/**
 * Mapa de colores de acento para el borde superior de las cards
 */
const accentColors = {
  purple: "border-t-purple-500",
  pink: "border-t-pink-500",
  cyan: "border-t-cyan-500",
  green: "border-t-emerald-500",
  orange: "border-t-orange-500",
};

export default function StatCard({
  value,
  label,
  icon,
  description,
  format = "full",
  suffix = "",
  delay = "",
  accentColor = "purple",
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para detectar cuándo la card es visible
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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animación de conteo cuando la card se hace visible
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 segundos
    const steps = 60;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Easing: empieza rápido, termina lento
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      current = value * eased;

      setDisplayValue(current);

      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={cardRef}
      className={`glass-card p-6 border-t-2 ${accentColors[accentColor]} 
                  opacity-0 ${isVisible ? "animate-fade-in-up" : ""} ${delay}
                  hover:bg-white/10 transition-all duration-300 cursor-default
                  group`}
    >
      {/* Icono */}
      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Valor grande */}
      <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono tracking-tight">
        {formatValue(displayValue, format)}
        {suffix && <span className="text-lg md:text-xl text-white/60 ml-1">{suffix}</span>}
      </div>

      {/* Label */}
      <p className="text-sm text-white/60 font-medium uppercase tracking-wider">{label}</p>

      {/* Descripción extra */}
      {description && <p className="mt-2 text-xs text-white/40 leading-relaxed">{description}</p>}
    </div>
  );
}
