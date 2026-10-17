import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  Clock,
  Target,
  Sparkles,
  BookOpen,
  Code2,
  CheckCircle2,
  Save,
  ArrowRight,
  Flame
} from 'lucide-react';
import { api } from '../api';
import type { LearnerProfile } from '../types';

export const PlannerPage: React.FC = () => {
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [checklist, setChecklist] = useState<{
    lessons: { id: string; title: string; estimated_mins: number; module_title: string }[];
    dueCards: { id: string; front: string; category: string }[];
    challenges: { id: string; title: string; difficulty: string; category: string }[];
  }>({ lessons: [], dueCards: [], challenges: [] });

  const [budgetMins, setBudgetMins] = useState(45);
  const [targetDate, setTargetDate] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlanner() {
      try {
        const data = await api.getPlanner();
        setProfile(data.profile);
        setChecklist(data.checklist);
        setBudgetMins(data.profile.daily_budget_mins || 45);
        setTargetDate(data.profile.target_date || '');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPlanner();
  }, []);

  const handleSaveSettings = async () => {
    try {
      const updated = await api.updateProfile({
        daily_budget_mins: budgetMins,
        target_date: targetDate
      });
      setProfile(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 font-mono">
        Loading personalized daily learning plan...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
          <CalendarCheck className="w-6 h-6 text-indigo-400" />
          <span>Daily Learning Planner</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Set study goals, configure your daily time budget, and execute a dynamic checklist generated from incomplete lessons and due spaced repetition cards.
        </p>
      </div>

      {/* Target & Budget Settings Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 font-mono">
          <Target className="w-4 h-4 text-indigo-400" />
          <span>Study Targets & Schedule</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">
              Daily Study Budget (Minutes)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={15}
                max={240}
                step={15}
                value={budgetMins}
                onChange={(e) => setBudgetMins(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono outline-none focus:border-indigo-500"
              />
              <span className="text-xs text-slate-500 font-mono shrink-0">mins / day</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">
              Target Mastery Completion Date
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <span className="text-[11px] text-slate-500 font-mono">
            Streak: <strong>{profile?.streak_days || 1} day(s)</strong> active learning
          </span>
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-indigo-600/20"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savedSuccess ? 'Settings Saved!' : 'Save Plan Settings'}</span>
          </button>
        </div>
      </div>

      {/* Today's Auto-Generated Learning Checklist */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Today's Recommended Study Checklist</span>
          </h2>
          <span className="text-xs font-mono text-slate-500">
            Estimated ~{budgetMins} minutes
          </span>
        </div>

        {/* Incomplete Lessons to Read */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5 font-mono">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Recommended Reading ({checklist.lessons.length})</span>
          </div>

          <div className="space-y-2">
            {checklist.lessons.map((les) => (
              <div
                key={les.id}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-200">{les.title}</div>
                  <div className="text-[11px] text-slate-500">{les.module_title}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-500 font-mono">{les.estimated_mins}m</span>
                  <Link
                    to={`/lessons/${les.id}`}
                    className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Due Flashcards */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Due Flashcard Revisions ({checklist.dueCards.length})</span>
          </div>

          {checklist.dueCards.length > 0 ? (
            <div className="space-y-2">
              {checklist.dueCards.map((card) => (
                <div
                  key={card.id}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div className="text-slate-300 truncate max-w-md">{card.front}</div>
                  <Link
                    to="/flashcards"
                    className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-[11px]"
                  >
                    Review
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-slate-500 py-2">
              All flashcards are up to date! Great job on your spaced repetitions.
            </div>
          )}
        </div>

        {/* Practice Challenges */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5 font-mono">
            <Code2 className="w-3.5 h-3.5" />
            <span>Coding Practice Challenges ({checklist.challenges.length})</span>
          </div>

          <div className="space-y-2">
            {checklist.challenges.map((ch) => (
              <div
                key={ch.id}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-200">{ch.title}</div>
                  <div className="text-[11px] text-slate-500">{ch.category}</div>
                </div>
                <Link
                  to="/practice"
                  className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-[11px] flex items-center gap-1"
                >
                  <span>Solve</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
