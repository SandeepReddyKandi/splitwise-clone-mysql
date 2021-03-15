import authReducer from "./authReducer";
import userExpenses from "./userExpenses";
import GroupExpences from "./GroupExpences";
import recentActivity from "./recentActivity";
import NewGroups from "./newGroups";;
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: userExpenses,
  groupExpenses : GroupExpences,
  recentActivity : recentActivity,
  newGroup : NewGroups
});

export default rootReducer;
