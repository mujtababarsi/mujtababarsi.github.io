import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
      // If deploying to https://<USERNAME>.github.io/<REPO>/, set base to '/<REPO>/'
      // If deploying to https://<USERNAME>.github.io/, set base to '/'
      base: '/', 
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
