import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { api } from '../api';
import { CodeBlock } from '../components/CodeBlock';
import type { Quiz, QuizResult, QuizQuestion } from '../types';

export const QuizCenterPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [quizMode, setQuizMode] = useState<'practice' | 'assessment'>('practice');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadQuizzes() {
      try {
        const data = await api.getQuizzes();
        setQuizzes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadQuizzes();
  }, []);

  const startQuiz = async (quizId: string, mode: 'practice' | 'assessment') => {
    setLoading(true);
    try {
      const q = await api.getQuiz(quizId);
      setActiveQuiz(q);
      setQuizMode(mode);
      setCurrentQuestionIdx(0);
      setUserAnswers({});
      setQuizResult(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: string, option: string, isMulti: boolean) => {
    if (isMulti) {
      const current = userAnswers[questionId] || [];
      const updated = current.includes(option)
        ? current.filter((o: string) => o !== option)
        : [...current, option];
      setUserAnswers({ ...userAnswers, [questionId]: updated });
    } else {
      setUserAnswers({ ...userAnswers, [questionId]: option });
    }
  };

  const handleSubmitQuiz = async () => {
    if (!activeQuiz) return;
    setSubmitting(true);
    try {
      const result = await api.submitQuiz(activeQuiz.id, userAnswers);
      setQuizResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    if (!activeQuiz) return;
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setQuizResult(null);
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 font-mono">
        Loading quiz center and question banks...
      </div>
    );
  }

  // View 1: Quiz List / Selector
  if (!activeQuiz) {
    return (
      <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-indigo-400" />
            <span>ABAP Technical Quiz Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Evaluate your knowledge of the ABAP runtime, internal tables, OOP patterns, modern Open SQL, and RAP transactional behaviors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between shadow-lg space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
                    {quiz.question_count || 4} Questions
                  </span>
                  {quiz.best_score !== undefined && quiz.best_score !== null && (
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                      Best: {Math.round(quiz.best_score)}%
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">{quiz.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{quiz.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={() => startQuiz(quiz.id, 'practice')}
                  className="flex-1 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-indigo-600/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Practice Mode</span>
                </button>
                <button
                  onClick={() => startQuiz(quiz.id, 'assessment')}
                  className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                  title="Timed test with delayed feedback"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Assessment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // View 2: Quiz Result Review
  if (quizResult) {
    const passed = quizResult.passed;
    return (
      <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6">
        {/* Results Banner */}
        <div
          className={`p-6 rounded-2xl border text-center space-y-3 ${
            passed
              ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
              : 'bg-rose-950/20 border-rose-800/40 text-rose-300'
          }`}
        >
          {passed ? (
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          ) : (
            <XCircle className="w-12 h-12 text-rose-400 mx-auto" />
          )}

          <h2 className="text-2xl font-black text-white">
            {passed ? 'Assessment Passed!' : 'Need More Practice'}
          </h2>

          <div className="text-3xl font-mono font-extrabold text-white">
            {quizResult.percentage}%
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto">
            You scored {quizResult.score} out of {quizResult.totalQuestions} questions correctly.{' '}
            {passed
              ? 'Excellent mastery of this technical area.'
              : 'Review the technical explanations below and attempt the quiz again.'}
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={handleRetry}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>
            <button
              onClick={() => setActiveQuiz(null)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
            >
              Back to Quiz List
            </button>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Answer Review & Technical Explanations
          </h3>

          {quizResult.review.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border bg-slate-900/80 space-y-3 ${
                item.isCorrect ? 'border-emerald-800/40' : 'border-rose-800/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="font-semibold text-xs sm:text-sm text-slate-100">
                  <span className="text-slate-500 mr-2">{idx + 1}.</span>
                  {item.question}
                </div>
                {item.isCorrect ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    Correct
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                    <XCircle className="w-3 h-3" />
                    Incorrect
                  </span>
                )}
              </div>

              <div className="text-xs space-y-1 font-mono">
                <div className="text-slate-400">
                  Your Answer:{' '}
                  <span className={item.isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                    {JSON.stringify(item.userAnswer) || 'No answer'}
                  </span>
                </div>
                {!item.isCorrect && (
                  <div className="text-emerald-400">
                    Correct Answer: {JSON.stringify(item.correctAnswer)}
                  </div>
                )}
              </div>

              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                <strong className="text-indigo-400">Technical Rationale: </strong>
                {item.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // View 3: Active Question Taking
  const questions: QuizQuestion[] = activeQuiz.questions || [];
  const currentQ = questions[currentQuestionIdx];

  if (!currentQ) {
    return <div className="p-8 text-center text-xs text-slate-500">No questions available in this quiz.</div>;
  }

  const isMultiSelect = currentQ.question_type === 'multiple_select';
  const currentAnswer = userAnswers[currentQ.id];
  const isPracticeMode = quizMode === 'practice';
  const hasAnsweredCurrent = isMultiSelect
    ? Boolean(currentAnswer && currentAnswer.length > 0)
    : Boolean(currentAnswer);

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-6">
      {/* Quiz Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 font-mono">
            {quizMode === 'practice' ? 'Practice Mode (Instant Feedback)' : 'Assessment Mode'}
          </span>
          <h2 className="text-base font-bold text-white tracking-tight">{activeQuiz.title}</h2>
        </div>
        <button
          onClick={() => setActiveQuiz(null)}
          className="px-2.5 py-1 text-xs rounded bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700"
        >
          Exit Quiz
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>
            Question {currentQuestionIdx + 1} of {questions.length}
          </span>
          <span className="uppercase text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            {currentQ.question_type.replace('_', ' ')}
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
          {currentQ.question}
        </h3>

        {currentQ.code_snippet && (
          <CodeBlock code={currentQ.code_snippet} title="Question Code Context" />
        )}

        {/* Options */}
        <div className="space-y-2.5 pt-2">
          {currentQ.options.map((opt, oIdx) => {
            const isSelected = isMultiSelect
              ? currentAnswer && currentAnswer.includes(opt)
              : currentAnswer === opt;

            let optClass = 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300';
            if (isSelected) {
              optClass = 'bg-indigo-600/20 border-indigo-500 text-indigo-200 font-semibold';
            }

            return (
              <button
                key={oIdx}
                onClick={() => handleSelectOption(currentQ.id, opt, isMultiSelect)}
                className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between ${optClass}`}
              >
                <span>{opt}</span>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-indigo-500 bg-indigo-600' : 'border-slate-700'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Instant Feedback in Practice Mode */}
        {isPracticeMode && hasAnsweredCurrent && (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-indigo-400">Technical Note: </span>
            <span>{currentQ.explanation}</span>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
          disabled={currentQuestionIdx === 0}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 text-xs font-semibold"
        >
          Previous
        </button>

        {currentQuestionIdx < questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
            disabled={!hasAnsweredCurrent}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-40"
          >
            <span>Next Question</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={handleSubmitQuiz}
            disabled={!hasAnsweredCurrent || submitting}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-600/20 disabled:opacity-40"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{submitting ? 'Evaluating Answers...' : 'Submit Assessment'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
