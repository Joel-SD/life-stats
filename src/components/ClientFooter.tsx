/**
 * ClientFooter.tsx - Footer global traducido
 *
 * Componente client-side para el footer con traducciones.
 */
"use client";

import { useI18n } from "@/lib/i18n-context";

export default function ClientFooter() {
  const { t } = useI18n();

  return (
    <footer className="relative z-10 border-t border-white/5 py-8 text-center text-sm text-white/30">
      <div className="max-w-4xl mx-auto px-4">
        <p className="gradient-text font-bold text-lg mb-2">Life Stats</p>
        <p>{t.footer.tagline}</p>
        <p className="mt-2">
          {t.footer.madeWith} |{" "}
          <a href="#" className="hover:text-white/60 transition-colors underline">
            {t.footer.shareWithFriends}
          </a>
        </p>
      </div>
    </footer>
  );
}
