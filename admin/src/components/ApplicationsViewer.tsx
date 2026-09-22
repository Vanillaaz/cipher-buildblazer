import React, { useState } from 'react';
import { JoinApplication } from '../types';
import { exportApplicationsCSV, downloadJSONFile } from '../services/dataService';

export interface ApplicationsViewerProps {
  applications: JoinApplication[];
  onDeleteApplication: (id: string) => void;
}

export const ApplicationsViewer: React.FC<ApplicationsViewerProps> = ({
  applications,
  onDeleteApplication,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = applications.filter(
    (app) =>
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.areaOfInterest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Top Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
        <div>
          <h2 className="text-xl font-bold text-[#00FF66] tracking-wide">// STUDENT JOIN APPLICATIONS</h2>
          <p className="text-xs text-gray-400">Total {applications.length} Student Registrations Submitted</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportApplicationsCSV(applications)}
            disabled={applications.length === 0}
            className="px-3.5 py-2 bg-[#00FF66] text-black hover:bg-[#00E65C] text-xs font-bold uppercase rounded-xs transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)] disabled:opacity-50 cursor-pointer"
          >
            EXPORT TO EXCEL (CSV) 📊
          </button>
          <button
            onClick={() => downloadJSONFile(`CIPHER_Applications_${new Date().toISOString().slice(0, 10)}.json`, applications)}
            disabled={applications.length === 0}
            className="px-3.5 py-2 bg-[#050806] border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/15 text-xs font-bold rounded-xs transition-all disabled:opacity-50 cursor-pointer"
          >
            EXPORT JSON 💾
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md font-mono text-xs">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by student name, USN, email, interest..."
          className="w-full bg-[#080C0A] border border-[#00FF66]/30 focus:border-[#00FF66] text-white px-3.5 py-2 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#00FF66]"
        />
      </div>

      {/* Applications Table View */}
      {filteredApps.length > 0 ? (
        <div className="bg-[#080C0A] border border-[#00FF66]/20 rounded-xs overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-[#050806] border-b border-[#00FF66]/20 text-[#00FF66]">
                  <th className="p-3.5">REQUEST ID</th>
                  <th className="p-3.5">FULL NAME</th>
                  <th className="p-3.5">USN</th>
                  <th className="p-3.5">EMAIL</th>
                  <th className="p-3.5">YEAR / SEMESTER</th>
                  <th className="p-3.5">DOMAIN INTEREST</th>
                  <th className="p-3.5">SUBMITTED AT</th>
                  <th className="p-3.5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#00FF66]/10 text-gray-200">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-[#00FF66]/5 transition-colors">
                    <td className="p-3.5 text-[#00FF66] font-bold">{app.id}</td>
                    <td className="p-3.5 font-sans font-semibold text-white">{app.fullName}</td>
                    <td className="p-3.5 uppercase">{app.usn}</td>
                    <td className="p-3.5 text-gray-300">{app.email}</td>
                    <td className="p-3.5 text-gray-300">{app.yearSemester}</td>
                    <td className="p-3.5">
                      <span className="bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] px-2 py-0.5 rounded-xs text-[10px]">
                        {app.areaOfInterest}
                      </span>
                    </td>
                    <td className="p-3.5 text-gray-400 text-[11px]">
                      {new Date(app.submittedAt).toLocaleString()}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => onDeleteApplication(app.id)}
                        className="px-2.5 py-1 bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-900/40 rounded-xs font-bold text-[11px] cursor-pointer"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-[#080C0A] border border-[#00FF66]/20 p-12 rounded-xs text-center font-mono text-xs text-gray-400 space-y-2">
          <div className="text-2xl text-[#00FF66]">📭</div>
          <div>No student join applications recorded yet.</div>
          <div className="text-[11px] text-gray-500">Applications submitted on the main website will appear here in real time.</div>
        </div>
      )}

    </div>
  );
};
