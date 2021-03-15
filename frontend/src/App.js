import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import login from "./components/login";
import signup from "./components/signUp";
import home from "./components/home";
import "./App.css";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './components/Dashboard/Dashboard';
import User from './components/Dashboard/User/User';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer/>
        <Route exact path="/" component={home}/>
        <Route path="/login" component={login}/>
        <Route path="/signup" component={signup}/>
        <Route exact path="/user" component={User}/>
        <Route path="/user/home" component={Dashboard}/>
        {/* <Route path="/user/home/newGroup" component={CreateNewGroup}/> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

