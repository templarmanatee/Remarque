import React, { useState, useEffect } from "react";
import TimeDrop from "../grid_items/planner_items/TimeDrop";
const AddEntry = () => {
  const [inputText, setInputText] = useState("");
  const [inputTime, setInputTime] = useState("09:00");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [collections, setCollections] = useState([]);
  const [status, setStatus] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleNotesChange = (event) => {
    setAdditionalNotes(event.target.value);
  };

  const handleCollectionChange = (event) => {
    setCollections(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = () => {
    const inputData = {
      inputText,
      inputTime,
      additionalNotes,
      collections,
      status,
    };
    console.log(JSON.stringify(inputData));
  };

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
              <input
                type="text"
                className="grow"
                placeholder="Entry:"
                value={inputText}
                onChange={handleInputChange}
              />
            </label>
            <TimeDrop onChange={setInputTime} value={inputTime}></TimeDrop>
          </div>
          <textarea
            type="text"
            placeholder="-Any additional notes you may have.&#10;-People, places, and things that don't &#10;fit in the title."
            className="input w-full h-32 my-2 rounded-md border-2"
            value={additionalNotes}
            onChange={handleNotesChange}
          />
          <div className="flex space-x-6">
            <select
              style={{ width: "75%" }}
              className="flex rounded-md"
              onChange={handleCollectionChange}
              multiple
            >
              <option value="">-- Select a Collection --</option>
              <option value="Monday">Planner: Monday</option>
              <option value="Tuesday">Planner: Tuesday</option>
              <option value="Wednesday">Planner: Wednesday</option>
              <option value="Thursday">Planner: Thursday</option>
              <option value="Friday">Planner: Friday</option>
              <option value="Collection 1">Collection 1</option>
              <option value="Collection 2">Collection 2</option>
            </select>
            <select
              style={{ width: "25%" }}
              className="input input-bordered flex rounded-md"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="">Status</option>
              <option value="O">O</option>
              <option value="X">X</option>
              <option value="&gt;">&gt;</option>
            </select>
          </div>

          <div className="modal-action">
            <label
              htmlFor="planner_entry"
              className="btn btn-sm btn-primary"
              onClick={handleSubmit}
            >
              Submit Entry
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEntry;
