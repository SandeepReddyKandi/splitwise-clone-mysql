import React, {useState, useEffect} from 'react';
import { useSelector} from 'react-redux';
import { Switch, Route, Link, Redirect} from 'react-router-dom';
import ExpenseList from './ExpenseList';
import '../dashboard.css';
import Modal from './Modal';
import './Modal.css'
import "materialize-css/dist/css/materialize.min.css";
import axios from 'axios';

var groupName;
const UserGroups = (props)=>{
    const groups = useSelector(state => state.groupState);
    const groupId = props.match.params.id;

    const [groupExpenses, setGroupExpenses] = useState();
    const [users, getAllUsers] = useState();
    useEffect(()=>{
        // document.querySelector("#extraInfo").classList.add('vanish');
        // document.querySelector("#openDetailsLink").classList.remove('vanish');
        // document.querySelector("#closeDetailsLink").classList.add('vanish');

        const token = JSON.parse(localStorage.getItem('token'));

        // to get all the group expenses
        axios.get(`http://localhost:8000/expenses/all-group/${groupId}`,{
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            if(res.data.success){
                const expList = JSON.parse(res.data.data);
                console.log("exp List: ", expList);
                setGroupExpenses(expList);
                // groupExpenses = JSON.parse(res.data.data);
            }
        }).catch((err)=>{
            console.log(err);
        })

        // to get all the user
        axios.get(`http://localhost:8000/user/all`,{
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res =>{ 
            if(res.data.success){
                console.log("users List : ", res.data.data);
                getAllUsers(res.data.data);
            }
        }).catch(err=>{
            console.log(err);
        })
    },[]);
    

    return (
        <div className="container user-groups">  
            <div className="row">
                <div className="col m8 z-depth-1">
                    <div className="header row valign-wrapper grey lighten-2">
                        <div className="col m6 valign-wrapper">
                                <img className="responsive-img" srsc="https://img.icons8.com/flat-round/64/000000/home--v1.png"/>
                                <span className="center-align">HOME EXPENSES</span>
                        </div>
                        <div className="col m6 valign-wrapper expenseBtn">
                            <Modal groupId={groupId}/>
                        </div>
                    </div>
                    {
                        groupExpenses ?
                        (
                            (
                                <div>
                                    <table className="centered highlight expenses-list-table">  
                                        <tbody>
                                        {   
                                            groupExpenses.length ?
                                            (
                                                groupExpenses.map((expenses)=>{
                                                    return (
                                                        <ExpenseList expenselist={expenses} userList={users} key={expenses.id}/>
                                                    )
                                                })
                                            )
                                            :
                                            (
                                                <tr>
                                                    <td>No expenses made yet....</td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            )
                        ):
                        (
                            <div>Loading.....</div>
                        )
                    }
                </div>
                {/* <div className="col m4">
                    <div className="row">
                        <div className="col m12 s12 sidebar-header ">
                            <h6 className="grey-text">GROUP BALANCES</h6>
                        </div>
                        <div className="col m12 s12" id="main-list">
                            <ul className="collection users-collection" id="mainInfo">
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
                        <p id="openDetailsLink" className="contentLink row" onClick={()=>{
                            document.querySelector("#extraInfo").classList.toggle('vanish');
                            document.querySelector("#openDetailsLink").classList.toggle('vanish');
                            document.querySelector("#closeDetailsLink").classList.toggle('vanish');
                        }}><span className="col m12">view more >> </span></p>

                        <p id="closeDetailsLink" className="contentLink vanish row" onClick={()=>{
                            document.querySelector("#extraInfo").classList.toggle('vanish');
                            document.querySelector("#openDetailsLink").classList.toggle('vanish');
                            document.querySelector("#closeDetailsLink").classList.toggle('vanish');
                        }}><span className="col m12">X</span></p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default UserGroups;