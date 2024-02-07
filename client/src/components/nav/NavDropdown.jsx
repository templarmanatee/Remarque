import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../RemarqueSmallLogo.svg";
import { getDates } from "../../utils/helpers";
import dayjs from "dayjs";

const NavDropdown = ({ allSpreads, currentSpread }) => {
  const days = ["Su", "M", "T", "W", "Th", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  return (
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
          ></path>
        </svg>
      </label>
      <ul className="dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-box w-96 h-84">
        <div className="flex justify-center">
          <button
            className="btn btn-ghost"
            onClick={async (e) => {
              e.preventDefault();
              setSelectDate(selectDate.month(selectDate.month() - 1));
              console.log(selectDate);
            }}
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 rotate-180"
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
          <div className="mt-3">{selectDate.format("MMMM, YYYY")}</div>
          <button
            className="btn btn-ghost"
            onClick={async (e) => {
              e.preventDefault();
              setSelectDate(selectDate.month(selectDate.month() + 1));
              console.log(selectDate);
            }}
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4"
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
        </div>
        <div className="w-full grid grid-cols-7">
          {days.map((day, index) => {
            return <h1 key={index}>{day}</h1>;
          })}
        </div>
        <div className="w-full grid grid-cols-7 py-2">
          {getDates(selectDate.month(), selectDate.year()).map(
            ({ date, currentMonth, today }, index) => {
              const day = date.day();
              if ((day === 0) || (day === 6)) {
                console.log(date);
                return (
                  <div key={index} className="py-2">
                    <h1 className="bg-gray-300 rounded-full">{date.date()}</h1>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="py-2">
                    
                    <h1 className="bg-gray-100">{date.date()}</h1>
                  </div>
                );
              }
            }
          )}
        </div>
      </ul>
    </div>
  );
};

export default NavDropdown;
