import React, { useState } from 'react';
import { DomainItem } from '../types';

export interface DomainsManagerProps {
  domains: DomainItem[];
  onSaveDomains: (updated: DomainItem[]) => void;
  onExportJSON: () => void;
}

export const DomainsManager: React.FC<DomainsManagerProps> = ({
  domains,
  onSaveDomains,
  onExportJSON,
}) => {
  const [editingDomain, setEditingDomain] = useState<DomainItem | null>(null);
  const [formData, setFormData] = useState<Partial<DomainItem>>({});

  const handleEditClick = (domain: DomainItem) => {
    setEditingDomain(domain);
    setFormData({ ...domain });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDomain || !formData.title?.trim()) return;

    const updatedObj: DomainItem = {
      ...editingDomain,
      title: formData.title || editingDomain.title,
      description: formData.description || editingDomain.description,
      highlights: typeof formData.highlights === 'string'
        ? (formData.highlights as string).split('\n').map((s) => s.trim()).filter(Boolean)
        : (formData.highlights || editingDomain.highlights),
    };

    const updatedList = domains.map((d) => (d.id === editingDomain.id ? updatedObj : d));
    onSaveDomains(updatedList);
    setEditingDomain(null);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Top Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
        <div>
          <h2 className="text-xl font-bold text-[#00FF66] tracking-wide">// DOMAIN PILLARS MANAGER</h2>
          <p className="text-xs text-gray-400">Total {domains.length} Strategic Domains</p>
        </div>

        <button
          onClick={onExportJSON}
          className="px-3.5 py-2 bg-[#050806] border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/15 text-xs font-bold rounded-xs transition-all cursor-pointer"
        >
          EXPORT domains.json 💾
        </button>
      </div>

      {/* Domains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="bg-[#080C0A] border border-[#00FF66]/20 p-5 rounded-xs space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#00FF66] font-bold">[ {domain.code} ]</span>
                <span className="text-gray-400 border border-[#00FF66]/20 bg-[#00FF66]/10 px-2 py-0.5 rounded-xs uppercase">
                  {domain.icon}
                </span>
              </div>

              <h3 className="font-sans font-bold text-lg text-white">
                {domain.title}
              </h3>

              <p className="font-sans text-xs text-gray-300 leading-relaxed">
                {domain.description}
              </p>

              <div className="space-y-1">
                <span className="block font-mono text-[10px] text-gray-400">// HIGHLIGHTS</span>
                <ul className="space-y-1 font-mono text-xs text-[#00FF66]">
                  {domain.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span>▸</span>
                      <span className="text-gray-200">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-[#00FF66]/10 text-right">
              <button
                onClick={() => handleEditClick(domain)}
                className="px-4 py-1.5 bg-[#00FF66]/10 border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/20 rounded-xs font-mono text-xs font-bold cursor-pointer"
              >
                EDIT DOMAIN DETAILS
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Domain Modal */}
      {editingDomain && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030504]/94 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#080C0A] border border-[#00FF66]/50 rounded-xs p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#00FF66]/20 pb-2 font-mono text-sm text-[#00FF66] font-bold">
              <span>// EDIT DOMAIN: {editingDomain.code}</span>
              <button
                onClick={() => setEditingDomain(null)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="block text-gray-300">DOMAIN TITLE</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-gray-300">DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none resize-none font-sans text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-gray-300">HIGHLIGHTS (ONE PER LINE)</label>
                <textarea
                  rows={4}
                  value={Array.isArray(formData.highlights) ? formData.highlights.join('\n') : formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value as unknown as string[] })}
                  className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#00FF66]/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingDomain(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#00FF66] text-black font-bold uppercase rounded-xs hover:bg-[#00E65C]"
                >
                  SAVE DOMAIN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
