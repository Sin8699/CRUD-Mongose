import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import socketIOClient from "socket.io-client";
import { Provider } from "react-redux";
import reducer from "./reducer";
import { createStore } from "redux";
export const socket = socketIOClient("localhost:1212");

var store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
