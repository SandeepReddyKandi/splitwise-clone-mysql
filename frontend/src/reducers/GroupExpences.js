const initState = {
    groups: [
        { 
            name: "Four People One House",   
            id: "poi1",
            expenses : [
                {expenseName: "Grocery Outlet", cost: 16.24, payer: "User1", date: "jan 31", id:"qwe1"},
                {expenseName: "Grocery Outlet", cost: 10.2, payer: "User2", date: "jan 30", id:"qwe2"},
                {expenseName: "instacart", cost: 36.00, payer: "User1", date: "jan 28", id:"qwe3"}
            ]
        }
    ]
}

const groupExpenses = (state = initState, action)=>{
    switch(action.type){
        case 'ADD_NEW_EXPENSE':
        {
            const groupName = action.groupName;
            const newGroupList = state.groups.map((group)=>{
                if(group.name === groupName){
                    const tempGrp = [...group.expense, action.expense];
                    return tempGrp;
                }
                return group;
            });

            return{
                ...state,
                groups : newGroupList
            }
        }

        case 'DELETE_EXPENSE':
        {
            const groupName = action.groupName;
            const newGroupList = state.groups.filter((group) => group.name !== groupName);
            return{
                ...state,
                groups : newGroupList
            }
        }
        
        default:
            return state;
    }
}

export default groupExpenses;
