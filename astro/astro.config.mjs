import { defineConfig } from 'astro/config';
import node from '@astrojs/node'
import vue from '@astrojs/vue'

export default defineConfig({
  output: 'server',
  server:{
      port: 80
  },
  adapter: node({
      mode: 'middleware',
  }),
  trailingSlash: 'never',
  redirects: {
    "/content-test": "/portofolio/test",
    "/apalah": "/artic/test"
  },
  integrations: [vue()]
})