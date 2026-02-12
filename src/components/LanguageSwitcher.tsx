/**
 * LanguageSwitcher.tsx - Selector de idioma
 *
 * Componente que permite al usuario cambiar entre los 5 idiomas soportados.
 * Se muestra como un dropdown compacto con banderas.
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n-context";
import { LOCALES } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-50">
      {/* Botón del selector */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 
                   rounded-lg hover:bg-white/10 transition-all duration-200 text-sm text-white/70"
        aria-label="Select language"
      >
        <span className="text-base">{currentLocale.flag}</span>
        <span className="hidden sm:inline">{currentLocale.label}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown con opciones */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 glass-card p-1 animate-fade-in">
          {LOCALES.map((loc) => (
            <button
              key={loc.code}
              onClick={() => {
                setLocale(loc.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                          transition-all duration-200
                          ${
                            loc.code === locale
                              ? "bg-purple-500/20 text-white"
                              : "text-white/60 hover:bg-white/10 hover:text-white"
                          }`}
            >
              <span className="text-lg">{loc.flag}</span>
              <span>{loc.label}</span>
              {loc.code === locale && <span className="ml-auto text-purple-400">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
