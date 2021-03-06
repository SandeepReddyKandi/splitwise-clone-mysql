import React, { useState,useEffect} from 'react';
import UserBackendAPIService from '../../../services/UserBackendAPIService';

const ExpenseList = (props)=>{    
    const [expList, setExpList] = useState(props.expenselist);
    const [userList, setUserList] = useState();
    const [payer, setPayer] = useState('');

    useEffect(() => {
        UserBackendAPIService.getAllUsers().then(({data, success})=>{
            if(success){
                const user = data.filter((user)=>{
                    return String(user.id) === String(expList.byUser)
                });
                setPayer(user&&user[0] ? user[0].name : null);
            }
        });
    })

    return (
        <tr key={expList.id}>
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
