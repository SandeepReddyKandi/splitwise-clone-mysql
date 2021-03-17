import React, {useState, useEffect} from 'react';
import UserBackendAPIService from '../../../services/UserBackendAPIService';

const ExpenseList = (list)=>{
    const [expList, setExpenseList] = useState([]);
    const [userInfo, setUserInfo] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        setExpenseList(list.recentActivities);
        console.log(list.recentActivities);
    })

    useEffect(() => {
        UserBackendAPIService.getUserDetails().then(({data, success})=>{
            console.log(data);
            setUserInfo(data);
            setUserName(data.name);
        });
    },[])
    

    return(
        <tbody>
            {
                expList.map((expense)=>{
                    return(
                        <tr key={expense.id} className="row valign-wrapper right-align">
                            <td className="col m4 right-align">
                                <img className="responsive-img" src="https://img.icons8.com/dusk/64/000000/us-dollar.png"/>
                            </td>
                            <td className="col m8 left-align">
                                <div className="row left-align">
                                    <p className="col m12 s12"><b>{expense.byUserName}</b> added <b>"{expense.description}"</b> in <b>"{expense.groupName}"</b></p>
                                    {
                                        expense.byUserName === userName ?
                                        (
                                            <p className="green-text col m12 s12 ">You get back {expense.currency} {expense.amount}</p>
                                        ):
                                        (
                                            <p className="orange-text col m12 s12 ">You owe {expense.currency} {-expense.amount}</p>
                                        )
                                    }
                                    <p className="">{expense.date}</p>
                                </div>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    )
}

export default ExpenseList;