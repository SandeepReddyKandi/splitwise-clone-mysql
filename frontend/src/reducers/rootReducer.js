import authReducer from "./authReducer";
import userExpenses from "./userExpenses";
import GroupExpences from "./GroupExpences";
import recentActivity from "./recentActivity";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: userExpenses,
  groupExpenses : GroupExpences,
  recentActivity : recentActivity
});

export default rootReducer;
