import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Clock,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  FileText,
  HelpCircle,
  Save,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { api } from '../api';
import { CodeBlock } from '../components/CodeBlock';
import type { LessonDetail } from '../types';

export const LessonReaderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesText, setNotesText] = useState('');
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function loadLesson() {
      setLoading(true);
      try {
        const data = await api.getLesson(id!);
        setLesson(data);
        setNotesText(data.personal_notes || '');
        setIsBookmarked(Boolean(data.is_bookmarked));
        setIsCompleted(data.user_status === 'completed');
        setQuizAnswer(null);
        setQuizSubmitted(false);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadLesson();
  }, [id]);

  const handleToggleComplete = async () => {
    if (!lesson) return;
    const newStatus = isCompleted ? 'in_progress' : 'completed';
    try {
      await api.updateLessonProgress(lesson.id, newStatus);
      setIsCompleted(!isCompleted);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleBookmark = async () => {
    if (!lesson) return;
    try {
      const res = await api.toggleBookmark(lesson.id);
      setIsBookmarked(res.is_bookmarked);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveNotes = async () => {
    if (!lesson) return;
    setSavingNotes(true);
    try {
      await api.saveLessonNotes(lesson.id, notesText);
      setTimeout(() => setSavingNotes(false), 800);
    } catch (err) {
      console.error(err);
      setSavingNotes(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 font-mono">
        Loading lesson technical content...
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="p-8 text-center text-xs text-rose-400 font-mono">
        Lesson not found. Return to <Link to="/roadmap" className="underline">Roadmap</Link>.
      </div>
    );
  }

  const kc = lesson.content.knowledgeCheck;

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Breadcrumb & Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Link to="/roadmap" className="hover:text-indigo-400 transition-colors">
            Roadmap
          </Link>
          <span>/</span>
          <span className="text-slate-300 truncate max-w-xs">{lesson.module_title}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={handleToggleBookmark}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isBookmarked
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          {/* Mark Complete Button */}
          <button
            onClick={handleToggleComplete}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
              isCompleted
                ? 'bg-emerald-600/20 border-emerald-500/30 text-emerald-400'
                : 'bg-indigo-600 hover:bg-indigo-500 border-transparent text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Header Card */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            {lesson.handbook_unit || 'Core Handbook'}
          </span>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{lesson.estimated_mins} mins study time</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          {lesson.title}
        </h1>

        {/* Objectives Box */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Learning Objectives</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{lesson.objectives}</p>
          {lesson.prerequisites && (
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              <span className="text-slate-500">Prerequisites: </span>
              <span>{lesson.prerequisites}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Educational Content Sections */}
      <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
        {lesson.content.sections.map((sec, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight border-b border-slate-800/80 pb-1">
              {sec.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
              {sec.content}
            </p>

            {/* Callout Notice */}
            {sec.callout && (
              <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-indigo-300 text-xs flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{sec.callout.text}</div>
              </div>
            )}

            {/* Code Snippet with Sandbox Link */}
            {sec.codeSnippet && (
              <CodeBlock
                code={sec.codeSnippet.code}
                title={sec.codeSnippet.title}
                language={sec.codeSnippet.language}
                expectedOutput={sec.codeSnippet.expectedOutput}
                onRunInSandbox={() => navigate('/practice')}
              />
            )}

            {/* Mistakes & Corrections */}
            {sec.mistakes && sec.mistakes.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Common Pitfalls & How to Avoid Them</span>
                </div>
                <div className="grid gap-2">
                  {sec.mistakes.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-xs space-y-1"
                    >
                      <div className="text-rose-300 font-semibold">❌ Mistake: {m.mistake}</div>
                      <div className="text-emerald-300">✅ Solution: {m.correction}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Summary & Key Takeaways Card */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span>Summary & Key Takeaways</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">{lesson.summary}</p>
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 whitespace-pre-line font-mono leading-relaxed">
          {lesson.key_takeaways}
        </div>
      </div>

      {/* Interactive Knowledge Check (Mini-Quiz) */}
      {kc && (
        <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <HelpCircle className="w-4 h-4" />
            <span>Quick Knowledge Check</span>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-white">{kc.question}</p>

          <div className="space-y-2">
            {kc.options.map((opt, oIdx) => {
              const isSelected = quizAnswer === opt;
              const isCorrect = opt === kc.correctAnswer;
              let btnClass = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

              if (quizSubmitted) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-950/40 border-emerald-700 text-emerald-300 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnClass = 'bg-rose-950/40 border-rose-700 text-rose-300';
                }
              } else if (isSelected) {
                btnClass = 'bg-indigo-600/20 border-indigo-500 text-indigo-200';
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => !quizSubmitted && setQuizAnswer(opt)}
                  disabled={quizSubmitted}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {!quizSubmitted ? (
            <button
              onClick={() => quizAnswer && setQuizSubmitted(true)}
              disabled={!quizAnswer}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs transition-colors"
            >
              Verify Answer
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-indigo-400">Explanation: </span>
              <span className="text-slate-300">{kc.explanation}</span>
            </div>
          )}
        </div>
      )}

      {/* Personal Notes Section (Persisted) */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Personal Notes for this Lesson</span>
          </h3>
          <button
            onClick={handleSaveNotes}
            disabled={savingNotes}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            {savingNotes ? <Check className="w-3 h-3 text-emerald-400" /> : <Save className="w-3 h-3" />}
            <span>{savingNotes ? 'Saved' : 'Save Notes'}</span>
          </button>
        </div>
        <textarea
          value={notesText}
          onChange={(e) => setNotesText(e.target.value)}
          placeholder="Jot down personal reminders, question notes, syntax quirks..."
          rows={3}
          className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none text-xs text-slate-200 placeholder-slate-600 resize-y"
        />
      </div>

      {/* Prev / Next Lesson Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
        {lesson.prevLesson ? (
          <Link
            to={`/lessons/${lesson.prevLesson.id}`}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Prev: {lesson.prevLesson.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {lesson.nextLesson ? (
          <Link
            to={`/lessons/${lesson.nextLesson.id}`}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-indigo-600/20"
          >
            <span>Next: {lesson.nextLesson.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <Link
            to="/roadmap"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 transition-colors"
          >
            <span>Back to Full Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};
