import { EStatusCode } from "../enums/response.enum";
import { IUser } from "../interface/User";
import { IWord } from "../interface/Words";
import { apiInstance, dailyDictionServerInstance } from "./api";
import {
  USER_LOGIN,
  USER_SIGNUP,
  WORDS,
  WORD_ENTRIES,
} from "./endpoint";

export const getWordDetails = async (word: string) => {
  const wordData = await apiInstance.get(`${WORD_ENTRIES}${word}`);

  return wordData.data;
};

export const uploadWords = async (words: IWord[]) => {
  const isUploaded = await dailyDictionServerInstance.post(
    `${WORDS}`,
    words
  );
  return isUploaded;
};

export const getTodaysWords = async () => {
  const todaysWords = await dailyDictionServerInstance.get(`${WORDS}`);
  return todaysWords;
};

export const getReviewWords = async () => {
  const reviewWords = await dailyDictionServerInstance.get(`${WORDS}`, {
    params: { type: "REVIEW" },
  });
  return reviewWords;
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
    } else {
      return {
        status: "success",
        message: "User created successfully",
      };
    }
  } catch (err) {
    if (err.response.status === EStatusCode.CONFLICT) {
      return {
        status: "failure",
        message:
          "Username already exists, please try again with different name",
      };
    } else {
      return {
        status: "failure",
        message: "Something went wrong , please try again!",
      };
    }
  }
};
