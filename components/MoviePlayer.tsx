"use client";
import { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Search,
  Film,
  Heart,
  PlayCircle,
  Home,
  Clock,
  Star,
} from "lucide-react";

// 🎥 Movie Database
const movies = [
  {
    id: 1,
    title: "Midnight Dreams",
    genre: "Romance / Drama",
    duration: "2h 15m",
    thumbnail: "🌙",
    year: "2024",
    rating: 8.5,
    description: "A heartwarming story of two souls finding each other in the city that never sleeps.",
    category: "Trending",
  },
  {
    id: 2,
    title: "Ocean Horizon",
    genre: "Adventure",
    duration: "1h 58m",
    thumbnail: "🌊",
    year: "2024",
    rating: 7.9,
    description: "An epic journey across uncharted seas to find a legendary island.",
    category: "New",
  },
  {
    id: 3,
    title: "City Lights",
    genre: "Mystery / Thriller",
    duration: "2h 05m",
    thumbnail: "🏙️",
    year: "2023",
    rating: 8.2,
    description: "When the lights go out in the big city, secrets begin to surface.",
    category: "Popular",
  },
  {
    id: 4,
    title: "Forest Whispers",
    genre: "Fantasy",
    duration: "1h 45m",
    thumbnail: "🌲",
    year: "2024",
    rating: 7.6,
    description: "Deep within the ancient woods, magic is real and waiting to be discovered.",
    category: "Fantasy",
  },
  {
    id: 5,
    title: "Starlight Journey",
    genre: "Sci-Fi",
    duration: "2h 30m",
    thumbnail: "⭐",
    year: "2025",
    rating: 8.8,
    description: "A crew of astronauts embarks on humanity's first mission to another galaxy.",
    category: "Trending",
  },
  {
    id: 6,
    title: "Desert Storm",
    genre: "Action",
    duration: "2h 10m",
    thumbnail: "🏜️",
    year: "2024",
    rating: 7.4,
    description: "A special forces team must survive behind enemy lines.",
    category: "Action",
  },
];

const categories = ["All", "Trending", "New", "Popular", "Action", "Fantasy"];

export default function MoviePlayer() {
  const [currentMovie, setCurrentMovie] = useState(movies[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter movies
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || movie.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const playMovie = (movie: typeof movies[0]) => {
    setCurrentMovie(movie);
    setIsPlaying(true);
    setProgress(0);
  };

  const nextMovie = () => {
    const idx = movies.findIndex((m) => m.id === currentMovie.id);
    const next = (idx + 1) % movies.length;
    playMovie(movies[next]);
  };

  const prevMovie = () => {
    const idx = movies.findIndex((m) => m.id === currentMovie.id);
    const prev = idx === 0 ? movies.length - 1 : idx - 1;
    playMovie(movies[prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 border-r border-gray-800 p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <Film className="text-red-500" size={28} />
          <span className="text-xl font-bold">CineStream</span>
        </div>

        <nav className="space-y-2">
          <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-red-600/20 text-red-400 font-medium">
            <Home size={20} /> Home
          </button>
          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800/50 text-gray-300">
            <PlayCircle size={20} /> My List
          </button>
          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800/50 text-gray-300">
            <Heart size={20} /> Favorites
          </button>
          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800/50 text-gray-300">
            <Clock size={20} /> Watch History
          </button>
        </nav>

        <div className="mt-8 pt-4 border-t border-gray-800">
          <p className="text-xs text-gray-500 mb-2">My List</p>
          <p className="text-sm text-gray-400">{favorites.length} movies saved</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-md mx-auto">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-sm focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        </header>

        {/* Now Playing */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-red-500 rounded-full"></span>
            Now Playing
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-2">
              {/* Video Screen */}
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-950/40 to-gray-900">
                  <span className="text-8xl mb-4">{currentMovie.thumbnail}</span>
                  <button
                    onClick={togglePlay}
                    className="w-20 h-20 rounded-full bg-red-600/90 flex items-center justify-center hover:bg-red-500 transition-all duration-200 hover:scale-110 shadow-lg"
                  >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                  </button>
                </div>

                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <span className="bg-black/60 px-3 py-1 rounded-full text-xs font-medium">
                    {currentMovie.year} • {currentMovie.genre}
                  </span>
                  <button
                    onClick={() => toggleFavorite(currentMovie.id)}
                    className="bg-black/60 p-2 rounded-full hover:bg-black/80 transition-colors"
                  >
                    <Heart
                      size={18}
                      className={favorites.includes(currentMovie.id) ? "fill-red-500 text-red-500" : "text-white"}
                    />
                  </button>
                </div>
              </div>

              {/* Movie Info */}
              <div className="mt-4">
                <h2 className="text-2xl font-bold">{currentMovie.title}</h2>
                <p className="text-gray-400 mt-1">{currentMovie.genre} • {currentMovie.duration}</p>
                <p className="text-sm text-gray-500 mt-2 max-w-lg">{currentMovie.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{currentMovie.rating}/10</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full transition-all duration-300"
                    style={{ width: ${progress}% }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>0:47:18</span>
                  <span>{currentMovie.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <button onClick={prevMovie} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                  <SkipBack size={20} />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </button>
                <button onClick={nextMovie} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                  <SkipForward size={20} />
                </button>
                <button onClick={toggleMute} className="p-2 hover:bg-gray-800 rounded-full transition-colors ml-auto">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>

            {/* Movie List Sidebar */}
            <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-800 h-fit">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-red-600 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PlayCircle size={18} className="text-red-400" />
                Movies
              </h3>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {filteredMovies.length === 0 ? (
                  <p className="text-gray-500 text-center py-8 text-sm">No movies found</p>
                ) : (
                  filteredMovies.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => playMovie(movie)}
                      className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        currentMovie.id === movie.id
                          ? "bg-red-600/20 border border-red-500/40"
                          : "bg-gray-800/30 hover:bg-gray-800/60 border border-transparent"
                      }`}
                    >
                      <span className="text-3xl">{movie.thumbnail}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{movie.title}</p>
                        <p className="text-xs text-gray-500">{movie.genre}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star size={10} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-xs">{movie.rating}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(movie.id);
                        }}
                        className="self-center"
                      >
                        <Heart
                          size={16}
                          className={favorites.includes(movie.id) ? "fill-red-500 text-red-500" : "text-gray-500"}
                        />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

