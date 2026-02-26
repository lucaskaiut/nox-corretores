import Link from "next/link";

export function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-br from-[#9333ea]/20 via-neutral-900 to-neutral-950 px-8 py-16 text-center sm:px-12 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(147,51,234,0.15),transparent)]" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Simplifique sua rotina de corretor
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400">
              Junte-se a corretores que já centralizaram clientes, veículos e
              apólices em um só lugar.
            </p>
            <Link
              href="/register"
              className="mt-10 inline-flex h-16 items-center justify-center rounded-xl bg-[#9333ea] px-12 text-lg font-semibold text-white shadow-xl shadow-[#9333ea]/30 transition-all hover:bg-[#7e22ce] hover:shadow-[#9333ea]/40 hover:scale-[1.02] active:scale-[0.98] active:bg-[#6b21a8]"
            >
              Criar conta gratuitamente
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
