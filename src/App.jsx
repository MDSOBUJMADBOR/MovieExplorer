import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import "./App.css";

function App() {
  const [page, setPage] = useState("home"); // 'home' | 'movies'

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar page={page} onNavigate={navigate} />
      {page === "home" ? (
        <HomePage onNavigate={navigate} />
      ) : (
        <ListingPage />
      )}
      <Footer />
    </div>
  );
}

export default App;
