import Card from "../Card/Card";
import store from "../../store";
import { Provider } from "react-redux";
import { cleanup, fireEvent, screen, render, toHaveValue } from "@testing-library/react";
import React from "react";
import reducer from "../../reducers/cardReducers";
import Home from "../../Home";
import ValueCard from "./ValueCard";
import { REMOVE_ITEM } from "../../constants";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

it("Value card renders the app without crashing", function () {
  render(
    <Provider store={store}>
      <Home>
        <Card>
          <ValueCard />
        </Card>
      </Home>
    </Provider>
  );
});

it("should modify a task", function () {
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
  fireEvent.click(screen.getByTestId('edit-task'))
  const input = screen.getByTestId("task-editable");
  userEvent.type(input, "This is another task" );
  expect(screen.getByTestId("task-editable")).toHaveValue("This is another task");
//   expect(input).toHaveValue("This is another task")
});

it("should delete a task", function () {
  const output = {
    cards: [
      {
        id: 1,
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
  fireEvent.click(screen.getByTestId("delete-item"));
  const prevState = {
    cards: [
      {
        id: 1,
        title: "Change Title",
        items: [{ id: 1, value: "This is a new card" }],
      },
    ],
  };
  

  expect(
    reducer(prevState, { type: REMOVE_ITEM, payload: { cardId: 1, id: 1 } })
  ).toEqual(output);
});
