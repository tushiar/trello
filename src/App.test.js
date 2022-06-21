import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import React from "react"
it("renders the app without crashing", function () {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
