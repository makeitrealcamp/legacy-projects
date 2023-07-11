import "../styles/components/stickyContainer.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Popover, Alert } from "@mantine/core";
import Swal from 'sweetalert2'
import { IconAlertCircle } from '@tabler/icons';
import StickyCalendarModal from "./StickyCalendarModal";
import ModalPersonas from "./ModalPersonas";
import ImgModal from "./ImgModal";
import ReserveModal from "./ReserveModal";


const StickyContainer = (props) => {
  const rentCalendar = useSelector((state) => state.calendarReducer.dates);
  const nights = useSelector((state)=> state.calendarReducer.nights)
  const [texDate, setTextDate] = useState(["Add Date", "Add Date"]);
  const [opened, setOpened] = useState(false);
  const countPeople = useSelector((state) => state.peopleReducer.countPeople);
  const [totalPerson, setTotalPerson] = useState(null);
  const [openReserve, setOpenReserve] = useState(false)
  const {adults} = countPeople;
  const [isDisabled,setIsDisabled] =useState("")

  const price = Intl.NumberFormat('de-DE').format(props.price)
  const total1 = props.price * nights;
  const total1format = Intl.NumberFormat('de-DE').format(total1);
  const serviceFee = 43000;
  const serviceFormat = Intl.NumberFormat('de-DE').format(serviceFee);
  const cleaningFee = 30000;
  const cleaningFormat= Intl.NumberFormat('de-DE').format(cleaningFee);
  const totalReserve = Intl.NumberFormat('de-DE').format(total1 +serviceFee +cleaningFee);

  


  const text = () => {
    if (rentCalendar[0] === null && rentCalendar[1] === null) {
      setTextDate(["Agregar fecha", "Agregar fecha"]);
    } else if (rentCalendar[0] && rentCalendar[1] === null) {
      const date1 = `${rentCalendar[0].getMonth()}/${rentCalendar[0].getDate()}/${rentCalendar[0].getFullYear()}`;
      setTextDate([date1, "Agregar fecha"]);
    } else if (rentCalendar[0] && rentCalendar[1]) {
      const date1 = `${rentCalendar[0].getMonth()}/${rentCalendar[0].getDate()}/${rentCalendar[0].getFullYear()}`;
      const date2 = `${rentCalendar[1].getMonth()}/${rentCalendar[1].getDate()}/${rentCalendar[1].getFullYear()}`;
      setTextDate([date1, date2]);
    }
  };
  const reserveOk =() =>{
    if(adults === 0 || texDate[1] === 'Agregar fecha'){
      Swal.fire({
        title: 'Error',
        text: 'Debes ingresar fechas y huespedes para continuar',
        icon: 'error',
        confirmButtonText: 'Perfecto'
        
      })
      return
    }
    setOpenReserve(true)
    
  }

  useEffect(()=>{
    const {adults} = countPeople;

    if(adults >= 1 && texDate[1] !== 'Agregar fecha'){
      setIsDisabled(false)
      }

  },[countPeople, texDate])

  useEffect(() => {
    text();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rentCalendar]);
  useEffect(() => {
    const changePeopleTotal = () => {
      const { adults, children } = countPeople;
      const totalValue = adults + children;
      if (totalValue === 0) {
        setTotalPerson("cuantos");
      } else if (totalValue === 1) {
        setTotalPerson(`${totalValue} húesped`);
      } else {
        setTotalPerson(`${totalValue} huéspedes`);
      }
    };

    changePeopleTotal();
  }, [countPeople]);
  
  return (
    <div className="bannerContainer">
      <div className="styckyContainer">
        <div className="bookContainer">
          <div className="bookIt">
            <div className="bookSections">
              <Popover
                opened={opened}
                position="bottom-end"
                onChange={setOpened}
              >
                <Popover.Target>
                  <div className="estimatePricing">
                    <div className="price">
                      <div className="priceflex">
                        <span className="span1">{`$${price} COP`}</span>
                        <span className="span2">noche</span>
                      </div>
                      <div className="rentSection">
                        <svg
                          className="sectionSvg"
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                        >
                          <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"></path>
                        </svg>
                        <span>
                          <b>{props.rating}</b>
                        </span>
                        <span>.</span>
                        <button>
                          <u>{props.reviews}</u>
                        </button>
                      </div>
                    </div>
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <StickyCalendarModal opened={opened} setOpened={setOpened} />
                </Popover.Dropdown>
              </Popover>

              <div className="checkinCheckout">
                <div className="checkContainer">
                  <div className="checkFlex">
                    <button
                      className="checkBtn"
                      onClick={() => setOpened(true)}
                    >
                      <div className="checkFlexI">
                        <div className="check">LLEGADA</div>
                        <div className="checkText">{texDate[0]}</div>
                      </div>
                      <div className="checkFlexI" id="i2">
                        <div className="check">SALIDA</div>
                        <div className="checkText">{texDate[1]}</div>
                      </div>
                    </button>
                  </div>
                  <div className="chekI">
                    <Popover position="bottom">
                      <Popover.Target>
                        <button className="checkBtn">
                          <div className="check" id="guests">
                            HUESPEDES
                          </div>
                          <div className="checkText">{totalPerson}</div>
                          <svg
                            className="guestsSvg"
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                          >
                            <g fill="none">
                              <path d="m28 12-11.2928932 11.2928932c-.3905243.3905243-1.0236893.3905243-1.4142136 0l-11.2928932-11.2928932"></path>
                            </g>
                          </svg>
                        </button>
                      </Popover.Target>
                      <Popover.Dropdown>
                        <ModalPersonas />
                      </Popover.Dropdown>
                    </Popover>
                  </div>
                </div>
              </div>
              <div className="reserve">
              <Modal
              opened={openReserve}
              onClose={() => setOpenReserve(false)}
              overflow="outside"
              withCloseButton={false}
              fullScreen
            >
              <ReserveModal setOpenReserve={setOpenReserve} item={props.item} dates={texDate} guest={totalPerson} />
            </Modal>
                <button disabled={isDisabled} className={`reserveBtn`} onClick={reserveOk}>
                  <span className="reserveIt">Reservar</span>
                </button>
              </div>
            </div>
            <div className="message">
              <span className="messageStyle">Aún no se te cobrará nada</span>
            </div>
            <div className="totals">
              <div className="section1">
                <div className="values">
                  <button className="valuesBtn">
                    <div className="nightValues">
                      <u>{`$${price} COP x ${nights} noches`}</u>
                    </div>
                  </button>
                  <span className="valueResult">{`$${total1format} COP`}</span>
                </div>
                <div className="values">
                  <button className="valuesBtn">
                    <div className="nightValues">
                      <u>Tarifa de limpieza</u>
                    </div>
                  </button>
                  <span className="valueResult">{`$${cleaningFormat} COP`}</span>
                </div>
                <div className="values">
                  <button className="valuesBtn">
                    <div className="nightValues">
                      <u>Comisión por servicio</u>
                    </div>
                  </button>
                  <span className="valueResult">{`$${serviceFormat} COP`}</span>
                </div>
              </div>
              <hr className="hr2" />
              <div className="section2">
                <div className="totaltext">Total antes de impuestos</div>
                <span className="total">{`$${totalReserve} COP`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="report">
          <button className="reportBtn">
            <span className="reportFlex">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path d="M28 6H17V4a2 2 0 0 0-2-2H3v28h2V18h10v2a2 2 0 0 0 2 2h11l.115-.006a1 1 0 0 0 .847-1.269L27.039 14l1.923-6.724A1 1 0 0 0 28 6z"></path>
              </svg>
              <span>
                <u>Reportar este anuncio</u>
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default StickyContainer;
