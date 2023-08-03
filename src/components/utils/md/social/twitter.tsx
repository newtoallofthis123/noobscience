import React from 'react'
import { Tweet } from 'react-tweet'

type Props = {
    id: string
}

export default function Twitter({id}: Props) {
    return (
        <div>
            <Tweet id={id} />
        </div>
  )
}