import profilePic from '../../assets/deadpool.png';
import PropTypes from 'prop-types';
import './Student.css';


function Student(props) {
    return(
        <article className="card">
            <img className='card-img' src={props.profilePic} alt="My Profile Picture"></img>
            <h2 className='card-title'>Name: {props.name}</h2>
            <p className='card-text'> {props.details} </p>
        </article>
    );
}

Student.propTypes = {
    name: PropTypes.string,
    details: PropTypes.string 
}

export default Student