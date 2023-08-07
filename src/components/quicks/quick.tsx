import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

export interface Props{
    hash: any
}

export default function Quick({ hash }: Props) {
    const [latest, setLatest] = useState({
        title: '',
        content: '',
        type: '',
        decorate: '',
        hash: '',
    });

    useEffect(() => {
        const url = "/api/quicks/" + hash
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
        <div>
            {latest.title == '' && (
                <h1 className="text-center p-4">Loading...</h1>
            )}
            {latest.title != '' && (
                <div className="md:p-4 p-1">
                    <h1 className="md:text-6xl font-heading text-3xl md:py-4 py-1 pt-0 font-bold">
                        {latest.title}
                    </h1>
                    {latest.type == 'md' && (
                        <div>
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
                    {
                        latest.type == 'txt' && (
                            <div className='font-mono'>
                                {
                                    latest.content
                                }
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
}
