import React from "react";

const MockList = () => {
  return (
    <ul className="list-wrapper">
      {new Array(5).fill(0).map((zeros: number, index: number) => {
        return (
          <li
            className={`list-1 list-skeleton ${index ? "shadow-2xl" : ""}`}
            key={index}
          ></li>
        );
      })}
    </ul>
  );
}

export default MockList;
