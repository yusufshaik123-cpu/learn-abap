import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Code2, HelpCircle, FolderGit2, ArrowRight } from 'lucide-react';
import { api } from '../api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    lessons: any[];
    challenges: any[];
    questions: any[];
    projects: any[];
  }>({ lessons: [], challenges: [], questions: [], projects: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ lessons: [], challenges: [], questions: [], projects: [] });
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.search(query);
        setResults(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const totalResults =
    results.lessons.length +
    results.challenges.length +
    results.questions.length +
    results.projects.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-slate-950/50">
          <Search className="w-5 h-5 text-indigo-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, syntax, CDS, EML, challenges, projects..."
            className="flex-1 bg-transparent border-0 outline-none text-slate-100 placeholder-slate-500 text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-500 hover:text-slate-300 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs rounded bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700"
          >
            Esc
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading && (
            <div className="py-8 text-center text-xs text-slate-500">
              Searching technical knowledge base...
            </div>
          )}

          {!loading && !query && (
            <div className="py-12 text-center text-xs text-slate-500">
              Type keywords such as <span className="text-indigo-400">"internal tables"</span>,{' '}
              <span className="text-indigo-400">"EML"</span>,{' '}
              <span className="text-indigo-400">"CDS view entity"</span>, or{' '}
              <span className="text-indigo-400">"sy-subrc"</span>.
            </div>
          )}

          {!loading && query && totalResults === 0 && (
            <div className="py-12 text-center text-xs text-slate-500">
              No results found matching "{query}". Try checking syntax or broader terms.
            </div>
          )}

          {/* Lessons */}
          {results.lessons.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Lessons ({results.lessons.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.lessons.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      navigate(`/lessons/${item.id}`);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-md">
                        {item.summary || item.module_title}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coding Challenges */}
          {results.challenges.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Challenges ({results.challenges.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.challenges.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      navigate(`/practice`);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-sky-400 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-md">
                        {item.problem_statement}
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 uppercase font-mono">
                      {item.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {results.projects.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Projects ({results.projects.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.projects.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      navigate(`/projects`);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-md">
                        {item.description}
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
