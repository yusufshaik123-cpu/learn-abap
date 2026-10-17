import React, { useState, useEffect } from 'react';
import {
  Code2,
  Play,
  RotateCcw,
  CheckCircle2,
  Lightbulb,
  Eye,
  EyeOff,
  ChevronRight,
  Sparkles,
  Terminal,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { api } from '../api';
import { SimulatedRunner } from '../components/SimulatedRunner';
import type { Challenge, ExecutionResult } from '../types';

export const CodingPracticePage: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState('');
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChallenges() {
      try {
        const data = await api.getChallenges();
        setChallenges(data);
        if (data.length > 0) {
          const first = data[0];
          setSelectedChallenge(first);
          setCode(first.user_code || first.starter_code);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadChallenges();
  }, []);

  const handleSelectChallenge = (ch: Challenge) => {
    setSelectedChallenge(ch);
    setCode(ch.user_code || ch.starter_code);
    setExecutionResult(null);
    setShowSolution(false);
    setShowHints(false);
  };

  const handleRunCode = async () => {
    if (!selectedChallenge) return;
    setIsRunning(true);
    try {
      const res = await api.runCode(selectedChallenge.id, code);
      setExecutionResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitSolution = async () => {
    if (!selectedChallenge) return;
    setIsRunning(true);
    try {
      const res = await api.submitChallenge(selectedChallenge.id, code);
      setExecutionResult(res);
      // Update challenge list status locally
      setChallenges(prev =>
        prev.map(c =>
          c.id === selectedChallenge.id
            ? { ...c, user_status: res.recordedStatus === 'completed' ? 'completed' : 'in_progress' }
            : c
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetCode = () => {
    if (!selectedChallenge) return;
    setCode(selectedChallenge.starter_code);
    setExecutionResult(null);
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 font-mono">
        Loading coding practice challenges and simulation runner...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
            <Code2 className="w-6 h-6 text-indigo-400" />
            <span>Interactive ABAP Coding Sandbox</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Hands-on problem solving with immediate simulated output comparisons and assertion testing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Challenge Selector & Problem Statement (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Challenge Selector Dropdown */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Select Challenge
            </span>
            <div className="space-y-1 max-h-56 overflow-y-auto">
              {challenges.map(ch => (
                <button
                  key={ch.id}
                  onClick={() => handleSelectChallenge(ch)}
                  className={`w-full p-2.5 rounded-lg text-left text-xs transition-all flex items-center justify-between ${
                    selectedChallenge?.id === ch.id
                      ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-200 font-bold'
                      : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300 border border-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {ch.user_status === 'completed' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                    )}
                    <span className="truncate">{ch.title}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                    {ch.difficulty}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Problem Details Card */}
          {selectedChallenge && (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase font-bold">
                  {selectedChallenge.category}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase font-semibold">
                  Difficulty: {selectedChallenge.difficulty}
                </span>
              </div>

              <h2 className="text-base font-bold text-white tracking-tight">
                {selectedChallenge.title}
              </h2>

              <p className="text-slate-300 leading-relaxed">
                {selectedChallenge.problem_statement}
              </p>

              {/* Assumptions & Constraints */}
              <div className="space-y-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-[11px]">
                {selectedChallenge.input_assumptions && (
                  <div>
                    <span className="text-slate-500">Input: </span>
                    <span className="text-slate-300">{selectedChallenge.input_assumptions}</span>
                  </div>
                )}
                {selectedChallenge.expected_output && (
                  <div>
                    <span className="text-slate-500">Expected Output: </span>
                    <span className="text-emerald-400">{selectedChallenge.expected_output}</span>
                  </div>
                )}
                {selectedChallenge.constraints && (
                  <div>
                    <span className="text-slate-500">Constraints: </span>
                    <span className="text-amber-400">{selectedChallenge.constraints}</span>
                  </div>
                )}
              </div>

              {/* Hints Drawer */}
              {selectedChallenge.hints && selectedChallenge.hints.length > 0 && (
                <div>
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{showHints ? 'Hide Hints' : 'View Hints (Tips & Syntax)'}</span>
                  </button>
                  {showHints && (
                    <ul className="mt-2 space-y-1 pl-4 list-disc text-slate-400 text-xs">
                      {selectedChallenge.hints.map((h, idx) => (
                        <li key={idx}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Reference Solution Toggle */}
              <div>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
                >
                  {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showSolution ? 'Hide Reference Solution' : 'View Reference Solution'}</span>
                </button>
                {showSolution && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
                    <pre className="text-xs text-indigo-300 whitespace-pre-wrap">
                      {selectedChallenge.reference_solution}
                    </pre>
                    <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                      {selectedChallenge.solution_explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Code Editor & Simulated Output (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Editor Container */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
            {/* Editor Top Bar */}
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-slate-300 font-semibold">abap_exercise.prog.abap</span>
              </div>
              <button
                onClick={handleResetCode}
                className="px-2 py-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors text-[11px]"
                title="Reset to starter code"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Code Input Textarea */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              rows={16}
              className="w-full p-4 bg-slate-950 text-indigo-200 font-mono text-xs leading-relaxed outline-none resize-y selection:bg-indigo-600/50"
              placeholder="Write your ABAP code here..."
            />

            {/* Action Bar */}
            <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500 font-mono">
                Simulated Sandbox (No live SAP Gateway needed)
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-300" />
                  <span>Run Sandbox</span>
                </button>
                <button
                  onClick={handleSubmitSolution}
                  disabled={isRunning}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-indigo-600/30 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Submit Solution</span>
                </button>
              </div>
            </div>
          </div>

          {/* Simulated Execution Results */}
          <SimulatedRunner result={executionResult} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
};
