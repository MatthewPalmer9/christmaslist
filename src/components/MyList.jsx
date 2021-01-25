import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api.js';

export default function MyList(props) {
    const { authUser } = props;

    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [list, setList] = useState([]);
    const [listitems, setListitems] = useState([]);
    let history = useHistory();

    useEffect(() => {
        api.list.getUserList({user: authUser})
        .then(resp => {
            setList(resp.list)
            setListitems(resp.listitems)
            console.log(resp)
        })
    }, []);

    const handleSettingDescription = e => {
        setDescription(e.target.value)
    }

    const handleSettingUrl = e => {
        setUrl(e.target.value)
    }

    const handleSubmission = e => {
        e.preventDefault();

        const list_item_params = { description: description, url: url };
        api.list.addToUserList({ data: { user: authUser, list: list_item_params } })
    }

    return (
        <>
            {authUser.id ? (
                <>
                    <h1>{list.name + "'s List"}</h1>
                    <form onSubmit={handleSubmission}>
                        <label htmlFor="description">Description of Item:</label>
                        <input type="text" onChange={handleSettingDescription} />
                        <label htmlFor="url">Link to Item:</label>
                        <input type="text" onChange={handleSettingUrl} />

                        <button type="submit"> Add to List </button>
                    </form>

                    {listitems.length === 0 ? (
                        <>
                            <h3>You have nothing in your list. Why not add something?</h3>
                        </>
                    ) : (
                            <table>
                                <tr>
                                    <th>Description</th>
                                    <th>URL</th>
                                </tr>
                                    {listitems.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{listitems[index].description}</td>
                                                <td>{listitems[index].url}</td>
                                            </tr>
                                        )
                                        // console.log(listitems[index])
                                    })}
                            </table>
                        )
                    }
                </>
            ) : (
                history.push("/")
            )}
        </>
    )
}
