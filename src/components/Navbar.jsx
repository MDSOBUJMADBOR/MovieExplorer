import { useState } from "react";

function Navbar({ page, onNavigate }) {
  const [open, setOpen] = useState(false);

  const linkCls = (active) =>
    `min-h-[44px] px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
      active
        ? "text-white bg-white/10"
        : "text-zinc-400 hover:text-white hover:bg-white/5"
    }`;

  const go = (p) => {
    setOpen(false);
    onNavigate(p);
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <button
          onClick={() => go("home")}
          className="flex min-h-[44px] items-center gap-2 text-base font-bold tracking-tight text-white sm:text-lg"
          aria-label="MovieExplorer home"
        >
          <span className="text-xl sm:text-2xl">🎬</span>
          <span className="whitespace-nowrap">
            Movie<span className="text-red-500">Explorer</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 sm:gap-2 md:flex">
          <button onClick={() => go("home")} className={linkCls(page === "home")}>
            Home
          </button>
          <button onClick={() => go("movies")} className={linkCls(page === "movies")}>
            Movies
          </button>
          <button
            onClick={() => go("movies")}
            className="ml-2 min-h-[44px] rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-500 active:scale-95"
          >
            Explore
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => go("movies")}
            className="min-h-[44px] rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-500 active:scale-95"
          >
            Explore
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-white/10 text-xl text-white"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-white/10 px-4 py-3 md:hidden">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => go("home")} className={`${linkCls(page === "home")} w-full`}>
              🏠 Home
            </button>
            <button onClick={() => go("movies")} className={`${linkCls(page === "movies")} w-full`}>
              🎬 Movies
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
