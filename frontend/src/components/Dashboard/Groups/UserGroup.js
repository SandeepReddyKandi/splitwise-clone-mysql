import React, {useState, useEffect} from 'react';
import { useSelector} from 'react-redux';
import { Switch, Route, Link, Redirect} from 'react-router-dom';
import ExpenseList from './ExpenseList';
import '../dashboard.css';

const UserGroups = (props)=>{
    const groupName = props.location.groupName;
    const groups = useSelector(state => state.groupExpenses);
    const expList = groups.groups[0].expenses;
    const userExpenses = groups.totalExpenses;
    const showUsers = userExpenses.slice(0, 1);
    const remainingUsers = userExpenses.slice(1, userExpenses.length);

    // console.log(props.location);

    return (
        <div className="container user-groups">
            <div className="row">
                <div className="col m8 z-depth-1">
                    <div className="header row valign-wrapper grey lighten-2">
                        <div className="col m6 valign-wrapper">
                                <img className="responsive-img" src="https://img.icons8.com/flat-round/64/000000/home--v1.png"/>
                                <span className="center-align">HOME EXPENSES</span>
                        </div>
                        <div className="col m6 valign-wrapper expenseBtn">
                            <button className="btn orange orange darken-4">Add an expense</button>
                        </div>
                    </div>
                    <table className="centered highlight expenses-list-table">
                    {   
                        expList.length ?
                        (
                            <ExpenseList expenselist={expList}/>
                        )
                        :
                        (
                            <div>Loading...</div>
                        )
                    }
                    </table>
                </div>
                <div className="col m4">
                    <div className="row">
                        <div className="col m12 s12 sidebar-header ">
                            <h6 className="grey-text">GROUP BALANCES</h6>
                        </div>
                        <div className="col m12 s12" id="main-list">
                            <ul className="collection users-collection">
                                {
                                    showUsers.length ?
                                    (
                                        showUsers.map((usr) =>{
                                            return (
                                                <li className="collection-item">
                                                    <div className="row valign-wrapper" style={{marginBottom: "0px"}}>
                                                        <img className="col m3" src="https://img.icons8.com/fluent/50/000000/user-male-circle.png"/>
                                                        <div className="col m9 left-align">
                                                            <h6 style={{marginBottom: "0px"}}>{usr.user}</h6>
                                                            {
                                                                usr.amt > 0 ? 
                                                                    <p className="orange-text" style={{marginTop: "0px"}}>Owes USD {usr.amt}</p> : 
                                                                    <p className="green-text" style={{marginTop: "0px"}}>Owes USD {-usr.amt}</p>
                                                            }
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    ):
                                    (
                                        <div>Loading...</div>
                                    )
                                }
                            </ul>
                            <ul className="collection users-collection vanish" id="extraInfo">
                                {
                                    remainingUsers.length ?
                                    (
                                        remainingUsers.map((usr) =>{
                                            return (
                                                <li className="collection-item">
                                                    <div className="row valign-wrapper" style={{marginBottom: "0px"}}>
                                                        <img className="col m3" src="https://img.icons8.com/fluent/50/000000/user-male-circle.png"/>
                                                        <div className="col m9 left-align">
                                                            <h6 style={{marginBottom: "0px"}}>{usr.user}</h6>
                                                            {
                                                                usr.amt > 0 ? 
                                                                    <p className="orange-text" style={{marginTop: "0px"}}>Owes USD {usr.amt}</p> : 
                                                                    <p className="green-text" style={{marginTop: "0px"}}>Owes USD {-usr.amt}</p>
                                                            }
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    ):
                                    (
                                        <div>Loading...</div>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="view-details">
                        <a href="#" id="openDetailsLink" className="contentLink row" onClick={()=>{
                            document.querySelector("#extraInfo").classList.toggle('vanish');
                            document.querySelector("#openDetailsLink").classList.toggle('vanish');
                            document.querySelector("#closeDetailsLink").classList.toggle('vanish');
                        }}><span className="col m12 center-align">view more...</span></a>

                        <a href="#" id="closeDetailsLink" className="contentLink vanish row" onClick={()=>{
                            document.querySelector("#extraInfo").classList.toggle('vanish');
                            document.querySelector("#openDetailsLink").classList.toggle('vanish');
                            document.querySelector("#closeDetailsLink").classList.toggle('vanish');
                        }}><span className="col m12 center-align">close</span></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserGroups;