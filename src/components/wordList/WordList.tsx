import React, { Dispatch, SetStateAction } from "react";

const WordList = ({
  wordList,
  selectedWord,
  setSelectedWord
}: {
  wordList: string[]
  selectedWord:string,
  setSelectedWord:Dispatch<SetStateAction<string>>
}) => {
 

  return (
    <div className="card-body w-96 rounded-md he-600 p-4">
      <h2 className="card-title justify-center">Today's 10 Words</h2>
      <ul>
        {wordList.length &&
          wordList.map((word: string, index: number) => (
            <li
              key={index}
              className={`p-2 bg-white ${
                selectedWord === word && "list-active"
              } cursor-pointer word-list`}
              onClick={() => setSelectedWord(word)}
            >
              {word}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default WordList;
