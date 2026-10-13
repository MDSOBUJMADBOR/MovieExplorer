function Navbar({ page, onNavigate }) {
  const linkCls = (active) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      active
        ? "text-white bg-white/10"
        : "text-zinc-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-white"
        >
          <span className="text-2xl">🎬</span>
          <span>
            Movie<span className="text-red-500">Explorer</span>
          </span>
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          <button onClick={() => onNavigate("home")} className={linkCls(page === "home")}>
            Home
          </button>
          <button onClick={() => onNavigate("movies")} className={linkCls(page === "movies")}>
            Movies
          </button>
          <button
            onClick={() => onNavigate("movies")}
            className="ml-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-500 active:scale-95"
          >
            Explore
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
