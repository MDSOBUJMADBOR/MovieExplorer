import heroImg from "../assets/hero.png";

function Hero({ onExplore }) {
  return (
    <header className="relative overflow-hidden">
      {/* Background image + gradients */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Movies collage"
          className="h-full w-full object-cover object-center opacity-40"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-zinc-950/60" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-32">
        <span className="mb-4 max-w-full rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-200 backdrop-blur sm:px-4 sm:text-xs sm:tracking-[0.2em]">
          🎞️ TV Shows • Movies • Discover
        </span>
        <h1 className="w-full text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white min-[480px]:text-5xl sm:text-6xl lg:text-7xl">
          DISCOVER <span className="text-red-500">MOVIES</span>
        </h1>
        <p className="mt-4 w-full max-w-xl text-pretty text-sm leading-relaxed text-zinc-300 min-[480px]:text-base sm:text-lg">
          Explore and discover your favorite movies from around the world.
          Search titles, check ratings, and dive into details — all in one place.
        </p>
        <button
          onClick={onExplore}
          className="mt-6 min-h-[48px] w-full rounded-xl bg-red-600 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-red-600/30 transition hover:-translate-y-0.5 hover:bg-red-500 active:scale-95 min-[480px]:w-auto sm:mt-8"
        >
          Explore Now →
        </button>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-400 sm:mt-10 sm:gap-6 sm:text-sm">
          <span className="whitespace-nowrap">⭐ Ratings</span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span className="whitespace-nowrap">📅 Release info</span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span className="whitespace-nowrap">🎭 Genres</span>
        </div>
      </div>
    </header>
  );
}

export default Hero;
