import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder = "Search websites..." }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
      <Search className="h-4 w-4 text-emerald-400/40" />
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full pl-10 pr-3 py-2.5 rounded-lg text-sm
        bg-white/5 border border-emerald-400/15
        text-green-100/80 placeholder-green-100/30
        focus:outline-none focus:ring-1 focus:ring-emerald-400/40 focus:border-emerald-400/40
        transition-colors"
      placeholder={placeholder}
    />
  </div>
);

export default SearchBar;