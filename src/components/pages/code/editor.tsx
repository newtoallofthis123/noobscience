import React from "react";

type Props = {};

export default function CodeEditor({}: Props) {
    const [link, setLink] = React.useState('');
    const addCode = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const title = e.currentTarget.code_title.value;
        const content = e.currentTarget.content.value;
        const code_lang = e.currentTarget.code_lang.value;
        const author = e.currentTarget.author.value;
        fetch('/api/code/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: content,
                lang: code_lang,
                author: author
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setLink('/code/' + data.hash);
            })
            .catch(() => {
                console.log('Error posting Code');
            });
    };
    return (
        <>
            <div>
                <div className="page-div">
                    <h1 className="text-5xl font-heading pt-6 pb-4">
                        Enter Cool Code Snippets
                    </h1>
                    <p className="text-xl">
                        Yep. Enter the code and boom. It's there. As easy as
                        that
                    </p>
                    <div className="py-4">
                        <h2 className="text-3xl font-bold py-2">
                            Write a new code snippet
                        </h2>
                        <form className="py-4" onSubmit={addCode} method="POST">
                            <p className="text-xl">
                                <b>Title</b>: Enter the title of the code
                                snippet.
                            </p>
                            <input
                                type="text"
                                className="w-2/4 border-current dark:bg-dark  border-2 p-2 text-lg font-mono rounded-xl my-4"
                                name="code_title"
                                id="title"
                            />
                            <p className="text-xl">
                                <b>Language</b>: Enter the language of the code
                                snippet.
                            </p>
                            <select
                                className="border-2 w-2/5 border-current p-2 text-lg bg-gray-100 dark:bg-dark font-mono rounded-xl my-4"
                                name="code_lang"
                                id="code_lang"
                            >
                                <option value="javascript">Javascript</option>
                                <option value="python">Python</option>
                                <option value="c">C</option>
                                <option value="cpp">C++</option>
                                <option value="java">Java</option>
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                                <option value="php">PHP</option>
                                <option value="sql">SQL</option>
                                <option value="ruby">Ruby</option>
                                <option value="go">Go</option>
                                <option value="rust">Rust</option>
                                <option value="kotlin">Kotlin</option>
                                <option value="swift">Swift</option>
                                <option value="typescript">Typescript</option>
                                <option value="dart">Dart</option>
                                <option value="scala">Scala</option>
                                <option value="r">R</option>
                                <option value="perl">Perl</option>
                                <option value="lua">Lua</option>
                                <option value="matlab">Matlab</option>
                                <option value="bash">Bash</option>
                                <option value="powershell">Powershell</option>
                                <option value="elixir">Elixir</option>
                                <option value="clojure">Clojure</option>
                                <option value="julia">Julia</option>
                                <option value="lisp">Lisp</option>
                                <option value="xml">XML</option>
                                <option value="yaml">YAML</option>
                            </select>
                            <p className="text-xl">
                                <b>Author</b>: Enter your name
                            </p>
                            <input
                                type="text"
                                className="w-2/4 border-current dark:bg-dark  border-2 p-2 text-lg font-mono rounded-xl my-4"
                                name="author"
                                id="lang"
                            />
                            <p className="text-xl">
                                <b>Content</b>: Be sure to write the content of
                                the code snippet only.
                            </p>
                            <textarea
                                name="content"
                                id="content"
                                className="w-3/5 border-2 border-current dark:bg-dark rounded-xl p-2 text-md font-mono"
                                rows={10}
                                cols={10}
                            ></textarea>
                            <p></p>
                            <p></p>
                            <button
                                type="submit"
                                className="text-xl my-4 w-2/5 rounded-2xl bg-black text-white dark:dark:bg-light dark:text-black  p-4 hover:scale-105 transition duration-200"
                            >
                                Sent Code to the Database
                            </button>
                            <p></p>
                            {link ? (
                                <div className="text-xl">
                                    <a href={link}>{link}</a>
                                </div>
                            ) : (
                                <></>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
