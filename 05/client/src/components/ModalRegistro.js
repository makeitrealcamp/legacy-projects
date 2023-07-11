import '../styles/components/ModalRegistro.scss';
import axios from 'axios';
import { useState } from 'react';
import { Popover } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { flipMenu } from '../store/reducer/headerReducer';
const ModalRegistro = () => {
  const [calendar, setCalendar] = useState(null);
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [openedPop, setOpenedPop] = useState(false);
  //const [infoUser, setInfoUser] = useState(undefined);
  const dispatch = useDispatch();

  const HandleCalendar = (e) => {
    setCalendar(e);
    if (e !== null) {
      setUserBirth(format(e, 'dd/MM/yyyy'));
      setOpenedPop(false);
    } else {
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userEmail === '' && userPassword === '' && userName === '') {
      alert('Por favor llene el formulario antes de continuar');
    } else {
      try {
        const user = {
          name: `${userName} ${userLastName}`,
          email: userEmail,
          password: userPassword,
          rol: 'client',
          location: '0.00,0.00',
          estadias: '',
          profileimg: '',
        };
        const { data } = await axios.post(
          `${process.env.REACT_APP_AIRBACK}/user/singup`,
          user,
        );
        console.log(data);
        localStorage.setItem('token', data.data.token);
        //  cookies.set('tokenCookie', data.data.token);
        localStorage.setItem('email', data.data.email);

        dispatch(flipMenu(''));
      } catch (err) {
        alert('Ups! ocurrió algo en el login');
      }
    }
  };

  return (
    <>
      <div className="containerRegistro">
        <form onSubmit={handleSubmit}>
          <h1>Terminar de registrarme</h1>
          <hr />
          <div className="wrapper">
            <span htmlFor="name">Nombre</span>
            <input
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="loginEmail"
              id="name"
              type="text"
              placeholder="Digite su nombre "
            ></input>
          </div>
          <div className="wrapper">
            <span htmlFor="lastName">Apellido</span>
            <input
              className="loginEmail"
              value={userLastName}
              onChange={(e) => {
                setUserLastName(e.target.value);
              }}
              id="lastName"
              type="text"
              placeholder="Digite su apellido"
            ></input>
          </div>
          <p>
            Asegúrate de que coincide con el nombre que aparece en tu
            identificación oficial.
          </p>
          <Popover
            width="dropdown"
            position="bottom-end"
            radius="xl"
            shadow="none"
            opened={openedPop}
            onChange={setOpenedPop}
          >
            <Popover.Target>
              <div className="wrapper">
                <span htmlFor="date">Fecha Nacimiento</span>
                <input
                  onClick={() => {
                    setOpenedPop(true);
                  }}
                  value={userBirth}
                  onChange={() => {}}
                  className="loginEmail"
                  id="date"
                  type="text"
                  placeholder="dd/mm/yyyy"
                ></input>
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <div>
                <Calendar
                  value={calendar}
                  onChange={(e) => HandleCalendar(e)}
                ></Calendar>
              </div>
            </Popover.Dropdown>
          </Popover>

          <p>
            Para poder registrarte debes tener al menos 18 años. No
            compartiremos la fecha de tu nacimiento con otros usuarios de
            Airbnb.
          </p>
          <div className="wrapper">
            <span htmlFor="email">Correo electrónico</span>
            <input
              className="loginEmail"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              id="email"
              type="email"
              placeholder="correo@mail.com"
            ></input>
          </div>
          <p>
            Te enviaremos las confirmaciones de viaje y los recibos por correo
            electrónico.
          </p>
          <div className="wrapper">
            <span htmlFor="password">Contraseña</span>
            <input
              className="loginEmail"
              value={userPassword}
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
              id="password"
              type="password"
              placeholder="*******"
            ></input>
          </div>
          <p>
            Al seleccionar Acepto y continúo, acepto los Términos de servicio,
            los Términos de pago del servicio, la Política contra la
            discriminación y el Suplemento de Privacidad para Colombia. También
            reconozco la Política de privacidad.
          </p>
          <button type="submit" className="aceptarButton">
            Aceptar y Continuar
          </button>
          <p>
            Airbnb te enviará ofertas exclusivas para miembros, contenido
            inspirador, correos electrónicos comerciales y notificaciones push.
            Puedes optar por dejar de recibirlos en cualquier momento a través
            del apartado de configuración de tu cuenta o directamente desde
            alguna de las notificaciones que te llegue.
          </p>
          <label>
            <input
              className="loginEmail"
              id="checkbox"
              type="checkbox"
              value=""
            ></input>
            No quiero recibir mensajes promocionales de Airbnb.
          </label>
        </form>
      </div>
    </>
  );
};

export default ModalRegistro;
