import React, { useState, useEffect } from 'react';

export default function Detailed() {
    const [latest, setLatest] = useState({
        tag: '',
        title: '',
        description: '',
        hash: '',
        link: '',
        theme: '',
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
            <h2 className="text-4xl font-heading py-4">What's up</h2>
            <p className="">{latest.description}</p>
            <p className='text-xl py-2'>
                As of {latest.date}
            </p>
        </>
    );
}
