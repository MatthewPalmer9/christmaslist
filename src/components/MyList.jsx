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

    const handleEdit = e => {
        console.log(e.target.id);
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

    const handleLink = index => {
        const checker = listitems[index].url.includes("https");
        if(checker) {
            return <a href={listitems[index].url} target="_blank" rel="noreferrer">LINK</a>
        } else if(!checker && listitems[index].url !== ""){
            return <a href={`https://` + listitems[index].url} target="_blank" rel="noreferrer">LINK</a>
        } else {
            return <span>N/A</span>
        }
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
                            <div className="list-container">
                                <h3>My list</h3>
                                <div className="hr"></div>
                                <div className="column-titles">
                                    <span>Description</span>
                                    <span>Order Online</span>
                                    <span>Edit</span>
                                    <span>Delete</span>
                                </div>
                                <div className="scroll-container">
                                {listitems.map((item, index) => {
                                    return (
                                        <div className="list-item">
                                            <span>{item.description}</span>
                                            <span>{handleLink(index)}</span>
                                            <span><form><button>Edit</button></form></span>
                                            <span><form><button id={item.id} onClick={handleDelete} type="submit">Delete</button></form></span>
                                        </div>
                                    )
                                })}
                                </div>
                            </div>
                        )
                    }
                </div>
            ) : (
                history.push("/")
            )}
        </>
    )
}
