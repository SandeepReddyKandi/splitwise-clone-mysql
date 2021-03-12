import React from 'react';
import Sidebar from './Sidebar';
import Expenses from './dashboard/Expenses';
import { Link, Switch } from "react-router-dom";
import { BrowserRouter, Router, Route, Redirect } from "react-router-dom";
import UserGroups from './Groups/UserGroup';
import './dashboard.css';

const Dashboard = (props)=>{
    return (
        <div>
            <nav className="nav-wrapper teal accent-4 navbar">
                <div className="container">
                    <Link to="/" className="brand-logo black-text">
                        <img className="responsive-img" src="https://img.icons8.com/fluent/48/000000/love-letter.png" alt="letter" style={{ marginTop: "10px" }}/>
                    </Link>
                    <ul className="right">
                        <li className="navbarBtnGrp">
                            <Link to="/user/home/" className="green-text text-darken-3">
                                <button className="waves-effect waves-light btn">Home</button>
                            </Link>
                            <Link to="#">
                                <span>
                                    <i className="fas fa-user"></i>   
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container dashboard">
                <div className="row">
                    <div className="col m3 sidebar">
                        <Sidebar/>
                    </div>
                    <div className="col m9 main-display">
                        <Switch>
                            <div className="dsh">
                                <Route exact path="/user/home" component={Expenses}/>
                                <Route path="/user/home/dashboard" component={Expenses}/>
                                <Route path="/user/home/groups" component={UserGroups}/>
                            </div>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;