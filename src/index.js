import RootReducer from "./store/rootreducer";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Router2 from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { Router } from "react-router";

const store = createStore(
  RootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    <Router2 />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
