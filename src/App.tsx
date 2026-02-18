import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import Modal from './components/Modal';
import AboutView from './components/AboutView';
import { fetchFeed } from './services/api';
import type { Movie } from './types';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [view, setView] = useState<'home' | 'about'>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMovies = useCallback(async (reset = false) => {
    if (loadingRef.current) return;
    if (!reset && !hasMore) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const currentCursor = reset ? undefined : cursor;
      const data = await fetchFeed({
        type: 'latest',
        limit: 12,
        cursor: currentCursor
      });

      setMovies(prev => reset ? data.movies : [...prev, ...data.movies]);
      setCursor(data.next_cursor || undefined);
      setHasMore(data.hasMore);
      if (reset) setError(null);
    } catch (err) {
      console.error("Failed to fetch movies", err);
      if (reset) setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [cursor, hasMore]);

  useEffect(() => {
    // Initial load for latest movies
    loadMovies(true);

    // Load popular movies separately
    const loadPopular = async () => {
      try {
        const data = await fetchFeed({ type: 'popular', limit: 20 });
        setPopularMovies(data.movies);
      } catch (e) {
        console.error("Failed to load popular movies", e);
      }
    };
    loadPopular();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loadingRef.current && hasMore) {
          loadMovies();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMovies, hasMore]);

  const filteredMovies = movies.filter(movie => {
    const q = searchQuery.toLowerCase();
    return movie.title.toLowerCase().includes(q) ||
      movie.roast.headline.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen pb-24">
      <Navbar
        onSearchChange={setSearchQuery}
        onAboutClick={() => setView('about')}
        onHomeClick={() => setView('home')}
      />

      {view === 'home' && error && movies.length === 0 && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="text-5xl">🔥</div>
            <h2 className="text-xl font-bold text-zinc-100">Something went wrong</h2>
            <p className="text-zinc-400 max-w-md">{error}</p>
            <button
              onClick={() => loadMovies(true)}
              className="mt-4 px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
      )}

      {view === 'home' && (!error || movies.length > 0) && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
          {/* Popular Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-black burn-font text-zinc-100 uppercase tracking-wide">Popular <span className="text-primary">Right Now</span></h2>
              <div className="h-px bg-zinc-800 flex-grow"></div>
            </div>

            <div className="flex overflow-x-auto gap-5 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 custom-scrollbar">
              {popularMovies.map((movie) => (
                <div key={`pop-${movie.id}`} className="w-[280px] flex-shrink-0">
                  <MovieCard movie={movie} onClick={() => setSelectedMovie(movie)} />
                </div>
              ))}
              {popularMovies.length === 0 && !loading && (
                <div className="w-full text-zinc-500 font-mono text-sm py-10 text-center">Loading popular roasts...</div>
              )}
            </div>
          </section>

          {/* Latest Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-black burn-font text-zinc-100 uppercase tracking-wide">Latest <span className="text-primary">Disasters</span></h2>
              <div className="h-px bg-zinc-800 flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-7 lg:gap-8">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={`${movie.id}-${movie.roast.headline}`}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                />
              ))}
            </div>

            <div ref={observerTarget} className="py-10 flex justify-center w-full">
              {loading && (
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-100"></div>
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-200"></div>
                </div>
              )}
              {!hasMore && movies.length > 0 && (
                <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest">End of the line</span>
              )}
            </div>
          </section>
        </main>
      )}

      {view === 'about' && (
        <AboutView onClose={() => setView('home')} />
      )}

      <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}

export default App;
