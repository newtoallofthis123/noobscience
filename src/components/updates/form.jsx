import { useState } from 'react';

export default function UpdateForm() {
    const [slug, setSlug] = useState('');
    const [admin, setAdmin] = useState(false);

    async function submit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await fetch('/api/updates/add', {
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
            {
                admin ? (
            <form onSubmit={submit}>
                <div className="page-div bg-green-300">
                    <h1 className="text-4xl px-10 font-bold p-2">
                        Add a new Update
                    </h1>
                    <div>
                        <div className="mt-0 pt-4 p-10">
                            <h2>
                                <span className="text-2xl font-base">
                                    Update Title
                                </span>{' '}
                            </h2>
                            <input
                                type="text"
                                className="w-3/5 md:w-2/3 p-2 border-2 border-black text-xl rounded-md my-5"
                                name="name"
                                required
                            />
                            <p></p>
                            <h2>
                                <span className="text-2xl font-base">
                                    Author Name: 
                                </span>{' '}
                            </h2>
                            <input
                                type="text"
                                className="w-3/5 md:w-2/3 p-2 border-2 border-black text-xl rounded-md my-5"
                                name="author"
                                required
                            />
                            <p></p>
                            <h2>
                                <span className="text-2xl font-base">
                                    Update Content
                                </span>{' '}
                            </h2>
                            <textarea
                                className="w-3/5 md:w-2/3 p-2 border-2 border-black text-xl rounded-md my-5"
                                name="content"
                                rows="10"
                                required
                            ></textarea>
                            <p></p>
                            <button
                                className="btn bg-gray-300 text-xl my-3"
                                type="submit"
                            >
                                Post The Update
                            </button>
                            <p>
                                <span className="text-2xl font-base py-3">
                                    The Short URL:
                                </span>{' '}
                                <a href={"/quips/" + slug} className='text-2xl font-base underline'>
                                {slug}  
                                </a> {
                                    slug && (
                                        <span onClick={() => {
                                    navigator.clipboard.writeText("/quips/" + slug);
                                    toast.success("Copied to Clipboard");
                                }}><i className="bi bi-clipboard text-2xl font-base cursor-pointer"></i></span>
                                    )
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </form>
                ) : (
                        <form onSubmit={checkPassword}>
                            <div className="page-div bg-red-300">
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
                                            className="w-3/5 md:w-2/3 p-2 border-2 border-black text-xl rounded-md my-5"
                                            name="password"
                                        />
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </form>

                )
            }
        </>
    );
}
