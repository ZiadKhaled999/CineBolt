import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { z } from 'zod';
import cors from 'cors';
import { config } from './config';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

const searchSchema = z.object({
  title: z.string().min(1),
});

// Function to fetch detailed movie info
async function getMovieDetails(imdbID: string) {
  try {
    const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${config.omdbApiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

app.get('/api/search/:title', async (req, res) => {
  try {
    const title = req.params.title;
    
    // First, search for movies with the given title
    const searchResponse = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(title)}&type=movie&apikey=${config.omdbApiKey}`);
    const searchData = await searchResponse.json();
    
    if (searchData.Error) {
      return res.status(404).json({ message: searchData.Error });
    }

    // If we have multiple results, get detailed info for each movie
    const movies = await Promise.all(
      searchData.Search.slice(0, 5).map((movie: any) => getMovieDetails(movie.imdbID))
    );

    // Filter out any null results from failed requests
    const validMovies = movies.filter(movie => movie !== null);

    // If we have results, send them
    if (validMovies.length > 0) {
      res.json({
        totalResults: searchData.totalResults,
        movies: validMovies
      });
    } else {
      res.status(404).json({ message: 'No movies found' });
    }
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Failed to search movie' });
  }
});

// Add this after the other routes, before startServer function
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Function to try starting the server on different ports
  async function startServer(initialPort: number) {
    const maxPortTries = 10; // Try up to 10 different ports
    let currentPort = initialPort;

    for (let i = 0; i < maxPortTries; i++) {
      try {
        await new Promise((resolve, reject) => {
          const server = app.listen(currentPort)
            .once('listening', () => {
              console.log(`[express] Server started successfully on port ${currentPort}`);
              resolve(server);
            })
            .once('error', (err: any) => {
              if (err.code === 'EADDRINUSE') {
                console.log(`Port ${currentPort} is in use, trying next port...`);
                currentPort++;
                server.close();
                resolve(null);
              } else {
                reject(err);
              }
            });
        });

        if (currentPort !== initialPort) {
          console.log(`Note: Original port ${initialPort} was in use, using port ${currentPort} instead`);
        }
        break;
      } catch (err) {
        console.error(`Failed to start server on port ${currentPort}:`, err);
        if (i === maxPortTries - 1) {
          throw new Error(`Could not find an available port after ${maxPortTries} attempts`);
        }
        currentPort++;
      }
    }
    
    return currentPort;
  }

  // Start the server with automatic port selection
  startServer(config.port)
    .then(finalPort => {
      // Update the config with the actual port being used
      config.port = finalPort;
    })
    .catch(err => {
      console.error('Failed to start server:', err);
      process.exit(1);
    });
})();
