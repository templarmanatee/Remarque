import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "@apollo/client";
import { FaRegSave } from "react-icons/fa";
import { UPDATE_PLANNERITEM } from "../../../utils/mutations";
import EntryModal from "./EntryModal";
import FilledEntry from "./FilledEntry";
const Weekday = ({ id, body, weekday }) => {
  const [updatePlannerItem] = useMutation(UPDATE_PLANNERITEM);

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
    <div className="w-full grid grid-cols-1 grid-flow-row text-left">
      <div className="divider">
        <span className="label-text">{`${getDayOfWeek(weekday)}`}</span>
      </div>
      <EntryModal></EntryModal>
      <FilledEntry></FilledEntry>
    </div>
  );
};

export default Weekday;
