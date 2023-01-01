const env = process.env;

const config = {
  axiosBaseUrl: env.REACT_APP_BACKEND_URL,
  localstorage: env.REACT_APP_REDUX_STORAGE,
};

export default config;
