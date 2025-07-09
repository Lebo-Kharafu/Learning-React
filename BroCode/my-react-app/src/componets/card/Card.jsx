import profilePic from '../../assets/deadpool.png';
import React, {useState} from 'react';
import './Card.css';

function Card() {

    let  [likeCount,setCount] = useState(0);

    
    const handleClick = (e) => {
        /*This is manual state management using event/ and dom*/
        /*likeCount++;
        e.target.innerText ="❤️ "+likeCount;*/
        setCount(likeCount+1);
    };

    return (
        <article className="card" onClick={(e) => handleClick(e)}>
            <div className="img-container" >
                <img className="card-img" src={profilePic} alt="My Profile Picture" />
                <span className="img-emoji">❤️ {likeCount}</span>
            </div>
            <h2 className="card-title">Lebo Kharafu</h2>
            <p className="card-text">BBD Busar and Wits Computer Science Student.</p>
        </article>
    );
}



export default Card;
