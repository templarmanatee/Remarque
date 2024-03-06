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
        <div className="modal-box bg-white grid-flow-row">
          <div id="modal-header" className="flex">
            <label className="input input-bordered flex items-center gap-2 rounded-md w-96 mr-4">
              <input type="text" className="grow" placeholder="Entry:" />
            </label>

            <TimeDrop
              className=""
              onChange={handleTimeChange}
              value={inputTime}
            ></TimeDrop>
          </div>
          <textarea
            type="text"
            placeholder="-Any additional notes you may have.&#10;-People, places, and things that don't &#10;fit in the title."
            className="input w-full h-full my-2 rounded-md border-2"
          />
          <details className="dropdown bottom-0 right-0">
            <summary className="m-1 btn">Collection</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </details>
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
