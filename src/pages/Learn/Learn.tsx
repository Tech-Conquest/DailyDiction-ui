/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getTodaysWords } from "../../core/api/utils";
import WordList from "../../components/wordList/WordList";
import WordMeaning from "../../components/wordMeaning/wordMeaning";

const Learn = () => {

  const [todaysWords, setTodaysWords] = useState([]);
  const [error, setError] = useState<Boolean>(false);
  const [wordList, setWordList] = useState<string[]>([]);
  const [selectedWordDetails, setSelectedWordDetails] = useState();
  const [selectedWord, setSelectedWord] = useState<string>("");

  useEffect(() => {
    getWords();
  }, []);

  const getWords = async () => {
    try {
      let todaysWords = await getTodaysWords();
      if (todaysWords.data.status === "success") {
        const wordListData = todaysWords.data.data;
        setTodaysWords(wordListData);
        let wordList = wordListData.map((data: any) => data.word);
        setWordList(wordList);
        setSelectedWord(wordList[0]);
      }
    } catch (error) {
      setError(true);
    }
  };

  const getSelectedWordDetails = (word: string) => {
    let currentWordDetails = todaysWords.find(
      (data: any) => data.word === word
    );
    setSelectedWordDetails(currentWordDetails);
  };

  useEffect(() => {
    getSelectedWordDetails(selectedWord);
  }, [todaysWords, selectedWord]);

  return (
    <div className="w-full h-screen py-20 px-24 flex items-center">
      {selectedWord && selectedWordDetails && (
        <div className="flex items-center w-full">
          <div className="w-96">
            <WordList wordList={wordList} selectedWord={selectedWord} setSelectedWord={setSelectedWord} />
          </div>
          <div >
            <WordMeaning wordDetails={selectedWordDetails} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Learn;
