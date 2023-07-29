import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

export interface Props{
    hash: any
}

export default function Update({ hash }: Props) {
    const [latest, setLatest] = useState({
        name: '',
        content: '',
        author: '',
        date: '',
        hash: '',
    });

    useEffect(() => {
        const url = "/api/updates/" + hash
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setLatest(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='flex justify-center'>
            {latest.name == '' && (
                <h1 className="text-center p-4">Loading...</h1>
            )}
            {latest.name != '' && (
                <div className="m-2 mt-0 p-2 md:w-4/5 w-full md:p-10">
                    <h1 className="md:text-6xl font-heading text-3xl md:py-4 py-1 pt-0 font-bold">
                        {latest.name}
                    </h1>
                    <h2 className="font-regular py-2 md:text-2xl text-xl">
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
                </div>
            )}
        </div>
    );
}
