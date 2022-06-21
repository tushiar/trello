import {
  ADD_CARD,
  REMOVE_CARD,
  ADD_ITEM,
  REMOVE_ITEM,
  EDIT_ITEM,
  EDIT_TITLE,
  DROP_DRAG,
} from "../constants";

export const addCard = (payload) => {
  return {
    type: ADD_CARD,
    payload,
  };
};

export const removeCard = (payload) => {
  return {
    type: REMOVE_CARD,
    payload,
  };
};

export const addItem = (payload) => {
  return {
    type: ADD_ITEM,
    payload,
  };
};

export const removeItem = (payload) => {
  return { type: REMOVE_ITEM, payload };
};

export const editItem = (payload) => {
  return { type: EDIT_ITEM, payload };
};
export const editTitle = (payload) => {
  return { type: EDIT_TITLE, payload };
};

export const dragNDrop = (payload) => {
  return { type: DROP_DRAG, payload };
};
