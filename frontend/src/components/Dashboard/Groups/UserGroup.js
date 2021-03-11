import React from 'react';
import { useSelector} from 'react-redux';
import ExpenseList from './ExpenseList';
import '../dashboard.css';

const UserGroups = (props)=>{
    const groupName = props.location.groupName;
    const groups = useSelector(state => state.groupExpenses);
    const expList = groups.groups[0].expenses;
    // const expList = groups.groups.filter((group) => group.name === groupName);

    // console.log("f:", group.groups[0].expenses);
    console.log(props.location);

    return (
        <div className="container user-groups">
            <table className="centered responsive-table highlight">
            {   
                expList.length ?
                (
                    expList.map((expense)=>{
                        {/* console.log('asd : ',expense), */}
                        return(
                            <ExpenseList expense={expense} key={expense.id}/>
                        )
                    })
                )
                :
                (
                    <div>Loading...</div>
                )
            }
            </table>
        </div>
    )
}

export default UserGroups;