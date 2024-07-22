import { defineConfig, envField } from 'astro/config'
import vue from '@astrojs/vue'

export default defineConfig({
  experimental:{
    env:{
      schema:{
        ASTRO_DATABASE_FILE: envField.string({
          context: "server",
          access: "secret",
          optional: false,
        })
      }
    }
  },
  server:{
    port: 80
  },
  trailingSlash: 'never',
  redirects: {
    "/content-test": "/portofolio/test",
    "/apalah": "/artic/test"
  },
  integrations: [
    vue(),
  ]
})