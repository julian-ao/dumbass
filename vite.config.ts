/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
    },
    plugins: [
        react(),
        Svgr(),
    ],
    server: {
        open: true,
    },
});
