import rss from '@astrojs/rss';
import { getCollection } from "astro:content"

let posts = await getCollection('blog', ({ data }) => {
  return data;
});

posts = posts.sort(
  (a: any, b: any) =>
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);


export async function GET() {
  return rss({
      title: 'Ishan Writes | NoobScience',
      description:
          'Ishan Writes about cool stuff like Tech, Movies, Opinions and basically anything he wants to.',
      site: 'https://noobscience.rocks',
      stylesheet: '/rss/styles.xsl',
      items: posts.map(
          ({ body, slug, data: { title, description, date: pubDate } }) => ({
              title,
              description,
              pubDate,
              link: `/blog/${slug}`,
          })
      ),
      customData: `<language>en-us</language>`,
  });
}