import React, { useState, useEffect } from 'react';

export interface Props{
    num: number
}

export default function UpdateArchive({num}: Props) {
    const [latest, setLatest] = useState([
        {
            name: '',
            content: '',
            date: '',
            hash: '',
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    '/api/updates'
                );
                let data = await response.json();
                data = data.slice(0).reverse().slice(0, num)
                setLatest(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {latest[0].name == '' && <h1 className='text-center p-4'>Loading...</h1>}
            {latest[0].name != '' && (
                <div>
                    {latest.map((update: any) => (
                        <div key={update.hash} className="pl-8 py-1">
                            <p className="text-lg font-base">
                                <a
                                    className="underline"
                                    href={`/quips/${update.hash}`}
                                >
                                    {update.name}
                                </a>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
