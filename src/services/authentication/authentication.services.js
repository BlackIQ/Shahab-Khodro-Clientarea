import { API, URLs } from "src/config/api";

const { auth } = URLs;

export const login = async (body) => {
  try {
    const response = await API.post(auth.login, body);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const register = async (body) => {
  try {
    const response = await API.post(auth.register, body);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
