import RootReducer from "./store/rootreducer"
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux"
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import Router2 from "./router";
// import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(RootReducer);
ReactDOM.render(
    <Provider store={store}>
      <Router2 />
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();