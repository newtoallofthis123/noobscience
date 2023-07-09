import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";
import markdownConfig from './markdown.config';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://beta.noobscience.rocks",
  integrations: [react(), tailwind(), mdx(
    {
      ...markdownConfig,
      extendPlugins: false
    }
  ), sitemap()],
  output: "server",
  adapter: vercel(),
  markdown: {
    ...markdownConfig,
    gfm: true,
    shikiConfig: {
      theme: 'github-light',
      langs: ['javascript', 'html', 'css', 'typescript', 'tsx', 'jsx', 'json', 'markdown', 'mdx', 'bash', 'shell', 'md', 'mdx', 'rust'],
      wrap: true,
    },
    syntaxHighlight: 'shiki',
    drafts: false,
  },
  compressHTML: true,
  experimental: {
    redirects: true
  },
  redirects: {
    '/updates/[id]': '/quips/[id]',
    '/w': '/writes',
    '/blog': '/writes',
    '/green': '/type/long'
  }
});