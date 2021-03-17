import React, {useEffect, useState} from 'react';
import { useSelector} from 'react-redux';
import ExpenseList from './ExpenseList';
import axios from 'axios';
import '../dashboard.css';
import {toast} from "react-toastify";
import {connect} from "react-redux";
import ExpenseBackendAPIService from '../../../services/ExpenseBackendAPIService';

const RecentActivityComponent = (props)=>{
    const {activities, token, userId} = useSelector(state => {
        return {
            activities: state.expenseState.recentActivities,
            token : state.userState.token,
            userId : state.userState.id
        }
    });

    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        ExpenseBackendAPIService.getRecentActivity().then(({data, success})=>{
            if(success){
                console.log('recent activity : ',data);
                setRecentActivities(data);
            }
        })
    },[]);    

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
                        recentActivities ? (
                            <div>
                                <table className="centered highlight expenses-list-table">
                                    {recentActivities.length ? <ExpenseList recentActivities={recentActivities} userId={userId}/> : <div>Loading...</div>}
                                </table>
                            </div>
                        ) : (
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

const mapDispatchToProps = (dispatch) =>{
    return {
      addRecentActivities: (state)=>{
        dispatch({
          type: "ADD_ACTIVITIES",
          payload: state
        });
      }
    };
  };

export default connect(null, mapDispatchToProps)(RecentActivityComponent);
