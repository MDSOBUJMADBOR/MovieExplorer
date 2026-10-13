/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { fetchShowById, getRating, getYear, stripHtml } from "../api/tvmaze";

function MovieModal({ show, onClose }) {
  const [details, setDetails] = useState(show);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Fetch full details (genres, network, etc. are already present, but refresh by id)
  useEffect(() => {
    if (!show) return;
    setDetails(show);
    setLoadingDetails(true);
    fetchShowById(show.id)
      .then(setDetails)
      .catch(() => {})
      .finally(() => setLoadingDetails(false));
  }, [show]);

  // Lock scroll + close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!show) return null;
  const d = details || show;
  const rating = getRating(d);
  const year = getYear(d);
  const backdrop = d?.image?.original || d?.image?.medium;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4 lg:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-white/10 bg-zinc-900 shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close X — 44px touch target */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-3 top-3 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition hover:bg-red-600"
        >
          ✕
        </button>

        {/* Backdrop */}
        <div className="relative h-48 w-full overflow-hidden bg-zinc-800 min-[480px]:h-56 sm:h-72">
          {backdrop ? (
            <img
              src={backdrop}
              alt={d.name}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-900/40 to-zinc-900 text-6xl">
              🎬
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />
        </div>

        <div className="p-4 pb-[max(1rem,env(safe-area-inset-bottom))] min-[480px]:p-5 sm:p-7">
          <h2 className="break-words text-xl font-extrabold text-white sm:text-2xl">{d.name}</h2>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-300 sm:text-sm">
            <span>⭐ Rating: {rating ?? "N/A"}</span>
            <span className="text-zinc-600">|</span>
            <span>📅 Release: {d.premiered ?? year}</span>
          </p>

          {loadingDetails && (
            <p className="mt-2 text-xs text-zinc-500">Loading full details…</p>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {(d.genres || []).map((g) => (
              <span
                key={g}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-zinc-200"
              >
                {g}
              </span>
            ))}
            {d.status && (
              <span className="rounded-full bg-green-500/15 px-3 py-1.5 text-xs font-medium text-green-400">
                {d.status}
              </span>
            )}
            {d.language && (
              <span className="rounded-full bg-blue-500/15 px-3 py-1.5 text-xs font-medium text-blue-300">
                {d.language}
              </span>
            )}
          </div>

          <h3 className="mt-5 font-semibold text-white">Overview:</h3>
          <p className="mt-1 text-sm leading-relaxed text-zinc-300">
            {stripHtml(d.summary)}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 min-[480px]:gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-white/5 p-3">
              <p className="text-xs text-zinc-500">Runtime</p>
              <p className="break-words font-semibold text-white">
                {d.runtime ? `${d.runtime} min` : "N/A"}
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <p className="text-xs text-zinc-500">Network</p>
              <p className="break-words font-semibold text-white">{d.network?.name ?? d.webChannel?.name ?? "N/A"}</p>
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <p className="text-xs text-zinc-500">Premiered</p>
              <p className="break-words font-semibold text-white">{d.premiered ?? "N/A"}</p>
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <p className="text-xs text-zinc-500">Official</p>
              {d.officialSite ? (
                <a
                  href={d.officialSite}
                  target="_blank"
                  rel="noreferrer"
                  className="break-words font-semibold text-red-400 hover:underline"
                >
                  Visit ↗
                </a>
              ) : (
                <p className="font-semibold text-white">N/A</p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-6 min-h-[48px] w-full rounded-xl bg-red-600 py-3 text-sm font-bold text-white transition hover:bg-red-500 active:scale-95 sm:w-auto sm:px-8"
          >
            ❌ Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
