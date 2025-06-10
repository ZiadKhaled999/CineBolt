import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, Search, X, Info } from 'lucide-react';
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    
    window.location.href = `/search/${encodeURIComponent(searchQuery)}`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[var(--bg-overlay)] backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 md:hidden text-[var(--primary-accent)] hover:bg-[var(--background-secondary)] rounded-lg"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link href="/">
              <a className="flex items-center space-x-2">
                <img src="/src/assets/logo.svg" alt="CineBolt Logo" className="w-8 h-8" />
                <span className="text-2xl font-bold bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] bg-clip-text text-transparent">
                  CineBolt
                </span>
              </a>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/how-it-works">
                <a className="nav-link flex items-center gap-2">
                  <Info size={18} />
                  How it Works
                </a>
              </Link>
              <a 
                href="mailto:albhyrytwamrwhybusiness@gmail.com"
                className="nav-link"
              >
                Feedback
              </a>
            </div>

            {/* Search Button */}
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="bg-dark-purple/50 text-white rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                >
                  <FaSearch />
                </button>
              </form>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(true)}
                className="text-white/70 hover:text-white"
              >
                <FaSearch />
              </motion.button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mobile-nav ${isMenuOpen ? 'open' : 'closed'} p-6`}
      >
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 text-[var(--primary-accent)] hover:bg-[var(--background-secondary)] rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col space-y-6">
          <Link href="/">
            <a
              className="flex items-center justify-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="/src/assets/logo.svg" alt="CineBolt Logo" className="w-8 h-8" />
              <span className="text-3xl font-bold bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] bg-clip-text text-transparent">
                CineBolt
              </span>
            </a>
          </Link>
          <Link href="/how-it-works">
            <a
              className="nav-link text-xl text-center py-4 flex items-center justify-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Info size={20} />
              How it Works
            </a>
          </Link>
          <a 
            href="mailto:albhyrytwamrwhybusiness@gmail.com"
            className="nav-link text-xl text-center py-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Feedback
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar; 