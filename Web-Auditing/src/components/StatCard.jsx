const colorConfig = {
  blue: {
    base: "border-blue-400/20 bg-blue-400/5 text-blue-300",
    active: "border-blue-400/40 bg-blue-400/15 text-blue-200",
    icon: "text-blue-400/50",
    iconActive: "text-blue-300",
  },
  green: {
    base: "border-emerald-400/20 bg-emerald-400/5 text-emerald-300",
    active: "border-emerald-400/40 bg-emerald-400/15 text-emerald-200",
    icon: "text-emerald-400/50",
    iconActive: "text-emerald-300",
  },
  yellow: {
    base: "border-yellow-400/20 bg-yellow-400/5 text-yellow-300",
    active: "border-yellow-400/40 bg-yellow-400/15 text-yellow-200",
    icon: "text-yellow-400/50",
    iconActive: "text-yellow-300",
  },
  red: {
    base: "border-red-400/20 bg-red-400/5 text-red-300",
    active: "border-red-400/40 bg-red-400/15 text-red-200",
    icon: "text-red-400/50",
    iconActive: "text-red-300",
  },
  gray: {
    base: "border-slate-500/20 bg-slate-500/5 text-slate-400",
    active: "border-slate-400/40 bg-slate-400/15 text-slate-200",
    icon: "text-slate-500/50",
    iconActive: "text-slate-300",
  },
  purple: {
    base: "border-violet-400/20 bg-violet-400/5 text-violet-300",
    active: "border-violet-400/40 bg-violet-400/15 text-violet-200",
    icon: "text-violet-400/50",
    iconActive: "text-violet-300",
  },
};

const StatCard = ({
  title,
  value,
  color = "blue",
  icon,
  isActive = false,
  clickable = true,
}) => {
  const cfg = colorConfig[color] ?? colorConfig.blue;
  const classes = isActive ? cfg.active : cfg.base;
  const iconClass = isActive ? cfg.iconActive : cfg.icon;

  return (
    <div
      className={`glass-card rounded-xl border-2 p-5 transition-all duration-200
        ${classes}
        ${clickable ? "cursor-pointer hover:scale-[1.03] hover:shadow-lg" : ""}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider opacity-70 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
        </div>
        {icon && <div className={`${iconClass} transition-colors`}>{icon}</div>}
      </div>
    </div>
  );
};

export default StatCard;