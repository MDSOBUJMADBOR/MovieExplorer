import heroImg from "../assets/hero.png";

function Hero({ onExplore }) {
  return (
    <header className="relative overflow-hidden">
      {/* Background image + gradients */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Movies collage"
          className="h-full w-full object-cover opacity-40"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-zinc-950/60" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
        <span className="mb-4 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200 backdrop-blur">
          🎞️ TV Shows • Movies • Discover
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          DISCOVER <span className="text-red-500">MOVIES</span>
        </h1>
        <p className="mt-4 max-w-xl text-base text-zinc-300 sm:text-lg">
          Explore and discover your favorite movies from around the world.
          Search titles, check ratings, and dive into details — all in one place.
        </p>
        <button
          onClick={onExplore}
          className="mt-8 rounded-xl bg-red-600 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-red-600/30 transition hover:-translate-y-0.5 hover:bg-red-500 active:scale-95"
        >
          Explore Now →
        </button>

        <div className="mt-10 flex items-center gap-6 text-sm text-zinc-400">
          <span>⭐ Ratings</span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span>📅 Release info</span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span>🎭 Genres</span>
        </div>
      </div>
    </header>
  );
}

export default Hero;
