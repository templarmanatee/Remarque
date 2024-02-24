import React, { useState } from "react";
import Dragger from "./Dragger";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    setTodos([...todos]); 

  }
  
  return (
    <div className="overflow-x-auto overflow-y-auto max-w-full max-h-full">
      <table className="table max-w-full">
        {/* head */}
        <thead className="">
          <tr className="">
            <th className="justify-start">Complete</th>
            <th>Today's To-Dos</th>
            <th className="justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path fill="" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" />
              </svg>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {/* row 1 */}
          {/* For each entry in the weekday planner, make table row autofilled with data. */}
          <tr className="">
            <td>
              <input type="checkbox" className="checkbox" />
            </td>
            <td>
              <input className="textarea input-ghost text-m handwriting-font p-x-0"></input>
            </td>
          </tr>
          {/* <tr>
            <td>
              <input type="checkbox" className="checkbox" />
            </td>
            <td>
              <input className="textarea input-ghost text-m handwriting-font p-x-0"></input>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" className="checkbox" />
            </td>
            <td>
              <input className="textarea input-ghost text-m handwriting-font p-x-0"></input>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" className="checkbox" />
            </td>
            <td>
              <input className="textarea input-ghost text-m handwriting-font p-x-0"></input>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
