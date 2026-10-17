import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookmarkCheck,
  FileText,
  Bookmark,
  Trash2,
  Plus,
  Search,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { api } from '../api';
import type { PersonalNote, Bookmark as BookmarkType } from '../types';

export const NotesBookmarksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notes' | 'bookmarks'>('notes');
  const [notes, setNotes] = useState<PersonalNote[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('General');
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [n, b] = await Promise.all([
          api.getNotes(),
          api.getBookmarks()
        ]);
        setNotes(n);
        setBookmarks(b);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      const created = await api.createNote({
        title: newTitle,
        content: newContent,
        tag: newTag
      });
      setNotes([created, ...notes]);
      setNewTitle('');
      setNewContent('');
      setIsCreating(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await api.deleteNote(id);
      setNotes(notes.filter(n => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 font-mono">
        Loading saved personal notes and bookmarked lessons...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
          <BookmarkCheck className="w-6 h-6 text-indigo-400" />
          <span>Notes & Bookmarked Lessons</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Quickly retrieve your saved technical insights, code snippet references, and bookmarked roadmap topics.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'notes'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Personal Notes ({notes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'bookmarks'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Bookmarked Lessons ({bookmarks.length})</span>
        </button>
      </div>

      {/* Notes View */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Filter */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes by keyword or tag..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={() => setIsCreating(!isCreating)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-indigo-600/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isCreating ? 'Cancel Note' : 'New Note'}</span>
            </button>
          </div>

          {/* New Note Form */}
          {isCreating && (
            <form
              onSubmit={handleCreateNote}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Create New Study Note
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Note Title (e.g. Hashed table syntax rule)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="sm:col-span-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none focus:border-indigo-500"
                />
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none focus:border-indigo-500"
                >
                  <option value="General">General</option>
                  <option value="Syntax">Syntax</option>
                  <option value="Internal Tables">Internal Tables</option>
                  <option value="OOP">OOP</option>
                  <option value="SQL & CDS">SQL & CDS</option>
                  <option value="RAP">RAP</option>
                </select>
              </div>

              <textarea
                required
                rows={4}
                placeholder="Write your technical explanation, snippet, or reminder..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none focus:border-indigo-500 resize-y"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Save Note
                </button>
              </div>
            </form>
          )}

          {/* Notes Grid */}
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5 flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold uppercase">
                        {note.tag}
                      </span>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-white tracking-tight">{note.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {note.content}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
                    {new Date(note.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
              No notes saved yet. Click "New Note" or take notes directly while reading lessons.
            </div>
          )}
        </div>
      )}

      {/* Bookmarks View */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-3">
          {bookmarks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarks.map((bm) => (
                <Link
                  key={bm.id}
                  to={`/lessons/${bm.id}`}
                  className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between group shadow-sm"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-indigo-400 block">
                      {bm.module_title}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {bm.title}
                    </h3>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
              No bookmarked lessons yet. Click the "Bookmark" button on any lesson to save it for quick review.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
