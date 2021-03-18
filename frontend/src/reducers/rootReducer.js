import userReducer from "./userReducer";
import expenseReducer from "./expenseReducer";
import groupReducer from "./GroupReducer";
import clearStoreData from "./clearStoreData";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  userState: userReducer,
  expenseState: expenseReducer,
  groupState : groupReducer,
  clearStore: clearStoreData
});

export default rootReducer;
