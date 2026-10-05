import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://drama-pro-33ff6.web.app',
  output: 'static',
  integrations: [tailwind()],
  build: {
    format: 'directory'
  }
});
