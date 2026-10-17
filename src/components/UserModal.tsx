import React, { useState, useEffect } from 'react';
import { User, Sparkles, Check, X, Shield, Plus, ArrowRight, Lock, LogIn, LogOut, KeyRound } from 'lucide-react';
import { api } from '../api';
import type { UserProfile } from '../types';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: UserProfile | null;
  users: UserProfile[];
  onUserChanged: (user: UserProfile) => void;
  onLogout?: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  activeUser,
  users,
  onUserChanged,
  onLogout
}) => {
  const [tab, setTab] = useState<'login' | 'register' | 'profile'>('register');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [roleTitle, setRoleTitle] = useState('ABAP Developer');
  const [avatarColor, setAvatarColor] = useState('indigo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!activeUser) {
      setTab(users.length > 0 ? 'login' : 'register');
    } else {
      setTab('profile');
    }
    setError('');
  }, [activeUser, isOpen, users.length]);

  if (!isOpen) return null;

  const colorOptions = [
    { name: 'indigo', class: 'bg-indigo-600' },
    { name: 'purple', class: 'bg-purple-600' },
    { name: 'sky', class: 'bg-sky-500' },
    { name: 'emerald', class: 'bg-emerald-500' },
    { name: 'amber', class: 'bg-amber-500' },
    { name: 'rose', class: 'bg-rose-500' }
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (!cleanUser) {
      setError('Username handle is required (alphanumeric and underscore only)');
      return;
    }
    if (cleanUser.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.register({
        username: cleanUser,
        password,
        display_name: displayName.trim() || cleanUser,
        role_title: roleTitle,
        avatar_color: avatarColor
      });
      if (res.user) {
        onUserChanged(res.user);
        setUsername('');
        setPassword('');
        setDisplayName('');
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (!cleanUser) {
      setError('Username is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.login({
        username: cleanUser,
        password
      });
      if (res.user) {
        onUserChanged(res.user);
        setUsername('');
        setPassword('');
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Check your username and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = async (userId: string) => {
    setLoading(true);
    try {
      const res = await api.switchUser(userId);
      if (res.activeUser) {
        onUserChanged(res.activeUser);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to switch user');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutClick = async () => {
    setLoading(true);
    try {
      if (onLogout) {
        onLogout();
      } else {
        await api.logout();
        onUserChanged(null as any);
      }
      setTab('login');
      setUsername('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  const isMandatory = !activeUser;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                {isMandatory ? 'Welcome to ABAP Mastery' : 'Learner Account & Profiles'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {isMandatory ? 'Sign in or create your learner account to begin' : 'Manage your credentials and sync to the leaderboard'}
              </p>
            </div>
          </div>
          {!isMandatory && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tab selection */}
        <div className="grid grid-cols-2 border-b border-slate-800 bg-slate-950/40 text-xs font-semibold">
          {activeUser ? (
            <>
              <button
                type="button"
                onClick={() => setTab('profile')}
                className={`py-3 text-center transition-colors border-b-2 ${
                  tab === 'profile'
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                My Account
              </button>
              <button
                type="button"
                onClick={() => setTab('register')}
                className={`py-3 text-center transition-colors border-b-2 ${
                  tab === 'register'
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Create New User
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => { setTab('register'); setError(''); }}
                className={`py-3 text-center transition-colors border-b-2 ${
                  tab === 'register'
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => { setTab('login'); setError(''); }}
                className={`py-3 text-center transition-colors border-b-2 ${
                  tab === 'login'
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
            </>
          )}
        </div>

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/50 text-rose-300 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* TAB: REGISTER */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Username Handle <span className="text-indigo-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 font-mono text-xs">@</span>
                  <input
                    type="text"
                    required
                    placeholder="learner_1"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    className="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 font-mono outline-none focus:border-indigo-500"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Unique handle for global leaderboard rankings</p>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Password <span className="text-indigo-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500"><Lock className="w-3.5 h-3.5" /></span>
                  <input
                    type="password"
                    required
                    placeholder="Enter account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  placeholder="ABAP Learner"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Role & Learning Track
                </label>
                <select
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 outline-none focus:border-indigo-500 font-mono"
                >
                  <option value="ABAP Beginner">ABAP Beginner</option>
                  <option value="ABAP Developer">ABAP Developer</option>
                  <option value="Clean ABAP Craftsman">Clean ABAP Craftsman</option>
                  <option value="SAP S/4HANA Consultant">SAP S/4HANA Consultant</option>
                  <option value="RAP Cloud Architect">RAP Cloud Architect</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">
                  Avatar Color
                </label>
                <div className="flex items-center gap-2">
                  {colorOptions.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setAvatarColor(c.name)}
                      className={`w-7 h-7 rounded-xl ${c.class} flex items-center justify-center transition-transform ${
                        avatarColor === c.name ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      {avatarColor === c.name && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{loading ? 'Creating Account...' : 'Create Account & Begin'}</span>
                </button>
              </div>

              {isMandatory && (
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => { setTab('login'); setError(''); }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    Already have an account? Sign in →
                  </button>
                </div>
              )}
            </form>
          )}

          {/* TAB: LOGIN */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Username Handle
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 font-mono text-xs">@</span>
                  <input
                    type="text"
                    required
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 font-mono outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500"><Lock className="w-3.5 h-3.5" /></span>
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50 transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => { setTab('register'); setError(''); }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Need a new account? Register here →
                </button>
              </div>
            </form>
          )}

          {/* TAB: PROFILE MANAGEMENT */}
          {tab === 'profile' && activeUser && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-base shadow-lg ${
                    activeUser.avatar_color === 'purple' ? 'bg-purple-600' :
                    activeUser.avatar_color === 'emerald' ? 'bg-emerald-600' :
                    activeUser.avatar_color === 'sky' ? 'bg-sky-600' :
                    activeUser.avatar_color === 'amber' ? 'bg-amber-600' :
                    'bg-indigo-600'
                  }`}>
                    {activeUser.display_name?.slice(0, 2).toUpperCase() || 'AB'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{activeUser.display_name}</span>
                      <span className="text-[11px] font-mono text-slate-400">@{activeUser.username}</span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      {activeUser.role_title}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-amber-400 font-mono">{activeUser.xp} XP</div>
                  <div className="text-[10px] text-slate-400">{activeUser.streak_days || 1} day streak</div>
                </div>
              </div>

              {/* Other accounts on device if any */}
              {users.length > 1 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Switch Registered User
                  </div>
                  <div className="space-y-1.5">
                    {users.filter(u => u.id !== activeUser.id).map(u => (
                      <div
                        key={u.id}
                        onClick={() => handleSwitch(u.id)}
                        className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white ${
                            u.avatar_color === 'purple' ? 'bg-purple-600' :
                            u.avatar_color === 'emerald' ? 'bg-emerald-600' :
                            u.avatar_color === 'sky' ? 'bg-sky-600' :
                            'bg-indigo-600'
                          }`}>
                            {u.display_name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-200">{u.display_name}</span>
                            <span className="text-[10px] text-slate-500 font-mono ml-1.5">@{u.username}</span>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
                          <span>Switch</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Logout Button */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl border border-rose-800/40 hover:bg-rose-950/20 text-rose-400 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
