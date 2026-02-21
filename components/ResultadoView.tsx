"use client";

import { useEffect, useState } from "react";
import { questions } from "@/lib/questions";
import type { QuizSubmission } from "@/types/quiz";
import Link from "next/link";

export default function ResultadoView() {
  const [submission, setSubmission] = useState<QuizSubmission | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("quiz-resultado");
    if (data) {
      setSubmission(JSON.parse(data));
    }
  }, []);

  if (!submission) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-500">Nenhum resultado encontrado.</p>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Voltar ao início
          </Link>
        </div>
      </main>
    );
  }

  const phaseTotals = {
    1: questions.filter((q) => q.phase === 1).length,
    2: questions.filter((q) => q.phase === 2).length,
    3: questions.filter((q) => q.phase === 3).length,
    4: questions.filter((q) => q.phase === 4).length,
    5: questions.filter((q) => q.phase === 5).length,
    6: questions.filter((q) => q.phase === 6).length,
  };
  const totalPercent = Math.round(
    (submission.totalScore / questions.length) * 100
  );

  const levelConfig: Record<string, { color: string; bg: string; message: string }> = {
    Iniciante: {
      color: "text-gray-700",
      bg: "bg-gray-100",
      message: "Vamos construir sua base! Durante a aula, vamos reforçar os fundamentos para você evoluir rapidamente.",
    },
    Básico: {
      color: "text-green-700",
      bg: "bg-green-100",
      message: "Boa base! Você domina os fundamentos e está pronto para aprofundar em React e Next.js.",
    },
    Intermediário: {
      color: "text-yellow-700",
      bg: "bg-yellow-100",
      message: "Muito bom! Você já tem experiência sólida. A aula vai focar em arquitetura e padrões avançados.",
    },
    Avançado: {
      color: "text-blue-700",
      bg: "bg-blue-100",
      message: "Excelente! Você já domina a maioria dos conceitos. Vamos aprofundar em performance, testes e deploy.",
    },
  };

  const level = levelConfig[submission.detectedLevel] || levelConfig.Iniciante;

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Header de sucesso */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
            &#10003;
          </div>
          <h1 className="text-2xl font-bold">Quiz Enviado, {submission.studentName}!</h1>
          <p className="mt-2 text-gray-500">
            Suas respostas foram registadas com sucesso.
          </p>
        </div>

        {/* Nível detectado */}
        <div className={`mb-6 rounded-xl border p-6 ${level.bg}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Seu nível detectado</p>
              <p className={`text-2xl font-bold ${level.color}`}>
                {submission.detectedLevel}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{totalPercent}%</p>
              <p className="text-sm text-gray-500">
                {submission.totalScore}/{questions.length} acertos
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600">{level.message}</p>
        </div>

        {/* Pontuação por fase */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <PhaseCard label="Fase 1" subtitle="Fundamentos" score={submission.phase1Score} total={phaseTotals[1]} color="green" />
          <PhaseCard label="Fase 2" subtitle="JS/TS e React" score={submission.phase2Score} total={phaseTotals[2]} color="yellow" />
          <PhaseCard label="Fase 3" subtitle="Next.js" score={submission.phase3Score} total={phaseTotals[3]} color="blue" />
          <PhaseCard label="Fase 4" subtitle="Libs vs Frameworks" score={submission.phase4Score} total={phaseTotals[4]} color="purple" />
          <PhaseCard label="Fase 5" subtitle="SQL Básico" score={submission.phase5Score} total={phaseTotals[5]} color="cyan" />
          <PhaseCard label="Fase 6" subtitle="Ecossistema" score={submission.phase6Score} total={phaseTotals[6]} color="orange" />
        </div>

        {/* Botão para ver detalhes */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mb-6 w-full rounded-xl border border-gray-200 bg-white py-4 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          {showDetails
            ? "Ocultar respostas detalhadas"
            : "Ver respostas e explicações"}
        </button>

        {/* Detalhes das respostas */}
        {showDetails && (
          <div className="space-y-4">
            {[
              { phase: 1, label: "Fundamentos" },
              { phase: 2, label: "JS/TS e React" },
              { phase: 3, label: "Next.js" },
              { phase: 4, label: "Libs vs Frameworks" },
              { phase: 5, label: "SQL Básico" },
              { phase: 6, label: "Ecossistema Fullstack" },
            ].map(({ phase, label }) => (
              <div key={phase}>
                <h3 className="mb-3 text-lg font-bold text-gray-700">
                  Fase {phase} — {label}
                </h3>
                <div className="space-y-3">
                  {questions
                    .filter((q) => q.phase === phase)
                    .map((q) => {
                      const answer = submission.answers.find(
                        (a) => a.questionId === q.id
                      );
                      const isCorrect =
                        answer?.answer === q.correctAnswer;
                      const notAnswered = !answer;

                      return (
                        <div
                          key={q.id}
                          className={`rounded-lg border p-4 ${
                            notAnswered
                              ? "border-gray-200 bg-gray-50"
                              : isCorrect
                                ? "border-green-200 bg-green-50"
                                : "border-red-200 bg-red-50"
                          }`}
                        >
                          {/* Pergunta */}
                          <div className="flex items-start gap-2">
                            <span className="mt-0.5 shrink-0 text-lg">
                              {notAnswered
                                ? "⬜"
                                : isCorrect
                                  ? "✅"
                                  : "❌"}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900">
                                {q.id}. {q.question}
                              </p>

                              {q.codeBlock && (
                                <pre className="mt-2 overflow-x-auto rounded bg-gray-900 p-2 text-sm text-green-400">
                                  <code>{q.codeBlock}</code>
                                </pre>
                              )}

                              {/* Resposta do aluno */}
                              <div className="mt-2 text-sm">
                                <span className="font-medium text-gray-500">
                                  Sua resposta:{" "}
                                </span>
                                <span
                                  className={
                                    notAnswered
                                      ? "italic text-gray-400"
                                      : isCorrect
                                        ? "text-green-700"
                                        : "text-red-700"
                                  }
                                >
                                  {answer
                                    ? answer.answer
                                    : "Sem resposta"}
                                </span>
                              </div>

                              {/* Resposta correta (se errou) */}
                              {!isCorrect && q.correctAnswer && (
                                <div className="mt-1 text-sm">
                                  <span className="font-medium text-gray-500">
                                    Resposta correta:{" "}
                                  </span>
                                  <span className="font-medium text-green-700">
                                    {q.correctAnswer}
                                  </span>
                                </div>
                              )}

                              {/* Explicação */}
                              {q.explanation && (
                                <div className="mt-3 rounded-lg bg-white/70 p-3 text-sm text-gray-600">
                                  <span className="font-semibold text-gray-700">
                                    Explicação:{" "}
                                  </span>
                                  {q.explanation}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}

function PhaseCard({
  label,
  subtitle,
  score,
  total,
  color,
}: {
  label: string;
  subtitle: string;
  score: number;
  total: number;
  color: string;
}) {
  const percent = Math.round((score / total) * 100);
  const colors: Record<string, string> = {
    green: "border-green-200 bg-green-50 text-green-700",
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    purple: "border-purple-200 bg-purple-50 text-purple-700",
    cyan: "border-cyan-200 bg-cyan-50 text-cyan-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
  };

  return (
    <div className={`rounded-xl border p-4 text-center ${colors[color]}`}>
      <p className="text-xs font-medium opacity-70">{label}</p>
      <p className="text-2xl font-bold">
        {score}/{total}
      </p>
      <p className="text-xs font-medium">{percent}%</p>
      <p className="mt-1 text-xs opacity-60">{subtitle}</p>
    </div>
  );
}
