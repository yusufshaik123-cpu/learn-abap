import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  CheckCircle2,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Server,
  Code2,
  FileCheck
} from 'lucide-react';
import { api } from '../api';
import { CodeBlock } from '../components/CodeBlock';
import type { Project } from '../types';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await api.getProjects();
        setProjects(data);
        if (data.length > 0) {
          setActiveProjectId(data[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const handleToggleChecklist = async (projectId: string, itemId: string) => {
    try {
      const res = await api.toggleProjectChecklist(projectId, itemId);
      setProjects(prev =>
        prev.map(p =>
          p.id === projectId
            ? { ...p, checked_items: res.checked, user_status: res.status as any }
            : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProjects = selectedLevel === 'all'
    ? projects
    : projects.filter(p => p.level.toLowerCase() === selectedLevel.toLowerCase());

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 font-mono">
        Loading real-world project guides and capstone specifications...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
          <FolderGit2 className="w-6 h-6 text-indigo-400" />
          <span>Real-World Projects & Capstones</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Apply your knowledge to progressively structured real-world projects. From elementary grading and employee records to enterprise RAP business objects.
        </p>
      </div>

      {/* Level Filters */}
      <div className="flex items-center gap-2">
        {['all', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
              selectedLevel.toLowerCase() === lvl.toLowerCase()
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
            }`}
          >
            {lvl === 'all' ? 'All Levels' : lvl}
          </button>
        ))}
      </div>

      {/* Master Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Project List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          {filteredProjects.map((p) => {
            const isSelected = p.id === activeProject?.id;
            const completedCount = p.checked_items?.length || 0;
            const totalCount = p.checklist?.length || 1;
            const isDone = completedCount >= totalCount;

            return (
              <div
                key={p.id}
                onClick={() => setActiveProjectId(p.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-indigo-600/15 border-indigo-500/40 text-white shadow-lg'
                    : 'bg-slate-900/70 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span
                    className={`px-2 py-0.5 rounded font-bold uppercase ${
                      p.level === 'Beginner'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : p.level === 'Intermediate'
                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}
                  >
                    {p.level}
                  </span>
                  <span className="text-slate-500 font-semibold">
                    {completedCount} / {totalCount} Tasks
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 truncate">{p.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {p.description}
                </p>

                {/* Compatibility badge */}
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>
                    {p.is_sandbox_compatible ? '✅ Local Sandbox Ready' : '⚡ Requires ADT/SAP'}
                  </span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Project Detail Specification (8 cols) */}
        {activeProject && (
          <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
            {/* Project Header */}
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold uppercase">
                  {activeProject.level} Project
                </span>
                {activeProject.is_sandbox_compatible ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Simulated Sandbox Compatible
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold flex items-center gap-1">
                    <Server className="w-3 h-3" />
                    Requires SAP S/4HANA / BTP Trial Backend
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white">{activeProject.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            {/* Objectives & Prerequisites */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="font-bold uppercase tracking-wider text-indigo-400 block font-mono text-[11px]">
                  Project Objectives
                </span>
                <ul className="space-y-1 text-slate-300">
                  {activeProject.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="font-bold uppercase tracking-wider text-sky-400 block font-mono text-[11px]">
                  Prerequisites
                </span>
                <ul className="space-y-1 text-slate-300">
                  {activeProject.prerequisites.map((req, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-sky-400 font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Suggested Data Model */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Suggested Data Model / Structure Definition</span>
              </span>
              <CodeBlock code={activeProject.data_model} title="ABAP Data Model Specification" />
            </div>

            {/* Step-by-Step Milestones */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Project Milestones</span>
              </span>
              <div className="space-y-2">
                {activeProject.milestones.map((ms, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-indigo-400 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{ms}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Completion Checklist (Persisted) */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-mono">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Completion Checklist</span>
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeProject.checked_items?.length || 0} / {activeProject.checklist?.length || 0} Done
                </span>
              </div>

              <div className="space-y-2">
                {activeProject.checklist?.map((item) => {
                  const isChecked = activeProject.checked_items?.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggleChecklist(activeProject.id, item.id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300 font-semibold'
                          : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span>{item.label}</span>
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? 'border-emerald-500 bg-emerald-600 text-white'
                            : 'border-slate-700 bg-slate-800'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
