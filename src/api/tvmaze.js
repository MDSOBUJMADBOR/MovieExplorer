export const TVMAZE_BASE = "https://api.tvmaze.com";

export async function fetchAllShows() {
  const res = await fetch(`${TVMAZE_BASE}/shows`);
  if (!res.ok) throw new Error(`Failed to fetch shows (${res.status})`);
  return res.json();
}

export async function searchShows(query) {
  const res = await fetch(
    `${TVMAZE_BASE}/search/shows?q=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error(`Search failed (${res.status})`);
  const data = await res.json();
  // API returns [{ score, show }], normalize to [show]
  return data.map((item) => item.show);
}

export async function fetchShowById(id) {
  const res = await fetch(`${TVMAZE_BASE}/shows/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch details (${res.status})`);
  return res.json();
}

// TVMaze summaries contain HTML tags — strip them for safe text rendering
export function stripHtml(html) {
  if (!html) return "No overview available.";
  return html.replace(/<[^>]*>/g, "").trim() || "No overview available.";
}

export function getYear(show) {
  if (show?.premiered) return show.premiered.slice(0, 4);
  return "N/A";
}

export function getRating(show) {
  return show?.rating?.average ?? null;
}
