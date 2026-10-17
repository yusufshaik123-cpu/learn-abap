import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  CheckCircle2,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  Boxes,
  Database,
  Cpu,
  Bookmark
} from 'lucide-react';
import { api } from '../api';
import type { Path } from '../types';

export const RoadmapPage: React.FC = () => {
  const [paths, setPaths] = useState<Path[]>([]);
  const [selectedPathId, setSelectedPathId] = useState<string>('all');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPaths() {
      try {
        const data = await api.getPaths();
        setPaths(data);
        // Default expand first module of each path
        const initExp: Record<string, boolean> = {};
        data.forEach(p => {
          if (p.modules.length > 0) {
            initExp[p.modules[0].id] = true;
          }
        });
        setExpandedModules(initExp);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPaths();
  }, []);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPaths = selectedPathId === 'all'
    ? paths
    : paths.filter(p => p.id === selectedPathId);

  const getPathIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-sky-400" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-400" />;
      default: return <Award className="w-5 h-5 text-amber-400" />;
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 font-mono">
        Loading interactive learning roadmap...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-indigo-400" />
            <span>Interactive Learning Roadmap</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            A comprehensive, prerequisite-based curriculum mapping basic procedural syntax, object-oriented ABAP, modern expressions, and SAP RAP transactional development.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedPathId('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedPathId === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
            }`}
          >
            All Paths
          </button>
          {paths.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPathId(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedPathId === p.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {p.title.split('—')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Paths Container */}
      <div className="space-y-8">
        {filteredPaths.map((path, pIdx) => (
          <div key={path.id} className="space-y-4">
            {/* Path Header Bar */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                  {getPathIcon(path.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white">{path.title}</h2>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
                      {path.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 max-w-xl">{path.description}</p>
                </div>
              </div>

              {/* Path Progress */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-200">
                    {path.completedLessons} / {path.totalLessons} Lessons
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {path.progressPercentage}% Completed
                  </div>
                </div>
                <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${path.progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-0 sm:pl-4">
              {path.modules.map((mod) => {
                const isExpanded = Boolean(expandedModules[mod.id]);
                return (
                  <div
                    key={mod.id}
                    className="rounded-xl border border-slate-800 bg-slate-950/70 hover:border-slate-700 transition-all flex flex-col justify-between overflow-hidden shadow-sm"
                  >
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 font-mono">
                          Module {mod.order_index}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                          <Clock className="w-3 h-3" />
                          <span>{mod.estimated_mins}m</span>
                        </div>
                      </div>

                      <h3 className="text-sm font-semibold text-slate-100">{mod.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {mod.description}
                      </p>

                      <div className="text-[10px] text-slate-500 font-mono bg-slate-900/80 px-2 py-1 rounded border border-slate-800/80">
                        {mod.course_reference}
                      </div>
                    </div>

                    {/* Lessons Drawer Header */}
                    <div className="border-t border-slate-800/80 bg-slate-900/40">
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 transition-colors font-medium"
                      >
                        <span>
                          {mod.completedLessons} of {mod.totalLessons} Lessons Done
                        </span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {/* Expandable Lesson List */}
                      {isExpanded && (
                        <div className="px-4 pb-3 space-y-1.5 border-t border-slate-800/60 pt-2">
                          {mod.lessons.map((les) => (
                            <Link
                              key={les.id}
                              to={`/lessons/${les.id}`}
                              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs flex items-center justify-between group transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                {les.user_status === 'completed' ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                ) : (
                                  <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                                )}
                                <span className="text-slate-300 group-hover:text-indigo-400 transition-colors truncate max-w-[180px]">
                                  {les.title}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-slate-500">
                                {les.estimated_mins}m
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
