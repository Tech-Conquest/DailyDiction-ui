import React from "react";
import { HiSpeakerWave } from "react-icons/hi2";

const Audio = ({ text, hasAudio }: { text?: string; hasAudio: boolean }) => {

  const playAudio = () => {

    if (hasAudio && text) {

      let utterance = new SpeechSynthesisUtterance();

      utterance.text = text;
      utterance.voice = window.speechSynthesis.getVoices()[parseInt(process.env.REACT_APP_VOICEINDEX || "157")];

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div>
      <button onClick={playAudio}>
        <HiSpeakerWave className="text-2xl" />
      </button>
    </div>
  );
}

export default Audio;
