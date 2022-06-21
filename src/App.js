import React from "react";
import "./app.css";
import store from "./store";
import { Provider } from "react-redux";
import Home from "./Home";
const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
