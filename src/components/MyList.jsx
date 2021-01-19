import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api.js';

export default function MyList(props) {
    const { authUser } = props;
    const [name, setName] = useState("");
    let history = useHistory();

    useEffect(() => {
        api.user.getUserList({user: authUser})
        .then(resp => console.log(resp));
        console.log("STATE:", name);
    });

    const handleChange = e => {
        setName(e.target.value)
    }

    return (
        <>
            {authUser.id ? (
                <>
                    <input onChange={handleChange}></input>
                    {name}
                </>
            ) : (
                history.push("/")
            )}
        </>
    )
}
