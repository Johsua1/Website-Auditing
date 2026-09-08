const FilterDropdown = ({ label, value, onChange, options }) => {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full px-3 py-2 rounded-xl border border-[#202c2e] bg-[#0d1415] text-[#e2e8f0] text-sm focus:outline-none focus:border-[#fff800]/60 focus:ring-2 focus:ring-[#fff800]/15 transition-all cursor-pointer hover:border-[#2f3f42]"
        >
          <option value="All" className="bg-[#0c1214] text-white">
            All
          </option>
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-[#0c1214] text-white"
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterDropdown;

