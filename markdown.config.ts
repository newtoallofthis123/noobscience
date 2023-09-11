import remarkHtml from 'remark-html';
import { remarkReadingTime } from './remark-reading-time.mjs';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeMathJaxSvg from 'rehype-mathjax';
import remarkExpressiveCode from 'remark-expressive-code';

export default {
    remarkPlugins: [
        remarkHtml,
        remarkReadingTime,
        remarkMath,
        [remarkExpressiveCode, { highlightTheme: 'github-dark' }],
    ],
    rehypePlugins: [
        rehypeMathJaxSvg,
        rehypeSlug,
        rehypeHeadingIds,
        [
            rehypeAutolinkHeadings,
            {
                behavior: 'prepend',
                content: {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                        style: {
                            color: '#ffbc00',
                            paddingRight: '0.5rem',
                        },
                    },
                    children: [
                        {
                            type: 'text',
                            value: '#',
                        },
                    ],
                },
            },
        ],
    ],
};
