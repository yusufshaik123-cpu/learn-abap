import React, { useState } from 'react';
import { Copy, Check, Terminal, Play } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  title?: string;
  language?: string;
  expectedOutput?: string;
  onRunInSandbox?: () => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  title,
  language = 'abap',
  expectedOutput,
  onRunInSandbox
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  // Simple token highlighter for ABAP syntax
  const highlightAbap = (line: string) => {
    // If comment
    if (line.trim().startsWith('*') || line.trim().startsWith('"')) {
      return <span className="text-slate-500 italic">{line}</span>;
    }

    // Split words while preserving spaces
    const tokens = line.split(/(\s+|[(),=.~|])/);
    const keywords = new Set([
      'DATA', 'TYPES', 'CONSTANTS', 'TYPE', 'VALUE', 'TABLE', 'OF', 'WITH', 'EMPTY', 'KEY', 'UNIQUE', 'NON-UNIQUE',
      'SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'GROUP', 'INTO', 'CORRESPONDING', 'FIELDS',
      'IF', 'ELSEIF', 'ELSE', 'ENDIF', 'CASE', 'WHEN', 'ENDCASE', 'DO', 'TIMES', 'ENDDO', 'WHILE', 'ENDWHILE',
      'LOOP', 'AT', 'ENDLOOP', 'APPEND', 'INSERT', 'SORT', 'READ', 'DELETE', 'MODIFY', 'CLEAR',
      'CLASS', 'DEFINITION', 'IMPLEMENTATION', 'ENDCLASS', 'PUBLIC', 'PROTECTED', 'PRIVATE', 'SECTION',
      'METHODS', 'CLASS-METHODS', 'IMPORTING', 'EXPORTING', 'RETURNING', 'CHANGING', 'RAISING',
      'TRY', 'CATCH', 'ENDTRY', 'NEW', 'COND', 'SWITCH', 'WRITE', 'WRITE:',
      'INTERFACES', 'FINAL', 'ABSTRACT', 'CREATE', 'MANAGED', 'STRICT', 'DEFINE', 'BEHAVIOR', 'FOR', 'ALIAS',
      'LOCK', 'MASTER', 'AUTHORIZATION', 'VALIDATION', 'DETERMINATION', 'ACTION', 'ENTITIES', 'COMMIT'
    ]);

    const systemFields = new Set([
      'sy-subrc', 'sy-index', 'sy-tabix', 'sy-uname', 'sy-datum', 'sy-uzeit', 'sy-dbcnt'
    ]);

    return tokens.map((token, idx) => {
      const upper = token.toUpperCase();
      if (keywords.has(upper)) {
        return <span key={idx} className="text-indigo-400 font-semibold">{token}</span>;
      }
      if (systemFields.has(token.toLowerCase())) {
        return <span key={idx} className="text-pink-400 font-semibold">{token}</span>;
      }
      if (/^'[^']*'$/.test(token) || /^`[^`]*`$/.test(token) || /^\|[^|]*\|$/.test(token)) {
        return <span key={idx} className="text-emerald-400">{token}</span>;
      }
      if (/^\d+(\.\d+)?$/.test(token)) {
        return <span key={idx} className="text-amber-400">{token}</span>;
      }
      return <span key={idx}>{token}</span>;
    });
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/90 overflow-hidden my-4 shadow-lg">
      {/* Code Header */}
      <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-mono font-medium text-slate-300">{title || `ABAP (${language.toUpperCase()})`}</span>
        </div>
        <div className="flex items-center gap-2">
          {onRunInSandbox && (
            <button
              onClick={onRunInSandbox}
              className="px-2 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 transition-colors text-[11px]"
            >
              <Play className="w-3 h-3 fill-indigo-400" />
              <span>Test in Sandbox</span>
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code Body with Line Numbers */}
      <div className="p-3 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed">
        {lines.map((line, idx) => (
          <div key={idx} className="flex">
            <span className="w-8 shrink-0 text-slate-600 select-none text-right pr-3 font-mono">
              {idx + 1}
            </span>
            <span className="flex-1 whitespace-pre">{highlightAbap(line)}</span>
          </div>
        ))}
      </div>

      {/* Expected Output Drawer */}
      {expectedOutput && (
        <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-800 text-xs font-mono">
          <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block mb-1">
            Expected Console Output
          </span>
          <div className="text-emerald-400 whitespace-pre-wrap">{expectedOutput}</div>
        </div>
      )}
    </div>
  );
};
