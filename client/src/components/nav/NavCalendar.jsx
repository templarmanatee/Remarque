import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import utc from "dayjs/plugin/timezone";
import timezone from "dayjs/plugin/timezone";
import { useMutation } from "@apollo/client";
import { ADD_SPREAD } from "../../utils/mutations";
import { HonestWeekPicker } from "./HonestWeekPicker/HonestWeekPicker";
dayjs.extend(dayOfYear);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("UTC");

const NavCalendar = ({ allSpreads, currentSpread }) => {
  const [thisMonday, setThisMonday] = useState(
    dayjs.unix(currentSpread.monday / 1000 + 18000).format("YYYY-MM-DD")
  );
  const [thisSunday, setThisSunday] = useState(
    dayjs
      .unix(currentSpread.monday / 1000 + 18000)
      .day(7)
      .format("YYYY-MM-DD")
  );
  const [addSpread, { data, loading, error }] = useMutation(ADD_SPREAD);
  const [newSpread, setNewSpread] = useState("");
  const [week, setWeek] = useState("");
  const navigate = useNavigate();

  console.log(currentSpread.monday);

  const onChange = (week) => {
    setWeek(week);
    console.log("First day of week: " + week.firstDay);

    // Format the selected week's first day for comparison
    const formattedSelectedMonday = dayjs
      .unix(week.firstDay / 1000)
      .startOf("day");

    // Find the spread for the selected week
    const selectedSpread = allSpreads.find((spread) => {
      // Convert the spread's Monday from Unix time (seconds) to milliseconds and format for comparison
      const formattedSpreadMonday = dayjs
        .unix(spread.monday / 1000 + 1)
        .startOf("day");
      return formattedSpreadMonday === formattedSelectedMonday;
    });

    if (selectedSpread) {
      // Navigate to the spread page for the selected week
      navigate(`/spread/${selectedSpread._id}`);
    } else {
      // Handle case where the spread for the selected week is not found
      console.error("Spread for the selected week not found");
    }
  };

  return (
    <label
      tabIndex={0}
      className="dropdown dropdown-bottom btn no-animation btn-neutral btn-circle w-52 mt-1"
    >
      <h2 className="font-bold">
        {thisMonday} - {thisSunday}
      </h2>
      <div className="dropdown-content p-2 shadow-xl bg-base-100 rounded-box w-96 h-84 z-100">
        <h1 className="text-center">Select a Week:</h1>
        <div className="calendar-container">
          <HonestWeekPicker onChange={onChange}></HonestWeekPicker>
          {/* <Calendar onChange={setDate} /> */}
        </div>
      </div>
    </label>
  );
};

export default NavCalendar;
