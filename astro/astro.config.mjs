import { defineConfig } from 'astro/config';
import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
    build: {
        // Example: Generate `page.html` instead of `page/index.html` during build.
        format: 'file'
    },
    output: 'server',
    adapter: node({
      mode: "standalone"
    })
});
