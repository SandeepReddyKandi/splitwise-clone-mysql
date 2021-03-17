import React, { useState,useEffect} from 'react';
import { useSelector} from 'react-redux';
import axios from 'axios';
import UserBackendAPIService from '../../../services/UserBackendAPIService';

const ExpenseList = (props)=>{    
    const [expList, setExpList] = useState(props.expenselist);
    const [userList, setUserList] = useState();
    const [payer, setPayer] = useState('');

    useEffect(() => {
        setExpList(props.expenselist);
        UserBackendAPIService.getAllUsers().then(({data, success})=>{
            if(success){
                // console.log('data : ', data);
                const user = data.filter((user)=>{
                    return user.id === expList.byUser
                });
                setPayer(user[0].name);
            }
        });
    })

    return(
        <tr key={expList.id}>
            <td>
                <div className="date">
                    <span className="month grey-text">{expList.createdAt.substring(0, 10)}</span>
                    <span className="month grey-text">{expList.createdAt.substring(11, 19)}</span>
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
