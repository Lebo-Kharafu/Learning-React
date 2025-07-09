import defaultPic from '../../assets/deadpool.png';
import PropTypes from 'prop-types';
import './Student.css';

function Student({ name = "No Name", details = "No Info Given", profilePic = defaultPic }) {
    return(
        <article className="student-card">
            <img className='student-card-img' src={profilePic} alt="Profile Picture"></img>
            <h2 className='student-card-title'>{name}</h2>
            <p className='student-card-text'> {details} </p>
        </article>
    );
}

Student.propTypes = {
    name: PropTypes.string,
    details: PropTypes.string,
    profilePic: PropTypes.string
};

export default Student