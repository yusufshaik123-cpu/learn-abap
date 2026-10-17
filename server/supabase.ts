/**
 * Lightweight native Supabase Client for ABAP Mastery
 * Uses standard global fetch (no extra npm dependencies required)
 */

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qvciohvwcuggfdnoskiu.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2Y2lvaHZ3Y3VnZ2Zkbm9za2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyMTQ4NzgsImV4cCI6MjEwNzc5MDg3OH0.m-eDonySy_ErhFD4r3I99IT3ZEUD38dairptr6EZmYc';

export interface SupabaseLeaderboardUser {
  id: string;
  username: string;
  display_name: string;
  role_title: string;
  avatar_color: string;
  xp: number;
  streak_days: number;
  lessons_completed: number;
  quizzes_passed: number;
  challenges_solved: number;
  mastery_score: number;
  updated_at?: string;
}

export const supabase = {
  isEnabled: () => Boolean(SUPABASE_URL && SUPABASE_ANON_KEY),

  /**
   * Fetches leaderboard users from Supabase.
   * Returns null if Supabase is unreachable or table does not exist.
   */
  async getLeaderboard(): Promise<SupabaseLeaderboardUser[] | null> {
    if (!this.isEnabled()) return null;
    try {
      const endpoint = `${SUPABASE_URL}/rest/v1/leaderboard?select=*&order=xp.desc&limit=50`;
      const res = await fetch(endpoint, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        // Table might not be created in Supabase yet
        return null;
      }
      return await res.json();
    } catch (err) {
      // Offline or network error - gracefully return null to use local SQLite
      return null;
    }
  },

  /**
   * Upserts the active user's score to Supabase.
   */
  async upsertUser(user: SupabaseLeaderboardUser): Promise<boolean> {
    if (!this.isEnabled()) return false;
    try {
      const endpoint = `${SUPABASE_URL}/rest/v1/leaderboard`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          ...user,
          updated_at: new Date().toISOString()
        })
      });
      return res.ok;
    } catch (err) {
      return false;
    }
  }
};
