import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n-context";
import ClientFooter from "@/components/ClientFooter";
import ClientHeader from "@/components/ClientHeader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Life Stats - Your Life in Numbers | See Your Life Statistics",
  description:
    "Discover surprising statistics about your life. See your age in seconds, heartbeats, and more. Share your life stats!",
  keywords: [
    "life stats",
    "age calculator",
    "life statistics",
    "heartbeats",
    "life in numbers",
    "age in seconds",
    "life visualization",
  ],
  openGraph: {
    title: "Life Stats - Your Life in Numbers",
    description:
      "Discover surprising statistics about your life. See your age in seconds, heartbeats, and more!",
    type: "website",
    locale: "en_US",
    siteName: "Life Stats",
  },
  twitter: {
    card: "summary_large_image",
    title: "Life Stats - Your Life in Numbers",
    description:
      "Discover surprising statistics about your life. See your age in seconds, heartbeats, and more!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <I18nProvider>
          {/* Fondo de estrellas decorativo */}
          <div className="bg-stars" />

          {/* Header con selector de idioma */}
          <ClientHeader />

          {/* Contenido principal */}
          <main className="relative z-10">{children}</main>

          {/* Footer global traducido */}
          <ClientFooter />
        </I18nProvider>
      </body>
    </html>
  );
}
