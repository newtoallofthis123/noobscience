import React from 'react'

type Props = {
    id: string
}

export default function YouTube({id}: Props) {
    return (
        <>
            <div className='rounded-xl'>
                <iframe
                    className="w-full rounded-xl md:w-3/5"
                    height={360}
                    src={'https://www.youtube-nocookie.com/embed/' + id}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </>
    );
}