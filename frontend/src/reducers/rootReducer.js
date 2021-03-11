import authReducer from "./authReducer";
import userExpenses from "./userExpenses";
import GroupExpences from "./GroupExpences";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: userExpenses,
  groupExpenses : GroupExpences
});

export default rootReducer;
