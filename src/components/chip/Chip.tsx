import React from "react";

const Chip = ({ text, color }: { text: string; color: string }) => {
  return (
    <span
      className={`text-sm rounded-md px-1 cursor-pointer`}
      style={{ color: `${color}`, border: `1px solid ${color}` }}
    >
      {text}
    </span>
  );
};

export default Chip;
