import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/components/tutorCards.scss';
import history from '../utils/history';

function TutorsCard(tutor) {
  const { rating, profile_photo, name, profession, focus, description, _id, price } = tutor.props;
  const starNodes = [];

  for (let i = 1; i <= rating; i++) {
    starNodes.push(<FontAwesomeIcon key={i} icon={faStar} />);
  }

  function handleClick() {
    history.push(`/tutor/${_id}`);
  }

  return (
    <div key={_id} className="card" onClick={handleClick}>
      <div className="card-visual-info">
        <img src={profile_photo} alt="profilepicture"></img>
        <h1 key={name}>{name}</h1>
        <div className="card-stars">{starNodes}</div>
        <p className="price">Tutorship fee</p>
        <p className="price">{price ? 'COP $ ' + price.toLocaleString() : 'Price not assigned'}</p>
      </div>
      <div className="card-tutor-info">
        <h2 key={profession}>{profession}</h2>
        <h3>{focus}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default TutorsCard;
