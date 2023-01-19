import TutorDashboard from '../components/TutorDashboard';
import TutorProfileEdit from '../components/TutorProfileEdit';
import TutorProfileTutorships from '../components/tutorProfileTutorships';
import TutorProfileCreateTutorship from '../components/TutorProfileCreateTutorship';
import '../assets/styles/pages/TutorProfile.scss';

function TutorProfile({ props }) {
  const currentPage = props.match.params.section;
  const pages = {
    edit: <TutorProfileEdit />,
    'create-tutorship': <TutorProfileCreateTutorship />,
    tutorships: <TutorProfileTutorships />,
  };

  return (
    <div className="tutor-profile-container">
      <section className="tutor-profile__menu-container">
        <TutorDashboard page={currentPage} />
      </section>
      <main className="tutor-profile-main">{pages[currentPage]}</main>
    </div>
  );
}

export default TutorProfile;
