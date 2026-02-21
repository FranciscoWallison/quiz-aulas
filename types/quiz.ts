export type QuestionType = "multiple-choice" | "text";

export type Question = {
  id: number;
  phase: 1 | 2 | 3 | 4 | 5 | 6;
  phaseLabel: string;
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  codeBlock?: string;
};

export type QuizAnswer = {
  questionId: number;
  answer: string;
};

export type QuizSubmission = {
  studentName: string;
  answers: QuizAnswer[];
  phase1Score: number;
  phase2Score: number;
  phase3Score: number;
  phase4Score: number;
  phase5Score: number;
  phase6Score: number;
  totalScore: number;
  detectedLevel: string;
  submittedAt: string;
};
