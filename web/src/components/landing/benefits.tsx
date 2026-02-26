const benefits = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    ),
    title: "Mais organização",
    description:
      "Sua carteira de clientes e apólices sempre em ordem e fácil de navegar.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    title: "Economia de tempo",
    description:
      "Menos tempo procurando informações e mais tempo atendendo clientes.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    title: "Redução de erros",
    description:
      "Menos retrabalho com dados centralizados e sempre atualizados.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    ),
    title: "Visão completa da carteira",
    description:
      "Tenha uma visão consolidada de toda a sua operação em um só lugar.",
  },
];

export function Benefits() {
  return (
    <section className="border-y border-neutral-800/50 bg-neutral-900/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Benefícios que fazem a diferença
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Resultados reais para sua produtividade e profissionalismo
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-2xl border border-neutral-700/50 bg-gradient-to-b from-neutral-900 to-neutral-950 p-8 shadow-xl transition-all hover:border-[#9333ea]/40 hover:shadow-[#9333ea]/5"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#9333ea]/10 blur-2xl" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#9333ea]/20 text-[#9333ea]">
                  <svg
                    className="size-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {item.icon}
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-neutral-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
