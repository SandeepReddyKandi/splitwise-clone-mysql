import React from 'react';
import { Link, Switch } from "react-router-dom";
import Dashboard from './Dashboard';
import './dashboard.css';

const Sidebar = ()=>{
    return(
        <div className="container sidebar">
            <div className="row dashboard-icon">
                <div className="col m2">
                    <Link to="/user/home/dashboard">
                        <img className="circle responsive-img" src="https://img.icons8.com/fluent/48/000000/love-letter.png" alt="letter"/>
                    </Link>
                </div>
                <div className="col m10 valign-wrapper">
                    <span className="black-text valign-wrapper" style={{ marginTop: "10px" }}>
                        Dashboard
                    </span>
                </div>
            </div>
            <div className="row">
                <Link to={{
                    pathname: '/user/home/groups',
                    groupName:{
                        name: "Four People One House"
                    }
                }}>
                    <button className="btn btn-primary">user</button>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar;