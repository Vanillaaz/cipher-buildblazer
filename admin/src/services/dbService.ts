import { neon } from '@neondatabase/serverless';
import { EventItem, TeamMember, DomainItem, JoinApplication } from '../types';
import { DEFAULT_EVENTS, DEFAULT_TEAM, DEFAULT_DOMAINS } from '../data/defaultData';

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
    console.warn('[Admin Neon DB] SQL init error:', err);
    return null;
  }
};

/**
 * FETCH ALL EVENTS FROM NEON DB OR LOCAL STORAGE
 */
export const fetchDbEvents = async (): Promise<EventItem[]> => {
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
      if (Array.isArray(rows)) {
        return rows as EventItem[];
      }
    } catch (err) {
      console.warn('[Admin Neon DB] Query events fallback:', err);
    }
  }

  try {
    const raw = localStorage.getItem('cipher_events_custom');
    if (raw) return JSON.parse(raw);
  } catch {}

  return DEFAULT_EVENTS as EventItem[];
};

/**
 * SAVE ALL EVENTS TO NEON DB & LOCAL STORAGE (HANDLES INSERT, UPDATE & DELETE)
 */
export const saveEventsToDb = async (events: EventItem[]): Promise<boolean> => {
  // Always update LocalStorage
  try {
    localStorage.setItem('cipher_events_custom', JSON.stringify(events));
  } catch {}

  const sql = getDbSql();
  if (!sql) return false;

  try {
    // 1. Delete events from DB that were deleted in the Admin UI
    const currentIds = events.map((e) => e.id);
    if (currentIds.length > 0) {
      await sql`DELETE FROM events WHERE NOT (id = ANY(${currentIds}))`;
    } else {
      await sql`DELETE FROM events`;
    }

    // 2. Upsert remaining/updated events into Neon DB
    for (const evt of events) {
      const galleryJson = JSON.stringify(evt.gallery || [evt.image]);
      await sql`
        INSERT INTO events (
          id, title, category, date, display_date, short_description, description,
          image, gallery, location, organizer, featured
        ) VALUES (
          ${evt.id}, ${evt.title}, ${evt.category}, ${evt.date}, ${evt.displayDate},
          ${evt.shortDescription}, ${evt.description}, ${evt.image}, ${galleryJson}::jsonb,
          ${evt.location}, ${evt.organizer}, ${evt.featured}
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          category = EXCLUDED.category,
          date = EXCLUDED.date,
          display_date = EXCLUDED.display_date,
          short_description = EXCLUDED.short_description,
          description = EXCLUDED.description,
          image = EXCLUDED.image,
          gallery = EXCLUDED.gallery,
          location = EXCLUDED.location,
          organizer = EXCLUDED.organizer,
          featured = EXCLUDED.featured
      `;
    }
    return true;
  } catch (err) {
    console.error('[Admin Neon DB] Failed to save events:', err);
    return false;
  }
};

/**
 * FETCH ALL TEAM MEMBERS FROM NEON DB OR LOCAL STORAGE
 */
export const fetchDbTeam = async (): Promise<TeamMember[]> => {
  const sql = getDbSql();
  if (sql) {
    try {
      const rows = await sql`
        SELECT id, name, role, photo, bio, department, linkedin, order_index
        FROM team_members
        ORDER BY order_index ASC, id ASC
      `;
      if (Array.isArray(rows)) {
        return rows.map((r: any) => ({
          id: r.id,
          name: r.name,
          role: r.role,
          photo: r.photo,
          bio: r.bio,
          department: r.department,
          category: 'executive' as const,
          linkedin: r.linkedin || undefined,
        })) as TeamMember[];
      }
    } catch (err) {
      console.warn('[Admin Neon DB] Query team fallback:', err);
    }
  }

  try {
    const raw = localStorage.getItem('cipher_team_custom');
    if (raw) return JSON.parse(raw);
  } catch {}

  return DEFAULT_TEAM as TeamMember[];
};

/**
 * SAVE ALL TEAM MEMBERS TO NEON DB & LOCAL STORAGE (HANDLES INSERT, UPDATE & DELETE)
 */
