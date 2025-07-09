import profilePic from '../../assets/deadpool.png';
import './Card.css';


function Card() {
    return(
        <article className="card">
            <img className='card-img' src={profilePic} alt="My Profile Picture"></img>
            <h2 className='card-title'>Lebo Kharafu</h2>
            <p className='card-text'>BBD Busar and Wits Computer Science Student.</p>
        </article>
    );
}

export default Card