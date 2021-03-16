import React, {useEffect} from 'react';
import { useSelector} from 'react-redux';
import ExpenseList from './ExpenseList';
import axios from 'axios';
import '../dashboard.css';
import {toast} from "react-toastify";
import {connect} from "react-redux";

const RecentActivityComponent = (props)=>{
    const {activities, token} = useSelector(state => {
        return {
            activities: state.expenseState.recentActivities,
            token : state.userState.token
        }
    });

    useEffect(() => {
        axios.get('http://localhost:8000/expenses/recent',{
            Authorization:`Bearer ${token}`
        }).then((res) => {
            if (res.data.success === true) {
              toast.success("Recent activity successfully fetched !");

              this.props.addRecentActivities(res.data.data);
            } else {
              toast.error(res.data.reason);
            }
          }).catch((err)=>{
            toast.error('Something went wrong, Please try again!');
          })
    },[])

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
                        activities ? (
                            <div>
                                <table className="centered highlight expenses-list-table">
                                    {activities.length ? <ExpenseList expenselist={activities}/> : <div>Loading...</div>}
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
