import { neon } from '@neondatabase/serverless';
import eventsData from '../data/events.json';
import teamData from '../data/team.json';
import { EventItem, TeamMember } from '../types';

/**
 * Neon Postgres Client & Fallback Engine
 * ──────────────────────────────────────
 * Reads VITE_NEON_DATABASE_URL or DATABASE_URL environment variable.
 * If present and database tables exist, queries live Neon Postgres.
 * Otherwise, falls back to static JSON and LocalStorage safely.
 */

const getDatabaseUrl = (): string | undefined => {
  return (
    import.meta.env.VITE_NEON_DATABASE_URL ||
    import.meta.env.DATABASE_URL ||
    undefined
  );
};

export const getDbSql = () => {
  const url = getDatabaseUrl();
  if (!url) return null;
  try {
    return neon(url);
  } catch (err) {
    console.warn('[Neon DB] Could not initialize SQL client:', err);
    return null;
  }
};

/**
 * Fetch Events from Neon DB or Static JSON Fallback
 */
export const fetchEvents = async (): Promise<EventItem[]> => {
  const sql = getDbSql();
  if (sql) {
    try {
      const rows = await sql`
        SELECT 
          id, title, category, date, display_date AS "displayDate",
          short_description AS "shortDescription", description, image,
          gallery, location, organizer, featured
        FROM events
        ORDER BY date DESC
      `;
      if (rows && rows.length > 0) {
        return rows as EventItem[];
      }
    } catch (err) {
      console.warn('[Neon DB] Events query fallback to local static data:', err);
    }
  }

  // Fallback to local custom storage or events.json static asset
  try {
    const customRaw = localStorage.getItem('cipher_events_custom');
    if (customRaw) {
      return JSON.parse(customRaw);
    }
  } catch {}

  return eventsData as EventItem[];
};

/**
 * Fetch Team Members from Neon DB or Static JSON Fallback
 */
export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const sql = getDbSql();
  if (sql) {
    try {
      const rows = await sql`
        SELECT 
          id, name, role, photo, bio, department, github, linkedin, order_index
        FROM team_members
        ORDER BY order_index ASC, id ASC
      `;
      if (rows && rows.length > 0) {
        return rows.map((r: any) => ({
          id: r.id,
          name: r.name,
          role: r.role,
          photo: r.photo,
          bio: r.bio,
          department: r.department,
          socials: {
            github: r.github || undefined,
            linkedin: r.linkedin || undefined,
          },
        })) as TeamMember[];
      }
    } catch (err) {
      console.warn('[Neon DB] Team query fallback to local static data:', err);
    }
  }

  // Fallback to local custom storage or team.json static asset
  try {
    const customRaw = localStorage.getItem('cipher_team_custom');
    if (customRaw) {
      return JSON.parse(customRaw);
    }
  } catch {}

  return teamData as TeamMember[];
};

/**
 * Save Student Join Application to Neon Postgres `join_applications` Table
 */
export const saveJoinApplicationToDb = async (app: {
  id: string;
  fullName: string;
  usn: string;
  email: string;
  yearSemester: string;
  areaOfInterest: string;
  message?: string;
  submittedAt: string;
}): Promise<boolean> => {
  const sql = getDbSql();
  if (!sql) return false;

  try {
    await sql`
      INSERT INTO join_applications (
        id, full_name, usn, email, year_semester, area_of_interest, message, submitted_at
      ) VALUES (
        ${app.id}, ${app.fullName}, ${app.usn}, ${app.email},
        ${app.yearSemester}, ${app.areaOfInterest}, ${app.message || null},
        ${app.submittedAt}
      )
    `;
    return true;
  } catch (err) {
    console.error('[Neon DB] Failed to save join application to Postgres:', err);
    return false;
  }
};
