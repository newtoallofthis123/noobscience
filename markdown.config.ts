import remarkHtml from 'remark-html';
import { remarkReadingTime } from './remark-reading-time.mjs';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeMathJaxSvg from 'rehype-mathjax';
import remarkExpressiveCode from 'remark-expressive-code'

export default {
    remarkPlugins: [
        remarkHtml,
        remarkReadingTime,
        remarkMath,
        [remarkExpressiveCode, { highlightTheme: 'github-dark' }]
    ],
    rehypePlugins: [rehypeMathJaxSvg, rehypeSlug],
};
