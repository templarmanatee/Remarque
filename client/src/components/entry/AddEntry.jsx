import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import TimeDrop from "../grid_items/planner_items/TimeDrop";
import { ADD_PLANNERITEM } from "../../utils/mutations";
import { MultiSelect } from "react-multi-select-component";
import makeAnimated from "react-select/animated";
import dayjs from "dayjs";
import utc from "dayjs/plugin/timezone";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const AddEntry = ({
  spreadCollections,
  userCollections,
  filledEntry,
  hidePlusLabel,
  handleFormSubmit,
}) => {
  const [addPlannerItem, { error }] = useMutation(ADD_PLANNERITEM);
  const [inputText, setInputText] = useState("");
  const [inputTime, setInputTime] = useState("09:00");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState([]);
  const [hideLabel, setHideLabel] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [editCollection, setEditCollection] = useState();

  useEffect(() => {
    setHideLabel(!hidePlusLabel);
  }, [filledEntry]);

  const userOptions = userCollections.map((collection) => ({
    value: collection._id,
    label: collection.title,
  }));

  const spreadOptions = spreadCollections.map((collection) => ({
    value: collection._id,
    label: getDayOfWeek(collection.title),
  }));

  const [collections, setCollections] = useState([
    ...userOptions,
    ...spreadOptions,
  ]);

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
      return num;
    }
  }

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleNotesChange = (event) => {
    setAdditionalNotes(event.target.value);
  };

  const handleCollectionChange = (event) => {
    setCollections(collections.event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleCollectionSelect = (event) => {
    setSelected(event.target.value);
  };

  const handleEditCollection = (event) => {
    const collectionId = event.target.value; 
  }

  return (
    <>
      {hideLabel && ( // Render plus label if hidePlusLabel is false
        <label
          htmlFor="planner_entry"
          className="btn bg-accent border-2 btn-lg btn-circle rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 24 24"
          >
            <path fill="" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" />
          </svg>
        </label>
      )}

      <input type="checkbox" id="planner_entry" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box h-2/3 bg-white">
          <div className="flex justify-between">
            <div className="tabs tabs-lifted mb-4">
              <button
                className={`tab ${activeTab === "tab1" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("tab1")}
              >
                New Entry
              </button>
              <button
                className={`tab ${activeTab === "tab2" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("tab2")}
              >
                Edit Collections
              </button>
            </div>
            <div className="flex justify-end">
              <label
                htmlFor="planner_entry"
                className="btn btn-sm btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#D1D5DB"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </label>
            </div>
          </div>
          {activeTab === "tab1" ? (
            <div>
              <div id="modal-header" className="flex justify-between my-2">
                <div className="flex items-center gap-2 h-8">
                  <input
                    type="text"
                    style={{ width: "75%" }}
                    className="textarea grow h-12 textarea-bordered rounded-md"
                    placeholder="Entry Title:"
                    value={inputText}
                    onChange={handleInputChange}
                  />
                  <TimeDrop
                    style={{ width: "25%" }}
                    onChange={setInputTime}
                    value={inputTime}
                  ></TimeDrop>
                </div>
              </div>
              <textarea
                type="text"
                placeholder="-Any additional notes you may have.&#10;-People, places, and things that don't &#10;fit in the title."
                className="textarea w-full h-32 my-2 rounded-md textarea-bordered"
                value={additionalNotes}
                onChange={handleNotesChange}
              />
              <div className="space-y-4 z-0">
                <MultiSelect
                  options={collections}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                  className="custom-multiselect"
                />
                <select
                  style={{ width: "25%" }}
                  className="input input-bordered flex rounded-md justify-right"
                  onChange={handleStatusChange}
                >
                  <option value="-">Note</option>
                  <option value="O">Open</option>
                  <option value="X">Closed</option>
                  <option value="&gt;">&gt;</option>
                </select>
              </div>

              <div className="modal-action">
                <label
                  htmlFor="planner_entry"
                  className="btn btn-sm btn-primary"
                  onClick={(event) =>
                    handleFormSubmit(event, {
                      inputText,
                      inputTime,
                      additionalNotes,
                      status,
                      selected,
                    })
                  }
                >
                  Submit Entry
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <select
                style={{ width: "100%" }}
                className="input input-bordered flex rounded-md justify-right"
                onChange={handleStatusChange}
              >
                {collections.map((collection) => {
                  return (
                    <option
                      value={collection.value}
                      onChange={handleCollectionSelect}
                    >
                      {collection.label}
                    </option>
                  );
                })}
                <option value="$new">New Collection</option>
              </select>
              <input
                type="text"
                style={{ width: "75%" }}
                className="textarea grow h-12 textarea-bordered rounded-md"
                placeholder="Collection Title: "
                value={selected.value}
                onChange={handleInputChange}
              />
              {collections.map((collection) => {
                return (
                  <>
                    <div className="">{collection.label}</div>
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddEntry;
