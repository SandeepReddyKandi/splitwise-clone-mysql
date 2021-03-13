import React from 'react';
import { useSelector} from 'react-redux';
import ExpenseList from './ExpenseList';
import '../dashboard.css';

const UserGroups = (props)=>{
    const groups = useSelector(state => state.recentActivity);
    const activities = groups.state.activity;

    // console.log("activities : ", groups.state.activity);

    return (
        <div className="container user-groups">
            <div className="row">
                <div className="col m8 z-depth-1">
                    <div className="header row valign-wrapper grey lighten-2">
                        <div className="col m12 valign-wrapper">
                            <span className="center-align">Recent activity</span>
                        </div>
                    </div>
                    {
                        activities ?
                        (
                            (
                                <div>
                                    <table className="centered highlight expenses-list-table">
                                    {   
                                        activities.length ?
                                        (
                                            <ExpenseList expenselist={activities}/>
                                        )
                                        :
                                        (
                                            <div>Loading...</div>
                                        )
                                    }
                                    </table>
                                </div>
                            )
                        ):
                        (
                            <div className="row container">
                                <div className="col m12 s12">
                                    No recent activity
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default UserGroups;