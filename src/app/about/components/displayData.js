'use client'

import { useState } from 'react';

export default function DataDisplay ( { initialstate }) {
    const [ state , setState ] = useState( initialstate );
    return (
        <div>
            rendered on the client { state }
        </div>
    )
}   