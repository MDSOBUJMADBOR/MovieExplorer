function SearchBar({ value, onChange, loading }) {
  return (
    <div className="mx-auto w-full max-w-2xl px-1">
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
          🔍
        </span>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for a movie..."
          aria-label="Search for a movie"
          className="min-h-[48px] w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-12 text-[16px] text-white placeholder-zinc-500 outline-none backdrop-blur transition focus:border-red-500/60 focus:bg-white/10 focus:ring-2 focus:ring-red-500/20"
        />
        {loading ? (
          <span className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin rounded-full border-2 border-zinc-600 border-t-red-500" />
        ) : (
          value && (
            <button
              onClick={() => onChange("")}
              className="absolute right-2 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-md px-2 py-1 text-zinc-400 hover:bg-white/10 hover:text-white"
              aria-label="Clear search"
            >
              ✕
            </button>
          )
        )}
      </div>
      <p className="mt-2 hidden text-center text-xs text-zinc-500 sm:block">
        Try e.g. “girls”, “batman”, “friends”
      </p>
    </div>
  );
}

export default SearchBar;
