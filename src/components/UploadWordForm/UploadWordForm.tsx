/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useEffect, useState } from "react";
import { getWordDetails, uploadWords } from "../../core/api/utils";
import MeaningModal from "../Modal/MeaningModal";
import CustomBtn from "../button/CustomBtn";
import CSVUploader from "../CSVUploader/CSVUploader";
import { EStatusCode } from "../../core/enums/response.enum";
import { IMeaning, IPartsOfSpeech, IWord } from "../../core/interface/Words";


const UploadNewWord = () => {
  const [word, setWord] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [csvData, setCSVData] = useState<any[]>();
  const [uploading, setUploading] = useState<Boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [wordDetails, setWordDetails] = useState<IPartsOfSpeech[]>([]);
  const [selectedPOS, setSelectedPOS] = useState<any[] | []>(
    []
  );

  useEffect(() => {
    if (csvData?.length) {
      setError("");
      setSuccess("");
      setUploading(true);
      handleUploadWords(csvData);
    }
  }, [csvData]);

  useEffect(() => {
    if (selectedPOS.length) {
      setError("");
      setSuccess("");
      let meanings: IMeaning[] = []
      let payload: IWord = {

        meanings:[
          {
            partOfSpeech: selectedPOS,
            definition: selectedPOS[0].definitions[0].definition,
            phonetics: selectedPOS[0].phonetics[0].text,
          }
        ],
        word: word,
      };
      handleUploadWords([payload]);
    }
  }, [selectedPOS]);

  const handleUploadWords = async (words: IWord[]) => {
    try {
      const isUploaded = await uploadWords(words);
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

  const getWordDetail = async () => {
    setError("");
    setSuccess("");
    const meaningList: IPartsOfSpeech[] = [];

    if (word.length) {
      setLoading(true);
      setError("");
      try {
        const wordsAPIData = await getWordDetails(word);
        console.log(wordsAPIData);

        const modal = document.getElementById(
          "meaning-modal"
        ) as HTMLDialogElement | null;

        if (wordsAPIData.length) {
          wordsAPIData.forEach((data: any) => {
            data.meanings.forEach((pos: IPartsOfSpeech) => {
              meaningList.push(pos);
            });
          });
          setWordDetails(meaningList.flat());
          modal?.showModal();
        } else {
          setError("No meanings found for the given word");
        }
      } catch (error) {
        setError("Word not found, please enter different word");
      }

      setLoading(false);
    } else {
      setError("Please enter the word");
    }
  };

  const getWordInput = (event: ChangeEvent<HTMLInputElement>) =>
    setWord(event.target.value);

  const handleCsvUpload = (data: any) => {
    console.log(data);
  }

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
                setJson={handleCsvUpload}
                validateHeaderList={["word"]}
                templatePath="/assets/words_template.csv"
                validateCSV={true}
                setError={setError}
              />
            </div>
          </div>
          <MeaningModal
            wordDetails={wordDetails}
            word={word}
            setSelectedPOS={setSelectedPOS}
          />
        </>
      )}
    </div>
  );
};

export default UploadNewWord;
