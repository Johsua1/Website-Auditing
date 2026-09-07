import { getStatusColor, getStatusIcon } from "../utils/helpers";

// Dark-theme status badge
const darkColorMap = {
  Passed: "bg-emerald-400/10 text-emerald-400 border-emerald-400/25",
  Passed_Conditional: "bg-emerald-400/10 text-emerald-400 border-emerald-400/25",
  Warning: "bg-yellow-400/10 text-yellow-300 border-yellow-400/25",
  "Needs Review": "bg-yellow-400/10 text-yellow-300 border-yellow-400/25",
  Failed: "bg-red-400/10 text-red-400 border-red-400/25",
  Pending: "bg-slate-400/10 text-slate-300 border-slate-400/25",
  "Not Tested": "bg-slate-400/10 text-slate-300 border-slate-400/25",
};

const getDarkColor = (status) =>
  darkColorMap[status] ?? "bg-slate-400/10 text-slate-300 border-slate-400/25";

const StatusBadge = ({ status, showIcon = true }) => (
  <span
    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDarkColor(status)}`}
  >
    {showIcon && <span>{getStatusIcon(status)}</span>}
    {status}
  </span>
);

export default StatusBadge;