import { motion } from "framer-motion";
import { FaThumbsUp, FaThumbsDown, FaStar, FaClock, FaCalendar, FaDollarSign, FaImdb } from "react-icons/fa";
import { SiRottentomatoes } from "react-icons/si";

interface MovieResultProps {
  movie?: {
    Title?: string;
    Year?: string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Actors?: string;
    Plot?: string;
    Poster?: string;
    imdbRating?: string;
    Metascore?: string;
    BoxOffice?: string;
    Budget?: string;
    Production?: string;
    Ratings?: Array<{
      Source: string;
      Value: string;
    }>;
  };
}

export const MovieResult: React.FC<MovieResultProps> = ({ movie }) => {
  if (!movie) {
    return null;
  }

  const getRecommendation = () => {
    const imdbScore = parseFloat(movie.imdbRating || "0");
    const rtRating = movie.Ratings?.find(r => r.Source === "Rotten Tomatoes")?.Value || "0%";
    const rtScore = parseInt(rtRating.replace("%", ""), 10);
    
    // Calculate weighted score (IMDB and RT have equal weight)
    const weightedScore = (imdbScore * 10 * 0.5) + (rtScore * 0.5);
    
    // Consider runtime for pacing factor
    const runtime = parseInt(movie.Runtime?.replace(/\D/g, '') || "0", 10);
    const isPacingGood = runtime >= 80 && runtime <= 165;
    
    // Genre consideration
    const genres = (movie.Genre || "").toLowerCase();
    const isPopularGenre = genres.includes('action') || 
                          genres.includes('adventure') || 
                          genres.includes('comedy') || 
                          genres.includes('drama');

    if (weightedScore >= 75 && isPacingGood) {
      return {
        recommendation: "watch",
        reason: "High ratings from both critics and audiences make this a must-watch!"
      };
    } else if (weightedScore >= 65 && (isPacingGood || isPopularGenre)) {
      return {
        recommendation: "watch",
        reason: "Solid entertainment value with positive audience feedback."
      };
    } else if (weightedScore < 50 || (!isPacingGood && weightedScore < 60)) {
      return {
        recommendation: "skip",
        reason: "Mixed reviews and potential pacing issues suggest you might want to skip this one."
      };
    } else {
      return {
        recommendation: "neutral",
        reason: "Consider watching if you're a fan of the genre or cast."
      };
    }
  };

  const formatCurrency = (value?: string) => {
    if (!value || value === "N/A") return "N/A";
    return value.replace(/\$/, '').replace(/,/g, '').trim();
  };

  const recommendation = getRecommendation();
  const rtRating = movie.Ratings?.find(r => r.Source === "Rotten Tomatoes")?.Value;
  const metacriticRating = movie.Ratings?.find(r => r.Source === "Metacritic")?.Value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-purple/30 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl"
    >
      <div className="md:flex">
        <div className="md:w-1/3">
          <img
            src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "/placeholder-poster.jpg"}
            alt={movie.Title || "Movie poster"}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-white">{movie.Title || "Unknown Title"}</h2>
          </div>

          <div className="flex flex-wrap gap-4 mb-6 text-white/80">
            <div className="flex items-center gap-2">
              <FaCalendar /> {movie.Year || "N/A"}
            </div>
            <div className="flex items-center gap-2">
              <FaClock /> {movie.Runtime || "N/A"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-dark-purple/20 p-4 rounded-lg flex items-center gap-3">
              <FaImdb className="text-yellow-400 w-6 h-6" />
              <div>
                <div className="text-white/60 text-sm">IMDb</div>
                <div className="text-white font-semibold">{movie.imdbRating || "N/A"}/10</div>
              </div>
            </div>
            
            <div className="bg-dark-purple/20 p-4 rounded-lg flex items-center gap-3">
              <SiRottentomatoes className="text-red-500 w-6 h-6" />
              <div>
                <div className="text-white/60 text-sm">Rotten Tomatoes</div>
                <div className="text-white font-semibold">{rtRating || "N/A"}</div>
              </div>
            </div>

            <div className="bg-dark-purple/20 p-4 rounded-lg flex items-center gap-3">
              <FaStar className="text-blue-400 w-6 h-6" />
              <div>
                <div className="text-white/60 text-sm">Metacritic</div>
                <div className="text-white font-semibold">{metacriticRating || "N/A"}</div>
              </div>
            </div>
          </div>

          <p className="text-white/90 mb-6">{movie.Plot || "No plot available."}</p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-white/60 text-sm">Director</h3>
              <p className="text-white">{movie.Director || "Unknown"}</p>
            </div>
            <div>
              <h3 className="text-white/60 text-sm">Cast</h3>
              <p className="text-white">{movie.Actors || "Unknown"}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-dark-purple/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FaDollarSign className="text-green-400" />
                <h3 className="text-white/60">Box Office</h3>
              </div>
              <p className="text-white font-semibold">{movie.BoxOffice || "N/A"}</p>
            </div>
            
            <div className="bg-dark-purple/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FaDollarSign className="text-green-400" />
                <h3 className="text-white/60">Production</h3>
              </div>
              <p className="text-white font-semibold">{movie.Production || "N/A"}</p>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${
            recommendation.recommendation === "watch" 
              ? "bg-green-500/20" 
              : recommendation.recommendation === "skip"
              ? "bg-red-500/20"
              : "bg-yellow-500/20"
          }`}>
            <div className="flex items-center gap-3 mb-2">
              {recommendation.recommendation === "watch" ? (
                <FaThumbsUp className="text-green-400 w-6 h-6" />
              ) : recommendation.recommendation === "skip" ? (
                <FaThumbsDown className="text-red-400 w-6 h-6" />
              ) : (
                <FaStar className="text-yellow-400 w-6 h-6" />
              )}
              <h3 className="text-white font-semibold">
                {recommendation.recommendation === "watch" 
                  ? "Watch It!" 
                  : recommendation.recommendation === "skip"
                  ? "Skip This One"
                  : "Consider It"}
              </h3>
            </div>
            <p className="text-white/90">{recommendation.reason}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieResult;
