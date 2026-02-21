import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg text-center">
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl text-white">
            ?
          </div>
          <h1 className="text-3xl font-bold">Quiz Diagnóstico</h1>
          <p className="mt-2 text-gray-600">
            Avaliação de nivelamento — 30 perguntas em 6 fases
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 text-left">
          <h2 className="mb-4 font-semibold">Como funciona:</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                1
              </span>
              <span>
                <strong className="text-gray-900">Fase 1 — Fundamentos</strong>
                : Terminal, Git e conceitos básicos (7 perguntas)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-700">
                2
              </span>
              <span>
                <strong className="text-gray-900">
                  Fase 2 — JS/TS e React
                </strong>
                : JavaScript moderno, TypeScript e React (7 perguntas)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
                3
              </span>
              <span>
                <strong className="text-gray-900">Fase 3 — Next.js</strong>:
                App Router, SSR e Server Components (6 perguntas)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">
                4
              </span>
              <span>
                <strong className="text-gray-900">
                  Fase 4 — Libs vs Frameworks
                </strong>
                : Bibliotecas, frameworks e ORM (4 perguntas)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-700">
                5
              </span>
              <span>
                <strong className="text-gray-900">Fase 5 — SQL Básico</strong>:
                Consultas SELECT, INSERT e WHERE (3 perguntas)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">
                6
              </span>
              <span>
                <strong className="text-gray-900">
                  Fase 6 — Ecossistema Fullstack
                </strong>
                : Stacks, frameworks de mercado e tecnologias (3 perguntas)
              </span>
            </li>
          </ul>
        </div>

        <div className="mb-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
          Isto <strong>não é uma prova</strong> — serve para ajustar o ritmo da
          aula ao nível da turma. Responda com honestidade.
        </div>

        <Link
          href="/quiz"
          className="inline-block w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Começar Quiz
        </Link>
      </div>
    </main>
  );
}
