import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilm, FaThumbsUp, FaThumbsDown, FaClock } from 'react-icons/fa';

const features = [
  {
    icon: <FaSearch className="w-8 h-8" />,
    title: "Smart Search",
    description: "Enter any movie title to get detailed information including ratings, plot, cast, and more."
  },
  {
    icon: <FaFilm className="w-8 h-8" />,
    title: "Movie Analysis",
    description: "Get AI-powered recommendations on whether to watch or skip a movie based on your preferences and viewing history."
  },
  {
    icon: <FaClock className="w-8 h-8" />,
    title: "Time Saver",
    description: "Save precious time by getting instant recommendations instead of watching trailers or reading long reviews."
  }
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-purple to-darker-purple pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-8"
        >
          How CineBolt Works
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-purple/30 backdrop-blur-lg rounded-xl p-6 mb-12"
        >
          <p className="text-white/90 text-lg leading-relaxed">
            CineBolt is your intelligent movie companion that helps you make better watching decisions. 
            Our AI-powered system analyzes movie data and provides quick, reliable recommendations on 
            whether a movie is worth your time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-dark-purple/20 backdrop-blur-sm rounded-xl p-6 hover:bg-dark-purple/30 transition-all"
            >
              <div className="text-purple-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-dark-purple/30 backdrop-blur-lg rounded-xl p-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Our Recommendation System</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-green-400">
                <FaThumbsUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Watch It!</h3>
                <p className="text-white/80">
                  When we recommend watching a movie, it means:
                  <ul className="list-disc ml-6 mt-2">
                    <li>High audience and critic ratings</li>
                    <li>Strong storytelling and production value</li>
                    <li>Engaging plot and character development</li>
                    <li>Worth your time investment</li>
                  </ul>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-red-400">
                <FaThumbsDown className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Skip This One</h3>
                <p className="text-white/80">
                  When we suggest skipping a movie, it could be due to:
                  <ul className="list-disc ml-6 mt-2">
                    <li>Poor critical reception</li>
                    <li>Weak plot or character development</li>
                    <li>Technical or production issues</li>
                    <li>Better alternatives available</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks; 