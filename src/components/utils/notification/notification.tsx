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
                <span className="font-normal">Currently:</span>{' '}
                {latest.title}
                <a
                    title='Read more about this update'
                    // Move the arrow to the right on hover
                    className='inline-block text-blue-600 ml-2 transition-all duration-300 transform hover:translate-x-1'
                    href="/now"
                >
                    <i className="bi bi-arrow-right"></i>
                </a>
            </p>
        </>
    );
}
