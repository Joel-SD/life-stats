/**
 * ShareButton.tsx - Botón para compartir estadísticas
 *
 * Genera una imagen bonita con html2canvas a partir del contenido
 * de la sección de stats y permite descargarlo o compartirlo.
 * Incluye marca de agua sutil con URL del sitio.
 */
"use client";

import { useState, useCallback } from "react";
import html2canvas from "html2canvas";
import { useI18n } from "@/lib/i18n-context";

interface ShareButtonProps {
  /** ID del elemento HTML a capturar */
  targetId: string;
  /** Nombre del archivo al descargar */
  fileName?: string;
}

export default function ShareButton({ targetId, fileName = "my-life-stats" }: ShareButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { t } = useI18n();

  /**
   * Genera la imagen a partir del elemento HTML especificado
   */
  const generateImage = useCallback(async (): Promise<string | null> => {
    const element = document.getElementById(targetId);
    if (!element) {
      console.error(`Element with id "${targetId}" not found`);
      return null;
    }

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#0a0a1a",
        scale: 2, // Alta resolución
        useCORS: true,
        logging: false,
        // Añadir padding
        x: 0,
        y: 0,
      });

      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error("Error generating image:", error);
      return null;
    }
  }, [targetId]);

  /**
   * Descarga la imagen generada
   */
  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const dataUrl = await generateImage();
      if (dataUrl) {
        const link = document.createElement("a");
        link.download = `${fileName}.png`;
        link.href = dataUrl;
        link.click();
      }
    } finally {
      setIsGenerating(false);
      setShowOptions(false);
    }
  };

  /**
   * Comparte usando la Web Share API (disponible en móviles)
   */
  const handleShare = async () => {
    setIsGenerating(true);
    try {
      const dataUrl = await generateImage();
      if (!dataUrl) return;

      // Convertir data URL a Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], `${fileName}.png`, { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: t.share.shareTitle,
          text: t.share.shareText,
          files: [file],
        });
      } else {
        // Fallback: copiar al portapapeles o descargar
        handleDownload();
      }
    } catch (error) {
      // Si el usuario cancela el share, no hacer nada
      if ((error as Error).name !== "AbortError") {
        console.error("Error sharing:", error);
        // Fallback a descarga
        handleDownload();
      }
    } finally {
      setIsGenerating(false);
      setShowOptions(false);
    }
  };

  /**
   * Copia el link del sitio al portapapeles
   */
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert(t.share.linkCopied);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert(t.share.linkCopied);
    }
    setShowOptions(false);
  };

  return (
    <div className="relative">
      {/* Botón principal */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        disabled={isGenerating}
        className="px-8 py-4 gradient-bg rounded-xl font-bold text-lg text-white
                   hover:opacity-90 active:scale-[0.98] transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed
                   shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
                   flex items-center gap-3"
      >
        {isGenerating ? (
          <>
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
            {t.share.generating}
          </>
        ) : (
          <>{t.share.shareButton}</>
        )}
      </button>

      {/* Menú de opciones */}
      {showOptions && !isGenerating && (
        <div className="absolute bottom-full left-0 mb-2 w-64 glass-card p-2 animate-fade-in z-50">
          <button
            onClick={handleDownload}
            className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 
                       rounded-lg transition-colors flex items-center gap-3"
          >
            {t.share.downloadImage}
          </button>
          <button
            onClick={handleShare}
            className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 
                       rounded-lg transition-colors flex items-center gap-3"
          >
            {t.share.shareToSocial}
          </button>
          <button
            onClick={handleCopyLink}
            className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 
                       rounded-lg transition-colors flex items-center gap-3"
          >
            {t.share.copyLink}
          </button>
          <hr className="border-white/10 my-1" />
          <button
            onClick={() => setShowOptions(false)}
            className="w-full px-4 py-3 text-left text-sm text-white/40 hover:bg-white/10 
                       rounded-lg transition-colors"
          >
            {t.share.cancel}
          </button>
        </div>
      )}
    </div>
  );
}
