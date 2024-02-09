import { useState } from "react";
// import dayjs from "dayjs";
// import TimePicker from "react-timepicker-c";
import TimeDrop from "./TimeDrop";

const EntryModal = () => {
  const [timeValue, setTimeValue] = useState("");

  const handleTimeChange = (timeValue) => {
    setTimeValue(timeValue);
  };

  return (
    <div className="my-2">
      {/* The button to open modal */}
      <label
        htmlFor="filled_entry"
        className="btn bg-transparent border-2 btn-sm rounded-full"
      >
        <h1 className="text-s">Filled Entry</h1>
      </label>
      <input type="checkbox" id="filled_entry" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white items-center">
          <div id="modal-header" className="flex cols-2">
            <h3 className="font-bold text-xl w-4/5">Filled Entry</h3>
            <TimeDrop></TimeDrop>
          </div>
          <input
            type="text"
            placeholder="Description: "
            className="input w-full max-w-xs"
          ></input>
          <div className="modal-action">
            <label htmlFor="filled_entry" className="btn btn-sm btn-primary">
              Submit Entry
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryModal;
