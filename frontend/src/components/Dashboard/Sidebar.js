import React from 'react';
import { Link, Switch } from "react-router-dom";
import {useSelector} from 'react-redux';
import Dashboard from './Dashboard';
import './dashboard.css';

const Sidebar = ()=>{
    const groups = useSelector(state => state.expenses);
    const groupsName = groups.groups;

    return(
        <div className="container sidebar">
            {/* dashboard header */}
            <div className="row dashboard-header">
                <div className="col m2">
                    <Link to="/user/home/dashboard">
                        <img className="circle responsive-img" src="https://img.icons8.com/fluent/48/000000/love-letter.png" alt="letter"/>
                    </Link>
                </div>
                <div className="col m10 valign-wrapper">
                    <span className="grey-text text-darken-2 valign-wrapper">
                        Dashboard
                    </span>
                </div>
            </div>

            {/* recent activity */}
            

            {/* side-bar group list */}
            <div className="group-list">
                <div className="group-header grey lighten-3 left-align">
                    <p className="gery-text">GROUPS</p>
                    <div className="icon right-align">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        <span>add</span>
                    </div>
                </div>
                <ul className="collection">
                {
                    groupsName.map((name)=>{
                        return(
                            <li className="collection-item">
                                <span>
                                    <i class="fas fa-bookmark"></i>
                                </span>
                                <Link to={{
                                    pathname: '/user/home/groups',
                                    groupName:{
                                        name: name
                                    }
                                }}>
                                    <a href="#!">{name}</a>
                                </Link>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;