const StatCard = ({ title, value, color = "blue", icon, isActive = false, clickable = true }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
    red: "bg-red-50 border-red-200 text-red-700",
    gray: "bg-gray-50 border-gray-200 text-gray-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700"
  };
  
  const activeColorClasses = {
    blue: "bg-blue-600 border-blue-700 text-white",
    green: "bg-green-600 border-green-700 text-white",
    yellow: "bg-yellow-600 border-yellow-700 text-white",
    red: "bg-red-600 border-red-700 text-white",
    gray: "bg-gray-600 border-gray-700 text-white",
    purple: "bg-purple-600 border-purple-700 text-white"
  };

  const baseClasses = isActive ? activeColorClasses[color] : colorClasses[color];
  const hoverClasses = clickable ? "hover:scale-105 hover:shadow-lg cursor-pointer" : "";

  return (
    <div className={`rounded-lg border-2 p-6 ${baseClasses} transition-all duration-200 ${hoverClasses}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${isActive ? 'opacity-90' : 'opacity-80'}`}>{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        {icon && <div className={isActive ? 'opacity-90' : 'opacity-50'}>{icon}</div>}
      </div>
    </div>
  );
};

export default StatCard;
