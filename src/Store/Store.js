import { createStore } from "redux";
import reducers from "./Reducers/CombineReducer";
// import { composeWithDevTools } from "redux-devtools-extension";

const myStore = createStore(reducers)


export default myStore