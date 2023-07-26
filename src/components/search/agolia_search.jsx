import React from 'react';
import algoliasearch from 'algoliasearch/lite';

export default function Search({ term = '', app_id = '', api_key = '' }) {
    const [search, setSearch] = React.useState(term);
    const [results, setResults] = React.useState([]);

    const searchClient = algoliasearch(app_id, api_key);

    const search_blog = async (term) => {
        const index = searchClient.initIndex('dev_main');
        const { hits } = await index.search(term, {
            hitsPerPage: 10,
        });
        console.log(hits);
        return hits;
    };

    React.useEffect(() => {
        setSearch(term);
        const data = async () => {
            const data = await search_blog(term);
            setResults(data);
        };
        data();
    }, [term]);

    const handleChange = async (e) => {
        const { value } = e.target;
        setSearch(value);
        if (value === '') {
            setResults([]);
            return;
        }
        const data = await search_blog(value);
        setResults(data);
    };

    return (
        <div className="flex flex-col py-3 justify-center items-center">
            <div className="w-5/6 focus:outline-none">
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const value = e.currentTarget.search.value;
                        const data = await search_blog(value);
                        if (data.length > 0) {
                            // Assuming the first result should be opened
                            const url = "/" + results[0].slug;
                            window.location.href = url;
                        }
                    }}
                >
                    <input
                        type="search"
                        name="search"
                        className="text-lg w-full border-2 border-black rounded-md focus:outline-none p-4 rounded-"
                        value={search}
                        onChange={handleChange}
                    />
                </form>
            </div>
            <div className="md:w-5/6 w-full">
                {results.length !== 0 ? (
                    results.map((post) => (
                        <div
                            key={post.objectID}
                            className="flex flex-col justify-center items-center md:justify-normal md:items-start md:flex-row md:p-4 p-1 border-gray-400 border-b-2"
                        >
                            <div className="md:p-4 p-1">
                                <p className="text-2xl text-center md:text-justify font-bold">
                                    {post.title}
                                </p>
                                {
                                    String(post.tags).split(',').map((tag) => (
                                        <a href={"/tags/" + tag} className="text-lg bg-gray-500 text-white mx-2">
                                            {tag}
                                        </a>
                                    ))
                                }
                                <p className="text-gray-500 text-sm">
                                    {new Date(post.date).toDateString()}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
}
