import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MyRouter from "./router";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MyRouter />
      </BrowserRouter>
    </Provider>
  );
}
