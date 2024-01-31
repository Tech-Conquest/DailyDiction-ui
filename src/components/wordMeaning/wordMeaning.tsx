import React from "react";

import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";

import Audio from "../audio/Audio";
import { IMeaningList } from "../../core/interface/MeaningList";
import Chip from "../chip/Chip";

const WordMeaning = ({ wordDetails }: any) => {
  return (
    <div className="bg-white he-600 w-600 rounded-3xl p-5">
      <div className="flex">
        <h1 className="font-bold">{wordDetails.word.toUpperCase()}</h1>
        <div className="ml-2">
          <Audio text={wordDetails.word} hasAudio={true} />
        </div>
      </div>
      {wordDetails?.speechList?.length ? (
        <>
          {wordDetails.speechList.map((speech: IMeaningList, index: number) => {
            return (
              <div className="flex flex-col mt-4">
                <div className="flex">
                  <b>PartsOfSpeech:</b>
                  <p className="ml-2 italic">{speech.partOfSpeech}</p>
                </div>
                <div className="flex mt-1">
                  <b>Defintion: </b>
                  <p className="ml-2">{speech.Definition}</p>
                </div>
              </div>
            );
          })}
        </>
      ) : null}
      {wordDetails?.meaning ? (
        <div className="flex">
          <b>Meaning:</b> <p className="ml-2">{wordDetails?.meaning}</p>
        </div>
      ) : null}
      <div className="mt-2">
       <textarea className="text-area" placeholder="Enter your example"></textarea>
       <div>
        <button className="btn btn-sm bg-amber-500 text-white hover:bg-amber-500">Submit Example</button>
       </div>
      </div>
      <div className="vote flex items-center mt-5">
        <button className="flex items-center">
          <MdOutlineThumbDown className="text-red-400" />
          <p className="ml-1">0</p>
        </button>
        <button className="ml-2 flex items-center">
          <MdOutlineThumbUp className="text-green-400" />
          <p className="ml-1">0</p>
        </button>
      </div>
      <div className="flex w-56 justify-between mt-5">
        <Chip text={"Frequently"} color="orange" />
        <Chip text={"Sometimes"} color="green" />
        <Chip text={"Rarely"} color="red" />
      </div>
    </div>
  );
};

export default WordMeaning;
