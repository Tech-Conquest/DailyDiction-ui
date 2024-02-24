import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import Audio from "../audio/Audio";
import { ESpeechSelection } from "../../core/enums/btnState.enum";
import { IPartsOfSpeech } from "../../core/interface/Words";

interface MeaningModalProps {
  word: string;
  wordDetails: any[];
  setSelectedPOS: Dispatch<SetStateAction<IPartsOfSpeech[]>>;
}

const MeaningModal = ({
  word,
  wordDetails,
  setSelectedPOS,
}: MeaningModalProps) => {

  const [posList, setPOSList] = useState<any[]>([]);
  const buttonRefs = useRef<HTMLButtonElement[]>([]);

  const handleMeaningList = (index: number, wordDetailsList: IPartsOfSpeech) => {
    const buttonText = buttonRefs.current[index].innerText;

    if (buttonText === ESpeechSelection.ADD_SPEECH) {
      const tempMeaningData: any = {
        partOfSpeech: wordDetailsList.partOfSpeech,
        Definition: wordDetailsList.definitions[0].definition,
      };

      const updatedMeaningList = [...posList];
      updatedMeaningList.splice(index, 0, tempMeaningData);
      setPOSList(updatedMeaningList);
    } else {
      const updatedMeaningList = [...posList];
      updatedMeaningList.splice(index, 1);
      setPOSList(updatedMeaningList);
    }

    buttonRefs.current[index].innerText =
      buttonRefs.current[index].innerText === ESpeechSelection.ADD_SPEECH
        ? ESpeechSelection.REMOVE_SPEECH
        : ESpeechSelection.ADD_SPEECH;
  };

  const resetButtonRefs = () => {
    buttonRefs.current.forEach((buttonRef) => {
      if (buttonRef) {
        buttonRef.textContent = ESpeechSelection.ADD_SPEECH;
      }
    });
  };
  return (
    <dialog id="meaning-modal" className="modal">
      <div className="modal-box flex flex-col items-start">
        <div className="flex">
          <h1 className="text-center w-full text-2xl font-bold">
            {word?.toUpperCase()}
          </h1>
          <div className="ml-2 mt-1">
            <Audio text={word} hasAudio={true} />
          </div>
        </div>

        {wordDetails.length  && (
          <div className="carousel rounded-box w-96">
            {wordDetails.map((wordDetailsList: any, index: number) => (
              <div
                className="carousel-item w-full flex flex-col justify-center"
                key={index}
              >
                <div className="flex mt-2 w-96">
                  <h1 className="font-bold">Part of speech:</h1>
                  <p className="ml-2 italic">{wordDetailsList.partOfSpeech}</p>
                </div>
                <div className="flex mt-2 w-96">
                  <h1 className="font-bold">Definition:</h1>
                  <p className="ml-2">
                    {wordDetailsList.definitions[0].definition}
                  </p>
                </div>
                <div className="flex  w-96 mt-3">
                  <button
                    className={`btn btn-primary p-0 py-2 px-6 text-white bg-slate-700 hover:bg-slate-500 border-none btn-${index}`}
                    ref={(ref) =>
                      (buttonRefs.current[index] = ref as HTMLButtonElement)
                    }
                    onClick={() => handleMeaningList(index, wordDetailsList)}
                  >
                    {ESpeechSelection.ADD_SPEECH}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="modal-action m-0 flex justify-end w-96">
          <form method="dialog">
            <button
              className="btn bg-slate-700 text-white hover:bg-slate-700"
              onClick={() => {
                setSelectedPOS(posList);
                setPOSList([])
                resetButtonRefs()
              }}
            >
              Add word
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default MeaningModal;
