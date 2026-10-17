import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { SearchModal } from './components/SearchModal';
import { DashboardPage } from './pages/DashboardPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { LessonReaderPage } from './pages/LessonReaderPage';
import { QuizCenterPage } from './pages/QuizCenterPage';
import { CodingPracticePage } from './pages/CodingPracticePage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { SprintPage } from './pages/SprintPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PlannerPage } from './pages/PlannerPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { NotesBookmarksPage } from './pages/NotesBookmarksPage';
import { api } from './api';
import type { LearnerProfile } from './types';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const p = await api.getProfile();
        setProfile(p);
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    }
    init();
  }, []);

  const handleToggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col ${isDark ? 'dark bg-slate-950 text-slate-100' : 'light bg-slate-50 text-slate-900'}`}>
        {/* Top Navbar */}
        <Navbar
          profile={profile}
          onOpenSearch={() => setIsSearchOpen(true)}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
        />

        {/* Body Layout: Sidebar + Main Content */}
        <div className="flex-1 flex overflow-hidden">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />

          <main className="flex-1 overflow-y-auto min-h-[calc(100vh-4rem)]">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/lessons/:id" element={<LessonReaderPage />} />
              <Route path="/quizzes" element={<QuizCenterPage />} />
              <Route path="/practice" element={<CodingPracticePage />} />
              <Route path="/flashcards" element={<FlashcardsPage />} />
              <Route path="/sprint" element={<SprintPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/notes" element={<NotesBookmarksPage />} />
            </Routes>
          </main>
        </div>

        {/* Global Instant Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
