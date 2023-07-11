import "../styles/components/stickyCalendarModal.scss";
import "../styles/components/amenities.scss";
import RentCalendarBtn from "./RentCalendarBtn";
import AmenitieTag from "./AmenitieTag";
import { RangeCalendar } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDate, changeNights } from "../store/reducer/calendarReducer";

const StickyCalendarModal = ({ opened, setOpened }) => {
  const rentCalendarOne = useSelector((state) => state.calendarReducer.dates);
  const nights = useSelector((state) => state.calendarReducer.nights);

  const dispatch = useDispatch();
  const [dateTitle, setTitle] = useState("Selecciona las fechas");
  const [dateHeader, setdateHeader] = useState(
    "Ingresa tus fechas de viaje para ver el precio exacto"
  );

  const [texDate, setTextDate] = useState(["Agregar fecha", "Agregar fecha"]);

  const clearCalendar = () => {
    dispatch(changeDate([null, null]));
    dispatch(changeNights(0));
  };
  const textDateHeader = () => {
    if (rentCalendarOne[0] === null && rentCalendarOne[1] === null) {
      setTitle("Selecciona las fechas");
      setdateHeader("Ingresa tus fechas de viaje para ver el precio exacto");
      setTextDate(["Agregar fecha", "Agregar fecha"]);
    } else if (rentCalendarOne[0] && rentCalendarOne[1] === null) {
      const date1 = `${rentCalendarOne[0].getMonth()}/${rentCalendarOne[0].getDate()}/${rentCalendarOne[0].getFullYear()}`;
      setTextDate([date1, "Agregar fecha"]);
      setdateHeader("Estancia mínima: 2 noches");
    } else if (rentCalendarOne[0] && rentCalendarOne[1]) {
      if (rentCalendarOne[0] && rentCalendarOne[1]) {
        let rentDates =
          rentCalendarOne[1].getTime() - rentCalendarOne[0].getTime();
        rentDates = rentDates / (1000 * 3600 * 24);
        dispatch(changeNights(rentDates));
        setTitle(`${rentDates} noches`);
      }
      const sDates = rentCalendarOne.map((item) => {
        return [`${item.getMonth()}, ${item.getDate()}, ${item.getFullYear()}`];
      });
      const date1 = `${rentCalendarOne[0].getMonth()}/${rentCalendarOne[0].getDate()}/${rentCalendarOne[0].getFullYear()}`;
      const date2 = `${rentCalendarOne[1].getMonth()}/${rentCalendarOne[1].getDate()}/${rentCalendarOne[1].getFullYear()}`;
      setTextDate([date1, date2]);

      return setdateHeader(`${sDates[0]} - ${sDates[1]}`);
    }
  };

  // const closeModal = () => {
  //   if (rentCalendarOne[1]) {
  //     setOpened((o) => !o);

  //   }
  // };

  useEffect(() => {
    textDateHeader();
    // closeModal();

    // eslint-disable-next-line
  }, [rentCalendarOne]);

  return (
    <div>
      <div className="stickRentCalendar">
        <div className="headerContainer">
          <div className="sectionHeader">
            <div className="dateTitle" children={dateTitle} />
            <div className="dateHeader" children={dateHeader} />
          </div>
          <div className="section">
            <div className="checkFlexI">
              <div className="check">LLEGADA</div>
              <div className="checkText">{texDate[0]}</div>
            </div>
            <div className="checkFlexI" id="i2">
              <div className="check">SALIDA</div>
              <div className="checkText">{texDate[1]}</div>
            </div>
          </div>
        </div>

        <div>
          <RangeCalendar
            minDate={new Date()}
            amountOfMonths={2}
            value={rentCalendarOne}
            onChange={(e) => {
              dispatch(changeDate(e));
            }}
            styles={(theme) => ({
              day: {
                "&[data-selected]": {
                  backgroundColor: theme.colors.dark[4],
                  borderRadius: 100,
                  position: "relative",
                },

                "&[data-in-range]": {
                  backgroundColor: theme.colors.gray[2],
                },

                "&[data-first-in-range]": {
                  backgroundColor: theme.colors.dark[4],
                  borderRadius: 100,
                  position: "relative",

                  "&::after": {
                    content: '""',
                    backgroundColor: theme.colors.gray[2],
                    position: "absolute",
                    right: 0,
                    left: 20,
                    top: 0,
                    bottom: 0,
                    zIndex: -1,
                  },
                },

                "&[data-last-in-range]": {
                  backgroundColor: theme.colors.dark[4],
                  borderRadius: 100,
                  "&::after": {
                    content: '""',
                    backgroundColor: theme.colors.gray[2],
                    position: "absolute",
                    left: 0,
                    right: 20,
                    top: 0,
                    bottom: 0,
                    zIndex: -1,
                  },
                },
              },
            })}
          />
        </div>
        <div className="rentCalendarBtns">
          <button>
            <AmenitieTag
              svgPath={
                "M29 5a2 2 0 0 1 1.995 1.85L31 7v18a2 2 0 0 1-1.85 1.995L29 27H3a2 2 0 0 1-1.995-1.85L1 25V7a2 2 0 0 1 1.85-1.995L3 5zm0 2H3v18h26zm-8 13v2H11v-2zm3-5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm16-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
              }
              amenitie={""}
            />
          </button>
          <div>
            <RentCalendarBtn
              clase={"clearDate"}
              texto={"Borrar fechas"}
              evnt={clearCalendar}
            />
            <RentCalendarBtn
              clase={"closeBt"}
              texto={"Cerrar"}
              evnt={() => setOpened((o) => !o)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCalendarModal;
