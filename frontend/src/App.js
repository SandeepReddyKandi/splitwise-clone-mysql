import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import login from "./components/login";
import signup from "./components/signUp";
import home from "./components/home";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './components/Dashboard/Dashboard';
import Expenses from './components/Dashboard/dashboard/Expenses';
import UserGroups from './components/Dashboard/Groups/UserGroup';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer/>
        <Route exact path="/" component={home}/>
        <Route path="/login" component={login}/>
        <Route path="/signup" component={signup}/>
        <Route path="/user/home" component={Dashboard}/>
        {/* <Route path="/user/home/dashboard" component={Dashboard}/>
        <Route path="/user/home/groups" component={Dashboard}/> */}
        {/* <Route exact path="/user/home" component={Expenses}/>
        <Route path="/user/home/dashboard" component={Expenses}/>
        <Route path="/user/home/groups" component={UserGroups}/> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
 
