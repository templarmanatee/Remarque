import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "@apollo/client";
import { FaRegSave } from "react-icons/fa";
import JournalEntry from "./JournalEntry";
import { UPDATE_PLANNERITEM } from "../../../utils/mutations";
const Weekday = ({
  id,
  body,
  weekday,
  items,
  userCollections,
  spreadCollections,
  update,
}) => {
  const [plannerItems, setPlannerItems] = useState(items);
  const [updatePlannerItem] = useMutation(UPDATE_PLANNERITEM);

  useEffect(() => {
    setPlannerItems(items);
  }, [items]);

  useEffect(() => {
    console.log("Spread rerender");
  }, [update]);

  function getDayOfWeek(num) {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    if (num >= 0 && num <= 6) {
      return daysOfWeek[num];
    } else {
      console.log("Invalid input: please provide a number between 0 and 6.");
    }
  }

  return (
    <div className="w-full text-left m-2">
      <div className="divider w-72">{`${getDayOfWeek(weekday)}`}</div>
      <div id="weekday-content">
        {plannerItems.map((item) => (
          <JournalEntry
            key={item._id}
            entryDetails={item}
            userCollections={userCollections}
            spreadCollections={spreadCollections}
            update={update}
          />
        ))}
      </div>
    </div>
  );
};

export default Weekday;
