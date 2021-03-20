import userReducer from "./userReducer";
import expenseReducer from "./expenseReducer";
import groupReducer from "./GroupReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  userState: userReducer,
  expenseState: expenseReducer,
  groupState : groupReducer,
});

export default rootReducer;
