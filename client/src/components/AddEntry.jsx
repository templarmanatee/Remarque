import React, { useState, useEffect } from "react";
import TimeDrop from "../components/grid_items/planner_items/TimeDrop";
const AddEntry = () => {
  // State variables for user input and button text
  const [inputText, setInputText] = useState("");
  const [buttonText, setButtonText] = useState("New Entry");
  const [inputTime, setInputTime] = useState("09:00");

  // // Update button text when input changes
  // const handleInputChange = (event) => {
  //   setInputText(event.target.value);
  // };

  const handleTimeChange = (newTimeValue) => {
    setInputTime(newTimeValue);
  };

  // // Update button text in useEffect to reflect changes
  // useEffect(() => {
  //   const newButtonText = `${inputTime} - ${inputText}`;
  //   setButtonText(newButtonText);
  // }, [inputText, inputTime]); // Update on changes to any of these dependencies

  return (
    <>
      <label
        htmlFor="planner_entry"
        className="btn bg-accent border-2 btn-lg btn-circle rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3em"
          height="3em"
          viewBox="0 0 24 24"
          style={{ display: !inputText ? "inline" : "none" }}
        >
          <path fill="" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" />
        </svg>
      </label>

      <input type="checkbox" id="planner_entry" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white items-center">
          <div id="modal-header" className="flex cols-2">
            <input
              type="text"
              placeholder="Title: "
              className="input w-full max-w-xs my-2"
            />
            <TimeDrop
              className="w-4"
              onChange={handleTimeChange}
              value={inputTime}
            ></TimeDrop>
          </div>
          <input
            type="text"
            placeholder="Description: "
            className="input w-full my-2"
          />
          <input
            type="text"
            placeholder="Collection: "
            className="input w-full my-2"
          />
          <div className="modal-action">
            <label htmlFor="planner_entry" className="btn btn-sm btn-primary">
              Edit Entry
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEntry;
