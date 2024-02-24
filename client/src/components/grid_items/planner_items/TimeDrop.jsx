import React, { useState } from "react";
import TimePicker from "react-timepicker-c";

const TimeDrop = ({ onChange }) => {
  const [timeValue, setTimeValue] = useState("");

  const handleTimeChange = (timeValue) => {
    setTimeValue(timeValue);
    onChange(timeValue);
  };

  return (
    <TimePicker
      id="time-picker"
      minTime="7:00am"
      maxTime="11:45pm"
      onChange={handleTimeChange}
      timeValue={timeValue}
      name="timeField"
    />
  );
};

export default TimeDrop;
