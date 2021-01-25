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
        console.log("MATCH", props.match)
    }, [authUser]);

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
                                <tr>
                                    <th>Description</th>
                                    <th>URL</th>
                                </tr>
                                    {listitems.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{listitems[index].description}</td>
                                                <td>
                                                    {listitems[index].url.includes("https") ? (
                                                        <a href={listitems[index].url}>LINK</a> 
                                                    ) : (
                                                        <a href={`https://` + listitems[index].url}>LINK</a> 
                                                    )
                                                }           
                                                </td>
                                            </tr>
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
