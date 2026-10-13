function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left">
        <p className="text-sm font-semibold text-white">
          🎬 Movie<span className="text-red-500">Explorer</span>
        </p>
        <p className="text-sm text-zinc-400">© 2026 MovieExplorer. All rights reserved.</p>
        <div className="flex items-center gap-4 text-sm">
          <a
            href="https://www.tvmaze.com/api"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 transition hover:text-white"
          >
            TVMaze API
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 transition hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
