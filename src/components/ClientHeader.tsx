/**
 * ClientHeader.tsx - Header con selector de idioma
 *
 * Componente client-side para el header global con el LanguageSwitcher.
 */
"use client";

import LanguageSwitcher from "./LanguageSwitcher";

export default function ClientHeader() {
  return (
    <header className="relative z-50 w-full">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-end">
        <LanguageSwitcher />
      </div>
    </header>
  );
}
