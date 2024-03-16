import { createStore, applyMiddleware } from "redux";
import reducers from "./Reducers/CombineReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

const myStore = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))


export default myStore