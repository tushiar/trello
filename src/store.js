import rootReducers from "./reducers";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
const initialState = {};
const middleware = [thunk]
const store = createStore(rootReducers, initialState, applyMiddleware(...middleware));

export default store;
