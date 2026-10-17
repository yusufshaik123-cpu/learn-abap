import React, { useState } from 'react';
import { User, Sparkles, Check, X, Shield, Plus, ArrowRight } from 'lucide-react';
import { api } from '../api';
import type { UserProfile } from '../types';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: UserProfile | null;
  users: UserProfile[];
  onUserChanged: (user: UserProfile) => void;
}

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  activeUser,
  users,
  onUserChanged
}) => {
  const [isCreating, setIsCreating] = useState(users.length === 0);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [roleTitle, setRoleTitle] = useState('ABAP Developer');
  const [avatarColor, setAvatarColor] = useState('indigo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const colorOptions = [
    { name: 'indigo', class: 'bg-indigo-600' },
    { name: 'purple', class: 'bg-purple-600' },
    { name: 'sky', class: 'bg-sky-500' },
    { name: 'emerald', class: 'bg-emerald-500' },
    { name: 'amber', class: 'bg-amber-500' },
    { name: 'rose', class: 'bg-rose-500' }
  ];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username handle is required');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await api.createUser({
        username,
        display_name: displayName.trim() || username.trim(),
        role_title: roleTitle,
        avatar_color: avatarColor
      });
      if (res.user) {
        onUserChanged(res.user);
        setUsername('');
        setDisplayName('');
        setIsCreating(false);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create user');
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Learner Profiles & Leaderboard</h2>
              <p className="text-[11px] text-slate-400">Switch between profiles or create a new user</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {/* Active Profile Card */}
          {activeUser && !isCreating && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white text-base shadow-lg ${
                  activeUser.avatar_color === 'purple' ? 'bg-purple-600 shadow-purple-600/20' :
                  activeUser.avatar_color === 'emerald' ? 'bg-emerald-600 shadow-emerald-600/20' :
                  activeUser.avatar_color === 'sky' ? 'bg-sky-600 shadow-sky-600/20' :
                  activeUser.avatar_color === 'amber' ? 'bg-amber-600 shadow-amber-600/20' :
                  'bg-indigo-600 shadow-indigo-600/20'
                }`}>
                  {activeUser.display_name?.slice(0, 2).toUpperCase() || 'AB'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{activeUser.display_name}</span>
                    <span className="text-[10px] font-mono text-slate-400">@{activeUser.username}</span>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-bold uppercase">
                      Active
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {activeUser.role_title} • <strong className="text-amber-400">{activeUser.xp} XP</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form to Create New User */}
          {isCreating ? (
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5 font-mono">
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Learner Account</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Username Handle (Unique ID)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 font-mono text-xs">@</span>
                    <input
                      type="text"
                      required
                      placeholder="abap_coder"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase())}
                      className="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 font-mono outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    placeholder="Learner"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Role & Target Level
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
                    <option value="RAP Enterprise Architect">RAP Enterprise Architect</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Avatar Theme Color
                  </label>
                  <div className="flex items-center gap-2">
                    {colorOptions.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setAvatarColor(c.name)}
                        className={`w-7 h-7 rounded-xl ${c.class} flex items-center justify-center transition-transform ${
                          avatarColor === c.name ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        {avatarColor === c.name && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                {users.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{loading ? 'Creating Profile...' : 'Save & Start Learning'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Saved Profiles on this Platform
                </span>
                <button
                  onClick={() => setIsCreating(true)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Create Another User</span>
                </button>
              </div>

              <div className="space-y-1.5">
                {users.map((u) => {
                  const isCurrent = activeUser?.id === u.id;
                  return (
                    <div
                      key={u.id}
                      onClick={() => !isCurrent && handleSwitch(u.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-slate-950 border-indigo-500/50 text-white'
                          : 'bg-slate-950/60 hover:bg-slate-800 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white ${
                          u.avatar_color === 'purple' ? 'bg-purple-600' :
                          u.avatar_color === 'emerald' ? 'bg-emerald-600' :
                          u.avatar_color === 'sky' ? 'bg-sky-600' :
                          u.avatar_color === 'amber' ? 'bg-amber-600' :
                          'bg-indigo-600'
                        }`}>
                          {u.display_name?.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>{u.display_name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">@{u.username}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {u.role_title} • {u.xp} XP
                          </div>
                        </div>
                      </div>

                      {isCurrent ? (
                        <span className="text-[10px] font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                          Active
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1">
                          <span>Switch</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
