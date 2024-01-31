/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLock } from "react-icons/md";
import "./style.css";
import { GlobalContext } from "../../core/context/context";

const NavBar = () => {
  const globalContext: any = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar flex justify-between px-24 fixed z-50 text-white">
        <Link to="" className="text-2xl">
          DailyDiction
        </Link>
        <div className="flex justify-between ">
          {globalContext.isLoggedIn ? (
            <>
              <Link to="/admin/upload" className="ml-5">
                Upload
              </Link>
              <Link to="/learn" className="ml-5">
                Learn
              </Link>
              <Link
                to=""
                className="flex items-center cursor-not-allowed ml-5 pointer-events-none"
              >
                <MdOutlineLock />
                <p className="ml-1">contest</p>
              </Link>
              <button
                className="mx-3 login-btn-grad"
                onClick={() => {
                  globalContext.setShowLogin(false);
                  globalContext.setShowSignup(false);
                  globalContext.setIsLoggedIn(false);
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="mx-3 login-btn-grad"
              onClick={() => {
                globalContext.setShowLogin(true);
                globalContext.setShowSignup(false);
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
