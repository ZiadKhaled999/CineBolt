import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchForm } from '@/components/SearchForm';
import MovieResult from '@/components/MovieResult';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Film, Clapperboard, Star, TrendingUp } from "lucide-react";
import { MovieData } from '@shared/schema';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Film,
    title: "Instant Movie Info",
    description: "Get comprehensive movie information instantly"
  },
  {
    icon: Star,
    title: "Ratings & Reviews",
    description: "Make informed decisions about what to watch"
  },
  {
    icon: TrendingUp,
    title: "Latest Updates",
    description: "Stay updated with the latest movie information"
  }
];

interface SearchResponse {
  totalResults: number;
  movies: MovieData[];
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieData | null>(null);

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    setIsLoading(true);
    setError(null);
    setSelectedMovie(null);
    
    try {
      const response = await fetch(`/api/search/${encodeURIComponent(term)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch movie data');
      }
      
      if (data.movies && data.movies.length > 0) {
        setSearchResults(data);
        // If only one result, select it automatically
        if (data.movies.length === 1) {
          setSelectedMovie(data.movies[0]);
        }
      } else {
        setError('No movies found');
        setSearchResults(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieSelect = (movie: MovieData) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[var(--primary-accent)] to-[var(--secondary-accent)] rounded-2xl mb-6">
              <img src="/src/assets/logo.svg" alt="CineBolt Logo" className="w-12 h-12 md:w-14 md:h-14" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] bg-clip-text text-transparent">
              Your Ultimate Movie Guide
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Get instant access to movie information, helping you make the perfect choice for your next movie night.
            </p>

            {/* Search Section */}
            <div className="mt-8 max-w-2xl mx-auto">
              <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </motion.div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--primary-accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--secondary-accent)]/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-4 py-8">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Alert variant="destructive" className="bg-destructive/10 border border-destructive/20">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Movie Result */}
        {searchResults && !selectedMovie && searchResults.movies.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4 mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              Found {searchResults.totalResults} results. Select a movie:
            </h2>
            <div className="grid gap-4">
              {searchResults.movies.map((movie) => (
                <motion.div
                  key={movie.imdbID}
                  className="bg-dark-purple/30 backdrop-blur-lg rounded-lg p-4 cursor-pointer hover:bg-dark-purple/40 transition-all"
                  onClick={() => handleMovieSelect(movie)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-poster.jpg"}
                      alt={movie.Title}
                      className="w-16 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{movie.Title}</h3>
                      <p className="text-white/60">{movie.Year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedMovie && (
          <MovieResult movie={selectedMovie} />
        )}
      </section>

      {/* Features Section */}
      {!isLoading && !error && (
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[var(--primary-accent)] to-[var(--secondary-accent)] rounded-xl mb-4">
                  {React.createElement(feature.icon, {
                    className: "w-6 h-6 text-white"
                  })}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}
    </div>
  );
}
