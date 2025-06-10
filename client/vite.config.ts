import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Function to find an available port
async function findAvailablePort(startPort: number): Promise<number> {
  const maxTries = 10;
  let port = startPort;
  
  for (let i = 0; i < maxTries; i++) {
    try {
      await fetch(`http://localhost:${port}/health`);
      // If the fetch succeeds, the port is in use
      port++;
    } catch (error) {
      // If fetch fails, the port is available
      return port;
    }
  }
  return port;
}

export default defineConfig(async () => {
  const clientPort = await findAvailablePort(4000);
  
  return {
    plugins: [react()],
    server: {
      port: clientPort,
      strictPort: false,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          configure: (proxy, options) => {
            // Try different ports if the target is unreachable
            proxy.on('error', (err, req, res) => {
              const ports = [3000, 3001, 3002, 3003, 3004];
              let currentPortIndex = 0;

              const tryNextPort = () => {
                if (currentPortIndex < ports.length) {
                  const nextPort = ports[currentPortIndex++];
                  options.target = `http://localhost:${nextPort}`;
                  proxy.web(req, res, options);
                }
              };

              tryNextPort();
            });
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
}); 