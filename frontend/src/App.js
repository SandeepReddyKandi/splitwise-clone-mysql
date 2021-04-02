import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";
import home from "./components/home";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Dashboard from './components/Dashboard/Dashboard';
import User from './components/Dashboard/User/User';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer/>
        <Route exact path="/" component={home}/>
        <Route path="/login" component={LoginComponent}/>
        <Route path="/signup" component={SignUpComponent}/>
        <Route exact path="/user" component={() => {
            return (
                <ProtectedRoute>
                    <User />
                </ProtectedRoute>
            )
        }}/>
        <Route path="/user/home" component={() => {
          return (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
          )
        }}/>
        {/* <Route path="/user/home/new-group" component={CreateNewGroup}/> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

