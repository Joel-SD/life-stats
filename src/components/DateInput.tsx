/**
 * DateInput.tsx - Componente de entrada de fecha de nacimiento
 *
 * Componente principal de la landing page que permite al usuario
 * ingresar su fecha de nacimiento con un diseño atractivo y moderno.
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n-context";

export default function DateInput() {
  const [birthDate, setBirthDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!birthDate) {
      setError(t.dateInput.errorEmpty);
      return;
    }

    // Validar que la fecha no sea futura
    const selectedDate = new Date(birthDate);
    const today = new Date();
    if (selectedDate > today) {
      setError(t.dateInput.errorFuture);
      return;
    }

    // Validar que la fecha sea razonable (no más de 150 años)
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 150);
    if (selectedDate < minDate) {
      setError(t.dateInput.errorInvalid);
      return;
    }

    setIsLoading(true);
    router.push(`/stats?birth=${birthDate}`);
  };

  // Calcular la fecha máxima (hoy) y mínima (150 años atrás)
  const today = new Date().toISOString().split("T")[0];
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 150);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="glass-card p-8 glow">
        <label
          htmlFor="birthdate"
          className="block text-sm font-medium text-white/60 mb-3 uppercase tracking-wider"
        >
          {t.dateInput.label}
        </label>

        {/* Input de fecha */}
        <input
          type="date"
          id="birthdate"
          value={birthDate}
          onChange={(e) => {
            setBirthDate(e.target.value);
            setError("");
          }}
          max={today}
          min={minDateStr}
          className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl 
                     text-white text-lg text-center font-mono
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50
                     transition-all duration-300 placeholder-white/30
                     hover:bg-white/15 cursor-pointer
                     [color-scheme:dark]"
          required
        />

        {/* Mensaje de error */}
        {error && (
          <p className="mt-3 text-red-400 text-sm text-center animate-fade-in">⚠️ {error}</p>
        )}

        {/* Botón submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 px-8 py-4 gradient-bg rounded-xl font-bold text-lg text-white
                     hover:opacity-90 active:scale-[0.98] transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
                     animate-pulse-glow"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {t.dateInput.loading}
            </span>
          ) : (
            t.dateInput.submit
          )}
        </button>

        {/* Nota de privacidad */}
        <p className="mt-4 text-xs text-white/30 text-center">{t.dateInput.privacy}</p>
      </div>
    </form>
  );
}
