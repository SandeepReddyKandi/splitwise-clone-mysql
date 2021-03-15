import React, {useEffect} from 'react';
import { useSelector} from 'react-redux';
import ExpenseList from './ExpenseList';
import axios from 'axios';
import '../dashboard.css';
import {toast} from "react-toastify";

const UserGroups = (props)=>{
    const storeData = useSelector(state => {
        return {
            activities: state.recentActivity.activity,
            token : state.auth.signupInfo.token
        }
    });

    const activities = storeData.activities;
    useEffect(() => {
        axios.get('http://localhost:8000/all',{
            Authorization:`Bearer ${storeData.token}`
        }).then((res)=>{
            console.log(res.data.data);

            if(res.data.success === true){
              toast.success("Recent activity successfully fetched !");

              this.props.userInfo(res.data.data);        // string user data to redux store
            }else{
              toast.error("Sign up first");
            }
          }).catch((err)=>{
            console.log(err);
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

const mapDispatchToProps = (dispatch) =>{
    return {
      userInfo: (state)=>{
        dispatch({
          type: "ADD_ACTIVITIES",
          payload: state
        });
      }
    };
  };

export default UserGroups;
