import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Dragger from "./Dragger";
import JournalEntry from "./planner_items/JournalEntry";
import { FaRegSave } from "react-icons/fa";

import { useMutation } from "@apollo/client";

import { UPDATE_GRIDITEM } from "../../utils/mutations";

const Card = ({ cardItems, userCollections, spreadCollections }) => {
  const [updateGridItem] = useMutation(UPDATE_GRIDITEM);

  const [titleState, setTitleState] = useState(cardItems.title);
  const [bodyState, setBodyState] = useState("");
  const [items, setItems] = useState(cardItems.plannerItems);

  const handleSubmit = async () => {
    console.log(bodyState);
    try {
      const GridItem = await updateGridItem({
        variables: {
          id: cardItems._id,
          title: titleState,
          body: bodyState,
        },
      });
      console.log(GridItem);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setTitleState(value);
  };

  const handleBodyChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setBodyState(value);
  };

  function checkTitle(t) {
    if (!t) {
      return "";
    } else {
      return t;
    }
  }

  function checkBody(b) {
    if (!b) {
      return "";
    } else {
      return b;
    }
  }

  return (
    <div className="card card-compact card-bordered w-full h-full md:w-1/3 md:h-1/3 m-8 bg-base-100 shadow-xl rounded-3xl">
      <textarea
        type="text"
        placeholder="Title"
        defaultValue={`${checkTitle(cardItems.title)}`}
        className="flex textarea textarea-bordered h-2 w-full text-center font-bold resize-none text-lg cursive-font"
        onChange={handleTitleChange}
      />
      <div className="space-x-1 space-y-1">
        {items.map((item) => (
          <JournalEntry
            entryDetails={item}
            key={item._id}
            userCollections={userCollections}
            spreadCollections={spreadCollections}
          />
        ))}
      </div>
    </div>
  );
};

export default Card;
