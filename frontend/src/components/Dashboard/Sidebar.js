import React, {useState, useEffect} from 'react';
import { Link, Switch } from "react-router-dom";
import {useSelector} from 'react-redux';
import Dashboard from './Dashboard';
import './dashboard.css';
import CreateNewGroup from './CreateNewGroup';
import axios from 'axios';
import GroupBackendAPIService from "../../services/GroupBackendAPIService";

const Sidebar = ()=>{
    const [allGroups, setAllGroups] = useState([]);

    useEffect(()=>{
        GroupBackendAPIService.getAllGroups().then(({data, success})=>{
            if (success){
                setAllGroups(data.acceptedGroups);
            }
        });
    },[]);

    return(
        <div className="container sidebar">
            {/* dashboard header */}
            <div className="row dashboard-header">
                <Link to="/user/home/dashboard">
                    <div className="col m2">
                        <img className="circle responsive-img" src="https://img.icons8.com/fluent/48/000000/love-letter.png" alt="letter"/>
                    </div>
                    <div className="col m10 valign-wrapper">
                        <span className="grey-text text-darken-2 valign-wrapper">
                            Dashboard
                        </span>
                    </div>
                </Link>
            </div>

            {/* recent activity */}
            <div className="row recent-activity">
                <Link to="/user/home/recent-activity">
                    <div className="col m2 ">
                        <i className="fas fa-flag" />
                    </div>
                    <div className="col m10 valign-wrapper">
                        <span className="grey-text text-darken-2 valign-wrapper">
                            Recent activity
                        </span>
                    </div>
                </Link>
            </div>

            {/* side-bar group list */}
            <div className="row group-list">
                <div className="group-header grey lighten-3 left-align">
                    <p className="gery-text">GROUPS</p>
                    <div className="icon right-align">
                        <Link to="/user/home/newGroup">
                            <i className="fa fa-plus modal-trigger"/>
                            <span>Add</span>
                        </Link>
                    </div>
                </div>
                <ul className="collection">
                {
                    allGroups.map((group)=>{
                        return(
                            <li className="collection-item" key={group.id}>
                                <span>
                                    <i className="fas fa-bookmark"/>
                                </span>
                                <Link to={`/user/home/groups/${group.id}`}>
                                    <span>{group.name}</span>
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
