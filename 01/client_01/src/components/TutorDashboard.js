import { useEffect, useState } from 'react';
import history from '../utils/history';
import '../assets/styles/components/TutorDashboard.scss';

function TutorshipDashboard({ page }) {
  const [selected, setSelected] = useState('Edit Profile');

  const handleSelect = (e) => {
    const value = e.target.id || e.target.value;
    setSelected(value);
    history.push(`/profile/${value}`);
  };

  useEffect(() => {
    setSelected(page);
  }, [page]);

  return (
    <>
      <select onChange={handleSelect} className="tutor-profile-menu-select sm" value={selected}>
        <option className="tutor-profile-menu-option" value="edit">
          Edit Profile
        </option>
        <option className="tutor-profile-menu-option" value="create-tutorship">
          Create Tutorship
        </option>
        <option className="tutor-profile-menu-option" value="tutorships">
          My tutorships
        </option>
      </select>
      <section className="tutor-profile-menu md">
        <ul className="tutor-profile-menu-list">
          <div to="edit">
            <li
              onClick={handleSelect}
              id="edit"
              className={`tutor-profile-menu-item ${selected === 'edit' && 'selected'}`}
            >
              Profile
            </li>
          </div>
          <div to="createtutorship">
            <li
              onClick={handleSelect}
              id="create-tutorship"
              className={`tutor-profile-menu-item ${selected === 'create-tutorship' && 'selected'}`}
            >
              Create Tutorship
            </li>
          </div>
          <div to="tutorships">
            <li
              onClick={handleSelect}
              id="tutorships"
              className={`tutor-profile-menu-item ${selected === 'tutorships' && 'selected'}`}
            >
              My Tutorships
            </li>
          </div>
        </ul>
      </section>
    </>
  );
}

export default TutorshipDashboard;
