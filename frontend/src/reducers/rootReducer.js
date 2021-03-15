import userReducer from "./userReducer";
import expenseReducer from "./expenseReducer";
import groupReducer from "./GroupReducer";
import NewGroups from "./newGroups";
import allGroups from './totalGroups';
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  userState: userReducer,
  expenseState: expenseReducer,
  groupState : groupReducer,
  newGroup : NewGroups,
  allGroups: allGroups
});

export default rootReducer;
