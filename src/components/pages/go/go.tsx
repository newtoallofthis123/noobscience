import React, { useState, useEffect } from 'react';

export interface Props {
    hash: any;
}

export default function Go({ hash }: Props) {
    const [latest, setLatest] = useState({
        url: '',
        slug: '',
    });
    const url = '/api/go/' + hash;
    const fetchData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        if(!data.url) typeof window !== undefined && window.location.replace('/404')
        setLatest(data);
    };
    useEffect(() => {
        fetchData();
    }, [url]);
    useEffect(() => {
        const timer = setTimeout(() => {
            typeof window !== undefined && window.location.replace(latest.url);
        }, 5000);
        return () => clearTimeout(timer);
    }, [latest]);
    return (
        <>
            <div
                style={{
                    textAlign: 'center',
                    fontFamily: 'Roboto, sans-serif',
                }}
            >
                <h1>This site will redirect to</h1>
                <h1>
                    <a href={latest.url}>{latest.url}</a>
                </h1>
                <p style={{
                    fontSize: '1.4rem'
                }}>
                    You will be redirected in 5 seconds or click{' '}
                    <a href={latest.url}>here</a>
                </p>
                <p>
                    or
                </p>
                <p>
                    Click <a href="/">here</a> to go back to the home page
                </p>
            </div>
        </>
    );
}
