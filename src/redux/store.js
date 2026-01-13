import { createStore, applyMiddleware } from "redux";
import { booksReducer } from "./reducer";
import thunk from "redux-thunk";

export const store = createStore(booksReducer, applyMiddleware(thunk));
