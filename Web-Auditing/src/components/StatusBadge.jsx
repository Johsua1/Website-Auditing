const getBadgeStyles = (status) => {
  switch (status) {
    case "Passed":
    case "Good":
      return {
        pill: "bg-green-100 text-green-800 border-green-300",
        dot: "bg-green-600",
      };
    case "Needs Review":
    case "Warning":
    case "Needs Improvement":
      return {
        pill: "bg-yellow-100 text-yellow-800 border-yellow-300",
        dot: "bg-yellow-600",
      };
    case "Failed":
    case "Poor":
      return {
        pill: "bg-red-100 text-red-800 border-red-300",
        dot: "bg-red-600",
      };
    case "In Progress":
      return {
        pill: "bg-blue-100 text-blue-800 border-blue-300",
        dot: "bg-blue-600",
      };
    case "Pending":
    case "Not Tested":
    default:
      return {
        pill: "bg-gray-200 text-gray-700 border-gray-400",
        dot: "bg-gray-600",
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

