import React, { useEffect } from "react";
import CustomTable from "../../components/table/CustomTable";
import { getReviewWords } from "../../core/api/utils";
import { IWordsTable } from "../../core/interface/Words";

const ReviewWords = () => {
  const [reviewWords, setReviewWords] = React.useState([]);

  useEffect(() => {
    getWords();
  }, []);

  const getWords = async () => {
    const reviewWords = await getReviewWords();
    let formattedReviewWords: any = [];

    reviewWords.data.data.forEach((word: any, index: number) => {
      formattedReviewWords.push([
        index + 1,
        word.word,
        word.meaning,
        word.phonetics,
      ]);
    });
    setReviewWords(formattedReviewWords);
  };

  let data: IWordsTable = {
    headers: ["S#", "Word", "Meaning", "Phonetics", "Refresh", "Save"],
    body: reviewWords,
    buttons: [
      { text: "Refresh", color: "primary" },
      { text: "Save", color: "secondary" },
    ],
  };
  return (
    <>
      <h3 className="text-3xl font-bold text-white mt-20 ml-20">
        Review Words
      </h3>
      <div className="hero min-h-screen mt-5">
        <div className="hero-content flex-col justify-around w-full lg:flex-row">
          <CustomTable
            data={data}
            buttonClickCB={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
              row: any
            ) => console.log(row)}
          />
        </div>
      </div>
    </>
  );
};

export default ReviewWords;
