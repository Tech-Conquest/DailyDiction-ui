import React, { useEffect, useState } from "react";
import MockList from "../../pages/Landing/MicroComponents/MockList";
import Spinner from "../../pages/Landing/MicroComponents/Spinner";
import Audio from "../audio/Audio";
import ListSkeleton from "../../pages/Landing/MicroComponents/ListSkeleton";

const HomeLoader = () => {
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
    <div className="card-outer" style={{ display: "none" }}>
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
  );
};

export default HomeLoader;
