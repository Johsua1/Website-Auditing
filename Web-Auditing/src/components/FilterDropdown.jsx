const FilterDropdown = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-xs font-medium uppercase tracking-wider text-green-100/40 mb-1.5">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full px-3 py-2.5 rounded-lg text-sm
        bg-white/5 border border-emerald-400/15
        text-green-100/80
        focus:outline-none focus:ring-1 focus:ring-emerald-400/40 focus:border-emerald-400/40
        transition-colors appearance-none cursor-pointer"
      style={{ colorScheme: "dark" }}
    >
      <option value="All" style={{ background: "#0d1717" }}>All</option>
      {options.map((opt) => (
        <option key={opt} value={opt} style={{ background: "#0d1717" }}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default FilterDropdown;