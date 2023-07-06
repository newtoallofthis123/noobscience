import { useState } from 'react';

export default function GoSudo() {
    const [slug, setSlug] = useState('');

    async function submit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await fetch('/api/go/sudo', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (data.error) return toast.error(data.error);
        else {
            setSlug(data.slug);
        }
    }
    return (
        <>
        <form onSubmit={submit}>
            <div className="page-div bg-yellow-300">
                <h1 className="text-4xl px-10 font-bold p-2">
                    The Noob URL Shortener
                </h1>
                <div>
                    <div className="mt-0 pt-4 p-10">
                        <h2>
                            <span className="text-2xl font-base">
                                The Long URL:
                            </span>{' '}
                        </h2>
                        <input
                            type="text"
                            className="w-3/5 md:w-2/3 p-5 border-2 border-black text-xl rounded-md my-5"
                            name="url"
                            />
                        <h2>
                            <span className="text-2xl font-base">
                                Custom Hash:
                            </span>{' '}
                        </h2>
                        <input
                            type="text"
                            className="w-3/5 md:w-2/3 p-5 border-2 border-black text-xl rounded-md my-5"
                            name="slug"
                        />
                        <p></p>
                        <button
                            className="btn bg-gray-300 text-xl my-3"
                            type="submit"
                        >
                            Post The Go
                        </button>
                        <p>
                            <span className="text-2xl font-base py-3">
                                The Short URL:
                            </span>{' '}
                            <a href={"https://beta.noobscience.rocks/go/" + slug} className='text-2xl font-base underline'>
                              {slug}  
                            </a> {
                                slug && (
                                    <span onClick={() => {
                                navigator.clipboard.writeText("https://beta.noobscience.rocks/go/" + slug);
                                toast.success("Copied to Clipboard");
                            }}><i className="bi bi-clipboard text-2xl font-base cursor-pointer"></i></span>
                                )
                            }
                        </p>
                    </div>
                </div>
            </div>
        </form>
        </>
    );
}
