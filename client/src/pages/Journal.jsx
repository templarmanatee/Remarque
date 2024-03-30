import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { GridLayout } from "../components/index";
import { AddEntry } from "../components/entry/index";
import { Navbar } from "../components/nav/index";
import InfoModal from "../components/info";
import Auth from "../utils/auth";
import { ADD_SPREAD } from "../utils/mutations";
import { QUERY_SPREAD, QUERY_USER } from "../utils/queries";
import { useParams } from "react-router-dom";
const Journal = () => {
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
    console.log(userData.user);
    console.log(currentSpread);
    return (
      <div className="grid grid-flow-row content-center">
        <Navbar
          allSpreads={userData.user.spreads}
          currentSpread={currentSpread}
          className="align-center"
        />
        <div className="w-full text-left">
          <GridLayout
            allSpreads={userData.user.spreads}
            currentSpread={currentSpread}
            spread={userData.user.spreads.slice(-1)[0]}
            userCollections={userData.user.collections}
          />
        </div>
        <div className="fixed bottom-0 right-4 h-20 w-20">
          <AddEntry
            userCollections={userData.user.collections}
            spreadCollections={currentSpread.weeklyCollections}
          ></AddEntry>
        </div>
      </div>
    );
  }
};

export default Journal;
