import React from 'react';
import Sidebar from './Sidebar';
import Expenses from './dashboard/Expenses';
import { Link, Switch } from "react-router-dom";
import { BrowserRouter, Router, Route, Redirect } from "react-router-dom";
import UserGroups from './Groups/UserGroup';
import './dashboard.css';

const Dashboard = (props)=>{
    return (
        <div className="container dashboard">
            <div className="row">
                <div className="col m3 sidebar">
                    <Sidebar/>
                </div>
                    <div className="col m9">
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
    )
}

export default Dashboard;