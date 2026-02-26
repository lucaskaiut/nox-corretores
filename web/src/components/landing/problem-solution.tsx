const pains = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h7"
      />
    ),
    title: "Informações espalhadas",
    description:
      "Planilhas, anotações e e-mails em locais diferentes dificultam encontrar o que precisa.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    ),
    title: "Controle manual",
    description:
      "Atualizações manuais consomem tempo e aumentam o risco de dados desatualizados.",
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
    title: "Dificuldade de acompanhamento",
    description:
      "Saber o status de cada apólice e vencimento exige esforço e organização.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    ),
    title: "Perda de prazos",
    description:
      "Vencimentos de apólices e documentos passam despercebidos sem um controle adequado.",
  },
];

export function ProblemSolution() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-100 px-4 py-20 dark:border-neutral-800/50 dark:bg-neutral-900/30 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            De informações espalhadas a controle total
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Conheça as principais dores dos corretores e como o Nox resolve cada
            uma delas
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {pains.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-[#9333ea]/50 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:bg-neutral-900"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#9333ea]/10 text-[#9333ea] transition-colors group-hover:bg-[#9333ea]/20">
                <svg
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {item.icon}
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
