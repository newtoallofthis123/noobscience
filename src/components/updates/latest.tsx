import { useState, useEffect } from 'react';
import {marked} from "marked"

export default function UpdateLatest(
    {
        slice_length = 600,
    }: {
        slice_length?: number;
    }
) {
    const [latest, setLatest] = useState({
        name: '',
        content: '',
        date: '',
        hash: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    '/api/updates',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const data = await response.json();
                const latest_update = data.slice(0).reverse()[0]
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
                <h1 className="text-center p-4">Loading...</h1>
            )}
            {latest.name != '' && (
                <div className="page-div bg-white dark:bg-dark m-1 md:m-10 mt-0 p-4 md:py-8 transform hover:scale-105 rounded-lg cursor-pointer transition duration-300 ease-in-out">
                    <a href={`/quips/${latest.hash}`}>
                        <h1 className="text-2xl md:text-4xl text-center pb-4 font-bold">
                            {latest.name}
                        </h1>
                        <h2 className="text-xl py-4">{latest.date}</h2>
                        <div
                            className="text-xl leading-10"
                            dangerouslySetInnerHTML={{
                                __html: marked(
                                    latest.content.slice(0, slice_length) +
                                        '...',
                                    {
                                        headerIds: false,
                                        mangle: false,
                                    }
                                ),
                            }}
                        />
                    </a>
                </div>
            )}
        </>
    );
}
