import authReducer from "./authReducer";
import userExpenses from "./userExpenses";
import GroupExpences from "./groupExpences";
import recentActivity from "./recentActivity";
import NewGroups from "./newGroups";;
import allGroups from './totalGroups';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: userExpenses,
  groupExpenses : GroupExpences,
  recentActivity : recentActivity,
  newGroup : NewGroups,
  allGroups: allGroups
});

export default rootReducer;
