/**
 * FunFacts.tsx - Fun facts aleatorios sobre tu vida
 *
 * Muestra datos curiosos y comparaciones interesantes
 * basados en la edad del usuario.
 */
"use client";

import { useEffect, useState, useRef } from "react";
import { FunFactData } from "@/lib/calculations";
import { useI18n } from "@/lib/i18n-context";

interface FunFactsProps {
  facts: FunFactData[];
}

export default function FunFacts({ facts }: FunFactsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Translate each fun fact using the key and value
  const translatedFacts = facts.map((fact) => {
    const translator = t.funFacts[fact.key as keyof typeof t.funFacts];
    if (typeof translator === "function") {
      return (translator as (n: string) => string)(fact.value);
    }
    return fact.value;
  });

  return (
    <div
      ref={ref}
      className={`glass-card p-6 md:p-8 opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
    >
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{t.funFacts.title}</h3>

      <div className="grid gap-3">
        {translatedFacts.map((fact, index) => (
          <div
            key={index}
            className={`p-4 bg-white/5 rounded-lg border border-white/5
                        hover:bg-white/10 transition-all duration-300
                        opacity-0 ${isVisible ? "animate-fade-in-up" : ""}
                        stagger-${index + 1}`}
          >
            <p className="text-white/80 text-sm md:text-base leading-relaxed">{fact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
