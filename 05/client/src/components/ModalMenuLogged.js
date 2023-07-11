import ButtonModal from './ButtonModal';
import '../styles/components/ModalMenu.scss';
import { useDispatch } from 'react-redux';
import { flipMenu } from '../store/reducer/headerReducer';
import { useNavigate } from 'react-router-dom';
const ModalMenuLogged = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(flipMenu('0'));
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
  };
  const handleNavigate = () => {
    navigate(`/trips`);
  };

  return (
    <>
      <div className="containerMenu">
        <ButtonModal
          setClick={() => {
            handleNavigate();
          }}
          clase={'whiteButton'}
          texto={'Viajes'}
        />
        <hr />
        <ButtonModal
          setClick={() => {
            handleLogout();
          }}
          clase={'whiteButton'}
          texto={'Cerrar sesión'}
        />
      </div>
    </>
  );
};

export default ModalMenuLogged;
