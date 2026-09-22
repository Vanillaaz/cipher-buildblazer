import { EventItem, TeamMember, DomainItem, JoinApplication } from '../types';
import { DEFAULT_EVENTS, DEFAULT_TEAM, DEFAULT_DOMAINS } from '../data/defaultData';

const KEYS = {
  EVENTS: 'cipher_admin_events',
  TEAM: 'cipher_admin_team',
  DOMAINS: 'cipher_admin_domains',
  APPLICATIONS: 'cipher_join_requests',
};

// ── EVENTS DATA API ────────────────────────────────────────────────────────
export const getAdminEvents = (): EventItem[] => {
  try {
    const raw = localStorage.getItem(KEYS.EVENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading admin events:', e);
  }
  return DEFAULT_EVENTS;
};

export const saveAdminEvents = (events: EventItem[]): void => {
  localStorage.setItem(KEYS.EVENTS, JSON.stringify(events, null, 2));
};

// ── TEAM DATA API ──────────────────────────────────────────────────────────
export const getAdminTeam = (): TeamMember[] => {
  try {
    const raw = localStorage.getItem(KEYS.TEAM);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading admin team:', e);
  }
  return DEFAULT_TEAM;
};

export const saveAdminTeam = (team: TeamMember[]): void => {
  localStorage.setItem(KEYS.TEAM, JSON.stringify(team, null, 2));
};

// ── DOMAINS DATA API ───────────────────────────────────────────────────────
export const getAdminDomains = (): DomainItem[] => {
  try {
    const raw = localStorage.getItem(KEYS.DOMAINS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading admin domains:', e);
  }
  return DEFAULT_DOMAINS;
};

export const saveAdminDomains = (domains: DomainItem[]): void => {
  localStorage.setItem(KEYS.DOMAINS, JSON.stringify(domains, null, 2));
};

// ── APPLICATIONS DATA API ──────────────────────────────────────────────────
export const getJoinApplications = (): JoinApplication[] => {
  try {
    const raw = localStorage.getItem(KEYS.APPLICATIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading applications:', e);
  }
  return [];
};

export const deleteJoinApplication = (id: string): JoinApplication[] => {
  const current = getJoinApplications();
  const updated = current.filter((app) => app.id !== id);
  localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(updated, null, 2));
  return updated;
};

// ── EXPORT HELPER ──────────────────────────────────────────────────────────
export const downloadJSONFile = (filename: string, data: unknown) => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportApplicationsCSV = (applications: JoinApplication[]) => {
  if (applications.length === 0) return;
  const headers = ['Request ID', 'Full Name', 'USN', 'Email', 'Year/Semester', 'Domain Interest', 'Message', 'Submitted At'];
  const rows = applications.map((app) => [
    `"${app.id}"`,
    `"${app.fullName}"`,
    `"${app.usn}"`,
    `"${app.email}"`,
    `"${app.yearSemester}"`,
    `"${app.areaOfInterest}"`,
    `"${(app.message || '').replace(/"/g, '""')}"`,
    `"${app.submittedAt}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `CIPHER_Applications_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
