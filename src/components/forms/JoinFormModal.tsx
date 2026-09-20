import React, { useEffect, useState } from 'react';
import { submitJoinRequest, JoinFormData, JoinSubmissionResult } from '../../services/joinService';

export interface JoinFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DOMAIN_OPTIONS = [
  'Technical Skill Building',
  'Events & Collaboration',
  'Leadership & Governance',
  'Industry Readiness',
];

const YEAR_OPTIONS = [
  '1st Year (Semesters 1-2)',
  '2nd Year (Semesters 3-4)',
  '3rd Year (Semesters 5-6)',
  '4th Year (Semesters 7-8)',
];

export const JoinFormModal: React.FC<JoinFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<JoinFormData>({
    fullName: '',
    usn: '',
    email: '',
    yearSemester: YEAR_OPTIONS[2],
    areaOfInterest: DOMAIN_OPTIONS[0],
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof JoinFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<JoinSubmissionResult | null>(null);

  // Lock body scroll and set ESC key listener when modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof JoinFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.usn.trim() || formData.usn.trim().length < 4) {
      newErrors.usn = 'Please enter a valid USN or Student ID.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.yearSemester) {
      newErrors.yearSemester = 'Please select your current academic year.';
    }

    if (!formData.areaOfInterest) {
      newErrors.areaOfInterest = 'Please select your primary domain of interest.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    const result = await submitJoinRequest(formData);

    setIsSubmitting(false);
    setSubmissionResult(result);

    if (result.success) {
      // Reset form fields on successful submission
      setFormData({
        fullName: '',
        usn: '',
        email: '',
        yearSemester: YEAR_OPTIONS[2],
        areaOfInterest: DOMAIN_OPTIONS[0],
        message: '',
      });
      setErrors({});
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-modal-title"
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-20 md:pt-24 pb-8 px-4 sm:px-6 overflow-y-auto bg-[#030504]/94 backdrop-blur-xl animate-fade-in cursor-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl sm:max-w-2xl bg-[#080C0A] border border-[#00FF66]/50 rounded-xs shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_35px_rgba(0,255,102,0.25)] overflow-hidden my-auto flex flex-col max-h-[80vh] sm:max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#00FF66]/20 bg-[#0A100C] shrink-0">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00FF66]">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
            <span>CIPHER // JOIN APPLICATION</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-[#00FF66] focus:outline-none focus:ring-2 focus:ring-[#00FF66] rounded-xs font-mono text-lg transition-colors"
            aria-label="Close Join Form"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-left">
          {submissionResult?.success ? (
            /* Success Experience */
            <div className="bg-[#050806] border border-[#00FF66]/40 p-6 rounded-xs space-y-4 text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#00FF66]/10 border border-[#00FF66] text-[#00FF66] font-mono text-xl font-bold">
                ✓
              </div>
              <h3 className="font-mono text-lg font-bold text-[#00FF66] tracking-wide">
                &gt; REQUEST RECEIVED
              </h3>
              <p className="font-sans text-sm text-gray-200 leading-relaxed max-w-md mx-auto">
                {submissionResult.message}
              </p>
              <div className="bg-[#080C0A] border border-[#00FF66]/20 p-3 rounded-xs font-mono text-xs text-gray-400 space-y-1">
                <div>REQUEST ID: <span className="text-[#00FF66]">{submissionResult.requestId}</span></div>
                <div>TIMESTAMP: <span>{submissionResult.timestamp}</span></div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-[#00FF66] text-black font-mono text-xs font-bold uppercase rounded-xs hover:bg-[#00E65C] transition-colors"
              >
                CLOSE WINDOW
              </button>
            </div>
          ) : (
            /* Form Input Fields */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <h2 id="join-modal-title" className="font-sans text-xl font-bold text-white">
                  Join the CIPHER Community
                </h2>
                <p className="font-mono text-xs text-gray-400">
                  // Fill out your student details to register your interest with the CSE department association.
                </p>
              </div>

              {submissionResult && !submissionResult.success && (
                <div className="bg-red-950/40 border border-red-500/40 p-3 rounded-xs font-mono text-xs text-red-400">
                  ⚠️ {submissionResult.message}
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-1">
                <label className="block font-mono text-xs text-gray-300">
                  FULL NAME <span className="text-[#00FF66]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Alex D'Souza"
                  className={`w-full bg-[#050806] border ${
                    errors.fullName ? 'border-red-500' : 'border-[#00FF66]/30'
                  } focus:border-[#00FF66] text-white font-mono text-xs px-3.5 py-2.5 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#00FF66] transition-colors`}
                />
                {errors.fullName && <p className="font-mono text-[11px] text-red-400">{errors.fullName}</p>}
              </div>

              {/* USN / Student ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-gray-300">
                    COLLEGE USN / STUDENT ID <span className="text-[#00FF66]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.usn}
                    onChange={(e) => setFormData({ ...formData, usn: e.target.value.toUpperCase() })}
                    placeholder="e.g. 4SO23CS001"
                    className={`w-full bg-[#050806] border ${
                      errors.usn ? 'border-red-500' : 'border-[#00FF66]/30'
                    } focus:border-[#00FF66] text-white font-mono text-xs px-3.5 py-2.5 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#00FF66] transition-colors uppercase`}
                  />
                  {errors.usn && <p className="font-mono text-[11px] text-red-400">{errors.usn}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-xs text-gray-300">
                    EMAIL ADDRESS <span className="text-[#00FF66]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@sjec.ac.in"
                    className={`w-full bg-[#050806] border ${
                      errors.email ? 'border-red-500' : 'border-[#00FF66]/30'
                    } focus:border-[#00FF66] text-white font-mono text-xs px-3.5 py-2.5 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#00FF66] transition-colors`}
                  />
                  {errors.email && <p className="font-mono text-[11px] text-red-400">{errors.email}</p>}
                </div>
              </div>

              {/* Academic Year & Area of Interest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-gray-300">
                    ACADEMIC YEAR / SEMESTER <span className="text-[#00FF66]">*</span>
                  </label>
                  <select
                    value={formData.yearSemester}
                    onChange={(e) => setFormData({ ...formData, yearSemester: e.target.value })}
                    className="w-full bg-[#050806] border border-[#00FF66]/30 focus:border-[#00FF66] text-white font-mono text-xs px-3.5 py-2.5 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#00FF66] transition-colors"
                  >
                    {YEAR_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#080C0A] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-xs text-gray-300">
                    AREA OF INTEREST <span className="text-[#00FF66]">*</span>
                  </label>
                  <select
                    value={formData.areaOfInterest}
                    onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                    className="w-full bg-[#050806] border border-[#00FF66]/30 focus:border-[#00FF66] text-white font-mono text-xs px-3.5 py-2.5 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#00FF66] transition-colors"
                  >
                    {DOMAIN_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#080C0A] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="block font-mono text-xs text-gray-300">
                  MOTIVATION / MESSAGE <span className="text-gray-500">(OPTIONAL)</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you want to build or learn..."
                  maxLength={500}
                  className="w-full bg-[#050806] border border-[#00FF66]/30 focus:border-[#00FF66] text-white font-mono text-xs px-3.5 py-2.5 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#00FF66] transition-colors resize-none"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 border-t border-[#00FF66]/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#00FF66] text-black font-mono text-xs font-bold uppercase rounded-xs hover:bg-[#00E65C] transition-colors disabled:opacity-50 flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,102,0.3)]"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                      // SUBMITTING...
                    </>
                  ) : (
                    'SUBMIT APPLICATION →'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
