/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  bulkUploadWords,
  getWordDetails,
  uploadNewWord,
} from "../../core/api/utils";
import MeaningModal from "../Modal/MeaningModal";
import CustomBtn from "../button/CustomBtn";
import CSVUploader from "../CSVUploader/CSVUploader";
import { IParsedJSON } from "../../core/interface/ParsedJson";
import { EStatusCode } from "../../core/enums/response.enum";
import { IMeaningList } from "../../core/interface/MeaningList";
import { IUploadWord } from "../../core/interface/uploadWord";

interface WordDetail {
  partOfSpeech: string;
  Definition: string;
}

const UploadNewWord = () => {
  const [word, setWord] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [csvData, setCSVData] = useState<IParsedJSON[]>();
  const [uploading, setUploading] = useState<Boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [wordDetails, setWordDetails] = useState<WordDetail[]>([]);
  const [selectedMeaning, setSelectedMeaning] = useState<IMeaningList[] | []>(
    []
  );

  useEffect(() => {
    if (csvData?.length) {
      setError("");
      setSuccess("");
      setUploading(true);
      uploadWords(csvData);
    }
  }, [csvData]);

  useEffect(() => {
    if (selectedMeaning.length) {
      setError("");
      setSuccess("");
      let payload = {
        speechList: selectedMeaning,
        word: word,
      };
      uploadWord(payload);
    }
  }, [selectedMeaning]);

  const uploadWords = async (csvData: IParsedJSON[]) => {
    try {
      const isUploaded = await bulkUploadWords(csvData);
      if (isUploaded.status === EStatusCode.SUCCESS) {
        setSuccess("Words uploaded successfully !!");
      } else if (isUploaded.status === EStatusCode.BAD_REQUEST) {
        setError("Please upload correct CSV file");
      } else {
        setError("Something went wrong. Please try again");
      }
    } catch (error) {
      setError("Something went wrong. Please try again");
    } finally {
      setUploading(false);
    }
  };

  const uploadWord = async (uploadWordData: IUploadWord) => {
    try {
      const isUploaded = await uploadNewWord(uploadWordData);
      if (isUploaded.status === EStatusCode.SUCCESS) {
        setSuccess("Word uploaded successfully !!");
      } else if (isUploaded.status === EStatusCode.BAD_REQUEST) {
        setError("Please add speech before upload");
      } else {
        setError("Something went wrong. Please try again");
      }
    } catch (error) {
      setError("Something went wrong. Please try again");
    }
    setSelectedMeaning([]);
  };

  const getWordDetail = async () => {
    setError("");
    setSuccess("");
    const meaningList: WordDetail[] = [];

    if (word.length) {
      setLoading(true);
      setError("");
      try {
        const getWordData = await getWordDetails(word);

        const modal = document.getElementById(
          "meaning-modal"
        ) as HTMLDialogElement | null;

        if (getWordData.length) {
          getWordData.forEach((data: any) => {
            meaningList.push(data.meanings);
          });
          setWordDetails(meaningList.flat());
          modal?.showModal();
        } else {
          setError("No meanings found for the given word");
        }
      } catch (error) {
        setError("Word not found, please enter different word")
      }

      setLoading(false);
    } else {
      setError("Please enter the word");
    }
  };

  const getWordInput = (event: ChangeEvent<HTMLInputElement>) =>
    setWord(event.target.value);

  return (
    <div className="card-body">
      {uploading ? (
        <div className="flex flex-col items-center ">
          <p>Uploading data, please wait...</p>
          <progress className="progress w-56 mt-3"></progress>
        </div>
      ) : (
        <>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
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
              loadingText="Fetching Details..."
              btnText="Get Details"
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
          <MeaningModal
            wordDetails={wordDetails}
            word={word}
            setSelectedMeaning={setSelectedMeaning}
          />
        </>
      )}
    </div>
  );
};

export default UploadNewWord;
