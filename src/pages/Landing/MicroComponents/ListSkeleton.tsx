import React from "react";

const ListSkeleton = ({ header }: { header: string }) => {
  return (
    <div className="flex flex-col mt-5 w-full items-start">
      <h1 className="text-xl font-bold">{header}</h1>
      <p className="list-skeleton ml-2 mt-2"></p>
    </div>
  );
}

export default ListSkeleton;
