import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function get() {
  return rss({
    title: 'Ishan Writes | NoobScience',
    description: 'Ishan Writes about cool stuff like Tech, Movies, Opinions and basically anything he wants to.',
    site: 'https://noobscience.rocks',
    items: await pagesGlobToRssItems(import.meta.glob('../../src/content/blog/*/*.mdx')),
    customData: `<language>en-us</language>`,
  });
}