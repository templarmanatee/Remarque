import React, { useEffect, useState } from "react";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_SPREAD } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";
import NavCalendar from "./NavCalendar";
import Logo from "../../RemarqueSmallLogo.svg";
import dayjs from "dayjs";

const getPreviousMonday = (dateString) => {
  const day = dayjs(dateString);
  return day.day(-6);
};

const getNextMonday = (dateString) => {
  const day = dayjs(dateString);
  return day.day(8);
};

const Navbar = ({ allSpreads, currentSpread }) => {
  const [addSpread, { data, loading, error }] = useMutation(ADD_SPREAD);
  const [newSpread, setNewSpread] = useState("");
  const [headerLeft, setHeaderLeft] = useState(`${currentSpread.monday}`);
  const [headerRight, setHeaderRight] = useState(`${currentSpread.sunday}`);

  const mondaysDate = getNextMonday(currentSpread.monday);
  console.log(mondaysDate);
  const lastMondaysDate = getPreviousMonday(currentSpread.monday);

  const routeChange = (e) => {
    setNewSpread(e.target.key);
    const newSpreadId = newSpread;
    setNewSpread("");
    window.location.replace(`/${newSpreadId}`);
  };

  const handleLeftButton = async (e) => {
    e.preventDefault();
    let foundMonday;
    allSpreads.forEach(async (spread) => {
      if (spread.monday === lastMondaysDate) {
        foundMonday = spread;
      }
    });
    if (foundMonday === undefined) {
      foundMonday = await addSpread({
        variables: {
          date: lastMondaysDate,
        },
      }).then((data) => {
        setNewSpread(data);
        const newSpreadId = newSpread;
        setNewSpread(null);
        setTimeout(window.location.replace(`/${newSpreadId}`), 500);
      });
    }
    window.location.replace(`/${foundMonday._id}`);
  };

  const handleRightButton = async (e) => {
    e.preventDefault();
    let foundMonday;
    allSpreads.forEach(async (spread) => {
      if (spread.monday === mondaysDate) {
        foundMonday = spread;
      }
    });
    if (foundMonday === undefined) {
      foundMonday = await addSpread({
        variables: {
          date: mondaysDate,
        },
      }).then((data) => {
        setNewSpread(data);
        const newSpreadId = newSpread;
        setNewSpread(null);
        setTimeout(window.location.replace(`/${newSpreadId}`), 500);
      });
    }
    window.location.replace(`/${foundMonday._id}`);
  };

  return (
    <div className="navbar bg-gradient-to-r from-primary to-secondary z-10">
      <div className="navbar-start">
        <button className="btn btn-ghost normal-case hidden lg:flex text-2xl cursive-font">
          Remarque
        </button>
      </div>
      <div className="navbar-center lg:flex">
        <ul className="menu menu-horizontal content-center">
          <li className="justify-start">
            <button className="btn btn-ghost mt-2" onClick={handleLeftButton}>
              <svg
                aria-hidden="true"
                className="w-5 h-5 rotate-180"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          <li tabIndex={0}>
            <NavCalendar
              allSpreads={allSpreads}
              currentSpread={currentSpread}
              headerLeft={headerLeft}
              headerRight={headerRight}
            ></NavCalendar>
          </li>
          <button className="btn btn-ghost mt-2" onClick={handleRightButton}>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </ul>
      </div>
      <div className="navbar-end">
        <a
          className="btn btn-ghost flex-initial max-w-24"
          href="/login"
          onClick={() => Auth.logout()}
        >
          Log out
        </a>
      </div>
    </div>
  );
};

export default Navbar;
