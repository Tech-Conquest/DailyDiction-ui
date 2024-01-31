import { EStatusCode } from "../enums/response.enum";
import { IParsedJSON } from "../interface/ParsedJson";
import { IUser } from "../interface/User";
import { IUploadWord } from "../interface/uploadWord";
import { apiInstance, dailyDictionServerInstance } from "./api";
import { BULK_UPLOAD, UPLOAD_WORD, USER_LOGIN, USER_SIGNUP, WORDS, WORD_ENTRIES } from "./endpoint";

export const getWordDetails = async (word: string) => {
  const wordData = await apiInstance.get(`${WORD_ENTRIES}${word}`);

  return wordData.data;
};

export const bulkUploadWords = async (bulkUploadWords: IParsedJSON[]) => {
  const isUploaded = await dailyDictionServerInstance.post(
    `${BULK_UPLOAD}`,
    bulkUploadWords
  );
  return isUploaded;
};

export const uploadNewWord = async (uploadWordData: IUploadWord) => {
  const isUploaded = await dailyDictionServerInstance.post(
    `${UPLOAD_WORD}`,
    uploadWordData
  );
  return isUploaded;
};

export const getTodaysWords = async () => {
  const todaysWords = await dailyDictionServerInstance.get(
    `${WORDS}`
  );
  return todaysWords;
};

export const authenticateUser = async (loginDetails: IUser) => {
  try {
    const authenticationResult = await dailyDictionServerInstance.post(
      `${USER_LOGIN}`,
      loginDetails
    );

    if (authenticationResult.status === EStatusCode.BAD_REQUEST) {
      return {
        status: "failure",
        message: "Username or Password is incorrect!",
      };
    } else {
      return {
        status: "success",
        message: "Authentication Successfull",
      };
    }
  } catch (err) {
    if (err.response.status === EStatusCode.UNAUTHORIZED) {
      return {
        status: "failure",
        message: "Username or Password is incorrect!",
      };
    } else {
      return {
        status: "failure",
        message: "Something went wrong , please try again!",
      };
    }
  }
};

export const userCreation = async (userDetails: IUser) => {
  try {
    const userCreationResult = await dailyDictionServerInstance.post(
      `${USER_SIGNUP}`,
      userDetails
    );
    if (userCreationResult.status === EStatusCode.BAD_REQUEST) {
      return {
        status: "failure",
        message: "Please provide all the details!",
      };
    } 
    else{
      return {
        status: "success",
        message: "User created successfully"
      };
    }
  } catch (err) {
    if (err.response.status === EStatusCode.CONFLICT) {
      return {
        status: "failure",
        message: "Username already exists, please try again with different name",
      };
    } else {
      return {
        status: "failure",
        message: "Something went wrong , please try again!",
      };
    }
  }
};
