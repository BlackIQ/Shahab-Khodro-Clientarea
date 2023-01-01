import { combineReducers } from "redux";

import user from "./user/user.reducer";

const allReducers = combineReducers({
  user: user,
});

export default allReducers;
