import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  // Explicit repository subpath for GitHub Pages production builds.
  // Defaults to /muza1p.github.io-zahrti/; can be overridden via VITE_BASE_PATH if forked/renamed.
  const prodBase = process.env.VITE_BASE_PATH || '/muza1p.github.io-zahrti/';

  return {
    base: command === 'build' ? prodBase : '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
