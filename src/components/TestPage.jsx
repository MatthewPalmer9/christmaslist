import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import '../styles/showlist.css';

export default function TestPage(props) {

    const [user, setUser] = useState("");
    const [list, setList] = useState([])

    useEffect(() => {
        const username = props.match.url.split("/")[2]
        api.list.getUserListByUrl({user: username})
        .then(resp => {
            setUser(resp.user.username)
            setList(resp.listitems)
        })
    }, [props.match.url])

    const handleLink = index => {
        const checker = list[index].url.includes("https");
        if(checker) {
            return <a href={list[index].url} target="_blank" rel="noreferrer">LINK</a>
        } else if(!checker && list[index].url !== ""){
            return <a href={`https://` + list[index].url} target="_blank" rel="noreferrer">LINK</a>
        } else {
            return <span>N/A</span>
        }
    }


    return (
        <div>
            <h1 className="show-h1">{user}'s JollyList</h1>
            {list.length === 0 ? (
                        <>
                            <h1 className="show-h1">{user} has nothing in their list.</h1>
                        </>
                    ) : (
                        <div className="user-list-container1">
                            <div className="list-container1">
                                <h3>My list</h3>
                                <div className="hr"></div>
                                <div className="column-titles1">
                                    <span>Description</span>
                                    <span>Order Online</span>
                                </div>
                                <div className="scroll-container1">
                                    {list.map((item, index) => {
                                        return (
                                            <div key={item.id} className="list-item1">
                                                <span>{item.description}</span>
                                                <span>{handleLink(index)}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        )
                    }
        </div>
    )
}
