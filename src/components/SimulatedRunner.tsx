import React from 'react';
import { Terminal, CheckCircle2, XCircle, AlertTriangle, Clock, ShieldAlert } from 'lucide-react';
import type { ExecutionResult } from '../types';

interface SimulatedRunnerProps {
  result: ExecutionResult | null;
  isRunning?: boolean;
}

export const SimulatedRunner: React.FC<SimulatedRunnerProps> = ({ result, isRunning }) => {
  if (isRunning) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center text-slate-400 font-mono text-xs animate-pulse">
        <Terminal className="w-6 h-6 mx-auto mb-2 text-indigo-400 animate-spin" />
        Simulating ABAP program execution in educational sandbox...
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-xl border border-slate-800/60 bg-slate-950/50 p-6 text-center text-slate-500 font-mono text-xs">
        Click <strong className="text-indigo-400">"Run Simulated ABAP"</strong> to execute this program in the local educational sandbox.
      </div>
    );
  }

  const isSuccess = result.status === 'passed';

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl text-xs font-mono">
      {/* Sandbox Notice Banner - Mandatory Disclaimer */}
      <div className="px-4 py-2 bg-indigo-950/40 border-b border-indigo-900/40 text-[11px] text-indigo-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>{result.environmentNotice}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Clock className="w-3 h-3" />
          <span>{result.executionTimeMs} ms</span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isSuccess ? (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>PASSED ({result.passedTests} / {result.totalTests || 1} Tests)</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
              <XCircle className="w-3.5 h-3.5" />
              <span>TEST FAILED ({result.passedTests} / {result.totalTests || 1} Tests)</span>
            </span>
          )}
        </div>

        {/* System Fields Inspector */}
        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
          <span>
            SY-SUBRC: <strong className={result.systemFields.sySubrc === 0 ? 'text-emerald-400' : 'text-amber-400'}>{result.systemFields.sySubrc}</strong>
          </span>
          <span>
            SY-TABIX: <strong className="text-slate-200">{result.systemFields.syTabix}</strong>
          </span>
          <span>
            SY-INDEX: <strong className="text-slate-200">{result.systemFields.syIndex}</strong>
          </span>
        </div>
      </div>

      {/* Console Standard Output (STDOUT) */}
      <div className="p-4 bg-slate-950 text-slate-300">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Standard Output (STDOUT)
        </div>
        {result.stdout.length > 0 ? (
          <div className="p-3 rounded-lg bg-black/40 border border-slate-800/80 font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed">
            {result.stdout.join('\n')}
          </div>
        ) : (
          <div className="italic text-slate-500 py-1">No console output was produced (e.g. no WRITE or out-&gt;write statements executed).</div>
        )}
      </div>

      {/* Test Case Assertions */}
      {result.testResults.length > 0 && (
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/30">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Test Case Assertions
          </div>
          <div className="space-y-2">
            {result.testResults.map((tr) => (
              <div
                key={tr.testId}
                className={`p-2.5 rounded-lg border flex items-start justify-between ${
                  tr.passed
                    ? 'bg-emerald-950/20 border-emerald-800/30 text-emerald-300'
                    : 'bg-rose-950/20 border-rose-800/30 text-rose-300'
                }`}
              >
                <div>
                  <div className="font-semibold">{tr.description}</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Expected: <span className="font-mono text-slate-200">{tr.expectedOutput}</span>
                  </div>
                  {tr.message && <div className="text-[11px] mt-0.5">{tr.message}</div>}
                </div>
                {tr.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diagnostics / Syntax Notes */}
      {result.diagnostics.length > 0 && (
        <div className="p-3 bg-amber-950/20 border-t border-amber-900/30 text-amber-300 text-[11px] flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Simulator Diagnostics: </span>
            {result.diagnostics.join(' | ')}
          </div>
        </div>
      )}
    </div>
  );
};
