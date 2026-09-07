const StatCard = ({
  title,
  value,
  color = "blue",
  icon,
  onClick,
  active = false,
  subtitle,
}) => {
  const colorMap = {
    blue: {
      accent: "#38bdf8",
      glow: "rgba(56, 189, 248, 0.15)",
      borderTop: "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.8), transparent)",
      text: "text-sky-400",
      bgPill: "bg-sky-500/10 text-sky-300 border-sky-500/20",
    },
    green: {
      accent: "#34d399",
      glow: "rgba(52, 211, 153, 0.15)",
      borderTop: "linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.8), transparent)",
      text: "text-emerald-400",
      bgPill: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    },
    yellow: {
      accent: "#fff800",
      glow: "rgba(255, 248, 0, 0.18)",
      borderTop: "linear-gradient(90deg, transparent, rgba(255, 248, 0, 0.9), transparent)",
      text: "text-[#fff800]",
      bgPill: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
    },
    red: {
      accent: "#f87171",
      glow: "rgba(248, 113, 113, 0.15)",
      borderTop: "linear-gradient(90deg, transparent, rgba(248, 113, 113, 0.8), transparent)",
      text: "text-rose-400",
      bgPill: "bg-rose-500/10 text-rose-300 border-rose-500/20",
    },
    gray: {
      accent: "#94a3b8",
      glow: "rgba(148, 163, 184, 0.15)",
      borderTop: "linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.6), transparent)",
      text: "text-slate-400",
      bgPill: "bg-slate-500/10 text-slate-300 border-slate-500/20",
    },
    purple: {
      accent: "#c084fc",
      glow: "rgba(192, 132, 252, 0.15)",
      borderTop: "linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.8), transparent)",
      text: "text-purple-400",
      bgPill: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    },
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-[#0e1516]/90 backdrop-blur-md border transition-all duration-200 p-5 select-none ${
        onClick ? "cursor-pointer hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]" : ""
      } ${
        active
          ? "border-[#fff800] ring-1 ring-[#fff800]/50 shadow-[0_0_25px_rgba(255,248,0,0.15)] bg-[#121c1e]"
          : "border-[#202c2e] hover:border-[#324447] hover:bg-[#11191a]"
      }`}
    >
      {/* Top Gradient Highlight Line */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-[1.5px] pointer-events-none"
        style={{ background: scheme.borderTop }}
      />

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#859496]">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white">
              {value}
            </span>
            {subtitle && (
              <span className="text-xs text-[#64748b]">{subtitle}</span>
            )}
          </div>
        </div>

        {icon && (
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] ${scheme.text} transition-transform group-hover:scale-110`}
          >
            {icon}
          </div>
        )}
      </div>

      {onClick && (
        <div className="mt-3 flex items-center justify-between text-[11px] text-[#6b7c7e] border-t border-[#182325] pt-2">
          <span>{active ? "Filtered" : "Click to filter"}</span>
          <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-[#fff800] animate-pulse" : "bg-[#2d3d40]"}`} />
        </div>
      )}
    </div>
  );
};

export default StatCard;

