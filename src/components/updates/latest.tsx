import { useState, useEffect } from 'react';
import { marked } from 'marked';

export default function UpdateLatest({
    slice_length = 600,
}: {
    slice_length?: number;
}) {
    const [latest, setLatest] = useState({
        name: '',
        content: '',
        date: '',
        hash: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/updates', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                const latest_update = data.slice(0).reverse()[0];
                setLatest(latest_update);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {latest.name == '' && (
                <h1 className="">Loading...</h1>
            )}
            {latest.name != '' && (
                <div className="py-4">
                    <h1 className="pb-2">
                        <span className="bg-green-200 text-neutral-900 p-1 px-1.5 rounded-lg border-black">{
                        new Date(latest.date).toDateString().split(' ').slice(1).join(' ')
                        }</span>{' '}
                        <a
                            className="text-lg font-bold"
                            href={'/quips/' + latest.hash}
                        >
                            {latest.name}
                        </a>
                    </h1>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: marked(
                                latest.content.slice(0, slice_length) + '...',
                                {
                                    headerIds: false,
                                    mangle: false,
                                }
                            ),
                        }}
                    />
                </div>
            )}
        </>
    );
}
