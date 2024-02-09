import React from "react";
import Dragger from "./Dragger";

const Todo = () => {
  return (
    <div>
      <div className="overflow-x-auto overflow-y-auto max-w-full max-h-full">
        <table className="table max-w-full">
          {/* head */}
          <thead className="max-w-full">
            <tr className="w-1/5">
              <th>Task</th>
              <th className="justify-end">Complete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>
                <input className="textarea textarea-ghost text-s handwriting-font"></input>
              </td>
              <td>
                <input type="checkbox" className="checkbox" />
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>
                <input className="textarea input-ghost text-m handwriting-font p-x-0"></input>
              </td>
              <td>
                <input type="checkbox" className="checkbox" />
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>
                <input className="textarea textarea-ghost text-m handwriting-font"></input>
              </td>
              <td>
                <input type="checkbox" className="checkbox" />
              </td>
            </tr>
            {/* row 4 */}
            <tr>
              <th>4</th>
              <td>
                <input className="textarea textarea-ghost text-m handwriting-font"></input>
              </td>
              <td>
                <input type="checkbox" className="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todo;
