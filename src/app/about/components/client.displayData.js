'use client'

import { useState } from 'react';

export default function DataDisplay ( { initialstate }) {
    const [ state , setState ] = useState( initialstate || [] );
    return (
        <div>
            rendered on the client 
            { state.length > 0 && state.map( ( each ) => 
                    <div> { each.password } belongs to { each.associated } </div>
            )}
        </div>
    )
}   

