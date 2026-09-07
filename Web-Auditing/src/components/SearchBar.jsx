import { Search, X } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search websites, URLs or systems...",
}) => {
  return (
    <div className="relative w-full group">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-[#64748b] group-focus-within:text-[#fff800] transition-colors" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#202c2e] bg-[#0d1415]/90 text-white placeholder-[#64748b] text-sm backdrop-blur-md transition-all duration-150 focus:outline-none focus:border-[#fff800]/60 focus:ring-2 focus:ring-[#fff800]/15 focus:bg-[#10191b]"
        placeholder={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748b] hover:text-white transition-colors"
          title="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

