import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./assets/css/reset.css"
import "./assets/js/rem"
import "antd-mobile/dist/antd-mobile.css/"
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
ReactDOM.render(

  <Provider store={store}>
    <HashRouter> <App /></HashRouter>
  </Provider>,

  document.getElementById('root')
);
