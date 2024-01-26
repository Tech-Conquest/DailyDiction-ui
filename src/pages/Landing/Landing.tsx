/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { HomeConst } from "../../core/constants/home";
import Login from "../../components/login/Login";
import { GlobalContext } from "../../core/context/context";
import SignUp from "../../components/SignUp/SignUp";
import "./style.css";

const Landing = () => {
  const [moveOutText, setMoveOutText] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);
  const globalContex: any = useContext(GlobalContext);

  useEffect(() => {
    if (moveOutText) {
      const timeout = setTimeout(() => {
        setShowMeaning(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
    return;
  }, [moveOutText]);

  return (
    <div className="wrapper relative h-full">
      <div className="w-full he-100 flex items-center px-24">
        <div
          className={`flex flex-col items-baseline relative z-50 w-1/2 ${
            moveOutText ? "move-out-header" : ""
          }`}
        >
          <h1 className="landing-txt font-bold text-left">
            {HomeConst.AppName}!
          </h1>
          <p className="text-left text-xl space-x-9 mt-5 text-white w-3/4">
            {HomeConst.Summary}
          </p>
          <div className="mt-5">
            <button
              className="btn-grad cursor-pointer text-md"
              onClick={() => {}}
            >
              Let's Learn <MdKeyboardArrowRight className="text-2xl" />
            </button>
          </div>
        </div>
        {globalContex.showLogin ? (
          <div className="login-wrapper">
            <div className="sphere flex justify-center items-center">
              <div className="form-wrapper">
                <Login />
              </div>
            </div>
          </div>
        ) : null}

        {globalContex.showSignup ? <SignUp isAdmin={false} /> : null}

        {!globalContex.showLogin && !globalContex.showSignup ? (
          <>
          {/* This will be removed once animation added */}
            <div
              className={`card w-96 bg-base-100 shadow-xl word-list-card ${
                moveOutText ? "move-right" : ""
              }`}
            >
              <div className="card-body">
                <h2 className="card-title justify-center">Today's Words</h2>
                <ul>
                  <li
                    className="p-2 list-active cursor-pointer word-list"
                  >
                    Good
                  </li>
                  <li className="p-2 cursor-pointer word-list">Serendipity</li>
                  <li className="p-2 cursor-pointer word-list">accomplish</li>
                  <li className="p-2 cursor-pointer word-list">admire</li>
                  <li className="p-2 cursor-pointer word-list">Good</li>
                  <li className="p-2 cursor-pointer word-list">Serendipity</li>
                  <li className="p-2 cursor-pointer word-list">accomplish</li>
                  <li className="p-2 cursor-pointer word-list">admire</li>
                  <li className="p-2 cursor-pointer word-list">accomplish</li>
                  <li className="p-2 cursor-pointer word-list">admire</li>
                </ul>
              </div>
            </div>
            {showMeaning ? (
              <>
                <div className="card w-1/2 bg-base-100 shadow-xl word-list-card ml-10 right-in">
                  <div className="card-body">
                    <h2 className="card-title justify-center">Today's Words</h2>
                    <ul></ul>
                  </div>
                </div>
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Landing;
