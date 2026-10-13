function SearchBar({ value, onChange, loading }) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
          🔍
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for a movie... (e.g. girls, batman, friends)"
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-12 text-white placeholder-zinc-500 outline-none backdrop-blur transition focus:border-red-500/60 focus:bg-white/10 focus:ring-2 focus:ring-red-500/20"
        />
        {loading ? (
          <span className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin rounded-full border-2 border-zinc-600 border-t-red-500" />
        ) : (
          value && (
            <button
              onClick={() => onChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-zinc-400 hover:bg-white/10 hover:text-white"
              aria-label="Clear search"
            >
              ✕
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default SearchBar;
