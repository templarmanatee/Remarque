// import React, { useEffect, useState } from "react";
// import Auth from "../utils/auth";
// import { useMutation } from "@apollo/client";
// import { useNavigate } from "react-router-dom";
// import Logo from "../RemarqueSmallLogo.svg";

const NavDropdown = ({ allSpreads, currentSpread }) => {
  //   return (
  //     <div className="dropdown">
  //       <label tabIndex={0} className="btn btn-ghost btn-circle">
  //         {/* <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="h-5 w-5"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M4 6h16M4 12h16M4 18h7"></path>
  //         </svg> */}
  //       </label>
  //       <ul
  //         tabIndex={0}
  //         className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
  //       >
  //         <li>Table of Contents</li>
  //         {allSpreads.map((spread) => {
  //           return (
  //             <li key={spread._id}>
  //               <button onClick={routeChange} key={spread._id}>
  //                 <a href={spread._id}>{spread.monday}</a>
  //               </button>
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     </div>
  //   );
};

export default NavDropdown;
