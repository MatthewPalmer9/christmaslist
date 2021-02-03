import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/landing.css';

export default function Landing() {

    let history = useHistory();

    const handleClick = () => {
        let button = document.querySelector(".landing-header-container button");
        button.style.transition = "900ms";
        button.style.backgroundColor = "green";

        setTimeout(() => {
            history.push("/signup");
        }, 1000);
    }

    return (
        <>
            <div className="landing-container">
                <div className="landing-header-container">
                    <h1>Build Your List, Never Lose it!</h1>
                    <p>
                        At JollyList, you can build and share your Christmas 
                        list without ever losing it. Work on it <em>year round</em>!
                    </p>
                    <button onClick={handleClick}>Sign Up</button>
                </div>
            </div>
        </>
    )
}
