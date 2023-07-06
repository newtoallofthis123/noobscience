import React, { useState, useEffect } from 'react';
import {marked} from "marked"

export default function UpdateLatest() {
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
                <div
                    className="page-div bg-white m-4 md:m-10 mt-0 p-4 md:p-10 cursor-pointer hover:translate-y-1"
                    onClick={() => {
                        typeof window !== 'undefined' &&
                            window.open('/quips/' + latest.hash);
                    }}
                >
                    <h1 className="text-2xl md:text-4xl text-center pb-4 font-bold">
                        {latest.name}
                    </h1>
                    <h2 className="text-xl py-4">{latest.date}</h2>
                    <div
                        className="text-xl leading-10"
                        dangerouslySetInnerHTML={{
                            __html: marked(
                                latest.content.slice(0, 300) + '...'
                                , {
                                    headerIds: false,
                                    mangle: false,
                            }),
                        }}
                    />
                </div>
            )}
        </>
    );
}
