import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api.js';
import '../styles/mylist.css';

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
    }, [authUser]);

    const handleDelete = e => {
        api.list.deleteItem(e.target.id)
        .then(resp => console.log(resp))
    }

    const handleSettingDescription = e => {
        setDescription(e.target.value)
    }

    const handleSettingUrl = e => {
        setUrl(e.target.value)
    }

    const handleSubmission = e => {

        api.list.addToUserList({
            list: { description: description, url: url }
        })
        .then(resp => console.log(resp))
    }

    return (
        <>
            {authUser.id ? (
                <div className="user-list-container">
                    <h1>{list.name + "'s List"}</h1>
                    <form id="list-item-form" onSubmit={handleSubmission}>
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
                                <tbody>
                                    <tr>
                                        <th>Description</th>
                                        <th>URL</th>
                                        <th>Delete List Item</th>
                                    </tr>
                                </tbody>
                                    {listitems.map((item, index) => {
                                        return (
                                            <tbody key={item.id}>
                                                <tr>
                                                    <td>{listitems[index].description}</td>
                                                    <td>
                                                        {listitems[index].url.includes("https") ? (
                                                            <a href={listitems[index].url}>LINK</a> 
                                                        ) : (
                                                            <a href={`https://` + listitems[index].url}>LINK</a> 
                                                        )
                                                    }           
                                                    </td>
                                                    <td>
                                                        <form>
                                                            <button onClick={handleDelete} type="submit" id={item.id} className="delete-btn">DELETE</button>
                                                        </form>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                            </table>
                        )
                    }
                </div>
            ) : (
                history.push("/")
            )}
        </>
    )
}
