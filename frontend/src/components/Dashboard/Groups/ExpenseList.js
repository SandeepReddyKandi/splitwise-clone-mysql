import React, { useState,useEffect} from 'react';
import { useSelector} from 'react-redux';
import axios from 'axios';
import UserBackendAPIService from '../../../services/UserBackendAPIService';

const ExpenseList = (props)=>{    
    const [expList, setExpList] = useState(props.expenselist);
    console.log('expense list',props.expenselist)
    const [userList, setUserList] = useState();
    const [payer, setPayer] = useState('');

    useEffect(() => {
        UserBackendAPIService.getAllUsers().then(({data, success})=>{
            if(success){
                // console.log('data : ', data);
                const user = data.filter((user)=>{
                    console.log(user, expList);
                    return String(user.id) === String(expList.byUser)
                });
                // console.log(user, expList);
                setPayer(user&&user[0] ? user[0].name : null);
            }
        });
    })

    return (
        <tr key={expList.id}>
            {console.log(expList)}
            <td>
                <div className="date">
                    <span className="month grey-text">{expList.createdAt ? expList.createdAt.substring(0, 10) : null }</span>
                    <span className="month grey-text">{expList.createdAt ? expList.createdAt.substring(11, 19) : null }</span>
                </div>
            </td>
            <td>{expList.description}</td>
            <td>
                <div className="date">
                        <span className="month grey-text">paid by</span>
                        <span className="month black-text"><p>{payer}</p></span>
                </div>
            </td>
            <td style={{border: "none"}}>{expList.currency} {expList.amount}</td>
        </tr>
    )
    
}

export default ExpenseList;
