import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { AUTHORIZED, LOADING } from '../actions/constants';
import Loader from '../components/Loader';
import '../assets/styles/components/PrivateRoute.scss';

const StudentRoute = ({ component: Component, ...rest }) => {
  const role = useSelector((state) => state.currentUser.type);
  const authUser = useSelector((state) => state.auth_status);
  if (authUser === LOADING) return <Loader />;
  return (
    <Route
      {...rest}
      render={(props) => (role === "student" ?  <Component {...props} /> : authUser === AUTHORIZED ? <Redirect to="/profile/tutorships" /> : <Redirect to="/login" />)}
    />
  );
};

export default StudentRoute;
