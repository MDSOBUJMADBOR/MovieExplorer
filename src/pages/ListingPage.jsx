/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { fetchAllShows, searchShows } from "../api/tvmaze";

function ListingPage() {
  const [query, setQuery] = useState("");
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  
  const loadAll = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAllShows();
      setShows(data);
    } catch {
      setError("Failed to load movies. Please check your connection and retry.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Debounced search — grid updates dynamically based on query
  useEffect(() => {
    if (!query.trim()) {
      if (!loading && shows.length === 0) loadAll();
      // If user clears search, reload full list (only if we previously searched)
      return;
    }
    setSearching(true);
    const t = setTimeout(async () => {
      try {
        const results = await searchShows(query.trim());
        setShows(results);
        setError("");
      } catch {
        setError("Search failed. Please try again.");
      } finally {
        setSearching(false);
      }
    }, 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleQueryChange = async (val) => {
    setQuery(val);
    if (!val.trim()) {
      // restore full catalog
      setSearching(true);
      try {
        const data = await fetchAllShows();
        setShows(data);
        setError("");
      } catch {
        setError("Failed to load movies.");
      } finally {
        setSearching(false);
      }
    }
  };

  const isBusy = loading || searching;

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <h1 className="text-center text-2xl font-extrabold text-white min-[480px]:text-3xl sm:text-4xl">
          Browse <span className="text-red-500">Movies</span>
        </h1>
        <p className="mx-auto mt-2 max-w-xl break-words text-center text-xs text-zinc-400 sm:text-sm">
          {query.trim()
            ? `${shows.length} result${shows.length !== 1 ? "s" : ""} for "${query}"`
            : "All shows • Type to search by title"}
        </p>

        <div className="mt-6">
          <SearchBar value={query} onChange={handleQueryChange} loading={searching} />
        </div>

        {error && (
          <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center">
            <p className="text-sm text-red-300">{error}</p>
            <button
              onClick={loadAll}
              className="mt-2 min-h-[44px] rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              Retry
            </button>
          </div>
        )}

        {isBusy && shows.length === 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:mt-8 md:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
              >
                <div className="aspect-[2/3] animate-pulse bg-white/5" />
                <div className="space-y-2 p-4">
                  <div className="h-4 animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ) : !isBusy && shows.length === 0 && !error ? (
          <div className="mt-16 text-center">
            <p className="text-5xl">🍿</p>
            <p className="mt-3 text-lg font-semibold text-white">No movies found</p>
            <p className="mt-1 text-sm text-zinc-400">
              Try a different title, e.g. "batman", "friends", "office".
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:mt-8 md:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-4">
            {shows.map((show) => (
              <MovieCard key={show.id} show={show} onDetails={setSelected} />
            ))}
          </div>
        )}
      </div>

      {selected && <MovieModal show={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default ListingPage;
