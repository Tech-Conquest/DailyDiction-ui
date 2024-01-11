import { IParsedJSON } from "../interface/ParsedJson";
import { apiInstance, dailyDictionServerInstance } from "./api";
import { BULK_UPLOAD, WORD_ENTRIES } from "./endpoint";

export const getWordDetails = async (word: string) => {
  const wordData = await apiInstance.get(`${WORD_ENTRIES}${word}`);

  return wordData.data;
};

export const bulkUploadWords = async (bulkUploadWords:IParsedJSON[]) => {
     const isUploaded = await dailyDictionServerInstance.post(`${BULK_UPLOAD}`,bulkUploadWords)
     return isUploaded;
}
