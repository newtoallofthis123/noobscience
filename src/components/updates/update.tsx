import { useState, useEffect } from 'react';
import { marked } from 'marked';

export interface UpdateProps {
    hash: string | undefined;
}

export default function Update({ hash }: UpdateProps) {
    const [latest, setLatest] = useState({
        name: '',
        content: '',
        author: '',
        date: '',
        hash: '',
    });

    const [recommended, setRecommended] = useState([] as any[]);

    useEffect(() => {
        const url = '/api/updates/' + hash;
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const recommended_api = await fetch('/api/updates');
                const recommendedData = await recommended_api.json();
                const data = await response.json();
                setRecommended(
                    recommendedData.filter((update: any) => {
                        return new Date(update.date) > new Date(data.date);
                    })
                );
                setLatest(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col md:p-10 border-2 border-r-8 border-b-8 rounded-2xl md:m-10 border-black justify-center">
            {latest.name == '' && (
                <h1 className="text-center p-4">Loading...</h1>
            )}
            {latest.name != '' && (
                <div id="update" className="md:w-4/5 w-full">
                    <h1 className="md:text-5xl font-bold text-3xl md:py-4 py-1 pt-0">
                        {latest.name}
                    </h1>
                    <h2 className="font-base p-0 m-0 text-xl">
                        By {latest.author} on{' '}
                        {new Date(latest.date).toDateString()}
                    </h2>
                    <div
                        className="text-lg md:pt-8 p-0 md:leading-10"
                        dangerouslySetInnerHTML={{
                            __html: marked(latest.content, {
                                headerIds: false,
                                mangle: false,
                            }),
                        }}
                    />
                    <h1 className="py-2 md:text-xl text-lg font-bold">
                        <a href="/quips">Read more quips</a> ||{' '}
                        <button onClick={() => window.history.go(-1)}>
                            Go back
                        </button>
                    </h1>
                </div>
            )}
            {recommended && (
                <div className="md:w-4/5 w-full">
                    {recommended.length > 0 ? (
                        <div>
                            <h4 className="md:text-2xl text-xl font-semibold md:pt-6 py-3">
                                Some Quips I Wrote After This
                            </h4>
                            {recommended.map((update: any) => (
                                <div className="text-xl py-1 font-regular">
                                    <a
                                        className="dark:hover:bg-white no-underline hover:p-2 dark:hover:text-black hover:bg-dark hover:text-white transform duration-300"
                                        href={`/quips/${update.hash}`}
                                    >
                                        {update.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-xl">
                            You are at the latest update 😉!{' '}
                        </div>
                    )}
                </div>
            )}
            <p className='text-xl font-bold md:pt-8 pt-5'>
                ©️Ishan's Quips {new Date().getFullYear()} 
            </p>
        </div>
    );
}
