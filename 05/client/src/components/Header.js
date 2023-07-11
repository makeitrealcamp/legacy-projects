import '../styles/components/Header.scss';
import SearchBar from './SearchBar';
import NavBar from './NavBar';
import logo from '../styles/icons/logo.svg';
import soloLogo from '../styles/icons/airbnb-1.svg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Popover } from '@mantine/core';
import '../styles/components/popover.scss';
import DropdownSearch from './DropdownSearch';
import ReplaceSearchPop from './ReplaceSearchPop';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const Header = () => {
  const rentCalendar = useSelector((state) => state.calendarReducer.dates);
  const flexRange = useSelector((state) => state.calendarReducer.flexRange);
  const countPeople = useSelector((state) => state.peopleReducer.countPeople);
  const [fechas, setFechas] = useState(null);
  const [totalPerson, setTotalPerson] = useState(null);
  const headerPopover = useSelector(
    (state) => state.headerReducer.headerPopover,
  );
  const location = useSelector((state) => state.headerReducer.location);
  const [opened, setOpened] = useState(false);

  const addFechas = () => {
    let adicional_dates = '';
    if (flexRange === 'normal') {
      adicional_dates = '';
    } else if (flexRange === 'one') {
      adicional_dates = '(± 1)';
    } else if (flexRange === 'three') {
      adicional_dates = '(± 3)';
    } else if (flexRange === 'seven') {
      adicional_dates = '(± 7)';
    } else {
      adicional_dates = '';
    }
    if (rentCalendar[0] !== null && rentCalendar[1] !== null) {
      const stringFechas =
        format(rentCalendar[0], 'dd MMM.') +
        ' - ' +
        format(rentCalendar[1], 'dd MMM.') +
        adicional_dates;
      setFechas(stringFechas);
    } else {
      setFechas('Cualquier semana');
    }
  };

  useEffect(() => {
    addFechas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rentCalendar, flexRange]);

  useEffect(() => {
    const changePeopleTotal = () => {
      const { adults, children } = countPeople;
      const totalValue = adults + children;
      if (totalValue === 0) {
        setTotalPerson('¿Cuántos?');
      } else if (totalValue === 1) {
        setTotalPerson(`${totalValue} húesped`);
      } else {
        setTotalPerson(`${totalValue} huéspedes`);
      }
    };
    changePeopleTotal();
  }, [countPeople]);

  useEffect(() => {
    setOpened((o) => !o);
  }, [headerPopover]);

  return (
    <div>
      <header className="header">
        <Link to="/" className="header__logo">
          <img src={logo} alt="logo" />
          <img src={soloLogo} alt="logo" />
        </Link>
        <Popover
          width={'100%'}
          opened={opened}
          onChange={setOpened}
          transition="scale-y"
        >
          <Popover.Target>
            <button
              onClick={() => setOpened((o) => !o)}
              className="toggle"
              style={{
                visibility: opened ? 'hidden' : 'visible',
                width: opened ? '0px' : 'auto',
              }}
            >
              <SearchBar
                first={!location ? 'En cualquier lugar del mundo' : location}
                second={`${fechas}`}
                third={`${totalPerson}`}
              />
            </button>
          </Popover.Target>

          <Popover.Dropdown>
            <DropdownSearch />
          </Popover.Dropdown>
        </Popover>
        <div style={{ display: opened ? 'flex' : 'none' }}>
          <ReplaceSearchPop />
        </div>
        <NavBar />
      </header>
      {/* <section>
                <Outlet/>
            </section>           */}
    </div>
  );
};

export default Header;
