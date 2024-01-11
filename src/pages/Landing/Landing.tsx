import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { HomeConst } from "../../core/constants/home";
import Audio from "../../components/audio/Audio";
import bg from "../../assets/images/bg.svg";
import MockList from "./MicroComponents/MockList";
import Spinner from "./MicroComponents/Spinner";
import ListSkeleton from "./MicroComponents/ListSkeleton";
import "./style.css";


const Landing = () => {

  const [mockLoader, setMockLoader] = useState<Boolean>(false);

  useEffect(() => {

    const showLoaderTimeout = setTimeout(() => {
      setMockLoader(true);

      const hideLoaderTimeout = setTimeout(() => {
        setMockLoader(false);
      }, 3000);

      return () => clearTimeout(hideLoaderTimeout);
    }, 3000);

    return () => clearTimeout(showLoaderTimeout);
    
  }, []);

  return (

    <div className="wrapper relative h-full">
      <img src={bg} alt="" className="absolute bottom-0" />
      <div className="w-full he-100 flex justify-around items-center">
        <div className="w-4/12 flex flex-col items-baseline relative z-50">
          <h1 className="text-4xl font-bold text-left">{HomeConst.AppName}!</h1>
          <p
            className="text-left text-xl space-x-9 mt-5"
            style={{ lineHeight: "2.5rem" }}
          >
            {HomeConst.Summary}
          </p>
          <div className="mt-5">
            <button className="btn-grad cursor-pointer text-md">
              Let's Learn <MdKeyboardArrowRight className="text-2xl" />
            </button>
          </div>
        </div>
        <div className="card-outer">
          <div className="right-card card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-5">
            <h1 className="text-xl text-center">Today's words</h1>
            <MockList />
          </div>
          <div className="left-card card shrink-0 w-full max-w-sm shadow-2xl bg-base-100  p-5">
            <h1 className="text-xl text-center">Explanation</h1>
            <div className="flex  h-full">
              {mockLoader ? (
                <Spinner />
              ) : (
                <div className="w-full flex flex-col items-start content">
                  <div className="flex mt-5 w-full">
                    <Audio hasAudio={false} />
                    <p className="list-skeleton ml-2 mt-2"></p>
                  </div>
                  <ListSkeleton header="Meaning" />
                  <ListSkeleton header="Example" />
                  <ListSkeleton header="PartOfSpeech" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