export const saveTeamToDb = async (team: TeamMember[]): Promise<boolean> => {
  try {
    localStorage.setItem('cipher_team_custom', JSON.stringify(team));
  } catch {}

  const sql = getDbSql();
  if (!sql) return false;

  try {
    // 1. Delete team members from DB that were deleted in the Admin UI
    const currentIds = team.map((m) => m.id);
    if (currentIds.length > 0) {
      await sql`DELETE FROM team_members WHERE NOT (id = ANY(${currentIds}))`;
    } else {
      await sql`DELETE FROM team_members`;
    }

    // 2. Upsert remaining/updated team members into Neon DB
    for (let i = 0; i < team.length; i++) {
      const m = team[i];
      await sql`
        INSERT INTO team_members (
          id, name, role, photo, bio, department, linkedin, order_index
        ) VALUES (
          ${m.id}, ${m.name}, ${m.role}, ${m.photo}, ${m.bio}, ${m.department},
          ${m.linkedin || null}, ${i + 1}
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          role = EXCLUDED.role,
          photo = EXCLUDED.photo,
          bio = EXCLUDED.bio,
          department = EXCLUDED.department,
          linkedin = EXCLUDED.linkedin,
          order_index = EXCLUDED.order_index
      `;
    }
    return true;
  } catch (err) {
    console.error('[Admin Neon DB] Failed to save team:', err);
    return false;
  }
};

/**
 * FETCH STUDENT JOIN APPLICATIONS FROM NEON DB OR LOCAL STORAGE
 */
export const fetchDbApplications = async (): Promise<JoinApplication[]> => {
  const sql = getDbSql();
  if (sql) {
    try {
      const rows = await sql`
        SELECT 
          id, full_name AS "fullName", usn, email,
          year_semester AS "yearSemester", area_of_interest AS "areaOfInterest",
          message, submitted_at AS "submittedAt"
        FROM join_applications
        ORDER BY submitted_at DESC
      `;
      if (Array.isArray(rows)) {
        return rows as JoinApplication[];
      }
    } catch (err) {
      console.warn('[Admin Neon DB] Applications query fallback:', err);
    }
  }

  try {
    const raw = localStorage.getItem('cipher_join_requests');
    if (raw) return JSON.parse(raw);
  } catch {}

  return [];
};

/**
 * FETCH DOMAINS FROM NEON DB OR LOCAL STORAGE
 */
export const fetchDbDomains = async (): Promise<DomainItem[]> => {
  const sql = getDbSql();
  if (sql) {
    try {
      const rows = await sql`
        SELECT id, title, code, icon, description, highlights, order_index
        FROM domains
        ORDER BY order_index ASC, id ASC
      `;
      if (Array.isArray(rows)) {
        return rows as DomainItem[];
      }
    } catch (err) {
      console.warn('[Admin Neon DB] Query domains fallback:', err);
    }
  }

  try {
    const raw = localStorage.getItem('cipher_domains_custom');
    if (raw) return JSON.parse(raw);
  } catch {}

  return DEFAULT_DOMAINS as DomainItem[];
};

/**
 * SAVE ALL DOMAINS TO NEON DB & LOCAL STORAGE (HANDLES INSERT, UPDATE & DELETE)
 */
export const saveDomainsToDb = async (domains: DomainItem[]): Promise<boolean> => {
  try {
    localStorage.setItem('cipher_domains_custom', JSON.stringify(domains));
  } catch {}

  const sql = getDbSql();
  if (!sql) return false;

  try {
    const currentIds = domains.map((d) => d.id);
    if (currentIds.length > 0) {
      await sql`DELETE FROM domains WHERE NOT (id = ANY(${currentIds}))`;
    } else {
      await sql`DELETE FROM domains`;
    }

    for (let i = 0; i < domains.length; i++) {
      const d = domains[i];
      const highlightsJson = JSON.stringify(d.highlights || []);
      await sql`
        INSERT INTO domains (
          id, title, code, icon, description, highlights, order_index
        ) VALUES (
          ${d.id}, ${d.title}, ${d.code}, ${d.icon}, ${d.description},
          ${highlightsJson}::jsonb, ${i + 1}
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          code = EXCLUDED.code,
          icon = EXCLUDED.icon,
          description = EXCLUDED.description,
          highlights = EXCLUDED.highlights,
          order_index = EXCLUDED.order_index
      `;
    }
    return true;
  } catch (err) {
    console.error('[Admin Neon DB] Failed to save domains:', err);
    return false;
  }
};

