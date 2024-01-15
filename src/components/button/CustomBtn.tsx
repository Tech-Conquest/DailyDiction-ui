import React from "react";

interface GetWordDetailsProps {
  loading: boolean;
  loadingText?: String;
  btnText: String;
  callBack: () => void;
}

const CustomBtn = ({ loading, callBack,loadingText,btnText }: GetWordDetailsProps) => {
  return (
    <>
      {loading ? (
        <button className="btn btn-primary text-white">
          <span className="loading loading-spinner loading-xs text-white"></span>
          Fetching details
        </button>
      ) : (
        <button className="btn btn-active btn-neutral" onClick={callBack}>
          Get Details
        </button>
      )}
    </>
  );
}

export default CustomBtn;
