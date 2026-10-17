import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  CheckCircle2,
  Code2,
  Sparkles,
  HelpCircle,
  Clock,
  ArrowRight,
  Flame,
  Award,
  Zap,
  BookOpen,
  CalendarCheck
} from 'lucide-react';
import { api } from '../api';
import type { AnalyticsData, LearnerProfile, Path } from '../types';

export const DashboardPage: React.FC = () => {
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [paths, setPaths] = useState<Path[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [prof, ana, pth] = await Promise.all([
          api.getProfile(),
          api.getAnalytics(),
          api.getPaths()
        ]);
        setProfile(prof);
        setAnalytics(ana);
        setPaths(pth);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 font-mono">
        Loading personal learning dashboard...
      </div>
    );
  }

  // Find recommended next lesson
  let recommendedLesson: any = null;
  for (const path of paths) {
    for (const mod of path.modules) {
      for (const les of mod.lessons) {
        if (les.user_status !== 'completed') {
          recommendedLesson = { ...les, module_title: mod.title, path_title: path.title };
          break;
        }
      }
      if (recommendedLesson) break;
    }
    if (recommendedLesson) break;
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Welcome & Continue Learning Hero Card */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome, {profile?.display_name || 'Learner'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Advance Your SAP ABAP & RAP Mastery
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Continue where you left off. Today's target: commit 45 minutes to syntax practice, internal tables, and CDS view entities.
          </p>

          {recommendedLesson ? (
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to={`/lessons/${recommendedLesson.id}`}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:gap-3"
              >
                <span>Continue: {recommendedLesson.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-slate-400 font-mono">
                {recommendedLesson.estimated_mins} mins • {recommendedLesson.module_title}
              </span>
            </div>
          ) : (
            <div className="pt-2">
              <Link
                to="/roadmap"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 transition-all inline-flex"
              >
                <span>Explore Full Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Real Statistics Calculated Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Lessons Completed</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white tracking-tight">
              {analytics?.completedLessons || 0}{' '}
              <span className="text-xs text-slate-500 font-normal">/ {analytics?.totalLessons || 0}</span>
            </div>
            <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${analytics?.lessonProgressPct || 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Quiz Accuracy</span>
            <HelpCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white tracking-tight">
              {analytics?.avgQuizAccuracy || 0}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {analytics?.totalQuizAttempts || 0} Assessments Attempted
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Coding Challenges</span>
            <Code2 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white tracking-tight">
              {analytics?.completedChallenges || 0}{' '}
              <span className="text-xs text-slate-500 font-normal">/ {analytics?.totalChallenges || 0}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Simulated sandbox tests passed
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Calculated Mastery</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-amber-400 tracking-tight">
              {analytics?.masteryScore || 0}%
            </div>
            <div className="text-[10px] text-slate-500 mt-1 truncate">
              {analytics?.masteryFormula}
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Quick Actions & 5-Day Sprint Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Path Progress */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Curriculum Learning Paths</span>
            </h2>
            <Link to="/roadmap" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
              View All 5 Paths →
            </Link>
          </div>

          <div className="space-y-3">
            {paths.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-100">{p.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl">{p.description}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {p.progressPercentage}%
                  </span>
                </div>
                <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${p.progressPercentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Hands-on Practice Callout */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/30 via-slate-900 to-slate-950 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider font-mono">
              <Code2 className="w-4 h-4" />
              <span>Coding Practice & Lab</span>
            </div>
            <h3 className="text-sm font-bold text-slate-100">
              Interactive ABAP Sandbox
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Solve hands-on challenges with automated evaluation, test cases, and simulated ABAP runtime execution.
            </p>
            <Link
              to="/practice"
              className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Launch Practice Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Spaced Repetition Due Widget */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Spaced Repetition</span>
              </span>
              <Link to="/flashcards" className="text-indigo-400 hover:text-indigo-300 text-[11px]">
                Review Deck →
              </Link>
            </div>
            <p className="text-xs text-slate-400">
              Reinforce syntax, system fields, and RAP concepts with the SM-2 algorithm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
