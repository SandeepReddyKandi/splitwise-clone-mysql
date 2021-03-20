import React from 'react';
import { useSelector, connect } from 'react-redux';
import Sidebar from './Sidebar';
import Expenses from './dashboard/Expenses';
import RecentActivity from './RecentActivity/RecentActivity';
import { Link, Switch } from "react-router-dom";
import { BrowserRouter, Router, Route, Redirect } from "react-router-dom";
import UserGroups from './Groups/UserGroup';
import User from './User/User';
import './dashboard.css';
import CreateNewGroup from './CreateNewGroup';
import Invites from './Groups/GroupInvites';

const Dashboard = (props)=>{
    const clearUserLoginInfo = ()=>{
        props.logout();
    }

    return (
        <div>
            <nav className="nav-wrapper teal accent-4 navbar">
                <div className="container">
                    <Link to="/" className="brand-logo black-text">
                        <button className="btn" onClick={clearUserLoginInfo}>Log Out</button>
                    </Link>
                    <ul className="right">
                        <li className="navbarBtnGrp">
                            <Link to="/user/home/" className="green-text text-darken-3">
                                <button className="btn teal">Home</button>
                            </Link>
                            <Link to="/user/home/invites">
                                <a class="btn-floating waves-light red"><i class="material-icons">add</i></a>
                            </Link>
                            <Link to="/user">
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
                                    <Route path="/user/home/groups/:id" component={UserGroups}/>
                                    <Route path="/user/home/recentactivity" component={RecentActivity}/>
                                    <Route path="/user/home/newGroup" component={CreateNewGroup}/>
                                    <Route path="/user/home/invites" component={Invites}/>
                                </div>
                            </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return{
        logout: () => {
            dispatch({
                type: 'LOG_OUT',
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(Dashboard);
