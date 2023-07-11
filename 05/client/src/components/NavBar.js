import '../styles/components/NavBar.scss';
import globe from '../styles/icons/globe.svg';
import hamburger from '../styles/icons/hamburger.svg';
import account from '../styles/icons/account.svg';
import { useState, useEffect } from 'react';
import { Popover } from '@mantine/core';
import { useSelector } from 'react-redux';
import { Modal } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { flipMenu } from '../store/reducer/headerReducer';
import { useNavigate } from 'react-router-dom';
import ModalMenu from '../components/ModalMenu';
import ModalRegistro from '../components/ModalRegistro';
import ModalLogin from './ModalLogin';
import ModalMenuLogged from '../components/ModalMenuLogged';

const NavBar = () => {
  const [openedPop, setOpenedPop] = useState(false);
  const menuPopover = useSelector((state) => state.headerReducer.menuPopover);
  const [openedPop1, setOpenedPop1] = useState(false);
  const [regisOrLogin, setregisOrLogin] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setregisOrLogin(menuPopover);
    setOpenedPop1(true);
  }, [menuPopover]);

  const handleCloseModal = () => {
    console.log('handleclosemodal');
    setOpenedPop1(false);
    dispatch(flipMenu('0'));
  };

  return (
    <div className="header__nav">
      {localStorage.getItem('rol') === 'host' ? (
        <button
          className="header__nav__button-greyHover"
          onClick={() => {
            navigate(`/hosting`);
          }}
        >
          Modo anfitrion
        </button>
      ) : (
        <button
          className="header__nav__button-greyHover"
          onClick={() => {
            navigate(`/becomehost`);
          }}
        >
          Hazte anfitrion
        </button>
      )}

      <button className="header__nav__button-language-greyHover">
        <img src={globe} alt="Globe" />
      </button>

      <Popover
        width="dropdown"
        position="bottom-end"
        radius="xl"
        shadow="none"
        opened={openedPop}
        onChange={setOpenedPop}
      >
        <Popover.Target>
          <button
            className="header__nav__button-account"
            onClick={() => setOpenedPop((o) => !o)}
          >
            <img src={hamburger} alt="Hamburger" />
            <img src={account} alt="Account" />
          </button>
        </Popover.Target>
        <Popover.Dropdown>
          {localStorage.getItem('token') !== null ? (
            <ModalMenuLogged />
          ) : (
            <ModalMenu />
          )}
        </Popover.Dropdown>
      </Popover>

      {regisOrLogin === '1' ? (
        <Modal
          opened={openedPop1}
          onClose={() => handleCloseModal()}
          title="Iniciar sesión"
          size="550px"
          overflow="inside"
          radius="xl"
          shadow="none"
        >
          <ModalLogin />
        </Modal>
      ) : regisOrLogin === '2' ? (
        <Modal
          opened={openedPop1}
          onClose={() => handleCloseModal()}
          size="550px"
          overflow="outside"
          radius="xl"
          shadow="none"
        >
          <ModalRegistro />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NavBar;
