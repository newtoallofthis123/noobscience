import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";
import markdownConfig from './markdown.config';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://noobscience.rocks",
  integrations: [react(), tailwind(), mdx({
    ...markdownConfig,
    extendPlugins: false
  }), sitemap()],
  output: "server",
  adapter: vercel({
    analytics: true,
    imageService: true,
    functionPerRoute: false,
  }),
  vite: {
    ssr: {
      noExternal: ['react-tweet']
    }
  },
  markdown: {
    ...markdownConfig,
    gfm: true,
    shikiConfig: {
      theme: 'github-dark',
      langs: ['javascript', 'html', 'css', 'typescript', 'tsx', 'jsx', 'json', 'markdown', 'mdx', 'bash', 'shell', 'rust', 'c', 'cpp', 'go', 'java', 'python', 'ruby'],
      wrap: false
    },
    syntaxHighlight: 'shiki'
  },
  redirects: {
    'htmler': 'https://htmler.noobscience.rocks',
  }
});