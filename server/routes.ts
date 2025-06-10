import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { movieSearchSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Movie search API route
  app.get('/api/search/:title', async (req, res) => {
    try {
      const { title } = req.params;
      
      // Validate the title parameter
      const validationResult = movieSearchSchema.safeParse({ title });
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: validationResult.error.errors[0]?.message || "Invalid movie title" 
        });
      }

      const validatedTitle = validationResult.data.title;
      
      // Get API key from environment variables
      let apiKey = process.env.OMDB_API_KEY || process.env.OMDB_KEY || process.env.API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ message: 'OMDb API key not configured' });
      }

      // Extract API key if it's in URL format
      if (apiKey.includes('apikey=')) {
        const match = apiKey.match(/apikey=([a-f0-9]+)/);
        if (match) {
          apiKey = match[1];
        }
      }

      const omdbUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(validatedTitle)}&plot=full&apikey=${apiKey.trim()}`;
      
      console.log(`Fetching from OMDb: ${omdbUrl.replace(apiKey, 'API_KEY_HIDDEN')}`);
      
      const response = await fetch(omdbUrl);
      
      if (!response.ok) {
        console.error(`OMDb API response not ok: ${response.status} ${response.statusText}`);
        return res.status(500).json({ message: `Failed to fetch data from OMDb API: ${response.status}` });
      }

      const movieData = await response.json();
      console.log(`OMDb response:`, movieData);

      // Check if OMDb returned an error (e.g., "Movie not found!")
      if (movieData.Response === 'False') {
        return res.status(404).json({ message: movieData.Error || 'Movie not found' });
      }

      // Send the movie data back to the frontend
      res.json(movieData);

    } catch (error) {
      console.error('Server Error:', error);
      res.status(500).json({ message: 'Error fetching data from OMDb API' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
