import React, { useState, useEffect } from 'react';
import {
  Zap,
  CheckCircle2,
  Calendar,
  Clock,
  BookOpen,
  Code2,
  HelpCircle,
  Award,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { api } from '../api';
import { CodeBlock } from '../components/CodeBlock';
import type { SprintDay } from '../types';

export const SprintPage: React.FC = () => {
  const [sprintDays, setSprintDays] = useState<SprintDay[]>([]);
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSprint() {
      try {
        const data = await api.getSprintDays();
        setSprintDays(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSprint();
  }, []);

  const handleToggleTask = async (dayNumber: number, taskId: string) => {
    try {
      const res = await api.toggleSprintTask(dayNumber, taskId);
      setSprintDays(prev =>
        prev.map(d =>
          d.day_number === dayNumber
            ? { ...d, completed_tasks: res.completedTasks, is_completed: res.isCompleted }
            : d
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 font-mono">
        Loading 5-Day ABAP intensive sprint portal...
      </div>
    );
  }

  const activeDay = sprintDays.find(d => d.day_number === activeDayNumber) || sprintDays[0];

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      {/* Sprint Header & Disclaimer Notice */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-amber-400" />
                <span>Accelerated Fundamentals Program</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
              5-Day ABAP Intensive Sprint
            </h1>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-slate-400">
              Days Completed: {sprintDays.filter(d => d.is_completed).length} / 5
            </span>
          </div>
        </div>

        {/* Realistic Expectations Alert Box - Mandatory Requirement */}
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200 text-xs flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Realistic Mastery Notice:</strong> This intensive 5-day sprint is structured to rapidly build essential foundational competency, syntax fluency, and architecture awareness. Complete enterprise proficiency and deep RAP mastery require ongoing project implementation beyond this initial sprint.
          </div>
        </div>
      </div>

      {/* 5-Day Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {sprintDays.map((day) => {
          const isActive = day.day_number === activeDayNumber;
          return (
            <button
              key={day.day_number}
              onClick={() => setActiveDayNumber(day.day_number)}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                isActive
                  ? 'bg-amber-500/15 border-amber-500/40 text-white shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase font-mono tracking-wider">
                  Day {day.day_number}
                </span>
                {day.is_completed && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>
              <div className="text-xs font-bold mt-1 truncate text-slate-200">
                {day.title.split('—')[1]?.trim() || day.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Day Detail Container */}
      {activeDay && (
        <div className="space-y-6">
          {/* Day Title & Focus Area */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-xl">
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
              Focus Area: {activeDay.focus_area}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">{activeDay.title}</h2>
            <p className="text-xs text-slate-400">{activeDay.subtitle}</p>

            {/* Objectives */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Day Learning Objectives
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                {activeDay.objectives.map((obj, oIdx) => (
                  <li key={oIdx} className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Theory & Worked Examples */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Theory Column */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                <BookOpen className="w-4 h-4" />
                <span>Intensive Theory</span>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                {activeDay.theory_md}
              </div>

              {/* Revision Points */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                  Key Revision Points
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeDay.revision_points.map((rp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{rp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Worked Examples Column */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
                <Code2 className="w-4 h-4" />
                <span>Worked Example</span>
              </div>
              {activeDay.code_examples.map((ex, exIdx) => (
                <div key={exIdx} className="space-y-2">
                  <div className="text-xs font-bold text-slate-200">{ex.title}</div>
                  <CodeBlock code={ex.code} expectedOutput={ex.output} />
                </div>
              ))}
            </div>
          </div>

          {/* Practice Tasks & Completion Checklist */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Hands-on Practice Tasks</span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {activeDay.completed_tasks.length} / {activeDay.practice_tasks.length} Tasks Checked
              </span>
            </div>

            <div className="space-y-2.5">
              {activeDay.practice_tasks.map((task) => {
                const isChecked = activeDay.completed_tasks.includes(task.id);
                return (
                  <div
                    key={task.id}
                    onClick={() => handleToggleTask(activeDay.day_number, task.id)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      isChecked
                        ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                        : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-semibold text-slate-100 flex items-center gap-2">
                        <span>{task.title}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {task.description}
                      </p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                        isChecked
                          ? 'border-emerald-500 bg-emerald-600 text-white'
                          : 'border-slate-700 bg-slate-900'
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Criteria Checklist */}
            <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-400 font-mono">
              <span className="text-[11px] font-bold uppercase text-slate-500 block">
                Completion Criteria:
              </span>
              {activeDay.completion_criteria.map((c, cIdx) => (
                <div key={cIdx} className="flex items-center gap-2">
                  <span className="text-indigo-400">✓</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
