import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { GridLayout, Navbar } from "../components/index";
import InfoModal from "../components/info";
import Auth from "../utils/auth";
import { QUERY_DATE, QUERY_SPREAD, QUERY_USER } from "../utils/queries";

const Journal = (props) => {
  const [currentSpread, setCurrentSpread] = useState({});
  const [allSpreads, setAllSpreads] = useState({});
  // Generates the user ID and a list of all their spreads
  const useUserData = async () => {
    const { loading, error, data } = await useQuery(QUERY_USER);
    console.log(data);
    return data;
  };

  useUserData().then((data) => {
    const user = data.user;
    setAllSpreads(user.spreads);
    console.log(allSpreads);
    setCurrentSpread(user.spreads.slice(-1)[0]);
    console.log(currentSpread);
  });
  // Get spreadId from params (needs to be set)
  const { spreadId } = useParams();
  // Query for spread data from id
  const { loading, error, data } = useQuery(QUERY_SPREAD, {
    variables: { spreadId },
  });

  const checkLoggedIn = () => {
    if (!Auth.loggedIn()) {
      window.location.replace("/login");
    }
  };
  checkLoggedIn();

  return (
    <div className="grid grid-flow-row">
      <Navbar allSpreads={{ allSpreads }} />
      <div className="w-full text-left">
        <GridLayout spread={{ currentSpread }} />
      </div>

      <div className="sticky bottom-0 left-70 h-20 w-20">
        <InfoModal />
      </div>

      <button></button>
    </div>
  );
};

export default Journal;
