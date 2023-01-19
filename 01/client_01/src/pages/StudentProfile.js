import StudentProfileMenu from '../components/StudentProfileMenu';
import StudentProfileEdit from '../components/StudentProfileEdit';
import PaymentMethods from '../components/PaymentMethods';
import StudentProfileTutorships from '../components/StudentProfileTutorships';
import '../assets/styles/pages/StudentProfile.scss';

function StudentProfile({ props }) {
  const currentPage = props.match.params.section;
  const pages = {
    edit: <StudentProfileEdit />,
    'payment-methods': <PaymentMethods />,
    tutorships: <StudentProfileTutorships />,
  };

  return (
    <div className="student-profile-container">
      <section className="student-profile__menu-container">
        <StudentProfileMenu page={currentPage} />
      </section>
      <main className="student-profile-main">{pages[currentPage]}</main>
    </div>
  );
}

export default StudentProfile;
