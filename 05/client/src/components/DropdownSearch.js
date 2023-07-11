import '../styles/components/DropdownSearch.scss';
import DropdownSearchButton from './DropdownSearchButton';
import { Popover } from '@mantine/core';
import { useState } from 'react';
import ModalCalendarSearch from './ModalCalendarSearch';
import ModalPersonas from './ModalPersonas';
import ModalLocationSearch from './ModalLocationSearch';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { flip } from '../store/reducer/headerReducer';

const DropdownSearch = () => {
  const rentCalendar = useSelector((state) => state.calendarReducer.dates);
  const flexRange = useSelector((state) => state.calendarReducer.flexRange);
  const countPeople = useSelector((state) => state.peopleReducer.countPeople);
  const location = useSelector((state) => state.headerReducer.location);
  const [fecha1, setFecha1] = useState(null);
  const [fecha2, setFecha2] = useState(null);
  const [totalPerson, setTotalPerson] = useState(null);
  const [locationName, setLocationName] = useState('');
  const dispatch = useDispatch();

  const addFechas = () => {
    let adicional_dates = '';
    if (flexRange === 'normal') {
      adicional_dates = '';
    } else if (flexRange === 'one') {
      adicional_dates = '± 1';
    } else if (flexRange === 'three') {
      adicional_dates = '± 3';
    } else if (flexRange === 'seven') {
      adicional_dates = '± 7';
    } else {
      adicional_dates = '';
    }
    if (rentCalendar[0] !== null)
      setFecha1(
        rentCalendar[0] !== null
          ? format(rentCalendar[0], 'dd MMM.') + adicional_dates
          : '',
      );
    if (rentCalendar[1] !== null)
      setFecha2(
        rentCalendar[1] !== null
          ? format(rentCalendar[1], 'dd MMM.') + adicional_dates
          : '',
      );
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
        setTotalPerson('cuantos');
      } else if (totalValue === 1) {
        setTotalPerson(`${totalValue} húesped`);
      } else {
        setTotalPerson(`${totalValue} huéspedes`);
      }
    };

    changePeopleTotal();
  }, [countPeople]);
  useEffect(() => {
    location === ''
      ? setLocationName('Explora destinos')
      : setLocationName(location);
  }, [location]);

  const [clase, setClase] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });
  const handleClick = (index) => {
    let keys = Object.keys(clase);
    keys.map((item) => {
      return setClase((prev) => {
        return { ...prev, [item]: item === index ? true : false };
      });
    });
    if (index === '4') {
      dispatch(flip());
    }
  };

  return (
    <div className="wraper__searchbar__pop">
      <div className="searchbar__pop">
        <Popover width={'600px'} opened={clase[0]}>
          <Popover.Target>
            <div>
              <button onClick={() => handleClick('0')}>
                <DropdownSearchButton
                  text={['Donde', `${locationName}`]}
                  styles={{ width: '300px', paddingLeft: '20px' }}
                  clase={clase[0] ? 'selected' : ''}
                />
                {
                  // && rentCalendar[1]
                }
              </button>
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <ModalLocationSearch></ModalLocationSearch>
          </Popover.Dropdown>
        </Popover>

        <Popover
          width="dropdown"
          position="bottom-center"
          radius="xl"
          shadow="none"
          opened={clase[2]}
        >
          <Popover.Target>
            <div>
              <button onClick={() => handleClick('2')}>
                {fecha1 ? (
                  <DropdownSearchButton
                    text={['Llegada', `${fecha1}`]}
                    styles={{ width: '100px' }}
                    clase={clase[2] ? 'selected' : ''}
                  />
                ) : (
                  <DropdownSearchButton
                    text={['Llegada', 'fecha']}
                    styles={{ width: '100px' }}
                    clase={clase[2] ? 'selected' : ''}
                  />
                )}
              </button>
              <button onClick={() => handleClick('2')}>
                {fecha2 ? (
                  <DropdownSearchButton
                    text={['Salida', `${fecha2}`]}
                    styles={{ width: '100px' }}
                    clase={clase[2] ? 'selected' : ''}
                  />
                ) : (
                  <DropdownSearchButton
                    text={['Salida', 'fecha']}
                    styles={{ width: '100px' }}
                    clase={clase[2] ? 'selected' : ''}
                  />
                )}
              </button>
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <ModalCalendarSearch></ModalCalendarSearch>
          </Popover.Dropdown>
        </Popover>

        <Popover
          width="dropdown"
          position="bottom-end"
          radius="xl"
          shadow="none"
          opened={clase[3]}
        >
          <Popover.Target>
            <button onClick={() => handleClick('3')}>
              <DropdownSearchButton
                text={['Quien', `${totalPerson}`]}
                iconText={'Buscar'}
                styles={{ columnGap: '0px' }}
                clase={clase[3] ? 'selected' : ''}
              />
            </button>
          </Popover.Target>
          <Popover.Dropdown>
            <ModalPersonas></ModalPersonas>
          </Popover.Dropdown>
        </Popover>
        <button onClick={() => handleClick('4')}>
          <DropdownSearchButton
            text={['', ``]}
            icon={
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: 'block',
                  fill: 'none',
                  height: '16px',
                  width: '16px',
                  stroke: 'currentcolor',
                  strokeWidth: '4',
                  overflow: 'visible',
                }}
              >
                <g fill="none">
                  <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                </g>
              </svg>
            }
          />
        </button>
      </div>
    </div>
  );
};

export default DropdownSearch;
