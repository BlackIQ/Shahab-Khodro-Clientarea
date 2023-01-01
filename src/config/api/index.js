import axios from "axios";

import config from "src/config";
import urls from "src/config/api/urls";

const token = localStorage.getItem("token");

export const URLs = urls;
export const API = axios.create({
  baseURL: config.axiosBaseUrl,
  headers: {
    authorization: token && `Bearer ${token}`,
  },
});
