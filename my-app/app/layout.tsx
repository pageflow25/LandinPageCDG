import type { Metadata } from "next";
import localFont from "next/font/local";
import { AosProvider } from "@/components/AosProvider";
import "./globals.css";

/**
 * Tipografia do Manual de Marca - Educação ComVida
 * 
 * - Primária: Bricolage Grotesque (títulos, headlines, CTAs)
 * - Secundária: Sora (corpo de texto, descrições)
 * - Apoio: Caveat (destaques manuscritos, badges)
 */

// Fonte primária - Títulos e headlines
const bricolage = localFont({
  src: "../fonts/Bricolage_Grotesque/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf",
  variable: "--font-bricolage",
  display: "swap",
});

// Fonte secundária - Corpo de texto
const sora = localFont({
  src: "../fonts/Sora/Sora-VariableFont_wght.ttf",
  variable: "--font-sora",
  display: "swap",
});

// Fonte de apoio - Destaques manuscritos
const caveat = localFont({
  src: "../fonts/Caveat/Caveat-VariableFont_wght.ttf",
  variable: "--font-caveat",
  display: "swap",
});

// SEO metadata
export const metadata: Metadata = {
  title: "Educação ComVida | Programa de Indicação Casa da Gráfica",
  description:
    "Indique novos clientes para a Casa da Gráfica e seja recompensado. Educação que conecta, indicações que geram valor.",
  keywords: [
    "programa de indicação",
    "Casa da Gráfica",
    "recompensas",
    "indicar clientes",
  ],
  icons: {
    icon: "https://ik.imagekit.io/pageflow/Educa%C3%A7%C3%A3o-ComVida/edcomvida2.svg",
  },
  openGraph: {
    title: "Educação ComVida | Programa de Indicação",
    description: "Indique novos clientes e seja recompensado.",
    type: "website",
  },
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("crm-theme");
    var isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${bricolage.variable} ${sora.variable} ${caveat.variable} antialiased bg-azul-principal`}
      >
        <AosProvider />
        {children}
      </body>
    </html>
  );
}
