import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  FileCode,
  HelpCircle,
  Code2,
  Sparkles,
  FolderGit2,
  CalendarCheck,
  BarChart3,
  BookmarkCheck,
  Trophy,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { Capacitor } from '@capacitor/core';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const isNative = Capacitor.isNativePlatform();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy, badge: 'Rank' },
    { to: '/roadmap', label: 'Roadmap', icon: Compass },
    { to: '/quizzes', label: 'Quiz Center', icon: HelpCircle },
    { to: '/practice', label: 'Coding Practice', icon: Code2 },
    { to: '/flashcards', label: 'Flashcards', icon: Sparkles },
    { to: '/projects', label: 'Projects & Capstones', icon: FolderGit2 },
    { to: '/planner', label: 'Daily Planner', icon: CalendarCheck },
    { to: '/analytics', label: 'Analytics & Mastery', icon: BarChart3 },
    { to: '/notes', label: 'Notes & Bookmarks', icon: BookmarkCheck },
  ];

  return (
    <>
      {/* 1. Desktop Persistent Sidebar (Only visible on md: screens and wider) */}
      <aside
        className={`hidden md:flex relative z-20 flex-col border-r border-slate-800 bg-slate-950/95 transition-all duration-200 select-none ${
          isCollapsed ? 'w-16' : 'w-60'
        }`}
      >
        {/* Navigation list */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                  }`
                }
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse toggle button */}
        <div className="p-2 border-t border-slate-800 flex justify-end">
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* 2. Mobile Off-Canvas Drawer (Only for screens smaller than md:) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] flex flex-col bg-slate-950 border-r border-slate-800 shadow-2xl transition-transform duration-300 ease-out select-none md:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          paddingTop: isNative ? 'max(env(safe-area-inset-top, 24px), 24px)' : 'env(safe-area-inset-top, 0px)',
          paddingBottom: isNative ? 'max(env(safe-area-inset-bottom, 16px), 16px)' : 'env(safe-area-inset-bottom, 0px)'
        }}
      >
        {/* Mobile Drawer Header */}
        <div className="h-16 px-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center font-black text-white text-sm shadow-md shadow-indigo-500/30">
              AM
            </div>
            <div>
              <span className="font-bold text-sm text-slate-100 tracking-tight block">
                ABAP Mastery
              </span>
              <span className="text-[10px] text-indigo-400 font-medium block">
                Curriculum & Tools
              </span>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Close Menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Navigation List */}
        <nav className="flex-1 py-3 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80 active:bg-slate-800'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Drawer Footer */}
        <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 font-mono text-center shrink-0">
          ABAP Mastery • S/4HANA & RAP
        </div>
      </aside>
    </>
  );
};
