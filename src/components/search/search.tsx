import React from 'react';

async function search_blog(term: string) {
    const url = `/api/search/${term}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export default function Search({ term = '' }: any) {
    const [search, setSearch] = React.useState(term);
    const [results, setResults] = React.useState([]);

    React.useEffect(() => {
        setSearch(term);
        const data = async () => {
            const data = await search_blog(term);
            setResults(data);
        };
        data();
    }, [term]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;
        if (value == '') {
            setResults([]);
            setSearch('');
            return;
        }
        // Add some small shortcuts
        const shorts = {
            home: '/',
            about: '/about',
            contact: '/contact',
            blog: '/blog',
            projects: '/creations',
            creations: '/creations',
            resume: '/resume',
            cv: '/resume',
            go: '/go',
            links: '/social',
            social: '/social',
            code: '/code',
        };
        // @ts-ignore
        if (shorts[value.replace('!>', '').toLocaleLowerCase()] && value.startsWith('!>')) {
            if (typeof window !== 'undefined') {
                // @ts-ignore
                window.location.href = shorts[value.replace('!>', '').toLowerCase()];
            }
            return;
        }
        if (value.length < 3) {
            setSearch(value);
            return;
        }
        setSearch(value);
        const data = await search_blog(value);
        if (data.length != 0) {
            setResults(data);
        }
    };

    return (
        <div className="flex flex-col py-3 justify-center items-center">
            <div className="w-full focus:outline-none">
                <form
                    spellCheck="false"
                    autoComplete='off'
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (typeof window !== 'undefined') {
                            // @ts-ignore
                            if (results[0].data.category === "quips") {
                            // @ts-ignore
                                window.location.href = '/quips/' + results[0].slug;
                            } else {
                            // @ts-ignore
                                window.location.href = '/blog/' + results[0].slug;
                            }
                        }
                    }}
                >
                    <div className="flex flex-row w-full border-2 m-2 border-b-4 rounded-2xl border-r-4 border-current">
                        <input
                            type="search"
                            name="search"
                            className="text-lg w-5/6 dark:text-white dark:bg-dark rounded-2xl focus:outline-none md:p-3 p-2"
                            value={search}
                            placeholder="Search anything with a minimum of 3 characters, use 8 for better results"
                            onChange={handleChange}
                            autoFocus
                        />
                        <button className="rounded-r-xl text-xl dark:text-black w-2/12 bg-yellow-400">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full">
                {results.length != 0 &&
                    results.map((post: any) => (
                        <div
                            key={post.url}
                            className="flex flex-col justify-center items-center md:justify-normal md:items-start md:flex-row md:p-4 p-1 border-gray-400 border-b-2"
                        >
                            <div className="p-4">
                                <p className="text-xl text-center md:text-justify font-bold">
                                    {post.data.emoji && (
                                        <span>{post.data.emoji} </span>
                                    )}
                                    {
                                        post.data.category === "quips" ? (
                                            <a href={'/quips/' + post.slug}>
                                                {post.data.title}
                                            </a>
                                        ): (
                                            <a href={'/blog/' + post.slug}>
                                                {post.data.title}
                                            </a>
                                        )
                                    }
                                </p>
                                <p className="text-neutral-600 text-lg w-full py-2">
                                    {post.data.description}
                                </p>
                                {post.data.tags.length > 0 && (
                                    <ul>
                                        {post.data.tags.map((tag: string) => (
                                            <a href={'/tags/' + tag}>
                                                <li className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                    {tag}
                                                </li>
                                            </a>
                                        ))}
                                    </ul>
                                )}
                                <p className="text-gray-500 text-sm">
                                    {new Date(post.data.date).toDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                {results.length == 0 && <p>No results found</p>}
            </div>
        </div>
    );
}
