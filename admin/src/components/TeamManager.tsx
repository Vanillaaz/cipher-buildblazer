import React, { useState } from 'react';
import { TeamMember } from '../types';

export interface TeamManagerProps {
  team: TeamMember[];
  onSaveTeam: (updated: TeamMember[]) => void;
  onExportJSON: () => void;
}

export const TeamManager: React.FC<TeamManagerProps> = ({
  team,
  onSaveTeam,
  onExportJSON,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    role: 'COORDINATOR',
    department: 'CIPHER Executive Council',
    photo: '/assets/images/team/Elston_Pereira.png',
    bio: '',
    category: 'executive',
    linkedin: '',
  });

  const filteredTeam = team.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      role: 'EXECUTIVE MEMBER',
      department: 'CIPHER Executive Council',
      photo: '/assets/images/team/Elston_Pereira.png',
      bio: '',
      category: 'executive',
      linkedin: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({ ...member });
    setIsModalOpen(true);
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      const updated = team.filter((m) => m.id !== id);
      onSaveTeam(updated);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.role?.trim()) {
      alert('Please fill out member name and role.');
      return;
    }

    const memberId = editingMember
      ? editingMember.id
      : (formData.name || 'member').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const memberObj: TeamMember = {
      id: memberId,
      name: formData.name || 'Team Member',
      role: (formData.role || 'LEAD').toUpperCase(),
      department: formData.department || 'CIPHER Executive Council',
      photo: formData.photo || '/assets/images/team/Elston_Pereira.png',
      bio: formData.bio || 'Executive member guiding CIPHER association activities.',
      category: formData.category || 'executive',
      linkedin: formData.linkedin?.trim() ? formData.linkedin.trim() : undefined,
    };

    if (editingMember) {
      const updated = team.map((item) => (item.id === editingMember.id ? memberObj : item));
      onSaveTeam(updated);
    } else {
      const updated = [...team, memberObj];
      onSaveTeam(updated);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Top Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
        <div>
          <h2 className="text-xl font-bold text-[#00FF66] tracking-wide">// EXECUTIVE TEAM MANAGER</h2>
          <p className="text-xs text-gray-400">Total {team.length} Team Members Registered</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExportJSON}
            className="px-3.5 py-2 bg-[#050806] border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/15 text-xs font-bold rounded-xs transition-all cursor-pointer"
          >
            EXPORT team.json 💾
          </button>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-[#00FF66] text-black hover:bg-[#00E65C] text-xs font-bold uppercase rounded-xs transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)] cursor-pointer"
          >
            + ADD TEAM MEMBER
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md font-mono text-xs">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search team by name, role, department..."
          className="w-full bg-[#080C0A] border border-[#00FF66]/30 focus:border-[#00FF66] text-white px-3.5 py-2 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#00FF66]"
        />
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredTeam.map((member) => (
          <div
            key={member.id}
            className="bg-[#080C0A] border border-[#00FF66]/20 hover:border-[#00FF66]/50 p-4 rounded-xs space-y-3 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          >
            <div className="space-y-2">
              <div className="relative aspect-square bg-black rounded-xs overflow-hidden border border-[#00FF66]/30">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (member.photo && member.photo.startsWith('/') && !target.src.includes('cipher-buildblazer.vercel.app')) {
                      target.src = `https://cipher-buildblazer.vercel.app${member.photo}`;
                    } else {
                      target.src = 'https://cipher-buildblazer.vercel.app/assets/images/about-photo.jpg';
                    }
                  }}
                />
                <span className="absolute bottom-2 left-2 bg-black/80 border border-[#00FF66]/40 text-[#00FF66] font-mono text-[9px] px-2 py-0.5 rounded-xs font-bold uppercase">
                  {member.role}
                </span>
              </div>

              <div>
                <h3 className="font-sans font-bold text-base text-white truncate">
                  {member.name}
                </h3>
                <p className="font-mono text-[11px] text-[#00FF66] font-semibold truncate">
                  {member.role}
                </p>
              </div>

              <p className="font-sans text-xs text-gray-300 line-clamp-2 leading-relaxed">
                {member.bio}
              </p>

              {member.linkedin ? (
                <div className="font-mono text-[10px] text-[#00FF66] truncate flex items-center gap-1">
                  <span>LinkedIn Verified ✓</span>
                </div>
              ) : (
                <div className="font-mono text-[10px] text-gray-500">
                  No LinkedIn Linked
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#00FF66]/10 flex items-center justify-between font-mono text-xs">
              <button
                onClick={() => handleOpenEditModal(member)}
                className="px-3 py-1 bg-[#00FF66]/10 border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/20 rounded-xs font-bold cursor-pointer"
              >
                EDIT
              </button>
              <button
                onClick={() => handleDeleteMember(member.id)}
                className="px-3 py-1 bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-900/40 rounded-xs font-bold cursor-pointer"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Member Dialog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030504]/94 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#080C0A] border border-[#00FF66]/50 rounded-xs p-6 space-y-5 my-auto">
            
            <div className="flex items-center justify-between border-b border-[#00FF66]/20 pb-3 font-mono text-sm text-[#00FF66] font-bold">
              <span>{editingMember ? '// EDIT TEAM MEMBER' : '// ADD NEW TEAM MEMBER'}</span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
              {/* Member Name */}
              <div className="space-y-1">
                <label className="block text-gray-300">FULL NAME *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Elston Pereira"
                  className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none"
                />
              </div>

              {/* Role & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-gray-300">EXECUTIVE ROLE *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. PRESIDENT, DESIGN HEAD"
                    className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none uppercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-300">CATEGORY</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'executive' | 'lead' | 'faculty' })}
                    className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none"
                  >
                    <option value="executive">Executive Council</option>
                    <option value="lead">Domain Lead</option>
                    <option value="faculty">Faculty Coordinator</option>
                  </select>
                </div>
              </div>

              {/* Photo URL */}
              <div className="space-y-1">
                <label className="block text-gray-300">PORTRAIT PHOTO URL</label>
                <input
                  type="text"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  placeholder="/assets/images/team/Elston_Pereira.png"
                  className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none"
                />
              </div>

              {/* LinkedIn URL */}
              <div className="space-y-1">
                <label className="block text-gray-300">LINKEDIN URL (VERIFIED PROFILE)</label>
                <input
                  type="url"
                  value={formData.linkedin || ''}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://www.linkedin.com/in/username/"
                  className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none"
                />
              </div>

              {/* Short Bio */}
              <div className="space-y-1">
                <label className="block text-gray-300">SHORT BIO / ROLE DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Briefly describe member role and focus area..."
                  className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none resize-none font-sans text-xs"
                />
              </div>

              {/* Form Buttons */}
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
                  {editingMember ? 'SAVE MEMBER CHANGES' : 'CREATE MEMBER'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
