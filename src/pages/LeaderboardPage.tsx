import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Medal,
  Flame,
  Award,
  Sparkles,
  BookOpen,
  Code2,
  CheckCircle2,
  Cloud,
  CloudCheck,
  RefreshCw,
  UserPlus,
  ArrowUpRight,
  TrendingUp,
  Shield
} from 'lucide-react';
import { api } from '../api';
import type { UserProfile, LeaderboardResponse } from '../types';

interface LeaderboardPageProps {
  onOpenUserModal: () => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ onOpenUserModal }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardResponse | null>(null);
  const [filter, setFilter] = useState<'all' | 'xp' | 'challenges' | 'streak'>('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeaderboard = async () => {
    try {
      const data = await api.getLeaderboard();
      setLeaderboardData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchLeaderboard();
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 font-mono">
        Loading global ABAP platform leaderboard and Supabase ranks...
      </div>
    );
  }

  const users = [...(leaderboardData?.leaderboard || [])];

  // Sorting based on filter
  if (filter === 'challenges') {
    users.sort((a, b) => (b.challenges_solved || 0) - (a.challenges_solved || 0));
  } else if (filter === 'streak') {
    users.sort((a, b) => (b.streak_days || 0) - (a.streak_days || 0));
  } else {
    users.sort((a, b) => b.xp - a.xp);
  }

  const top3 = users.slice(0, 3);
  const remaining = users.slice(3);
  const activeUser = leaderboardData?.activeUser;

  // Find active user's rank
  const myRankIndex = users.findIndex(u => u.isCurrentUser || u.id === activeUser?.id);
  const myRank = myRankIndex >= 0 ? myRankIndex + 1 : 1;
  const userAhead = myRankIndex > 0 ? users[myRankIndex - 1] : null;
  const xpNeeded = userAhead && activeUser ? Math.max(0, userAhead.xp - activeUser.xp + 10) : 0;

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Trophy className="w-3.5 h-3.5 fill-amber-400" />
              <span>Global Rankings</span>
            </span>
            {leaderboardData?.cloudSynced ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono flex items-center gap-1">
                <Cloud className="w-3 h-3" />
                <span>Supabase Cloud Synced</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-mono flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Local Platform Leaderboard</span>
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
            Platform Developer Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 max-w-2xl">
            Compete with fellow ABAP learners worldwide. Earn XP by completing lessons, passing quizzes, and solving coding challenges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Refresh Leaderboard"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-indigo-400' : ''}`} />
          </button>
          <button
            onClick={onOpenUserModal}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Profile / Switch User</span>
          </button>
        </div>
      </div>

      {/* Active User Rank Banner */}
      {activeUser && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-600/30">
              #{myRank}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{activeUser.display_name}</span>
                <span className="text-xs text-slate-400 font-mono">@{activeUser.username}</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase">
                  You
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                {activeUser.role_title} • <strong className="text-amber-400">{activeUser.xp} XP</strong> • {activeUser.streak_days || 1} day streak
              </div>
            </div>
          </div>

          <div className="text-right text-xs">
            {myRank > 1 && userAhead ? (
              <div className="flex items-center gap-1.5 text-slate-300 font-mono">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>
                  Only <strong className="text-indigo-400">{xpNeeded} XP</strong> to overtake @{userAhead.username} (Rank #{myRank - 1})
                </span>
              </div>
            ) : (
              <div className="text-emerald-400 font-bold font-mono flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                <span>You're leading the platform leaderboard!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Top 3 Podium Cards */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* 2nd Place Silver */}
          <div className="order-2 sm:order-1 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between items-center text-center relative overflow-hidden shadow-lg hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-black text-sm flex items-center justify-center mb-2">
              🥈 2
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">{top3[1].display_name}</h3>
              <div className="text-[11px] text-slate-400 font-mono">@{top3[1].username}</div>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 mt-1">
                {top3[1].role_title}
              </span>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 w-full flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Total XP</span>
              <span className="text-amber-400 font-bold text-sm">{top3[1].xp}</span>
            </div>
          </div>

          {/* 1st Place Gold */}
          <div className="order-1 sm:order-2 p-6 rounded-3xl bg-gradient-to-b from-amber-950/30 via-slate-900 to-slate-950 border-2 border-amber-500/40 flex flex-col justify-between items-center text-center relative overflow-hidden shadow-2xl scale-105">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black text-base flex items-center justify-center mb-2 animate-bounce">
              🥇 1
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-white">{top3[0].display_name}</h3>
              <div className="text-xs text-amber-400 font-mono">@{top3[0].username}</div>
              <span className="inline-block text-[10px] font-mono px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold mt-1">
                {top3[0].role_title}
              </span>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-500/20 w-full flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Total XP</span>
              <span className="text-amber-300 font-extrabold text-base">{top3[0].xp}</span>
            </div>
          </div>

          {/* 3rd Place Bronze */}
          <div className="order-3 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between items-center text-center relative overflow-hidden shadow-lg hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-amber-600 border border-amber-800/40 font-black text-sm flex items-center justify-center mb-2">
              🥉 3
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">{top3[2].display_name}</h3>
              <div className="text-[11px] text-slate-400 font-mono">@{top3[2].username}</div>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 mt-1">
                {top3[2].role_title}
              </span>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 w-full flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Total XP</span>
              <span className="text-amber-400 font-bold text-sm">{top3[2].xp}</span>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { key: 'all', label: 'All-Time XP' },
          { key: 'challenges', label: 'Top Coding Solvers' },
          { key: 'streak', label: 'Longest Streaks' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filter === tab.key
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase font-mono tracking-wider">
              <tr>
                <th className="py-3 px-4 w-16">Rank</th>
                <th className="py-3 px-4">Learner</th>
                <th className="py-3 px-4">Role Title</th>
                <th className="py-3 px-4 text-center">Lessons</th>
                <th className="py-3 px-4 text-center">Challenges</th>
                <th className="py-3 px-4 text-center">Streak</th>
                <th className="py-3 px-4 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {users.map((u, idx) => {
                const isCurrent = u.isCurrentUser || u.id === activeUser?.id;
                const rankNum = idx + 1;

                return (
                  <tr
                    key={u.id || u.username}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-indigo-950/30 text-white font-bold'
                        : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <td className="py-3 px-4">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${
                        rankNum === 1 ? 'bg-amber-500/20 text-amber-400 font-black' :
                        rankNum === 2 ? 'bg-slate-700/40 text-slate-200' :
                        rankNum === 3 ? 'bg-amber-800/30 text-amber-500' :
                        'text-slate-500'
                      }`}>
                        {rankNum}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white ${
                          u.avatar_color === 'purple' ? 'bg-purple-600' :
                          u.avatar_color === 'emerald' ? 'bg-emerald-600' :
                          u.avatar_color === 'sky' ? 'bg-sky-600' :
                          u.avatar_color === 'amber' ? 'bg-amber-600' :
                          'bg-indigo-600'
                        }`}>
                          {u.display_name?.slice(0, 2).toUpperCase() || 'AB'}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-100 flex items-center gap-1.5 font-sans">
                            <span>{u.display_name}</span>
                            {isCurrent && (
                              <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-bold uppercase">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500">@{u.username}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60">
                        {u.role_title}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center text-slate-400">
                      {u.lessons_completed || 0}
                    </td>

                    <td className="py-3 px-4 text-center text-sky-400 font-semibold">
                      {u.challenges_solved || 0}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                        <Flame className="w-3 h-3 fill-amber-400" />
                        <span>{u.streak_days || 1}d</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span className="text-amber-400 font-extrabold text-sm">
                        {u.xp} XP
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
