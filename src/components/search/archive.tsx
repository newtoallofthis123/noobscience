import React from 'react';

async function search_blog(term: string) {
    const url = `/api/search/${term}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export default function BlogArchive({ term = '' }: any) {
    const [search, setSearch] = React.useState(term);
    const [results, setResults] = React.useState([]);

    React.useEffect(() => {
        setSearch(term);
        if (term == '') {
            term = 'all';
        }
        const data = async () => {
            const data = await search_blog(term);
            setResults(data);
        };
        data();
    }, [term]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;
        if (value == '') {
            setResults(
                await search_blog('all')
            );
            setSearch('');
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
            <div className="w-5/6 focus:outline-none">
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (typeof window !== 'undefined') {
                            // @ts-ignore
                            window.location.href = '/blog/' + results[0].slug;
                        }
                    }}
                >
                    <input
                        type="search"
                        name="search"
                        className="text-base w-full border-2 border-current dark:text-white dark:bg-dark rounded-md focus:outline-none p-2"
                        value={search}
                        placeholder="Start Typing for Search"
                        onChange={handleChange}
                        autoFocus
                        autoComplete='off'
                    />
                </form>
            </div>
            <div className="md:w-5/6 w-full">
                {results.length != 0 &&
                    results.map((post: any) => (
                        <div
                            key={post.url}
                            className="flex flex-col justify-center items-center md:justify-normal md:items-start md:flex-row md:p-2 p-1 md:my-4 m-2 cursor-pointer hover:border-2 border-gray-200 dark:border-white rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                        >
                            <div className="p-4">
                                <p>
                                    {post.data.type}
                                </p>
                                <p className="text-2xl text-center md:text-justify font-bold">
                                    {post.data.emoji && (
                                        <span>{post.data.emoji} </span>
                                    )}
                                    <a href={'/blog/' + post.slug}>
                                        {post.data.title}
                                    </a>
                                </p>
                                <p className="text-gray-500 text-lg w-full md:w-3/5 py-2">
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
