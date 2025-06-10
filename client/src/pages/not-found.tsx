import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--background-primary)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4"
      >
        <Card className="bg-[var(--background-secondary)] border border-[var(--dark-accent)]/20 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center mb-6"
            >
              <AlertCircle className="h-16 w-16 text-[var(--primary-accent)] mb-4" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] bg-clip-text text-transparent mb-2">
                404 Page Not Found
              </h1>
              <p className="text-[var(--text-secondary)] text-lg">
                Oops! The page you're looking for doesn't exist.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center"
            >
              <Link href="/">
                <a className="btn-primary flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Return Home
                </a>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
