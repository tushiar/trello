import Home from "./Home";
import store from "./store";
import { Provider } from "react-redux";
import { cleanup, fireEvent, screen, render } from "@testing-library/react";
import React from "react";
import reducer from "./reducers/cardReducers";
import { ADD_CARD, REMOVE_CARD } from "./constants";
import Card from "./components/Card/Card";

afterEach(cleanup);

test("home renders the app without crashing", function () {
  render(
    <Provider store={store}>
      <Home>
        <Card/>
      </Home>
    </Provider>
  );
});

it.skip("should add multiple cards", function () {
  const arr = {
    cards: [
      {
        id: 1,
        title: "Change Title",
        items: [{ id: 1, value: "This is a new card" }],
      },

      {
        id: 2,
        title: "Change Title",
        items: [],
      },
    ],
  };
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  fireEvent.click(screen.getByTestId("add-btn"));
  const prevState = {
    cards: [
      {
        id: 1,
        title: "Change Title",
        items: [{ id: 1, value: "This is a new card" }],
      },
    ],
  };
  const obj = {
    title: "Change Title",
  };

  expect(reducer(prevState, { type: ADD_CARD, payload: obj })).toEqual(arr);
});

it("Card renders the app without crashing", function () {
  render(
    <Provider store={store}>
      <Home>
        <Card />
      </Home>
    </Provider>
  );
});

it("should delete a card", function () {
  const output = {
    cards: [
      {
        id: 1,
        title: "Change Title",
        items: [{ id: 1, value: "This is a new card" }],
      },
    ],
  };
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  fireEvent.click(screen.getByText("Delete"));
  const prevState = {
    cards: [
      {
        id: 1,
        title: "Change Title",
        items: [{ id: 1, value: "This is a new card" }],
      },
      {
        id: 2,
        title: "Change Title",
        items: [{ id: 1, value: "This is a new card" }],
      },
    ],
  };

  expect(reducer(prevState, { type: REMOVE_CARD, payload: { id: 2 } })).toEqual(
    output
  );
});



