export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const unsertUser = () => {
  return {
    type: "UNSET_USER",
  };
};
