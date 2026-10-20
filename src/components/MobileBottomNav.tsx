import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Code2,
  HelpCircle,
  Trophy,
  Menu
} from 'lucide-react';
import { Capacitor } from '@capacitor/core';

interface MobileBottomNavProps {
  onOpenMenu: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenMenu }) => {
  const isNative = Capacitor.isNativePlatform();

  const tabs = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/roadmap', label: 'Roadmap', icon: Compass },
    { to: '/practice', label: 'Practice', icon: Code2 },
    { to: '/quizzes', label: 'Quizzes', icon: HelpCircle },
    { to: '/leaderboard', label: 'Rank', icon: Trophy, badge: 'XP' },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-xl px-2 flex items-center justify-around select-none shadow-2xl"
      style={{
        paddingBottom: isNative ? 'max(env(safe-area-inset-bottom, 10px), 10px)' : 'env(safe-area-inset-bottom, 0px)',
        height: isNative ? 'calc(3.75rem + max(env(safe-area-inset-bottom, 10px), 10px))' : '3.75rem'
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-medium transition-all ${
                isActive
                  ? 'text-indigo-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`p-1 rounded-lg transition-all relative ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-400 scale-105 shadow-sm shadow-indigo-500/20'
                      : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.badge && !isActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-slate-950" />
                  )}
                </div>
                <span className="mt-0.5 tracking-tight text-[10px] truncate max-w-[50px]">
                  {tab.label}
                </span>
              </>
            )}
          </NavLink>
        );
      })}

      {/* More / Menu Drawer Toggle */}
      <button
        onClick={onOpenMenu}
        className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-medium text-slate-400 hover:text-slate-200 transition-all"
        title="More Navigation Options"
      >
        <div className="p-1 rounded-lg hover:bg-slate-900 transition-colors">
          <Menu className="w-4 h-4 text-slate-400" />
        </div>
        <span className="mt-0.5 tracking-tight text-[10px]">More</span>
      </button>
    </nav>
  );
};
