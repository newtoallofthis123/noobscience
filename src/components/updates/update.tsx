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
        <div className="flex flex-col items-center justify-center">
            {latest.name == '' && (
                <h1 className="text-center p-4">Loading...</h1>
            )}
            {latest.name != '' && (
                <div id="update" className="md:w-4/5 w-full">
                    <p>
                        <span className="bg-yellow-300 text-dark rounded-t-lg p-2 m-0">
                            {new Date(latest.date).toDateString()}
                        </span>
                    </p>
                    <h1 className="text-2xl font-bold font-heading pb-2 pt-1">
                        {latest.name}
                    </h1>
                    <div
                        className="text-lg pt-2 p-0"
                        dangerouslySetInnerHTML={{
                            __html: marked(latest.content, {
                                headerIds: false,
                                mangle: false,
                            }),
                        }}
                    />
                    <h1 className="py-2">
                        <a
                            className="bg-lime-200 text-dark font-normal p-1 py-2 rounded-lg"
                            href="/quips"
                        >
                            Read more quips
                        </a>{' '}
                        ||{' '}
                        <button
                            className="bg-red-200 text-neutral-800 p-0.5 px-1 rounded-lg"
                            onClick={() => window.history.go(-1)}
                        >
                            Go back
                        </button>
                    </h1>
                </div>
            )}
            {recommended && (
                <div className="md:w-4/5 w-full">
                    {recommended.length > 0 ? (
                        <div>
                            <h4 className="text-xl font-semibold py-2 pt-5">
                                Some Quips I Wrote After This
                            </h4>
                            {recommended.map((update: any) => (
                                <div className="py-1 font-regular">
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
                        <div className="text-lg">
                            You are at the latest update 😉!{' '}
                        </div>
                    )}
                </div>
            )}
            <p className="text-lg md:pt-8 pt-5">
                ©️Ishan's Quips {new Date().getFullYear()}
            </p>
        </div>
    );
}
