import React from 'react';

const ExpenseList = (list)=>{
    const expList = list.expenselist;
    return(
        <tbody>
            {
                expList.map((expense)=>{
                    return(
                        <tr key={expense.id} className="row valign-wrapper center-align">
                            <td className="col m2">
                                <img className="responsive-img" src={expense.imgSrc}/>
                            </td>
                            <td className="col m10">
                                <div className="row">
                                    <p className="col m12 s12"><b>{expense.name}</b> added <b>"{expense.expensesItem}"</b> in <b>"{expense.groupName}"</b></p>
                                    {
                                        expense.amt > 0 ?
                                        (
                                            <p className="green-text col m12 s12 ">You get back USD{expense.amt}</p>
                                        ):
                                        (
                                            <p className="orange-text col m12 s12 ">You owe USD{-expense.amt}</p>
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