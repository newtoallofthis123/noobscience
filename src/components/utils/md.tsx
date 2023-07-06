import { marked } from 'marked';
import hljs from 'highlight.js';
import "../styles/monokai.css"

type Props = {
    content: string;
};

export default function Markdown({ content }:Props) {
    const renderer = new marked.Renderer();

    renderer.code = function (code, language) {
        const className = `hls ${language}`;
        const highlightedCode = language
            ? hljs.highlight(language, code).value
            : code;
        return `<pre class="${className} overflow-x-scroll bg-gray-950 p-5 text-lg rounded-md text-white"><code class="language-${language}">${highlightedCode}</code></pre>`;
    };

    const html = marked(content, { renderer, mangle: false, headerIds: false });

    return <div className='p-4' dangerouslySetInnerHTML={{ __html: html }} />;
}
