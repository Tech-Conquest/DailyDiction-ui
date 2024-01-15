import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineLock } from "react-icons/md";

const NavBar = () => {
  return (
    <>
      <div className="navbar text-black flex justify-between shadow-md fixed bg-white z-50">
        <button className="btn btn-ghost text-xl">DailyDiction</button>
        <div className="flex w-52 justify-between mr-10">
          <Link to="/admin/upload">Upload</Link>
          <Link to="/learn">Learn</Link>
          <Link to="/" className="flex items-center cursor-not-allowed">
            <MdOutlineLock />
            <p className="ml-1">contest</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavBar;
