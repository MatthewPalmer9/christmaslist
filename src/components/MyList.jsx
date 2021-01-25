import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api.js';

export default function MyList(props) {
    const { authUser } = props;
    const [name, setName] = useState("");
    const [list, setList] = useState([]);
    const [listitems, setListitems] = useState([]);
    let history = useHistory();

    useEffect(() => {
        api.user.getUserList({user: authUser})
        .then(resp => {
            setList(resp.list)
            setListitems(resp.listitems)
            console.log(resp)
        })
        // .then(resp => setListitems(resp.listitems))
    }, []);

    const handleChange = e => {
        setName(e.target.value)
    }

    const handleClick = () => {
        console.log("Clicked")
    }

    return (
        <>
            {authUser.id ? (
                <>
                    <h1>{list.name}'s List</h1>
                    {listitems.length === 0 ? (
                        <>
                            <h3>You have nothing in your list. Why not add something?</h3>
                        </>
                    ) : (<>Placeholder</>)}
                    {/* {console.log(listitems)} */}
                    <input onChange={handleChange}></input>
                    <button onClick={handleClick}> Add to List </button>
                    {name}
                </>
            ) : (
                history.push("/")
            )}
        </>
    )
}
