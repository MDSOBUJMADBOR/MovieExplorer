import { getRating, getYear } from "../api/tvmaze";

function MovieCard({ show, onDetails }) {
  const rating = getRating(show);
  const year = getYear(show);
  const poster = show?.image?.medium;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-800">
        {poster ? (
          <img
            src={poster}
            alt={show.name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-5xl">
            🎬
          </div>
        )}
        {rating != null && (
          <span className="absolute left-2 top-2 rounded-lg bg-black/75 px-2 py-1 text-xs font-bold text-amber-400 backdrop-blur">
            ⭐ {rating}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <h3 className="line-clamp-1 break-words text-sm font-bold text-white sm:text-base" title={show.name}>
          {show.name}
        </h3>
        <p className="whitespace-nowrap text-xs text-zinc-400 sm:text-sm">
          {rating != null ? `⭐ ${rating}` : "⭐ N/A"} <span className="mx-1">•</span> 📅 {year}
        </p>
        <button
          onClick={() => onDetails(show)}
          className="mt-auto min-h-[44px] w-full rounded-lg bg-white/10 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 active:scale-95"
        >
          See Details
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
