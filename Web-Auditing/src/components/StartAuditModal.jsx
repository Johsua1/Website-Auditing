import { useEffect, useState } from "react";
import { X, Play } from "lucide-react";
import CompanyLogo from "./CompanyLogo";
import {
  statusOptions,
  securityOptions,
  functionalityOptions,
  seoOptions,
} from "../data/mockData";

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
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!website) return null;

  const update = (field, value) =>
    setFormData((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(website.id, formData);
    onClose();
  };

  const selectFields = [
    ["status", "Status", statusOptions],
    ["securityCheck", "Security Check", securityOptions],
    ["functionalityTest", "Functionality Test", functionalityOptions],
    ["seo", "SEO", seoOptions],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog container */}
      <div className="relative w-full max-w-xl rounded-2xl glass-card border border-emerald-400/20 bg-[#0b1414]/95 shadow-2xl shadow-black/80 overflow-hidden my-auto z-10">
        {/* Header */}
        <div className="px-6 py-4 border-b border-emerald-400/15 flex items-center justify-between bg-emerald-400/5">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
              <Play className="w-3.5 h-3.5 fill-emerald-400" />
            </span>
            <h3 className="text-base font-semibold text-green-50">
              Start Website Audit
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-green-100/40 hover:text-green-50 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close audit modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Company preview banner */}
          <div className="p-4 rounded-xl bg-white/4 border border-emerald-400/10 flex items-center gap-3.5">
            <CompanyLogo
              website={website}
              className="h-12 w-12 rounded-xl border border-emerald-400/15 bg-white/5 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-green-50 truncate">
                {website.name}
              </h4>
              <p className="text-xs text-green-100/50 truncate mt-0.5">
                {website.url}
              </p>
            </div>
            <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-green-100/40 border border-emerald-400/10">
              {website.type}
            </span>
          </div>

          <div className="space-y-4">
            {/* Date Audited */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-green-100/50 mb-1.5">
                Date Audited
              </label>
              <input
                type="date"
                value={formData.dateAudited}
                onChange={(event) => update("dateAudited", event.target.value)}
                className="block w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-white/5 border border-emerald-400/15 text-green-100/90 focus:outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/30 transition-colors [color-scheme:dark]"
                required
              />
            </div>

            {/* Selects in 2-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {selectFields.map(([field, label, options]) => (
                <div key={field}>
                  <label className="block text-xs font-medium uppercase tracking-wider text-green-100/50 mb-1.5">
                    {label}
                  </label>
                  <select
                    value={formData[field]}
                    onChange={(event) => update(field, event.target.value)}
                    className="block w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-[#0d1818] border border-emerald-400/15 text-green-100/90 focus:outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/30 transition-colors"
                    required
                  >
                    {options.map((option) => (
                      <option key={option} value={option} className="bg-[#0b1414] text-green-50">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-green-100/50 mb-1.5">
                Remarks
              </label>
              <textarea
                value={formData.remarks}
                onChange={(event) => update("remarks", event.target.value)}
                rows={3}
                className="block w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-white/5 border border-emerald-400/15 text-green-100/90 placeholder-green-100/30 focus:outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/30 transition-colors"
                placeholder="Enter audit observations, findings, or notes..."
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-lg text-xs font-medium bg-white/5 border border-emerald-400/15 text-green-100/70 hover:bg-white/10 hover:text-green-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-lg text-xs font-semibold bg-emerald-400 text-black hover:bg-emerald-300 shadow-lg shadow-emerald-400/20 active:scale-[0.99] transition-all"
            >
              Save Audit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartAuditModal;