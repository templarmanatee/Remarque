import { useState } from "react";
import Calendar from "react-calendar";
import "../../styles/Calendar.css";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import { useMutation } from "@apollo/client";
import { ADD_SPREAD } from "../../utils/mutations";
import Logo from "../../RemarqueSmallLogo.svg";
import { getDates } from "../../utils/helpers";
import { HonestWeekPicker } from "./HonestWeekPicker/HonestWeekPicker";
dayjs.extend(dayOfYear);

const NavCalendar = ({
  allSpreads,
  currentSpread,
  headerLeft,
  headerRight,
}) => {
  const days = ["Su", "M", "T", "W", "Th", "F", "S"];
  const currentDate = dayjs();
  const [addSpread, { data, loading, error }] = useMutation(ADD_SPREAD);
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [newSpread, setNewSpread] = useState("");
  const todaysDate = dayjs();
  const firstDayOfYear = todaysDate.dayOfYear(1).toISOString();
  const [date, setDate] = useState(dayjs());

  const tileClassName = ({ date, view }) => {};

  return (
    <label
      tabIndex={0}
      className="dropdown dropdown-bottom btn btn-neutral btn-circle w-52 mt-1"
    >
      <h2 className="font-bold">
        {headerLeft} - {headerRight}
      </h2>
      <div className="dropdown-content p-2 shadow-xl bg-base-100 rounded-box w-96 h-84 z-100">
        <h1 className="text-center">Select a Week:</h1>
        <div className="calendar-container">
          <HonestWeekPicker></HonestWeekPicker>
          {/* <Calendar onChange={setDate} /> */}
        </div>
      </div>
    </label>
  );
};

export default NavCalendar;
