import React from 'react';

const ExpenseList = ({expense})=>{
    // console.log("m : ", expense);
    return(
        <tbody className="center-align text-center">
            <tr>
                <td>{expense.date}</td>
                <td>{expense.expenseName}</td>
                <td>{expense.payer}</td>
                <td>USD {expense.cost}</td>
            </tr>
        </tbody>
    )
}

export default ExpenseList;