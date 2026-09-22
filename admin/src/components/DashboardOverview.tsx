import React from 'react';
import { EventItem, TeamMember, DomainItem, JoinApplication } from '../types';

export interface DashboardOverviewProps {
  events: EventItem[];
  team: TeamMember[];
  domains: DomainItem[];
  applications: JoinApplication[];
  setActiveTab: (tab: 'overview' | 'events' | 'team' | 'domains' | 'applications') => void;
  onExportEventsJSON: () => void;
  onExportTeamJSON: () => void;
  onExportDomainsJSON: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  events,
  team,
  domains,
  applications,
  setActiveTab,
  onExportEventsJSON,
  onExportTeamJSON,
  onExportDomainsJSON,
}) => {
  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* Top Welcome Banner */}
      <div className="bg-[#080C0A] border border-[#00FF66]/30 p-6 rounded-xs shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00FF66] bg-[#00FF66]/10 px-3 py-1 rounded-xs border border-[#00FF66]/30">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
            <span>AUTHENTICATED ADMINISTRATOR SESSION</span>
          </div>
          <h2 className="font-mono text-2xl font-bold text-white tracking-wide">
            CIPHER Website Management Console
          </h2>
          <p className="font-sans text-sm text-gray-300 max-w-2xl leading-relaxed">
            Manage departmental events, team profiles, domain highlights, and student join registrations. All changes can be previewed live or exported as JSON files to update the main site repository.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 font-mono text-xs">
          <a
            href="https://cipher-buildblazer.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#00FF66] text-black font-bold uppercase rounded-xs hover:bg-[#00E65C] transition-all text-center shadow-[0_0_15px_rgba(0,255,102,0.3)] flex items-center justify-center gap-1.5"
          >
            <span>LIVE WEBSITE</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        {/* Events Count */}
        <div
          onClick={() => setActiveTab('events')}
          className="bg-[#080C0A] border border-[#00FF66]/20 p-5 rounded-xs hover:border-[#00FF66]/60 transition-all cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs">// TOTAL EVENTS</span>
            <span className="text-[#00FF66] text-lg font-bold">📅</span>
          </div>
          <div className="text-3xl font-extrabold text-[#00FF66] group-hover:scale-105 transition-transform">
            {events.length}
          </div>
          <p className="text-[11px] text-gray-400 mt-2 flex items-center justify-between">
            <span>Workshops &amp; Galas</span>
            <span className="text-[#00FF66] font-bold group-hover:translate-x-1 transition-transform">MANAGE &rarr;</span>
          </p>
        </div>

        {/* Team Members Count */}
        <div
          onClick={() => setActiveTab('team')}
          className="bg-[#080C0A] border border-[#00FF66]/20 p-5 rounded-xs hover:border-[#00FF66]/60 transition-all cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs">// TEAM LEADS</span>
            <span className="text-[#00FF66] text-lg font-bold">👥</span>
          </div>
          <div className="text-3xl font-extrabold text-[#00FF66] group-hover:scale-105 transition-transform">
            {team.length}
          </div>
          <p className="text-[11px] text-gray-400 mt-2 flex items-center justify-between">
            <span>Executive Council</span>
            <span className="text-[#00FF66] font-bold group-hover:translate-x-1 transition-transform">MANAGE &rarr;</span>
          </p>
        </div>

        {/* Domains Count */}
        <div
          onClick={() => setActiveTab('domains')}
          className="bg-[#080C0A] border border-[#00FF66]/20 p-5 rounded-xs hover:border-[#00FF66]/60 transition-all cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs">// DOMAINS</span>
            <span className="text-[#00FF66] text-lg font-bold">🛡️</span>
          </div>
          <div className="text-3xl font-extrabold text-[#00FF66] group-hover:scale-105 transition-transform">
            {domains.length}
          </div>
          <p className="text-[11px] text-gray-400 mt-2 flex items-center justify-between">
            <span>Core Pillars</span>
            <span className="text-[#00FF66] font-bold group-hover:translate-x-1 transition-transform">MANAGE &rarr;</span>
          </p>
        </div>

        {/* Join Applications */}
        <div
          onClick={() => setActiveTab('applications')}
          className="bg-[#080C0A] border border-[#00FF66]/30 p-5 rounded-xs hover:border-[#00FF66] transition-all cursor-pointer group shadow-[0_0_25px_rgba(0,255,102,0.15)]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#00FF66] font-bold text-xs">// STUDENT APPLICATIONS</span>
            <span className="text-[#00FF66] text-lg font-bold">📨</span>
          </div>
          <div className="text-3xl font-extrabold text-[#00FF66] group-hover:scale-105 transition-transform flex items-center justify-between">
            <span>{applications.length}</span>
            <span className="text-xs bg-[#00FF66]/20 border border-[#00FF66] text-[#00FF66] px-2 py-0.5 rounded-xs">
              LIVE
            </span>
          </div>
          <p className="text-[11px] text-gray-300 mt-2 flex items-center justify-between font-bold">
            <span>Registrations</span>
            <span className="text-[#00FF66] group-hover:translate-x-1 transition-transform">VIEW ALL &rarr;</span>
          </p>
        </div>
      </div>

      {/* Quick Content Export & Update Center */}
      <div className="bg-[#080C0A] border border-[#00FF66]/20 p-6 rounded-xs space-y-4">
        <h3 className="font-mono text-base font-bold text-[#00FF66] flex items-center gap-2">
          <span>💾 REPOSITORY JSON EXPORT CENTER</span>
        </h3>
        <p className="font-sans text-xs text-gray-300">
          Whenever non-technical leads update events or team details in this dashboard, click the buttons below to export the updated JSON files. You can copy them directly into <code className="text-[#00FF66]">src/data/</code> to publish changes to GitHub!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs pt-2">
          <button
            onClick={onExportEventsJSON}
            className="p-4 bg-[#050806] border border-[#00FF66]/30 hover:border-[#00FF66] text-[#00FF66] hover:bg-[#00FF66]/10 rounded-xs font-bold transition-all text-left flex flex-col justify-between space-y-2 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span>events.json</span>
              <span>⬇️</span>
            </div>
            <span className="text-[10px] text-gray-400 font-normal">Export {events.length} Event Records</span>
          </button>

          <button
            onClick={onExportTeamJSON}
            className="p-4 bg-[#050806] border border-[#00FF66]/30 hover:border-[#00FF66] text-[#00FF66] hover:bg-[#00FF66]/10 rounded-xs font-bold transition-all text-left flex flex-col justify-between space-y-2 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span>team.json</span>
              <span>⬇️</span>
            </div>
            <span className="text-[10px] text-gray-400 font-normal">Export {team.length} Team Profiles</span>
          </button>

          <button
            onClick={onExportDomainsJSON}
            className="p-4 bg-[#050806] border border-[#00FF66]/30 hover:border-[#00FF66] text-[#00FF66] hover:bg-[#00FF66]/10 rounded-xs font-bold transition-all text-left flex flex-col justify-between space-y-2 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span>domains.json</span>
              <span>⬇️</span>
            </div>
            <span className="text-[10px] text-gray-400 font-normal">Export {domains.length} Domain Pillars</span>
          </button>
        </div>
      </div>

    </div>
  );
};
