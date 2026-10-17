import React from 'react';
import { Search, Moon, Sun, Flame, Sparkles, BookOpen } from 'lucide-react';
import type { LearnerProfile } from '../types';

interface NavbarProps {
  profile: LearnerProfile | null;
  onOpenSearch: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenSearch,
  isDark,
  onToggleTheme
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
      {/* Product Brand */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black text-sm tracking-tighter">
          AM
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-slate-100">
              ABAP Mastery
            </span>
            <span className="hidden sm:inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              S/4HANA & RAP
            </span>
          </div>
          <p className="hidden md:block text-xs text-slate-400 font-medium">
            Learn. Practice. Build. Master.
          </p>
        </div>
      </div>

      {/* Center Search Bar Trigger */}
      <div className="flex-1 max-w-md mx-4 hidden sm:block">
        <button
          onClick={onOpenSearch}
          className="w-full h-9 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 flex items-center justify-between text-xs transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            <span>Search topics, syntax, CDS, EML, RAP...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-400 border border-slate-700">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Study Streak */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <Flame className="w-4 h-4 fill-amber-500/20 text-amber-500 animate-pulse" />
          <span>{profile?.streak_days || 1} Day Streak</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Learner Profile Pill - Strict Privacy Compliant */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-indigo-400">
            AD
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-slate-200">
              {profile?.display_name || 'Learner'}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {profile?.role_title || 'ABAP Developer'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
