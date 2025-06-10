import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion } from 'framer-motion';

interface SearchFormProps {
  onSearch: (title: string) => void;
  isLoading: boolean;
}

export const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSearch(title.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Enter a movie title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all duration-200 pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-tertiary)] w-5 h-5" />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !title.trim()}
          className="px-6 py-3 bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] hover:opacity-90 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:ring-offset-2 focus:ring-offset-[var(--background-primary)] shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:inline flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Search Movie
              </>
            )}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Search
              </>
            )}
          </motion.span>
        </Button>
      </form>
    </motion.div>
  );
};
