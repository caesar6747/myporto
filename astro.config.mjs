import { defineConfig} from 'astro/config';
import vue from '@astrojs/vue';
import node from '@astrojs/node';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'middleware'
  }),
  trailingSlash: 'never',
  redirects: {
    "/content-test": "/portofolio/test",
    "/apalah": "/artic/test"
  },
  integrations: [
    vue(),
    tailwind(),
    mdx()]
});