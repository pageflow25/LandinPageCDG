import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Fonte institucional - Inter para legibilidade e modernidade
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
  openGraph: {
    title: "Educação ComVida | Programa de Indicação",
    description: "Indique novos clientes e seja recompensado.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
