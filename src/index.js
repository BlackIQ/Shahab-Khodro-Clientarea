import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "src/App";
import "src/App.sass";

import allReducers from "src/redux/reducers";

import { saveState, loadState } from "src/redux/localstorage/localstorage";

const presentedState = loadState();

let store = createStore(
  allReducers,
  presentedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() =>
  saveState({
    user: store.getState().user,
  })
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
