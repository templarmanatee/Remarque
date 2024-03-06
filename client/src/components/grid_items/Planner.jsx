import React, { useEffect, useState } from "react";
import Weekday from "./planner_items/Weekday";

const Planner = ({ plannerItems }) => {
  const plannerArray = plannerItems;
  return (
    <div className="w-full grid grid-cols-1 grid-flow-row text-left border-2">
      {plannerArray.map((item) => (
        <Weekday
          id={item._id}
          key={item._id}
          body={item.body}
          weekday={item.scheduled}
        />
      ))}
    </div>
  );
};

export default Planner;
