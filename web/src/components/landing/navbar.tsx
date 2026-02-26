import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-950/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          Nox Corretores
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
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
