import ButtonRound from "./ButtonModal";
import "../styles/components/CalendarSearch.scss";
import "../styles/components/ButtonModal.scss";
import { RangeCalendar } from "@mantine/dates";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDate, changeFlexRange } from "../store/reducer/calendarReducer";

const CalendarSearch = () => {
  const [viewCalendar, setViewCalendar] = useState(true);
  const rentCalendarOne = useSelector((state) => state.calendarReducer.dates);

  const dispatch = useDispatch();

  const [buttonRoundSelected, setButtonRoundSelected] = useState({
    flex: "",
    pick: "selected",
  });
  const [buttonDatesRange, setButtonDatesRange] = useState({
    normal: "selected",
    one: "",
    three: "",
    seven: "",
  });
  const handleClickType = (who) => {
    if (who === "pick") {
      setButtonRoundSelected({
        flex: "",
        pick: "selected",
      });
      setViewCalendar(true);
    } else {
      setButtonRoundSelected({
        flex: "selected",
        pick: "",
      });
      setViewCalendar(false);
    }
  };

  const handleClickDate = (who) => {
    if (who === "normal") {
      setButtonDatesRange({
        normal: "selected",
        one: "",
        three: "",
        seven: "",
      });
    } else if (who === "one") {
      setButtonDatesRange({
        normal: "",
        one: "selected",
        three: "",
        seven: "",
      });
    } else if (who === "three") {
      setButtonDatesRange({
        normal: "",
        one: "",
        three: "selected",
        seven: "",
      });
    } else if (who === "seven") {
      setButtonDatesRange({
        normal: "",
        one: "",
        three: "",
        seven: "selected",
      });
    }
    dispatch(changeFlexRange(who));
  };

  return (
    <div>
      <div className="containerMapa">
        <div className="itemCalendario">
          <div className="itemSelector">
            <ButtonRound
              setClick={() => {
                handleClickType("pick");
              }}
              clase={"dateButtonType"}
              selected={`${buttonRoundSelected.pick}`}
              texto={"Elige las fechas"}
            />
          </div>
        </div>
        {viewCalendar ? (
          <div className={`mutablePick`}>
            <div>
              <RangeCalendar
                className="RangeCalendarModal"
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
            <div className="itemCalendario">
              <ButtonRound
                setClick={() => {
                  handleClickDate("normal");
                }}
                clase={"dateButton"}
                selected={`${buttonDatesRange.normal}`}
                texto={"Fechas exactas"}
              />
              <ButtonRound
                setClick={() => {
                  handleClickDate("one");
                }}
                clase={"dateButton"}
                selected={`${buttonDatesRange.one}`}
                texto={"± 1 día"}
              />
              <ButtonRound
                setClick={() => {
                  handleClickDate("three");
                }}
                clase={"dateButton"}
                selected={`${buttonDatesRange.three}`}
                texto={"± 3 días"}
              />
              <ButtonRound
                setClick={() => {
                  handleClickDate("seven");
                }}
                clase={"dateButton"}
                selected={`${buttonDatesRange.seven}`}
                texto={"± 7 días"}
              />
            </div>
          </div>
        ) : (
          <div className={`mutableFlex`}>
            <p>¿Cuánto tiempo quieres quedarte?</p>
            <div className="itemSelector">
              <ButtonRound
                clase={"dateButton"}
                selected={""}
                texto={"Fin de semana"}
              />
              <ButtonRound
                clase={"dateButton"}
                selected={"selected"}
                texto={"Semana"}
              />
              <ButtonRound clase={"dateButton"} selected={""} texto={"Mes"} />
            </div>
            <p>¿Cuándo quieres ir?¿Cuándo quieres ir?</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarSearch;
