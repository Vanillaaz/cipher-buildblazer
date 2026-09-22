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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState<DomainItem | null>(null);
  const [formData, setFormData] = useState<Partial<DomainItem>>({
    title: '',
    code: '',
    icon: 'code',
    description: '',
    highlights: [],
  });

  const handleOpenAddModal = () => {
    setEditingDomain(null);
    const nextNum = domains.length + 1;
    const formattedNum = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
    setFormData({
      title: '',
      code: `DOM_${formattedNum}`,
      icon: 'code',
      description: '',
      highlights: [],
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (domain: DomainItem) => {
    setEditingDomain(domain);
    setFormData({ ...domain });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this domain pillar?')) {
      const updatedList = domains.filter((d) => d.id !== id);
      onSaveDomains(updatedList);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.description?.trim()) {
      alert('Please fill in the domain title and description.');
      return;
    }

    const domainId = editingDomain
      ? editingDomain.id
      : (formData.title || 'domain').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const nextNum = domains.length + 1;
    const formattedNum = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;

    const updatedObj: DomainItem = {
      id: domainId,
      title: formData.title.trim(),
      code: formData.code?.trim() || editingDomain?.code || `DOM_${formattedNum}`,
      icon: formData.icon?.trim() || 'code',
      description: formData.description.trim(),
      highlights: typeof formData.highlights === 'string'
        ? (formData.highlights as string).split('\n').map((s) => s.trim()).filter(Boolean)
        : (formData.highlights || []),
    };

    if (editingDomain) {
      const updatedList = domains.map((d) => (d.id === editingDomain.id ? updatedObj : d));
      onSaveDomains(updatedList);
    } else {
      const updatedList = [...domains, updatedObj];
      onSaveDomains(updatedList);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Top Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
        <div>
          <h2 className="text-xl font-bold text-[#00FF66] tracking-wide">// DOMAIN PILLARS MANAGER</h2>
          <p className="text-xs text-gray-400">Total {domains.length} Strategic Domains</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExportJSON}
            className="px-3.5 py-2 bg-[#050806] border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/15 text-xs font-bold rounded-xs transition-all cursor-pointer"
          >
            EXPORT domains.json 💾
          </button>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-[#00FF66] text-black hover:bg-[#00E65C] text-xs font-bold uppercase rounded-xs transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)] cursor-pointer"
          >
            + ADD NEW DOMAIN
          </button>
        </div>
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
                <span className="text-gray-400 border border-[#00FF66]/20 bg-[#00FF66]/10 px-2 py-0.5 rounded-xs uppercase font-mono">
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

            <div className="pt-3 border-t border-[#00FF66]/10 flex items-center justify-between font-mono text-xs">
              <button
                onClick={() => handleEditClick(domain)}
                className="px-3.5 py-1.5 bg-[#00FF66]/10 border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/20 rounded-xs font-bold cursor-pointer"
              >
                EDIT DOMAIN
              </button>
              <button
                onClick={() => handleDeleteClick(domain.id)}
                className="px-3 py-1.5 bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-900/40 rounded-xs font-bold cursor-pointer"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Domain Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030504]/94 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#080C0A] border border-[#00FF66]/50 rounded-xs p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#00FF66]/20 pb-2 font-mono text-sm text-[#00FF66] font-bold">
              <span>{editingDomain ? `// EDIT DOMAIN: ${editingDomain.code}` : '// ADD NEW DOMAIN'}</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="block text-gray-300">DOMAIN TITLE *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Artificial Intelligence & Agentic Workflows"
                  className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-gray-300">DOMAIN CODE</label>
                  <input
                    type="text"
                    value={formData.code || ''}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="DOM_05"
                    className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-300">ICON BADGE</label>
                  <select
                    value={formData.icon || 'code'}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none"
                  >
                    <option value="code">code</option>
                    <option value="calendar">calendar</option>
                    <option value="shield">shield</option>
                    <option value="cpu">cpu</option>
                    <option value="terminal">terminal</option>
                    <option value="network">network</option>
                    <option value="layers">layers</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-gray-300">DESCRIPTION *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Overview of the core domain competencies..."
                  className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none resize-none font-sans text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-gray-300">HIGHLIGHTS (ONE PER LINE) *</label>
                <textarea
                  rows={4}
                  value={Array.isArray(formData.highlights) ? formData.highlights.join('\n') : (formData.highlights || '')}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value as unknown as string[] })}
                  placeholder={"Hands-on Agentic Workflows\nMulti-Agent Orchestration\nLLM Benchmarking"}
                  className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#00FF66]/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#00FF66] text-black font-bold uppercase rounded-xs hover:bg-[#00E65C]"
                >
                  {editingDomain ? 'SAVE DOMAIN CHANGES' : 'CREATE DOMAIN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
