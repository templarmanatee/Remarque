import React, { useEffect, useState } from "react";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_SPREAD } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import Logo from "../RemarqueSmallLogo.svg";

const getNextMonday = (dateString) => {
  let inputDate = new Date(dateString);
  let sevenDaysLater = new Date(inputDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  return sevenDaysLater.toISOString().slice(0, 10);
};

const getPreviousMonday = (dateString) => {
  const day = new Date(dateString);
  const dayOfWeek = day.getDay();
  const daysSinceMonday = (dayOfWeek + 6) % 7;
  const mondaysDate = new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate() - daysSinceMonday
  );
  return mondaysDate.toISOString().slice(0, 10);
};

const Navbar = ({ allSpreads, currentSpread }) => {
  const [addSpread, { data, loading, error }] = useMutation(ADD_SPREAD);
  const [newSpread, setNewSpread] = useState("");
  const [headerLeft, setHeaderLeft] = useState(`${currentSpread.monday}`);
  const [headerRight, setHeaderRight] = useState(`${currentSpread.sunday}`);

  const mondaysDate = getNextMonday(currentSpread.monday);
  const lastMondaysDate = getPreviousMonday(currentSpread.monday);

  const routeChange = (e) => {
    setNewSpread(e.target.key);
    const newSpreadId = newSpread;
    setNewSpread("");
    window.location.replace(`/${newSpreadId}`);
  };

  return (
    <div className="navbar bg-gradient-to-r from-primary to-secondary">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>Table of Contents</li>

            {allSpreads.map((spread) => {
              return (
                <li key={spread._id}>
                  <button onClick={routeChange} key={spread._id}>
                    <a href={spread._id}>{spread.monday}</a>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <button className="btn btn-ghost normal-case hidden lg:flex text-4xl cursive-font">
          Remarque
        </button>
      </div>
      <div className="navbar-center lg:flex">
        <ul className="menu menu-horizontal">
          <button
            className="btn btn-ghost"
            onClick={async (e) => {
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
            }}
          >
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
          <li tabIndex={0}>
            <button className="btn btn-accent mx-3 w-max-full">
              <h2 className="font-bold">
                {headerLeft}
                {/* <img
                  src={Logo}
                  alt="remarque logo"
                  className="w-6 h-6 mb-5 mt-3 place-self-center"
                ></img> */}
                {headerRight}
              </h2>
            </button>
          </li>
          <button
            className="btn btn-ghost"
            onClick={async (e) => {
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
            }}
          >
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
