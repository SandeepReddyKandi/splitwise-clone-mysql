import userReducer from "./userReducer";
import expenseReducer from "./expenseReducer";
import groupReducer from "./GroupReducer";
import NewGroups from "./newGroups";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  userState: userReducer,
  expenseState: expenseReducer,
  groupState : groupReducer,
  newGroup : NewGroups
});

export default rootReducer;
