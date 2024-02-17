export interface IWordsTable {
  headers: string[];
  buttons: ITableButton[];
  body: string[][];
}

export interface ITableButton {
  text: string;
  color: string;
}

export interface IPartsOfSpeech {
  partOfSpeech: string;
  definition: string;
  antonyms: string[];
  synonyms: string[];
}

export interface IPhonetics {
  text: string;
  audio: string;
}

export interface IMeaning {
  partOfSpeeches: IPartsOfSpeech[];
  phonetics: IPhonetics[];
}

export interface IWord {
  meanings: IMeaning[];
  word: string;
}
