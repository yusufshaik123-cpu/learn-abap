import React from 'react';
import { Search, Moon, Sun, Flame, Menu } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import type { LearnerProfile } from '../types';

interface NavbarProps {
  profile: LearnerProfile | null;
  activeUser?: any;
  onOpenSearch: () => void;
  onOpenUserModal: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onToggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeUser,
  onOpenSearch,
  onOpenUserModal,
  isDark,
  onToggleTheme,
  onToggleMobileMenu
}) => {
  const isNative = Capacitor.isNativePlatform();
  const displayName = activeUser?.display_name || profile?.display_name || 'Learner';
  const roleTitle = activeUser?.role_title || profile?.role_title || 'ABAP Developer';
  const avatarInitials = displayName.slice(0, 2).toUpperCase();

  return (
    <header
      className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between transition-all"
      style={{
        paddingTop: isNative ? 'max(env(safe-area-inset-top, 28px), 28px)' : 'env(safe-area-inset-top, 0px)',
        height: isNative ? 'calc(4rem + max(env(safe-area-inset-top, 28px), 28px))' : '4rem'
      }}
    >
      {/* Product Brand & Mobile Hamburger */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Hamburger Drawer Button */}
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Open Menu"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5 text-indigo-400" />
        </button>

        {/* Brand Logo */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black text-xs sm:text-sm tracking-tighter shrink-0">
          AM
        </div>

        <div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-bold text-sm sm:text-base tracking-tight text-slate-100 whitespace-nowrap">
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

      {/* Center Search Bar Trigger (Visible on sm: and up) */}
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
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Icon */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300"
          title="Search"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Study Streak */}
        <div className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold shrink-0">
          <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-500/20 text-amber-500 animate-pulse" />
          <span>{activeUser?.streak_days || profile?.streak_days || 1}d</span>
        </div>

        {/* Theme Toggle: Bright & Dark Mode */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          title={isDark ? "Switch to Bright Mode" : "Switch to Dark Mode"}
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Learner Profile Button - Click to switch/create user */}
        <button
          onClick={onOpenUserModal}
          className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-800 hover:opacity-80 transition-opacity text-left group shrink-0"
          title="Manage Learner Profile / Switch User"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm ring-2 ring-indigo-500/30 ${
            activeUser?.avatar_color === 'purple' ? 'bg-purple-600' :
            activeUser?.avatar_color === 'emerald' ? 'bg-emerald-600' :
            activeUser?.avatar_color === 'sky' ? 'bg-sky-600' :
            activeUser?.avatar_color === 'amber' ? 'bg-amber-600' :
            'bg-indigo-600'
          }`}>
            {avatarInitials}
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors flex items-center gap-1">
              <span>{displayName}</span>
              {activeUser?.xp && (
                <span className="text-[10px] text-amber-400 font-mono">({activeUser.xp} XP)</span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {roleTitle}
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};
