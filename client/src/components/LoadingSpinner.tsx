import { motion } from 'framer-motion';

export const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="flex justify-center items-center py-8"
  >
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-[var(--primary-accent)] border-t-transparent rounded-full animate-spin shadow-lg"></div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-[var(--text-secondary)] text-lg"
      >
        Searching for your movie...
      </motion.p>
    </div>
  </motion.div>
);
