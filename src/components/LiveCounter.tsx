/**
 * LiveCounter.tsx - Contador en vivo de segundos vividos
 *
 * Muestra la edad exacta en segundos actualizándose en tiempo real,
 * creando un efecto visual impactante de "tu vida avanzando".
 */
"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n-context";

interface LiveCounterProps {
  /** Fecha de nacimiento en formato ISO */
  birthDate: string;
}

export default function LiveCounter({ birthDate }: LiveCounterProps) {
  const [seconds, setSeconds] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    const birth = new Date(birthDate + "T00:00:00");

    const updateCounter = () => {
      const now = new Date();
      const diffMs = now.getTime() - birth.getTime();
      setSeconds(Math.floor(diffMs / 1000));
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);

    return () => clearInterval(interval);
  }, [birthDate]);

  const formattedSeconds = seconds.toLocaleString("en-US");

  return (
    <div className="glass-card p-6 md:p-8 text-center glow animate-fade-in-up">
      <p className="text-sm text-white/50 uppercase tracking-wider mb-3">{t.liveCounter.prefix}</p>
      <div className="text-4xl md:text-6xl font-bold font-mono gradient-text leading-tight">
        {formattedSeconds}
      </div>
      <p className="text-lg text-white/60 mt-2">{t.liveCounter.suffix}</p>
      <div className="mt-3 flex justify-center">
        <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="ml-2 text-xs text-green-400/60">{t.liveCounter.live}</span>
      </div>
    </div>
  );
}
