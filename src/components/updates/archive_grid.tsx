import React, { useState, useEffect } from 'react';

export interface Props {
    num: number;
}

export default function UpdateArchiveGrid({ num }: Props) {
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
                const response = await fetch('/api/updates');
                let data = await response.json();
                data = data.slice(0).reverse().slice(0, num);
                setLatest(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {latest[0].name == '' && (
                <h1 className="text-center p-4">Loading...</h1>
            )}
            {latest[0].name != '' && (
                <div className="grid grid-cols-2 gap-4">
                    {latest.slice(1, latest.length).map((update: any) => (
                        <div key={update.hash} className="pl-4 py-1">
                            <h4 className="text-2xl font-regular">
                                <a
                                    className="special_underline"
                                    href={`/quips/${update.hash}`}
                                >
                                    {'> '}
                                    {update.name}
                                </a>
                            </h4>
                        </div>
                    ))}
                    <div className="pl-4 py-1">
                        <h4 className="text-2xl font-base">
                            <a className="underline" href={`/quips/archive`}>
                                View All
                            </a>
                        </h4>
                    </div>
                </div>
            )}
        </>
    );
}
