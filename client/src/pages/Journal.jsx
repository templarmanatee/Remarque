import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { GridLayout } from "../components/index";
import { AddEntry } from "../components/entry/index";
import { Navbar } from "../components/nav/index";
import InfoModal from "../components/info";
import Auth from "../utils/auth";
import UpdateContext from "../components/UpdateContext";
import { ADD_SPREAD, ADD_PLANNERITEM } from "../utils/mutations";
import { QUERY_SPREAD, QUERY_USER } from "../utils/queries";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
const Journal = () => {
  const [addPlannerItem, { itemError }] = useMutation(ADD_PLANNERITEM);

  const [update, setUpdate] = useState(0); // State for forcing update

  const forceRerender = () => {
    setForceUpdate((prev) => prev + 1); // Update the state to force rerender
  };
  const handleFormSubmit = async (event, input) => {
    event.preventDefault();
    const timeFormat = "h:mma";

    const scheduledFormatted = dayjs(input.inputTime, timeFormat);
    let scheduled;

    if (scheduledFormatted.isValid()) {
      scheduled = scheduledFormatted.year(1970).month(0).date(1);
    } else {
      console.error("Invalid input time format.");
    }

    try {
      console.log(input);
      const mutationResponse = await addPlannerItem({
        variables: {
          title: input.inputText,
          body: input.additionalNotes,
          scheduled: scheduled,
          status: input.status,
          collections: input.selected,
        },
      });
      const plannerItemId = mutationResponse._id;
      console.log("Ping");
      forceRerender();
      return plannerItemId;
    } catch (e) {
      console.log(e);
    }
  };

  const checkLoggedIn = () => {
    if (!Auth.loggedIn()) {
      window.location.replace("/login");
    }
  };
  checkLoggedIn();
  let id = window.location.href.split("/")[3];

  const { loading, error, data } = useQuery(QUERY_USER);
  const userData = data;

  if (loading) return "Loading...";
  if (error) {
    console.log(error);
    window.location.replace("/login");
  }

  if (!loading) {
    let currentSpread = userData.user.spreads.slice(-1)[0];
    if (id) {
      currentSpread = userData.user.spreads.filter((spread) => {
        return spread._id === id;
      });
      currentSpread = currentSpread[0];
    }

    return (
      <UpdateContext.Provider value={{ update, setUpdate, forceRerender }}>
        <div className="grid grid-flow-row content-center">
          <Navbar
            allSpreads={userData.user.spreads}
            currentSpread={currentSpread}
            className="align-center"
          />
          <div>
            <GridLayout
              allSpreads={userData.user.spreads}
              currentSpread={currentSpread}
              spread={userData.user.spreads.slice(-1)[0]}
              userCollections={userData.user.collections}
              userId={userData._id}
              update={update}
            />
          </div>
          <div className="fixed bottom-0 right-4 h-20 w-20">
            <AddEntry
              userCollections={userData.user.collections}
              spreadCollections={currentSpread.weeklyCollections}
              hidePlusLabel={false}
              handleFormSubmit={handleFormSubmit}
            ></AddEntry>
          </div>
        </div>
      </UpdateContext.Provider>
    );
  }
};

export default Journal;
