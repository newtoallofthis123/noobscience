import { useState } from 'react';

export default function QuickForm() {
    const [slug, setSlug] = useState('');
    const [admin, setAdmin] = useState(false);

    async function submit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await fetch('/api/quicks/add', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (data.error) return toast.error(data.error);
        else {
            setSlug(data.hash);
        }
    }
    function checkPassword(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const password = formData.get('password');
        if (password === import.meta.env.PUBLIC_NS_PWD) {
            setAdmin(true);
        }   
    }
    return (
        <>
            {admin ? (
                <form onSubmit={submit}>
                    <div className="page-div font-mono bg-green-300 dark:bg-dark">
                        <h1 className="text-4xl px-10 font-bold p-2">
                            Add a new Update
                        </h1>
                        <div>
                            <div className="mt-0 pt-4 p-10">
                                <h2>
                                    <span className="text-2xl font-base">
                                        Title
                                    </span>{' '}
                                </h2>
                                <input
                                    type="text"
                                    className="w-3/5 md:w-2/3 p-2 border-2 border-black dark:text-dark focus:outline-none text-xl rounded-md my-5"
                                    name="title"
                                    id="title"
                                    required
                                />
                                <p></p>
                                <h2>
                                    <span className="text-2xl font-base">
                                        Hash: 
                                    </span>{' '}
                                </h2>
                                <input
                                    type="text"
                                    className="w-3/5 md:w-2/3 p-2 border-2 border-black dark:text-dark focus:outline-none text-xl rounded-md my-5"
                                    name="hash"
                                    id="hash"
                                    required
                                />
                                <p></p>
                                <h2>
                                    <span className="text-2xl font-base">
                                        Type:
                                    </span>{' '}
                                </h2>
                                <select
                                    className="w-3/5 md:w-2/3 p-2 border-2 border-black dark:text-dark focus:outline-none text-xl rounded-md my-5"
                                    name="type"
                                    id="type"
                                >
                                    <option value="txt">Text</option>
                                    <option value="md">Markdown</option>
                                    <option value="embed">Embed</option>
                                    <option value="link">Link</option>
                                </select>
                                <p></p>
                                <h2>
                                    <span className="text-2xl font-base">
                                        Decorate:
                                    </span>{' '}
                                </h2>
                                <select
                                    className="w-3/5 md:w-2/3 p-2 border-2 border-black dark:text-dark focus:outline-none text-xl rounded-md my-5"
                                    name="decorate"
                                    id="decorate"
                                >
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                                <p></p>
                                <h2>
                                    <span className="text-2xl font-base">
                                        Content
                                    </span>{' '}
                                </h2>
                                <textarea
                                    className="w-3/5 md:w-2/3 p-2 border-2 border-black dark:text-dark focus:outline-none text-xl rounded-md my-5"
                                    name="content"
                                    rows="10"
                                    required
                                ></textarea>
                                <p></p>
                                <button
                                    className="btn dark:bg-white dark:text-dark text-xl my-3"
                                    type="submit"
                                >
                                    Post The Quick
                                </button>
                                <p>
                                    <span className="text-2xl font-base py-3">
                                        The Short URL:
                                    </span>{' '}
                                    <a
                                        href={'/q/' + slug}
                                        className="text-2xl font-base underline"
                                    >
                                        {slug}
                                    </a>{' '}
                                    {slug && (
                                        <span
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    '/quips/' + slug
                                                );
                                                toast.success(
                                                    'Copied to Clipboard'
                                                );
                                            }}
                                        >
                                            <i className="bi bi-clipboard text-2xl font-base cursor-pointer"></i>
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <form onSubmit={checkPassword}>
                    <div className="page-div bg-red-300 dark:bg-dark">
                        <h1 className="text-4xl px-10 font-bold p-2">
                            Add a new Update
                        </h1>
                        <div>
                            <div className="mt-0 pt-4 p-10">
                                <h2>
                                    <span className="text-2xl font-base">
                                        Enter Password
                                    </span>{' '}
                                </h2>
                                <input
                                    type="password"
                                    className="w-3/5 md:w-2/3 p-2 border-2 dark:text-dark focus:outline-none border-black text-xl rounded-md my-5"
                                    name="password"
                                />
                                <p></p>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}
