"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { questions } from "@/lib/questions";
import type { QuizSubmission } from "@/types/quiz";

export default function Dashboard() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<QuizSubmission | null>(
    null
  );

  useEffect(() => {
    if (!authenticated) return;

    const q = query(
      collection(db, "quiz-respostas"),
      orderBy("submittedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data() as QuizSubmission);
      setSubmissions(data);
    });

    return () => unsubscribe();
  }, [authenticated]);

  function handleLogin() {
    if (password === process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Senha incorreta");
    }
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8">
          <h2 className="mb-6 text-xl font-bold">Acesso do Instrutor</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            autoFocus
          />
          <button
            onClick={handleLogin}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  // ─── Cálculos da turma ──────────────────────
  const totalStudents = submissions.length;
  const avgScore =
    totalStudents > 0
      ? (
          submissions.reduce((sum, s) => sum + s.totalScore, 0) / totalStudents
        ).toFixed(1)
      : "0";

  const levelCounts = {
    Iniciante: submissions.filter((s) => s.detectedLevel === "Iniciante")
      .length,
    Básico: submissions.filter((s) => s.detectedLevel === "Básico").length,
    Intermediário: submissions.filter(
      (s) => s.detectedLevel === "Intermediário"
    ).length,
    Avançado: submissions.filter((s) => s.detectedLevel === "Avançado").length,
  };

  const recommendation = getRecommendation(levelCounts, totalStudents);

  // ─── Modal de detalhe do aluno ──────────────
  if (selectedStudent) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => setSelectedStudent(null)}
            className="mb-4 text-sm text-blue-600 hover:underline"
          >
            &#8592; Voltar ao dashboard
          </button>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {selectedStudent.studentName}
                </h2>
                <p className="text-sm text-gray-500">
                  Enviado em{" "}
                  {new Date(selectedStudent.submittedAt).toLocaleString("pt-BR")}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${getLevelColor(selectedStudent.detectedLevel)}`}
              >
                {selectedStudent.detectedLevel}
              </span>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-3">
              <ScoreCard label="Fase 1" score={selectedStudent.phase1Score} total={questions.filter((q) => q.phase === 1).length} color="green" />
              <ScoreCard label="Fase 2" score={selectedStudent.phase2Score} total={questions.filter((q) => q.phase === 2).length} color="yellow" />
              <ScoreCard label="Fase 3" score={selectedStudent.phase3Score} total={questions.filter((q) => q.phase === 3).length} color="red" />
              <ScoreCard label="Fase 4" score={selectedStudent.phase4Score} total={questions.filter((q) => q.phase === 4).length} color="purple" />
              <ScoreCard label="Fase 5" score={selectedStudent.phase5Score} total={questions.filter((q) => q.phase === 5).length} color="cyan" />
              <ScoreCard label="Fase 6" score={selectedStudent.phase6Score} total={questions.filter((q) => q.phase === 6).length} color="orange" />
            </div>

            <h3 className="mb-3 font-semibold">Respostas detalhadas</h3>
            <div className="space-y-2">
              {questions.map((q) => {
                const answer = selectedStudent.answers.find(
                  (a) => a.questionId === q.id
                );
                const isCorrect =
                  answer && q.correctAnswer
                    ? answer.answer === q.correctAnswer
                    : false;

                return (
                  <div
                    key={q.id}
                    className={`rounded-lg border p-3 text-sm ${
                      !answer
                        ? "border-gray-200 bg-gray-50"
                        : isCorrect
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0">
                        {!answer ? "⬜" : isCorrect ? "✅" : "❌"}
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900">
                          {q.id}. {q.question}
                        </p>
                        <p className="mt-1 text-gray-600">
                          Resposta:{" "}
                          {answer ? answer.answer : "Sem resposta"}
                        </p>
                        {!isCorrect && q.correctAnswer && (
                          <p className="mt-0.5 text-green-700">
                            Correta: {q.correctAnswer}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Dashboard principal ────────────────────
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-2xl font-bold">
          Dashboard do Instrutor{" "}
          <span className="text-sm font-normal text-gray-400">
            (tempo real)
          </span>
        </h1>

        {/* Resumo */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Respostas" value={totalStudents} />
          <StatCard label="Média" value={`${avgScore}/${questions.length}`} />
          <StatCard
            label="Nível mais comum"
            value={
              totalStudents > 0
                ? Object.entries(levelCounts).sort((a, b) => b[1] - a[1])[0][0]
                : "—"
            }
          />
          <StatCard
            label="Última resposta"
            value={
              submissions[0]
                ? new Date(submissions[0].submittedAt).toLocaleTimeString(
                    "pt-BR",
                    { hour: "2-digit", minute: "2-digit" }
                  )
                : "—"
            }
          />
        </div>

        {/* Distribuição de níveis */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 font-semibold">Distribuição de Níveis</h2>
          <div className="space-y-3">
            {Object.entries(levelCounts).map(([level, count]) => {
              const percent =
                totalStudents > 0
                  ? Math.round((count / totalStudents) * 100)
                  : 0;
              return (
                <div key={level} className="flex items-center gap-3">
                  <span className="w-28 text-sm font-medium">{level}</span>
                  <div className="h-6 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getLevelBarColor(level)}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-sm text-gray-500">
                    {count} ({percent}%)
                  </span>
                </div>
              );
            })}
          </div>

          {totalStudents > 0 && (
            <div
              className={`mt-4 rounded-lg p-4 text-sm ${recommendation.color}`}
            >
              <strong>Recomendação:</strong> {recommendation.text}
            </div>
          )}
        </div>

        {/* Lista de alunos */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 font-semibold">Resultados Individuais</h2>

          {totalStudents === 0 ? (
            <p className="py-8 text-center text-gray-400">
              Aguardando respostas dos alunos...
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-gray-500">
                    <th className="pb-3 font-medium">Aluno</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Nível</th>
                    <th className="pb-3 font-medium">Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s, i) => (
                    <tr
                      key={i}
                      onClick={() => setSelectedStudent(s)}
                      className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-blue-50"
                    >
                      <td className="py-3 font-medium">{s.studentName}</td>
                      <td className="py-3 font-semibold">
                        {s.totalScore}/{questions.length}
                      </td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${getLevelColor(s.detectedLevel)}`}
                        >
                          {s.detectedLevel}
                        </span>
                      </td>
                      <td className="py-3 text-gray-400">
                        {new Date(s.submittedAt).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Componentes auxiliares ────────────────────

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function ScoreCard({
  label,
  score,
  total,
  color,
}: {
  label: string;
  score: number;
  total: number;
  color: string;
}) {
  const percent = Math.round((score / total) * 100);
  const colors: Record<string, string> = {
    green: "bg-green-50 border-green-200 text-green-700",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
    red: "bg-red-50 border-red-200 text-red-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    cyan: "bg-cyan-50 border-cyan-200 text-cyan-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700",
  };

  return (
    <div className={`rounded-lg border p-3 text-center ${colors[color]}`}>
      <p className="text-xs font-medium">{label}</p>
      <p className="text-xl font-bold">
        {score}/{total}
      </p>
      <p className="text-xs">{percent}%</p>
    </div>
  );
}

function getLevelColor(level: string): string {
  const colors: Record<string, string> = {
    Iniciante: "bg-gray-100 text-gray-700",
    Básico: "bg-green-100 text-green-700",
    Intermediário: "bg-yellow-100 text-yellow-700",
    Avançado: "bg-blue-100 text-blue-700",
  };
  return colors[level] || "bg-gray-100 text-gray-700";
}

function getLevelBarColor(level: string): string {
  const colors: Record<string, string> = {
    Iniciante: "bg-gray-400",
    Básico: "bg-green-500",
    Intermediário: "bg-yellow-500",
    Avançado: "bg-blue-500",
  };
  return colors[level] || "bg-gray-400";
}

function getRecommendation(
  levels: Record<string, number>,
  total: number
): { text: string; color: string } {
  if (total === 0) {
    return { text: "", color: "" };
  }

  const iniciantePercent = ((levels.Iniciante || 0) / total) * 100;
  const avancadoPercent = ((levels.Avançado || 0) / total) * 100;
  const intermediarioPercent =
    (((levels.Intermediário || 0) + (levels.Avançado || 0)) / total) * 100;

  if (iniciantePercent > 50) {
    return {
      text: "PLANO B — Maioria iniciante. Recomenda-se começar com fundamentos (front/back/fullstack), simplificar os módulos e dar labs mais guiados.",
      color: "bg-red-50 text-red-800 border border-red-200",
    };
  }

  if (avancadoPercent > 50) {
    return {
      text: "PLANO C — Maioria avançada. Pode acelerar, reduzir tempo em fundamentos e focar em arquitetura, patterns e labs com mais autonomia.",
      color: "bg-blue-50 text-blue-800 border border-blue-200",
    };
  }

  if (intermediarioPercent >= 70) {
    return {
      text: "PLANO A — Turma no nível ideal. Seguir o cronograma como planejado (médio-avançado).",
      color: "bg-green-50 text-green-800 border border-green-200",
    };
  }

  return {
    text: "PLANO D — Turma mista. Recomenda-se pair programming (avançado + iniciante) e desafios bónus para quem terminar antes.",
    color: "bg-yellow-50 text-yellow-800 border border-yellow-200",
  };
}
