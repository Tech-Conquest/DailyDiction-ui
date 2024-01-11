import React from "react";
import Audio from "../audio/Audio";

const MeaningModal = () => {
  return (
    <dialog id="meaning-modal" className="modal">
      <div className="modal-box flex flex-col items-start">
        <h1 className="text-center w-full text-xl font-bold">Cacophony</h1>
        <div className="flex mt-2">
          <Audio hasAudio={false} />
          <p className="ml-2">{"/kəˈkɑfəni/"}</p>
        </div>
        <div className="flex mt-2">
          <h1 className="font-bold">Part of speech:</h1>
          <p className="ml-2 italic">noun</p>
        </div>
        <div className="flex mt-2">
          <h1 className="font-bold">Antonyms:</h1>
          <p className="ml-2">euphony,harmony</p>
        </div>
        <div className="flex mt-2">
          <h1 className="font-bold">Defintion:</h1>
          <p className="ml-2">A mix of discordant sounds; dissonance.</p>
        </div>
        <div className="flex justify-center w-full mt-5">
          <button className="btn btn-active btn-neutral">Add Word</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default MeaningModal;
