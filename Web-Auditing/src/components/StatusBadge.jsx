const getBadgeStyles = (status) => {
  switch (status) {
    case "Passed":
    case "Good":
      return {
        pill: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
        dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse",
      };
    case "Needs Review":
    case "Warning":
    case "Needs Improvement":
      return {
        pill: "bg-yellow-500/10 text-[#fff800] border-yellow-500/30",
        dot: "bg-[#fff800] shadow-[0_0_8px_rgba(255,248,0,0.6)] animate-pulse",
      };
    case "Failed":
    case "Poor":
      return {
        pill: "bg-rose-500/10 text-rose-300 border-rose-500/30",
        dot: "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse",
      };
    case "In Progress":
      return {
        pill: "bg-sky-500/10 text-sky-300 border-sky-500/30",
        dot: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)] animate-pulse",
      };
    case "Pending":
    case "Not Tested":
    default:
      return {
        pill: "bg-slate-500/10 text-slate-300 border-slate-500/20",
        dot: "bg-slate-400",
      };
  }
};

const StatusBadge = ({ status, showIcon = true, size = "md" }) => {
  const styles = getBadgeStyles(status);
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium border tracking-wide select-none backdrop-blur-xs transition-colors ${styles.pill} ${sizeClasses}`}
    >
      {showIcon && (
        <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${styles.dot}`} />
      )}
      <span>{status || "Not Tested"}</span>
    </span>
  );
};

export default StatusBadge;

