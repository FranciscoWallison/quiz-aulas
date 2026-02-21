"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { questions } from "@/lib/questions";
import { useRouter } from "next/navigation";
import type { QuizAnswer, QuizSubmission } from "@/types/quiz";

type Step = "name" | "quiz" | "review";

export default function QuizForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("name");
  const [studentName, setStudentName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const currentAnswer = answers.find(
    (a) => a.questionId === question?.id
  )?.answer;

  function handleAnswer(answer: string) {
    setAnswers((prev) => {
      const exists = prev.findIndex((a) => a.questionId === question.id);
      if (exists >= 0) {
        const updated = [...prev];
        updated[exists] = { questionId: question.id, answer };
        return updated;
      }
      return [...prev, { questionId: question.id, answer }];
    });
  }

  function handleNext() {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("review");
    }
  }

  function handlePrevious() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function handleEditQuestion(index: number) {
    setCurrentQuestion(index);
    setStep("quiz");
  }

  function calculateResults(): Omit<QuizSubmission, "studentName" | "answers" | "submittedAt"> {
    let phase1Score = 0;
    let phase2Score = 0;
    let phase3Score = 0;

    const phase1Questions = questions.filter((q) => q.phase === 1);
    const phase2Questions = questions.filter((q) => q.phase === 2);
    const phase3Questions = questions.filter((q) => q.phase === 3);

    for (const q of phase1Questions) {
      const answer = answers.find((a) => a.questionId === q.id);
      if (answer && q.correctAnswer && answer.answer === q.correctAnswer) {
        phase1Score++;
      }
    }

    for (const q of phase2Questions) {
      const answer = answers.find((a) => a.questionId === q.id);
      if (answer && q.correctAnswer && answer.answer === q.correctAnswer) {
        phase2Score++;
      }
    }

    for (const q of phase3Questions) {
      const answer = answers.find((a) => a.questionId === q.id);
      if (answer && q.correctAnswer && answer.answer === q.correctAnswer) {
        phase3Score++;
      }
    }

    const totalScore = phase1Score + phase2Score + phase3Score;

    const phase1Percent = phase1Score / phase1Questions.length;
    const phase2Percent = phase2Score / phase2Questions.length;

    let detectedLevel = "Iniciante";
    if (phase1Percent >= 0.6 && phase2Percent >= 0.6) {
      detectedLevel = "Avançado";
      if (phase3Score < phase3Questions.length * 0.5) {
        detectedLevel = "Intermediário";
      }
    } else if (phase1Percent >= 0.6) {
      detectedLevel = "Básico";
    }

    return { phase1Score, phase2Score, phase3Score, totalScore, detectedLevel };
  }

  async function handleSubmit() {
    setIsSubmitting(true);

    try {
      const results = calculateResults();

      const submission: QuizSubmission = {
        studentName,
        answers,
        ...results,
        submittedAt: new Date().toISOString(),
      };

      // Timeout de 10s para não ficar preso se o Firestore não estiver disponível
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout: Firestore não respondeu em 10s")), 10000)
      );

      await Promise.race([
        addDoc(collection(db, "quiz-respostas"), submission),
        timeoutPromise,
      ]);

      // Guardar resultado para a página de revisão
      localStorage.setItem("quiz-resultado", JSON.stringify(submission));

      router.push("/resultado");
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert(
        "Erro ao enviar o quiz. Verifique se o Firestore está ativo no Firebase Console e tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // ─── TELA: NOME ─────────────────────────────
  if (step === "name") {
    return (
      <div className="mx-auto max-w-lg p-4">
        <div className="rounded-xl border border-gray-200 bg-white p-8">
          <h2 className="mb-6 text-2xl font-bold">Identificação</h2>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Seu nome completo
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Ex.: João Silva"
            className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && studentName.trim().length >= 2) {
                setStep("quiz");
              }
            }}
          />
          <button
            onClick={() => setStep("quiz")}
            disabled={studentName.trim().length < 2}
            className="w-full rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Iniciar Quiz
          </button>
        </div>
      </div>
    );
  }

  // ─── TELA: REVISÃO ──────────────────────────
  if (step === "review") {
    const unanswered = questions.filter(
      (q) => !answers.find((a) => a.questionId === q.id)
    );

    return (
      <div className="mx-auto max-w-2xl p-4">
        <div className="rounded-xl border border-gray-200 bg-white p-8">
          <h2 className="mb-2 text-2xl font-bold">Revisão das Respostas</h2>
          <p className="mb-6 text-gray-600">
            Confira suas respostas antes de enviar. Pode clicar em qualquer
            pergunta para corrigir.
          </p>

          {unanswered.length > 0 && (
            <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
              Atenção: {unanswered.length} pergunta(s) sem resposta.
              Pode enviar assim mesmo ou voltar para responder.
            </div>
          )}

          <div className="space-y-3">
            {questions.map((q, index) => {
              const answer = answers.find((a) => a.questionId === q.id);
              const phaseColors: Record<number, string> = {
                1: "bg-green-100 text-green-700",
                2: "bg-yellow-100 text-yellow-700",
                3: "bg-red-100 text-red-700",
              };

              return (
                <button
                  key={q.id}
                  onClick={() => handleEditQuestion(index)}
                  className="w-full rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-400">
                      {index + 1}.
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${phaseColors[q.phase]}`}
                    >
                      {q.phaseLabel}
                    </span>
                  </div>
                  <p className="mb-1 text-sm font-medium text-gray-900">
                    {q.question}
                  </p>
                  {answer ? (
                    <p className="text-sm text-blue-600">
                      R: {answer.answer}
                    </p>
                  ) : (
                    <p className="text-sm italic text-gray-400">
                      Sem resposta
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setStep("quiz");
              }}
              className="flex-1 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Voltar ao Quiz
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-green-600 py-3 font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? "Enviando..." : "Confirmar e Enviar"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── TELA: QUIZ (PERGUNTA A PERGUNTA) ───────
  const phaseColors: Record<number, string> = {
    1: "bg-green-100 text-green-700",
    2: "bg-yellow-100 text-yellow-700",
    3: "bg-red-100 text-red-700",
  };

  return (
    <div className="mx-auto max-w-lg p-4">
      {/* Barra de progresso */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
          <span>
            Pergunta {currentQuestion + 1} de {totalQuestions}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${phaseColors[question.phase]}`}
          >
            Fase {question.phase} — {question.phaseLabel}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card da pergunta */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-6 text-lg font-semibold leading-relaxed">
          {question.question}
        </h3>

        {question.codeBlock && (
          <pre className="mb-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
            <code>{question.codeBlock}</code>
          </pre>
        )}

        {/* Opções de resposta */}
        {question.type === "multiple-choice" && question.options && (
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full rounded-lg border-2 p-4 text-left text-sm transition-all ${
                  currentAnswer === option
                    ? "border-blue-600 bg-blue-50 font-medium text-blue-900"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      currentAnswer === option
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300"
                    }`}
                  >
                    {currentAnswer === option && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {question.type === "text" && (
          <textarea
            value={currentAnswer || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            rows={4}
            placeholder="Escreva sua resposta..."
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        )}
      </div>

      {/* Navegação */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex-1 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          className="flex-1 rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          {currentQuestion === totalQuestions - 1 ? "Revisar Respostas" : "Próxima"}
        </button>
      </div>

      {/* Indicador de perguntas */}
      <div className="mt-6 flex flex-wrap justify-center gap-1.5">
        {questions.map((q, index) => {
          const answered = answers.find((a) => a.questionId === q.id);
          const isCurrent = index === currentQuestion;

          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(index)}
              className={`h-8 w-8 rounded-lg text-xs font-medium transition-all ${
                isCurrent
                  ? "bg-blue-600 text-white ring-2 ring-blue-300"
                  : answered
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
