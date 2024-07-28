import { defineConfig, envField } from 'astro/config';
import vue from '@astrojs/vue';
import node from '@astrojs/node';
//import db from '@astrojs/db'
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  experimental: {
    env: {
      schema: {
        ASTRO_DATABASE_FILE: envField.string({
          context: "server",
          access: "secret",
          optional: false
        })
      }
    }
  },
  output: 'server',
  adapter: node({
    mode: 'middleware'
  }),
  trailingSlash: 'never',
  redirects: {
    "/content-test": "/portofolio/test",
    "/apalah": "/artic/test"
  },
  integrations: [vue()
  //db(),
  , tailwind(), mdx()]
});