import { useSelector } from 'react-redux';
import StudentProfile from '../pages/StudentProfile';
import TutorProfile from '../pages/TutorProfilePage';

function ProfileRouteComponent(props) {
  const role = useSelector((state) => state.currentUser.type);
  if (role === 'tutor') return <TutorProfile props={props} />;
  return <StudentProfile props={props} />;
}

export default ProfileRouteComponent;
