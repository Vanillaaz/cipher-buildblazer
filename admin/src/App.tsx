import { useState, useEffect } from 'react';
import { EventItem, TeamMember, DomainItem, JoinApplication } from './types';
import { checkAuthSession } from './services/authService';
import {
  getAdminEvents,
  saveAdminEvents,
  getAdminTeam,
  saveAdminTeam,
  getAdminDomains,
  saveAdminDomains,
  getJoinApplications,
  deleteJoinApplication,
  downloadJSONFile,
} from './services/dataService';

import { LoginModal } from './components/LoginModal';
import { AdminHeader } from './components/AdminHeader';
import { DashboardOverview } from './components/DashboardOverview';
import { EventsManager } from './components/EventsManager';
import { TeamManager } from './components/TeamManager';
import { DomainsManager } from './components/DomainsManager';
import { ApplicationsViewer } from './components/ApplicationsViewer';

import {
  fetchDbEvents,
  saveEventsToDb,
  fetchDbTeam,
  saveTeamToDb,
  fetchDbDomains,
  saveDomainsToDb,
  fetchDbApplications,
} from './services/dbService';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'team' | 'domains' | 'applications'>('overview');

  // Datasets
  const [events, setEvents] = useState<EventItem[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [domains, setDomains] = useState<DomainItem[]>([]);
  const [applications, setApplications] = useState<JoinApplication[]>([]);

  // Load datasets on init (Neon DB + Fallback)
  useEffect(() => {
    setIsAuthenticated(checkAuthSession());

    // Fetch asynchronously from Neon DB / LocalStorage
    fetchDbEvents().then(setEvents);
    fetchDbTeam().then(setTeam);
    fetchDbDomains().then(setDomains);
    fetchDbApplications().then(setApplications);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Handlers
  const handleSaveEvents = (updated: EventItem[]) => {
    setEvents(updated);
    saveAdminEvents(updated);
    saveEventsToDb(updated);
  };

  const handleSaveTeam = (updated: TeamMember[]) => {
    setTeam(updated);
    saveAdminTeam(updated);
    saveTeamToDb(updated);
  };

  const handleSaveDomains = (updated: DomainItem[]) => {
    setDomains(updated);
    saveAdminDomains(updated);
    saveDomainsToDb(updated);
  };

  const handleDeleteApp = (id: string) => {
    const updated = deleteJoinApplication(id);
    setApplications(updated);
  };

  const handleExportMasterJSON = () => {
    downloadJSONFile(`events.json`, events);
    downloadJSONFile(`team.json`, team);
    downloadJSONFile(`domains.json`, domains);
  };

  if (!isAuthenticated) {
    return <LoginModal onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#030504] text-gray-100 flex flex-col relative selection:bg-[#00FF66] selection:text-black">
      {/* Admin Header */}
      <AdminHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        onExportMasterJSON={handleExportMasterJSON}
        eventsCount={events.length}
        teamCount={team.length}
        domainsCount={domains.length}
        applicationsCount={applications.length}
      />

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <DashboardOverview
            events={events}
            team={team}
            domains={domains}
            applications={applications}
            setActiveTab={setActiveTab}
            onExportEventsJSON={() => downloadJSONFile('events.json', events)}
            onExportTeamJSON={() => downloadJSONFile('team.json', team)}
            onExportDomainsJSON={() => downloadJSONFile('domains.json', domains)}
          />
        )}

        {activeTab === 'events' && (
          <EventsManager
            events={events}
            onSaveEvents={handleSaveEvents}
            onExportJSON={() => downloadJSONFile('events.json', events)}
          />
        )}

        {activeTab === 'team' && (
          <TeamManager
            team={team}
            onSaveTeam={handleSaveTeam}
            onExportJSON={() => downloadJSONFile('team.json', team)}
          />
        )}

        {activeTab === 'domains' && (
          <DomainsManager
            domains={domains}
            onSaveDomains={handleSaveDomains}
            onExportJSON={() => downloadJSONFile('domains.json', domains)}
          />
        )}

        {activeTab === 'applications' && (
          <ApplicationsViewer
            applications={applications}
            onDeleteApplication={handleDeleteApp}
          />
        )}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-[#00FF66]/10 py-6 text-center font-mono text-xs text-gray-500">
        CIPHER Admin Portal &bull; Department of Computer Science &amp; Engineering &bull; SJEC Mangalore
      </footer>
    </div>
  );
}

export default App;
