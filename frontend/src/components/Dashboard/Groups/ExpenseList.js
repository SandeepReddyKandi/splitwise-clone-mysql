import React from 'react';

const ExpenseList = (list)=>{
    const expList = list.expenselist;
    // console.log("m : ", list.expenselist);
    return(
        <tbody>
            {
                expList.map((expense)=>{
                    return(
                        <tr key={expense.id}>
                            <td>
                                <div className="date">
                                    <span className="month grey-text">{expense.date.month}</span>
                                    <span className="day grey-text">{expense.date.day}</span>
                                </div>
                            </td>
                            <td>{expense.expenseName}</td>
                            <td>{expense.payer}</td>
                            <td style={{border: "none"}}>USD {expense.cost}</td>
                        </tr>
                    )
                })
            }
        </tbody>
    )
}

export default ExpenseList;