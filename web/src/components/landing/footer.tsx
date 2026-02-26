import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-100 px-4 py-12 dark:border-neutral-800/50 dark:bg-neutral-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm font-medium text-neutral-900 dark:text-white">Nox Corretores</p>
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            Cadastro
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-7xl">
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-500 sm:text-left">
          © {year} Nox Corretores. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
