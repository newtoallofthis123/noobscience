import React, { useState, useEffect } from 'react';
import Markdown from '../utils/md';

export interface Props {
    hash: any;
}

export default function Note({ hash }: Props) {
    const [note, setnote] = useState({
        title: '',
        content: '',
        category: '',
        slug: '',
    });

    useEffect(() => {
        const url = '/api/notes/' + hash;
        console.log(url);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setnote(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {note.title == '' && (
                <h1 className="text-center p-4">Loading...</h1>
            )}
            {note.title != '' && (
                <div className="bg-white mt-0 p-4 md:p-10">
                    <h1 className="text-4xl text-center pb-4 font-bold">
                        {note.title}
                    </h1>
                    <h2 className="text-2xl py-4 underline capitalize">{note.category}</h2>
                    <Markdown content={note.content} />
                </div>
            )}
        </>
    );
}
