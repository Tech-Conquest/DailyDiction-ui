/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useEffect, useState } from "react";
import { bulkUploadWords, getWordDetails } from "../../core/api/utils";
import MeaningModal from "../Modal/MeaningModal";
import CustomBtn from "../button/CustomBtn";
import CSVUploader from "../CSVUploader/CSVUploader";
import { IParsedJSON } from "../../core/interface/ParsedJson";
import Spinner from "../../pages/Landing/MicroComponents/Spinner";

const UploadNewWord = () => {

  const [word, setWord] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [csvData, setCSVData] = useState<IParsedJSON[]>();
  const [uploading, setUploading] = useState<Boolean>(false);
  const [success,setSuccess] = useState<string>("")

  useEffect(() => {
    if (csvData?.length) {
      setError("");
      setSuccess("")
      setUploading(true);
      uploadWords(csvData)
    }
  }, [csvData]);

  const uploadWords = async (csvData:IParsedJSON[]) => {
    const isUploaded = await bulkUploadWords(csvData)
    if(isUploaded.status === 200){
      setSuccess("Words uploaded successfully !!")
    }
    else if(isUploaded.status === 400){
        setError("Please upload correct csv file")
    }
    else{
        setError("Something went wrong please try again")
    }
    setUploading(false);

  }

  const getWordDetail = async () => {
    setSuccess("")
    if (word.length) {

      setLoading(true);
      setError("");
      setSuccess("")
      const getWordData = await getWordDetails(word);
      const modal = document.getElementById(
        "meaning-modal"
      ) as HTMLDialogElement | null;

      if (getWordData.length) {
        modal?.showModal();
      }

      setLoading(false);
    } else {
      setError("Please Enter the word");
    }
  };

  const getWordInput = (event: ChangeEvent<HTMLInputElement>) =>
    setWord(event.target.value);

  return (
    <div className="card-body">
      {uploading ? (
        <div className="flex flex-col items-center ">
          <p>Uploading data please wait ...</p>
         <progress className="progress w-56 mt-3"></progress>
        </div>
      ) : (
        <>
          {error.length ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : null}
          {success.length ? (
            <p className="text-green-500 text-center">{success}</p>
          ) : null}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter a Word</span>
            </label>
            <input
              type="text"
              placeholder="Good"
              className="input input-bordered"
              onInput={getWordInput}
              required
            />
          </div>
          <div className="form-control mt-6">
            <CustomBtn
              loading={loading}
              callBack={getWordDetail}
              loadingText={"Fetching Details..."}
              btnText={"Get Details"}
            />
          </div>
          <div className="divider">OR</div>
          <div className="flex flex-col">
            <label className="label-text">Bulk Upload</label>
            <div className="mt-4">
              <CSVUploader
                setJson={setCSVData}
                validateHeaderList={["word"]}
                validateCSV={true}
                setError={setError}
              />
            </div>
          </div>
          <MeaningModal />
        </>
      )}
    </div>
  );
}

export default UploadNewWord;
