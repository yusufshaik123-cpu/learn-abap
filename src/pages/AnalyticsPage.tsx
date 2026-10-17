import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Award,
  BookOpen,
  Code2,
  HelpCircle,
  Clock,
  Sparkles,
  Download,
  Upload,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { api } from '../api';
import type { AnalyticsData } from '../types';

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await api.getAnalytics();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 font-mono">
        Aggregating verified learning analytics and mastery metrics...
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-indigo-400" />
            <span>Progress & Learning Analytics</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Real calculated metrics derived from your database progress records, quiz evaluations, and simulated challenge passes.
          </p>
        </div>

        {/* Export / Backup Action */}
        <a
          href={api.exportDataUrl()}
          download="abap_mastery_backup.json"
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-indigo-400" />
          <span>Export Learner Progress (JSON)</span>
        </a>
      </div>

      {/* Transparent Mastery Calculation Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/20 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider font-mono">
            <Award className="w-4 h-4" />
            <span>Documented Mastery Formula</span>
          </div>
          <span className="text-2xl sm:text-3xl font-mono font-black text-white">
            {data.masteryScore}%
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          Unlike decorative mockups, mastery on ABAP Mastery is mathematically computed from persisted database records:
        </p>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono text-indigo-300">
          Mastery = (40% × Lesson Completion) + (30% × Quiz Accuracy) + (30% × Challenges Solved)
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-slate-400 text-xs font-medium flex items-center justify-between">
            <span>Lessons Finished</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">
            {data.completedLessons}{' '}
            <span className="text-xs text-slate-500 font-normal">/ {data.totalLessons}</span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-1">
            {data.lessonProgressPct}% complete
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-slate-400 text-xs font-medium flex items-center justify-between">
            <span>Average Quiz Score</span>
            <HelpCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">
            {data.avgQuizAccuracy}%
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-1">
            {data.totalQuizAttempts} attempts logged
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-slate-400 text-xs font-medium flex items-center justify-between">
            <span>Challenges Passed</span>
            <Code2 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">
            {data.completedChallenges}{' '}
            <span className="text-xs text-slate-500 font-normal">/ {data.totalChallenges}</span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-1">
            {data.challengeProgressPct}% solved
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-slate-400 text-xs font-medium flex items-center justify-between">
            <span>Total Study Time</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">
            {Math.round(data.totalStudyMins / 60 * 10) / 10}{' '}
            <span className="text-xs text-slate-500 font-normal">hours</span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-1">
            {data.totalStudyMins} active minutes
          </div>
        </div>
      </div>

      {/* Path Level Mastery Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Curriculum Path Breakdown
        </h2>

        <div className="space-y-3">
          {data.pathBreakdown.map((p) => (
            <div key={p.pathId} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>{p.title}</span>
                <span className="font-mono text-slate-400">
                  {p.completed} / {p.total} Lessons ({p.percentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${p.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Recent Study Activity Log
        </h2>

        {data.recentActivity.length > 0 ? (
          <div className="space-y-2">
            {data.recentActivity.map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-200">{act.summary}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  +{act.duration_mins}m • {new Date(act.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-slate-500 py-3">
            No study sessions recorded yet. Start reading lessons or solving challenges to record activity.
          </div>
        )}
      </div>
    </div>
  );
};
