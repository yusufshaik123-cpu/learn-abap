import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  FileCode,
  HelpCircle,
  Code2,
  Sparkles,
  Zap,
  FolderGit2,
  CalendarCheck,
  BarChart3,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/roadmap', label: 'Roadmap', icon: Compass },
    { to: '/quizzes', label: 'Quiz Center', icon: HelpCircle },
    { to: '/practice', label: 'Coding Practice', icon: Code2 },
    { to: '/flashcards', label: 'Flashcards', icon: Sparkles },
    { to: '/sprint', label: '5-Day Sprint', icon: Zap, badge: 'Intensive' },
    { to: '/projects', label: 'Projects & Capstones', icon: FolderGit2 },
    { to: '/planner', label: 'Daily Planner', icon: CalendarCheck },
    { to: '/analytics', label: 'Analytics & Mastery', icon: BarChart3 },
    { to: '/notes', label: 'Notes & Bookmarks', icon: BookmarkCheck },
  ];

  return (
    <aside
      className={`relative z-20 flex flex-col border-r border-slate-800 bg-slate-950/95 transition-all duration-200 select-none ${
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

      {/* Collapse button */}
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
  );
};
