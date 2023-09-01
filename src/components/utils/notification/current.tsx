import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

export default function Current() {
    const [latest, setLatest] = useState({
        tag: '',
        title: '',
        description: '',
        current: '',
        date: '',
    });

    useEffect(() => {
        const url = '/api/notification';
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setLatest(data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h2 className="text-2xl font-heading pb-1 pt-4">What's Up!!</h2>
            <p
                dangerouslySetInnerHTML={{
                    __html: marked(latest.current, {
                        mangle: false,
                        headerIds: false,
                    }),
                }}
            ></p>
        </>
    );
}
