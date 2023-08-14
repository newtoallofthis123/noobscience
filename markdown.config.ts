import remarkHtml from 'remark-html';
import { remarkReadingTime } from './remark-reading-time.mjs';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import rehypeMathJaxSvg from 'rehype-mathjax';
import rehypePrettyCode from 'rehype-pretty-code';

const options = {
    theme: 'one-dark-pro',
    lineNumbers: true,
}; 

export default {
    remarkPlugins: [remarkHtml, remarkReadingTime, remarkMath],
    rehypePlugins: [
        [rehypePrettyCode, options],
        rehypeMathJaxSvg,
        rehypeSlug,
    ],
};
