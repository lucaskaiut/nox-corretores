import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 sm:pt-40 sm:pb-28 lg:px-8 lg:pt-48 lg:pb-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(147,51,234,0.15),transparent)]" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl lg:text-6xl">
              Organize clientes, veículos e apólices em um só lugar
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400 sm:text-xl">
              Plataforma completa para corretores de seguros. Cadastre clientes,
              gerencie veículos e controle apólices com facilidade. Tudo
              centralizado para aumentar sua produtividade.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
              <Link
                href="/register"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-[#9333ea] px-8 text-base font-semibold text-white shadow-lg shadow-[#9333ea]/25 transition-all hover:bg-[#7e22ce] hover:shadow-[#9333ea]/30 hover:scale-[1.02] active:scale-[0.98] active:bg-[#6b21a8]"
              >
                Começar agora
              </Link>
              <Link
                href="/login"
                className="inline-flex h-14 items-center justify-center rounded-xl border border-neutral-400 bg-transparent px-8 text-base font-medium text-neutral-700 transition-all hover:border-neutral-500 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-white"
              >
                Já tenho conta
              </Link>
            </div>
          </div>
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900/50 dark:shadow-black/50">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-950">
                <div className="flex flex-col items-center gap-4 p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#9333ea]/20 text-[#9333ea]">
                    <svg
                      className="size-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500">
                    Interface do sistema
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-600">
                    Painel centralizado para gestão completa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
