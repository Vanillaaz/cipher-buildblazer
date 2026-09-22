import React from 'react';
import { logoutAdmin } from '../services/authService';

export interface AdminHeaderProps {
  activeTab: 'overview' | 'events' | 'team' | 'domains' | 'applications';
  setActiveTab: (tab: 'overview' | 'events' | 'team' | 'domains' | 'applications') => void;
  onLogout: () => void;
  onExportMasterJSON: () => void;
  eventsCount: number;
  teamCount: number;
  domainsCount: number;
  applicationsCount: number;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  setActiveTab,
  onLogout,
  onExportMasterJSON,
  eventsCount,
  teamCount,
  domainsCount,
  applicationsCount,
}) => {
  const handleLogoutClick = () => {
    logoutAdmin();
    onLogout();
  };

  const navTabs: { id: 'overview' | 'events' | 'team' | 'domains' | 'applications'; label: string; badge?: number }[] = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'events', label: `EVENTS (${eventsCount})` },
    { id: 'team', label: `TEAM (${teamCount})` },
    { id: 'domains', label: `DOMAINS (${domainsCount})` },
    { id: 'applications', label: 'JOIN APPLICATIONS', badge: applicationsCount },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080C0A]/95 backdrop-blur-md border-b border-[#00FF66]/20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#00FF66]/15 border border-[#00FF66] flex items-center justify-center font-mono text-lg font-bold text-[#00FF66]">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-white tracking-wider">
              <span>CIPHER ADMIN PORTAL</span>
              <span className="bg-[#00FF66]/15 border border-[#00FF66]/40 text-[#00FF66] text-[10px] px-2 py-0.5 rounded-xs font-mono">
                SECURE
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-400">
              // SJEC CSE Association &bull; Management Console
            </p>
          </div>
        </div>

        {/* Center Tabs Navigation */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xs transition-all relative font-bold cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#00FF66] text-black shadow-[0_0_12px_rgba(0,255,102,0.4)]'
                  : 'text-gray-300 hover:text-[#00FF66] bg-[#050806] border border-[#00FF66]/15 hover:border-[#00FF66]/40'
              }`}
            >
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className={`ml-1.5 px-1.5 py-0.2 rounded-xs text-[10px] ${
                  activeTab === tab.id ? 'bg-black text-[#00FF66]' : 'bg-[#00FF66] text-black font-bold'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExportMasterJSON}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#050806] border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/15 rounded-xs font-mono text-xs font-bold transition-all hover:shadow-[0_0_12px_rgba(0,255,102,0.3)] cursor-pointer"
            title="Download JSON master backup of all website data"
          >
            <span>EXPORT ALL DATA</span>
            <span>💾</span>
          </button>

          <button
            onClick={handleLogoutClick}
            className="px-3.5 py-1.5 bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-900/40 rounded-xs font-mono text-xs font-bold transition-colors cursor-pointer"
          >
            LOGOUT 🚪
          </button>
        </div>
      </div>

      {/* Mobile Sub-Nav Row */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 bg-[#050806] border-t border-[#00FF66]/10 font-mono text-xs">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-3 py-1 rounded-xs transition-all text-[11px] font-bold ${
              activeTab === tab.id
                ? 'bg-[#00FF66] text-black'
                : 'text-gray-300 bg-[#080C0A] border border-[#00FF66]/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
