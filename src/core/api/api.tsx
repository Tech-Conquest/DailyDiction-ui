import axios from 'axios';

const URI = process.env.REACT_APP_ENVIRONMENT === "Development" ? "http://localhost:4001" : process.env.REACT_APP_API_BASE_URL

const createApiInstance = (baseURL:string) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return instance;
};

export const apiInstance = createApiInstance(process.env.REACT_APP_EXTERNAL_WORDS_API || "");

export const dailyDictionServerInstance = createApiInstance(`${URI}`);
