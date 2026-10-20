import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SearchModal } from './components/SearchModal';
import { UserModal } from './components/UserModal';
import { DashboardPage } from './pages/DashboardPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { LessonReaderPage } from './pages/LessonReaderPage';
import { QuizCenterPage } from './pages/QuizCenterPage';
import { CodingPracticePage } from './pages/CodingPracticePage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PlannerPage } from './pages/PlannerPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { NotesBookmarksPage } from './pages/NotesBookmarksPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { api } from './api';
import type { LearnerProfile, UserProfile } from './types';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [activeUser, setActiveUser] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const [p, u, me] = await Promise.all([
          api.getProfile(),
          api.getUsers(),
          api.getCurrentUser()
        ]);
        setProfile(p);
        setUsers(u.users);
        const resolved = me || u.activeUser;
        setActiveUser(resolved);
        // If unauthenticated, gate the app until account is created or logged into
        if (!resolved) {
          setIsUserModalOpen(true);
        }
      } catch (err) {
        console.error('Failed to load profile and users', err);
        setIsUserModalOpen(true);
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

  const handleUserChanged = (user: UserProfile) => {
    setActiveUser(user);
    if (user) {
      setIsUserModalOpen(false);
      setUsers(prev => {
        const exists = prev.some(u => u.id === user.id);
        if (exists) {
          return prev.map(u => ({ ...u, is_active: u.id === user.id }));
        }
        return [user, ...prev.map(u => ({ ...u, is_active: false }))];
      });
    }
  };

  const handleLogout = async () => {
    await api.logout();
    setActiveUser(null);
    setIsUserModalOpen(true);
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col ${isDark ? 'dark bg-slate-950 text-slate-100' : 'light bg-slate-50 text-slate-900'}`}>
        {/* Top Navbar */}
        <Navbar
          profile={profile}
          activeUser={activeUser}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenUserModal={() => setIsUserModalOpen(true)}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
          onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
        />

        {/* Body Layout: Desktop Persistent Sidebar + Main Content */}
        <div className="flex-1 flex overflow-hidden relative">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            isMobileOpen={isMobileMenuOpen}
            onCloseMobile={() => setIsMobileMenuOpen(false)}
          />

          <main className="flex-1 overflow-y-auto w-full min-w-0 pb-20 md:pb-6">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage onOpenUserModal={() => setIsUserModalOpen(true)} />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/lessons/:id" element={<LessonReaderPage />} />
              <Route path="/quizzes" element={<QuizCenterPage />} />
              <Route path="/practice" element={<CodingPracticePage />} />
              <Route path="/flashcards" element={<FlashcardsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/notes" element={<NotesBookmarksPage />} />
            </Routes>
          </main>
        </div>

        {/* Mobile Native-Style Bottom Navigation Bar */}
        <MobileBottomNav onOpenMenu={() => setIsMobileMenuOpen(true)} />

        {/* Global Instant Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        {/* Mandatory User Authentication & Profile Modal */}
        <UserModal
          isOpen={isUserModalOpen || !activeUser}
          onClose={() => {
            if (activeUser) setIsUserModalOpen(false);
          }}
          activeUser={activeUser}
          users={users}
          onUserChanged={handleUserChanged}
          onLogout={handleLogout}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
