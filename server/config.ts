export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  omdbApiKey: process.env.OMDB_API_KEY || 'eeb28c8',
  nodeEnv: process.env.NODE_ENV || 'development',
}; 
