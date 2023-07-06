import React, { useState, useEffect } from 'react';
import { dateHash } from '../../../utils/utils';

export default function Notification() {
    const [notification, setNotification] = useState(false);
    const [latest, setLatest] = useState({
        tag: '',
        title: '',
        description: '',
        hash: '',
        link: '',
        theme: ''
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
            <p>
                <span className='font-normal'>Currently:</span> {latest.description}
            </p>
        </>
    );
}
