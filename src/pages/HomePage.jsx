import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { fetchAllShows } from "../api/tvmaze";

function HomePage({ onNavigate }) {
  const [featured, setFeatured] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchAllShows()
      .then((shows) => {
        const top = [...shows]
          .filter((s) => s?.rating?.average != null && s?.image?.medium)
          .sort((a, b) => b.rating.average - a.rating.average)
          .slice(0, 8);
        setFeatured(top);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Hero onExplore={() => onNavigate("movies")} />

      {/* Featured strip — 1 col mobile, 2 cols small, 3-4 cols desktop */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white min-[480px]:text-2xl">
              🔥 Top Rated Right Now
            </h2>
            <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
              A quick taste — head to Movies to search the full catalog.
            </p>
          </div>
          <button
            onClick={() => onNavigate("movies")}
            className="hidden min-h-[44px] shrink-0 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 sm:block"
          >
            View all →
          </button>
        </div>

        {featured.length === 0 ? (
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 sm:gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] animate-pulse rounded-2xl bg-white/5"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {featured.slice(0, 4).map((show) => (
              <MovieCard key={show.id} show={show} onDetails={setSelected} />
            ))}
          </div>
        )}

        <button
          onClick={() => onNavigate("movies")}
          className="mt-6 min-h-[48px] w-full rounded-xl bg-white/10 py-3 text-sm font-bold text-white transition hover:bg-red-600 sm:hidden"
        >
          View all movies →
        </button>
      </section>

      {selected && <MovieModal show={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default HomePage;
