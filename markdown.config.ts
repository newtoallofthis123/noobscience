import remarkHtml from 'remark-html';
import { remarkReadingTime } from './remark-reading-time.mjs';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import rehypeMathJaxSvg from 'rehype-mathjax';

export default {
    remarkPlugins: [
        remarkHtml,
        remarkReadingTime,
        remarkMath,
    ],
    rehypePlugins: [
        rehypeMathJaxSvg,
        rehypeSlug,
        [
            rehypeAutolinkHeadings,
            {
                behavior: 'wrap',
                properties: {
                    className: 'heading',
                },
            },
        ],
    ],
};
