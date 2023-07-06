import React, { useState, useEffect } from 'react';

export interface Props {
    num:number;
}

export default function NoteArchive({ num }: Props) {
    const [notes, setnote] = useState([{
        title: '',
        content: '',
        category: '',
        slug: '',
    }]);

    useEffect(() => {
        const url = '/api/notes'
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                let data = await response.json();
                data = data.slice(0).reverse().slice(0, num);
                setnote(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {notes[0].title == '' && (
                <h1 className="text-center p-4">Loading...</h1>
            )}
            {notes[0].title != '' && (
                <div>
                    <div>
                        {notes.map((note) => (
                            <h1 key={note.title} className="text-lg pl-8 p-2 underline">
                                <a href={'/notes/' + note.slug}>{note.title}</a>
                            </h1>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
