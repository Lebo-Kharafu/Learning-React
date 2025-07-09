import profilePic from '../../assets/deadpool.png';
import './Card.css';

function Card() {

    var count = 0;

    const handleClick = (e) => {
        count++;
        // console.log(e);
        e.target.innerText ="❤️ "+count;
    };

    return (
        <article className="card">
            <div className="img-container"  onClick={(e) => handleClick(e)}>
                <img className="card-img" src={profilePic} alt="My Profile Picture" />
                <span className="img-emoji">❤️ {count}</span>
            </div>
            <h2 className="card-title">Lebo Kharafu</h2>
            <p className="card-text">BBD Busar and Wits Computer Science Student.</p>
        </article>
    );
}

export default Card;
