"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200/50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800/50 dark:bg-neutral-950/80 dark:supports-[backdrop-filter]:bg-neutral-950/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-neutral-900 transition-opacity hover:opacity-90 dark:text-white"
        >
          Nox Corretores
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#9333ea] px-5 text-sm font-semibold text-white shadow-lg shadow-[#9333ea]/25 transition-all hover:bg-[#7e22ce] hover:shadow-[#9333ea]/30 active:bg-[#6b21a8]"
          >
            Cadastrar
          </Link>
        </div>
      </nav>
    </header>
  );
}
