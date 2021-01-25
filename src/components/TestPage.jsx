import React, { useEffect } from 'react';
import { api } from '../services/api.js';

export default function TestPage(props) {

    useEffect(() => {
        const username = props.match.url.split("/")[2]
        api.list.getUserListByUrl({user: username})
        .then(resp => console.log("LIST DATA", resp))
    })


    return (
        <div>
            Hello from Test
        </div>
    )
}
