import { useState, useEffect } from 'react';

export interface Props {
    num: number;
    view?: boolean;
}

export default function UpdateArchiveGrid({ num, view=true }: Props) {
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
            {latest[0].name == '' && <h1 className="p-4">Loading...</h1>}
            {latest[0].name != '' && (
                <div className="grid grid-cols-2 gap-4">
                    {latest.slice(1, latest.length).map((update: any) => (
                        <div key={update.hash} className="pt-0.5">
                            <h4 className="font-regular">
                                <a
                                    className="dark:hover:bg-white hover:p-2 dark:hover:text-black hover:bg-dark hover:text-white transform duration-300"
                                    href={`/quips/${update.hash}`}
                                >
                                    {update.name}
                                </a>
                            </h4>
                        </div>
                    ))}
                    {view && (
                        <div className="py-1">
                            <h4 className="font-base">
                                <a
                                    className="bg-lime-300 text-dark p-2 rounded-lg"
                                    href={`/quips/archive`}
                                >
                                    View All
                                </a>
                            </h4>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
