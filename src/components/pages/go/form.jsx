import { useState } from 'react';

export default function GoForm() {
    const [slug, setSlug] = useState('');

    async function submit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        if(!formData.get('url')) return toast.error('Please enter a URL')
        const response = await fetch('/api/go', {
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
            <div className="md:mt-10 px-10">
                <h1 className="text-5xl p-2">
                    NoobShort
                    </h1>
                    <p className='text-lg p-2'>
                        Because simplicity is the ultimate sophistication.
                    </p>
                <div>
                    <div className="mt-0 pt-4 p-2">
                            <div style={{
                                boxShadow: '0.3em 0.4em'
                            }} className='border-2 p-2 border-black md:w-3/5 mt-2 mb-4 rounded-xl'>
                                <input
                                    style={{
                                        backgroundColor: '#f5f5f5',
                                    }}
                                type="url"
                            className="w-5/6 p-2 border-r-2 border-black focus:outline-none text-lg"
                                name="url"
                                placeholder='Paste the Long Thing Here'
                        />
                                <button
                            className="w-1/6 p-2 text-xl"
                            type="submit"
                        >
                            Shorten It!
                            </button>
                        </div>
                        <p>
                            <span className="text-lg font-base py-3">
                                Thank me later for this: {' '}
                            </span>{' '}
                            <a href={"https://noobscience.rocks/go/" + slug} className='text-lg font-base underline'>
                              {slug}  
                            </a> {
                                slug && (
                                    <span onClick={() => {
                                navigator.clipboard.writeText("https://noobscience.rocks/go/" + slug);
                                toast.success("Copied to Clipboard");
                            }}><i className="bi bi-clipboard text-2xl font-base cursor-pointer"></i></span>
                                )
                            }
                            </p>
                            <h2 className='text-xl font-bold py-5'>
                                Mandatory Dev Stuff
                            </h2>
                            <p className='md:w-3/5 leading-8'>
                                Hey! I am Ishan, the creator of NoobShort. NoobShort was initially a huge flask app with postgres.
                                But, now, it is a simple React Component that uses MongoDB.
                                This is mostly just to be used by me and my friends. But, if you want to use it, you can.
                                However, don't post anything illegal.
                                I regularly delete all the data from the database. So, don't expect your links to be there forever.
                        </p>
                    </div>
                </div>
            </div>
        </form>
        </>
    );
}
