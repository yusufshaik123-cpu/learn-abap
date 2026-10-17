/**
 * Supabase Client for ABAP Mastery (Browser & Native Mobile)
 * Directly connects to Supabase Cloud for universal cross-platform leaderboard & user synchronization
 */

const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://qvciohvwcuggfdnoskiu.supabase.co';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2Y2lvaHZ3Y3VnZ2Zkbm9za2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyMTQ4NzgsImV4cCI6MjEwNzc5MDg3OH0.m-eDonySy_ErhFD4r3I99IT3ZEUD38dairptr6EZmYc';

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

export const supabaseClient = {
  isEnabled: () => Boolean(SUPABASE_URL && SUPABASE_ANON_KEY),

  /**
   * Fetches global leaderboard users from Supabase Cloud.
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
        return null;
      }
      const data = await res.json();
      const FAKE_USERNAMES = new Set(['rap_architect', 'clean_coder', 'core_data_fan', 'subrc_zero', 'btp_cloud_dev', 'abap_dev']);
      return Array.isArray(data) ? data.filter((u: any) => !FAKE_USERNAMES.has(u.username)) : [];
    } catch {
      return null;
    }
  },

  /**
   * Upserts the active user's stats and score to Supabase Cloud.
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
    } catch {
      return false;
    }
  }
};
