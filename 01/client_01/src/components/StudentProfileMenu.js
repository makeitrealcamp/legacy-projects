import { useEffect, useState } from 'react';
import history from '../utils/history';

function StudentProfileMenu({ page }) {
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
      <select onChange={handleSelect} className="student-profile-menu-select sm" value={selected}>
        <option className="student-profile-menu-option" value="edit">
          Edit Profile
        </option>
        <option className="student-profile-menu-option" value="payment-methods">
          Payment methods
        </option>
        <option className="student-profile-menu-option" value="tutorships">
          My tutorships
        </option>
      </select>
      <section className="student-profile-menu md">
        <ul className="student-profile-menu-list">
          <div to="edit">
            <li
              onClick={handleSelect}
              id="edit"
              className={`student-profile-menu-item ${selected === 'edit' && 'selected'}`}
            >
              Profile
            </li>
          </div>
          <div to="payment-methods">
            <li
              onClick={handleSelect}
              id="payment-methods"
              className={`student-profile-menu-item ${selected === 'payment-methods' && 'selected'}`}
            >
              Payment Methods
            </li>
          </div>
          <div to="tutorships">
            <li
              onClick={handleSelect}
              id="tutorships"
              className={`student-profile-menu-item ${selected === 'tutorships' && 'selected'}`}
            >
              My Tutorships
            </li>
          </div>
        </ul>
      </section>
    </>
  );
}

export default StudentProfileMenu;
