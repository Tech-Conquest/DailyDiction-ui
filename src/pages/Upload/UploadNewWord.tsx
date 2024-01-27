import React from "react";
import UploadNewWord from "../../components/UploadWordForm/UploadWordForm";
import AddNew from "../../assets/images/Add-new.svg";
import "./style.css";

const UploadWord = () => {
  
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col justify-around w-full lg:flex-row">
        <div className="text-center flex items-center flex-col">
          <div className="hidden lg:block">
            <img src={AddNew} alt="add new" className="add-new-img"></img>
          </div>
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold text-white">Upload Words!</h1>
            <p className="py-6 w-96 text-white">
              You can either input words to receive comprehensive details for
              each word or upload a CSV file
            </p>
          </div>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <UploadNewWord />
        </div>
      </div>
    </div>
  );
}

export default UploadWord;
