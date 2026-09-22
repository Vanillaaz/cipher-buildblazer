import React, { useState } from 'react';
import { EventItem } from '../types';

export interface EventsManagerProps {
  events: EventItem[];
  onSaveEvents: (updated: EventItem[]) => void;
  onExportJSON: () => void;
}

export const EventsManager: React.FC<EventsManagerProps> = ({
  events,
  onSaveEvents,
  onExportJSON,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  // Handle Cover Local File Upload
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string;
      if (dataUrl) {
        setFormData((prev) => {
          const currentGallery = Array.isArray(prev.gallery) ? prev.gallery : [];
          return {
            ...prev,
            image: dataUrl,
            gallery: currentGallery.includes(dataUrl) ? currentGallery : [dataUrl, ...currentGallery],
          };
        });
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Gallery Files Upload (Multiple)
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const dataUrl = evt.target?.result as string;
        if (dataUrl) {
          setFormData((prev) => {
            const currentGallery = Array.isArray(prev.gallery) ? prev.gallery : [];
            return {
              ...prev,
              gallery: [...currentGallery, dataUrl],
              image: prev.image || dataUrl,
            };
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Insert Image URL to Gallery
  const handleAddGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    const url = newGalleryUrl.trim();
    setFormData((prev) => {
      const currentGallery = Array.isArray(prev.gallery) ? prev.gallery : [];
      return {
        ...prev,
        gallery: [...currentGallery, url],
        image: prev.image || url,
      };
    });
    setNewGalleryUrl('');
  };

  // Delete Image from Gallery
  const handleDeleteGalleryImage = (indexToDelete: number) => {
    setFormData((prev) => {
      const currentGallery = Array.isArray(prev.gallery) ? prev.gallery : [];
      const imageToDelete = currentGallery[indexToDelete];
      const updatedGallery = currentGallery.filter((_, idx) => idx !== indexToDelete);

      const newCover = prev.image === imageToDelete
        ? (updatedGallery[0] || '')
        : prev.image;

      return {
        ...prev,
        gallery: updatedGallery,
        image: newCover,
      };
    });
  };

  // Set Image as Primary Cover
  const handleSetAsCover = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  // Form State
  const [formData, setFormData] = useState<Partial<EventItem>>({
    title: '',
    category: 'Workshop',
    date: new Date().toISOString().slice(0, 10),
    displayDate: '15 MAY 2026',
    shortDescription: '',
    description: '',
    image: '/assets/images/events/promptops-1.jpg',
    gallery: ['/assets/images/events/promptops-1.jpg'],
    location: 'Department of CSE, SJEC',
    organizer: 'CIPHER CSE Association',
    featured: true,
  });

  const filteredEvents = events.filter(
    (evt) =>
      evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      category: 'Workshop',
      date: new Date().toISOString().slice(0, 10),
      displayDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
      shortDescription: '',
      description: '',
      image: '/assets/images/events/promptops-1.jpg',
      gallery: ['/assets/images/events/promptops-1.jpg'],
      location: 'Department of CSE, SJEC',
      organizer: 'CIPHER & AgentBlazer Club',
      featured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (evt: EventItem) => {
    setEditingEvent(evt);
    setFormData({ ...evt });
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updated = events.filter((e) => e.id !== id);
      onSaveEvents(updated);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.description?.trim()) {
      alert('Please fill out event title and description.');
      return;
    }

    const eventId = editingEvent
      ? editingEvent.id
      : (formData.title || 'event').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const eventObj: EventItem = {
      id: eventId,
      title: formData.title || 'Untitled Event',
      category: formData.category || 'Event',
      date: formData.date || new Date().toISOString().slice(0, 10),
      displayDate: formData.displayDate || '2026',
      shortDescription: formData.shortDescription || (formData.description || '').slice(0, 90) + '...',
      description: formData.description || '',
      image: formData.image || '/assets/images/events/promptops-1.jpg',
      gallery: typeof formData.gallery === 'string'
        ? (formData.gallery as string).split(',').map((s) => s.trim()).filter(Boolean)
        : (formData.gallery || ['/assets/images/events/promptops-1.jpg']),
      location: formData.location || 'SJEC Mangalore',
      organizer: formData.organizer || 'CIPHER CSE',
      featured: formData.featured ?? true,
    };

    if (editingEvent) {
      const updated = events.map((item) => (item.id === editingEvent.id ? eventObj : item));
      onSaveEvents(updated);
    } else {
      const updated = [eventObj, ...events];
      onSaveEvents(updated);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Top Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
        <div>
          <h2 className="text-xl font-bold text-[#00FF66] tracking-wide">// EVENTS &amp; WORKSHOPS MANAGER</h2>
          <p className="text-xs text-gray-400">Total {events.length} Department Events Registered</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExportJSON}
            className="px-3.5 py-2 bg-[#050806] border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/15 text-xs font-bold rounded-xs transition-all cursor-pointer"
          >
            EXPORT events.json 💾
          </button>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-[#00FF66] text-black hover:bg-[#00E65C] text-xs font-bold uppercase rounded-xs transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)] cursor-pointer"
          >
            + ADD NEW EVENT
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md font-mono text-xs">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search events by title, category, location..."
          className="w-full bg-[#080C0A] border border-[#00FF66]/30 focus:border-[#00FF66] text-white px-3.5 py-2 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#00FF66]"
        />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-[#080C0A] border border-[#00FF66]/20 hover:border-[#00FF66]/50 p-4 rounded-xs space-y-3 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          >
            <div className="space-y-2">
              <div className="relative aspect-[16/9] bg-black rounded-xs overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/assets/images/about-photo.jpg';
                  }}
                />
                <span className="absolute top-2 left-2 bg-black/80 border border-[#00FF66]/40 text-[#00FF66] font-mono text-[10px] px-2 py-0.5 rounded-xs font-bold">
                  {event.category}
                </span>
                {event.featured && (
                  <span className="absolute top-2 right-2 bg-[#00FF66] text-black font-mono text-[10px] px-2 py-0.5 rounded-xs font-bold">
                    FEATURED
                  </span>
                )}
              </div>

              <div className="font-mono text-[11px] text-gray-400 flex items-center justify-between">
                <span>{event.displayDate}</span>
                <span className="text-[#00FF66] truncate max-w-[140px]">{event.location}</span>
              </div>

              <h3 className="font-sans font-bold text-base text-white leading-snug line-clamp-2">
                {event.title}
              </h3>

              <p className="font-sans text-xs text-gray-300 line-clamp-3 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#00FF66]/10 flex items-center justify-between font-mono text-xs">
              <span className="text-[10px] text-gray-500">{event.gallery.length} Photos</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(event)}
                  className="px-2.5 py-1 bg-[#00FF66]/10 border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/20 rounded-xs font-bold cursor-pointer"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="px-2.5 py-1 bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-900/40 rounded-xs font-bold cursor-pointer"
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Event Dialog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030504]/94 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#080C0A] border border-[#00FF66]/50 rounded-xs p-6 space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#00FF66]/20 pb-3 font-mono text-sm text-[#00FF66] font-bold">
              <span>{editingEvent ? '// EDIT EVENT' : '// ADD NEW EVENT'}</span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
              {/* Event Title */}
              <div className="space-y-1">
                <label className="block text-gray-300">EVENT TITLE *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Master the Future: Hands-on GSOC & LLMs Workshop"
                  className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none"
                />
              </div>

              {/* Category & Display Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-gray-300">CATEGORY *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Competition">Competition</option>
                    <option value="Flagship Gala">Flagship Gala</option>
                    <option value="Industry Session">Industry Session</option>
                    <option value="Seminar">Seminar</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-300">DISPLAY DATE *</label>
                  <input
                    type="text"
                    required
                    value={formData.displayDate}
                    onChange={(e) => setFormData({ ...formData, displayDate: e.target.value })}
                    placeholder="e.g. 14 FEB 2026"
                    className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none"
                  />
                </div>
              </div>

              {/* Location & Organizer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-gray-300">LOCATION</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Academic Block III Auditorium, SJEC"
                    className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-300">ORGANIZER</label>
                  <input
                    type="text"
                    value={formData.organizer}
                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                    placeholder="CIPHER & AgentBlazer Club"
                    className="w-full bg-[#050806] border border-[#00FF66]/30 text-white px-3.5 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none"
                  />
                </div>
              </div>

              {/* Cover & Gallery Image Management System (Insert & Delete Images) */}
              <div className="space-y-3 bg-[#050806] border border-[#00FF66]/30 p-4 rounded-xs">
                <div className="flex items-center justify-between border-b border-[#00FF66]/20 pb-2">
                  <label className="block text-[#00FF66] font-bold">📷 EVENT IMAGES &amp; GALLERY MANAGER</label>
                  <span className="text-[10px] text-gray-400">
                    {Array.isArray(formData.gallery) ? formData.gallery.length : 0} Images Attached
                  </span>
                </div>

                {/* Cover Image Selection & Upload */}
                <div className="space-y-2">
                  <label className="block text-gray-300">MAIN COVER IMAGE URL / UPLOAD</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/assets/images/events/gsoc-main.jpg or https://..."
                      className="flex-1 bg-[#080C0A] border border-[#00FF66]/30 text-white px-3 py-2 rounded-xs focus:border-[#00FF66] focus:outline-none"
                    />
                    <label className="px-3 py-2 bg-[#00FF66]/10 border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/20 text-xs font-bold rounded-xs cursor-pointer flex items-center gap-1 shrink-0">
                      <span>📁 UPLOAD COVER</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Cover Preview */}
                  {formData.image && (
                    <div className="relative w-full h-36 bg-black rounded-xs overflow-hidden border border-[#00FF66]/20 group">
                      <img
                        src={formData.image}
                        alt="Cover Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/assets/images/about-photo.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: '' })}
                          className="px-2.5 py-1 bg-red-900/80 border border-red-500 text-red-200 text-[11px] font-bold rounded-xs hover:bg-red-800 cursor-pointer"
                        >
                          🗑️ DELETE COVER IMAGE
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Gallery Images List & Thumbnail Grid (Insert & Delete) */}
                <div className="space-y-2 pt-2 border-t border-[#00FF66]/15">
                  <div className="flex items-center justify-between">
                    <label className="block text-gray-300">GALLERY IMAGES (INSERT &amp; DELETE)</label>
                    <label className="px-3 py-1 bg-[#00FF66] text-black hover:bg-[#00E65C] text-[11px] font-bold rounded-xs cursor-pointer flex items-center gap-1">
                      <span>+ 📁 UPLOAD GALLERY IMAGES</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Input field to Insert Image URL */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      placeholder="Paste image URL to insert..."
                      className="flex-1 bg-[#080C0A] border border-[#00FF66]/30 text-white px-3 py-1.5 rounded-xs focus:border-[#00FF66] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddGalleryUrl}
                      className="px-3 py-1.5 bg-[#00FF66]/20 border border-[#00FF66]/50 text-[#00FF66] hover:bg-[#00FF66]/30 text-xs font-bold rounded-xs cursor-pointer"
                    >
                      + INSERT URL
                    </button>
                  </div>

                  {/* Thumbnail Gallery Grid */}
                  {Array.isArray(formData.gallery) && formData.gallery.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2">
                      {formData.gallery.map((imgUrl, idx) => (
                        <div
                          key={`${imgUrl}-${idx}`}
                          className={`relative aspect-video bg-black rounded-xs overflow-hidden border ${
                            formData.image === imgUrl ? 'border-[#00FF66] ring-1 ring-[#00FF66]' : 'border-gray-800'
                          } group`}
                        >
                          <img
                            src={imgUrl}
                            alt={`Gallery item ${idx + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = '/assets/images/about-photo.jpg';
                            }}
                          />
                          {formData.image === imgUrl && (
                            <span className="absolute top-1 left-1 bg-[#00FF66] text-black font-mono text-[9px] px-1.5 py-0.5 rounded-xs font-bold z-10">
                              COVER
                            </span>
                          )}
                          {/* Hover Actions */}
                          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1 z-20">
                            {formData.image !== imgUrl && (
                              <button
                                type="button"
                                onClick={() => handleSetAsCover(imgUrl)}
                                className="w-full py-0.5 bg-[#00FF66]/20 border border-[#00FF66]/60 text-[#00FF66] hover:bg-[#00FF66]/40 text-[9px] font-bold rounded-xs cursor-pointer"
                              >
                                ⭐ SET COVER
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeleteGalleryImage(idx)}
                              className="w-full py-0.5 bg-red-950/90 border border-red-500 text-red-300 hover:bg-red-900 text-[9px] font-bold rounded-xs cursor-pointer"
                            >
                              🗑️ DELETE
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-gray-500 italic py-2">No gallery images added yet. Upload files or paste image URLs above to insert images.</p>
                  )}
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-1">
                <label className="block text-gray-300">FULL EVENT DESCRIPTION *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Paste verbatim event report details..."
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
                  {editingEvent ? 'SAVE EVENT CHANGES' : 'CREATE EVENT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
