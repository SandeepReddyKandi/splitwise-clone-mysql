import React, {useEffect, useState} from 'react';
import { useSelector} from 'react-redux';
import Recieve from './Recieve';
import Give from './GivePayment';
import Modal from './Modal';
import '../dashboard.css';
import './Modal.css'
import "materialize-css/dist/css/materialize.min.css";
import axios from 'axios';
import ExpenseBackendAPIService from "../../../services/ExpenseBackendAPIService";
import UserBackendAPIService from "../../../services/UserBackendAPIService";

const Expenses = (props)=>{
    const {recieve, pay} = useSelector(state => {
        return {
            recieve: state.expenseState.recieve,
            pay: state.expenseState.recieve,
            token : state.userState.token
        }
    });

    const [userId, setUserId] = useState();
    const [userExpenses, setUserExpenses] = useState();
    const [allBalance, setBalance] = useState();

    useEffect(() => {
        UserBackendAPIService.getUserDetails().then(({data, success})=>{
            console.log(data);
            setUserId(data.id);
        });
    },[])

    // useEffect(()=>{
    //     ExpenseBackendAPIService.getUserBalanceByUserId(userId).then(({data, success})=>{
    //         if(success){
    //             setUserExpenses(data);
    //         }
    //     })
    // },[])

    useEffect(()=>{
        ExpenseBackendAPIService.getAllExpenses().then(({data, success})=>{
            if(success){
                console.log('all expenses : ',data);
                setBalance(data);
            }
        })
    },[])

    return (
        <div className="container expenses row z-depth-2">
            <nav className="col m12 grey lighten-3 z-depth-0">
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo black-text text-lighten-3">Dashboard</a>
                    <ul id="nav-mobile" className="right">
                        <li className="btnGrp">
                            <a href="#" className="btn orange darken-3">Add a bill</a>
                            <a className=" btn modal-trigger" data-target="modal1">Settle</a>
                            <Modal/>
                        </li>
                    </ul>
                </div>
            </nav>

            <table className="col m12 highlight centered grey lighten-3">
                <tbody>
                    <tr>
                        <td>
                            <div className="user-exp user-total">
                                <p className="grey-text lighten-2">total balance</p>
                                <span className="green-text">+$80.24</span>
                            </div>
                        </td>
                        <td>
                            <div className="user-exp user-total">
                                <p className="grey-text lighten-2">you owe</p>
                                <span className="green-text">+$0.24</span>
                            </div>
                        </td>
                        <td>
                            <div className="user-exp user-total">
                                <p className="grey-text lighten-2">you are owed</p>
                                <span className="green-text">+$80.24</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="col m12">
                <div className="row valign-wrappe center-align amtList">
                    <div className="col m6 payingList">
                        <h5 className="grey-text left">YOU OWE</h5>
                        {
                            pay.length ?
                            (
                                pay.map((payment)=>{
                                    return(
                                        <Give paymentList={payment} key={payment.id}/>
                                    )
                                })
                            )
                            :
                            (
                                <div className="container emptyList row valign-wrapper center-align">
                                    <h5 className="col s12 m12 grey-text emptyText">List is empty</h5>
                                </div>
                            )
                        }
                    </div>
                    <div className="col m6 recievingList">
                        <h5 className="grey-text right">YOU ARE OWED</h5>
                        {
                            recieve.length ?
                            (
                                recieve.map((payment)=>{
                                    return(
                                        <Recieve paymentList={payment} key={payment.id}/>
                                    )
                                })
                            )
                            :
                            (
                                <div className="container emptyList row valign-wrapper center-align">
                                    <h5 className="col s12 m12 grey-text emptyText">List is empty</h5>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Expenses;
