import { useState, useEffect } from "react";
import { X, ShieldCheck, Calendar, Sparkles } from "lucide-react";
import {
  statusOptions,
  securityOptions,
  functionalityOptions,
  seoOptions,
} from "../data/mockData";
import CompanyLogo from "./CompanyLogo";

const StartAuditModal = ({ website, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    dateAudited: new Date().toISOString().split("T")[0],
    status: website?.status || "Pending",
    securityCheck: website?.securityCheck || "Not Tested",
    functionalityTest: website?.functionalityTest || "Not Tested",
    seo: website?.seo || "Not Tested",
    remarks: website?.remarks || "",
  });

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(website.id, formData);
    onClose();
  };

  if (!website) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Dark Frosted Glass Backdrop Overlay */}
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          onClick={onClose}
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        {/* Modal Container */}
        <div className="relative inline-block align-bottom bg-[#0e1516] border border-[#243336] rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full z-10">
          {/* Top Yellow Accent Line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#fff800] to-transparent" />

          {/* Header */}
          <div className="px-6 py-5 border-b border-[#1c292c] flex items-center justify-between bg-[#111a1c]/60">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-[#fff800]/10 border border-[#fff800]/20 flex items-center justify-center text-[#fff800]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Start Website Audit
                </h3>
                <p className="text-xs text-[#859496]">
                  Record audit findings and evaluate site parameters
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#859496] hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            {/* Website Info Card */}
            <div className="p-4 rounded-xl bg-[#121b1d] border border-[#202d30] flex items-center gap-4">
              <CompanyLogo
                website={website}
                className="h-12 w-12 rounded-xl object-contain border border-white/10 bg-white p-1"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-white truncate text-base">
                  {website.name}
                </h4>
                <p className="text-xs text-[#859496] truncate">{website.url}</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#182527] text-[#fff800] border border-[#273a3d]">
                {website.type}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date Audited */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1.5">
                  Date Audited
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.dateAudited}
                    onChange={(e) =>
                      setFormData({ ...formData, dateAudited: e.target.value })
                    }
                    className="block w-full px-3.5 py-2.5 rounded-xl border border-[#202c2e] bg-[#0d1415] text-white text-sm focus:outline-none focus:border-[#fff800]/60 focus:ring-2 focus:ring-[#fff800]/15"
                    required
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1.5">
                  Overall Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="block w-full px-3.5 py-2.5 rounded-xl border border-[#202c2e] bg-[#0d1415] text-white text-sm focus:outline-none focus:border-[#fff800]/60 focus:ring-2 focus:ring-[#fff800]/15"
                  required
                >
                  {statusOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-[#0b1011] text-white"
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Security Check */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1.5">
                  Security Check
                </label>
                <select
                  value={formData.securityCheck}
                  onChange={(e) =>
                    setFormData({ ...formData, securityCheck: e.target.value })
                  }
                  className="block w-full px-3.5 py-2.5 rounded-xl border border-[#202c2e] bg-[#0d1415] text-white text-sm focus:outline-none focus:border-[#fff800]/60 focus:ring-2 focus:ring-[#fff800]/15"
                  required
                >
                  {securityOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-[#0b1011] text-white"
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Functionality Test */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1.5">
                  Functionality Test
                </label>
                <select
                  value={formData.functionalityTest}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      functionalityTest: e.target.value,
                    })
                  }
                  className="block w-full px-3.5 py-2.5 rounded-xl border border-[#202c2e] bg-[#0d1415] text-white text-sm focus:outline-none focus:border-[#fff800]/60 focus:ring-2 focus:ring-[#fff800]/15"
                  required
                >
                  {functionalityOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-[#0b1011] text-white"
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* SEO */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1.5">
                  SEO Audit Result
                </label>
                <select
                  value={formData.seo}
                  onChange={(e) =>
                    setFormData({ ...formData, seo: e.target.value })
                  }
                  className="block w-full px-3.5 py-2.5 rounded-xl border border-[#202c2e] bg-[#0d1415] text-white text-sm focus:outline-none focus:border-[#fff800]/60 focus:ring-2 focus:ring-[#fff800]/15"
                  required
                >
                  {seoOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-[#0b1011] text-white"
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1.5">
                Audit Remarks &amp; Recommendations
              </label>
              <textarea
                value={formData.remarks}
                onChange={(e) =>
                  setFormData({ ...formData, remarks: e.target.value })
                }
                rows={3}
                className="block w-full px-3.5 py-2.5 rounded-xl border border-[#202c2e] bg-[#0d1415] text-white text-sm focus:outline-none focus:border-[#fff800]/60 focus:ring-2 focus:ring-[#fff800]/15 leading-relaxed placeholder-[#64748b]"
                placeholder="Enter remarks, vulnerability details, or recommended actions..."
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#1c292c] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#94a3b8] hover:text-white bg-[#12191a] hover:bg-[#1a2527] border border-[#202c2e] transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-black bg-[#fff800] hover:bg-[#fffa66] shadow-[0_0_20px_rgba(255,248,0,0.3)] transition-all active:scale-[0.98]"
              >
                Save Audit Results
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StartAuditModal;

