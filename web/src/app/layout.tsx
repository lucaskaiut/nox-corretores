import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { ThemeScript } from "@/components/ui/theme-script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nox Corretores | Organize clientes, veículos e apólices",
  description:
    "Plataforma para corretores de seguros cadastrarem e organizarem clientes, veículos e apólices. Controle diário centralizado e produtividade em um só lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100`}
      >
        <ThemeScript />
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
