import React, { useState, useEffect } from "react";
import TimeDrop from "./TimeDrop";
const FilledEntry = () => {
  // State variables for user input and button text
  const [inputText, setInputText] = useState("");
  const [buttonText, setButtonText] = useState("New Entry");
  const [inputTime, setInputTime] = useState("09:00");

  // Update button text when input changes
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleTimeChange = (newTimeValue) => {
    setInputTime(newTimeValue);
  };

  // Update button text in useEffect to reflect changes
  useEffect(() => {
    const newButtonText = `${inputTime} - ${inputText}`;
    setButtonText(newButtonText);
  }, [inputText, inputTime]); // Update on changes to any of these dependencies

  return (
    <label
      htmlFor="planner_entry"
      className="btn bg-transparent border-2 btn-sm rounded-full"
    >
      <h1 className="text-s">{buttonText}</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        style={{ display: !inputText ? "inline" : "none" }}
      >
        <path fill="" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" />
      </svg>
    </label>
  );
};

export default FilledEntry;
