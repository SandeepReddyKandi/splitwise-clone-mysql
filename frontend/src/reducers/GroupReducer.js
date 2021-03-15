const initState = {
    groups: [
        {
            name: "Four People One House",
            id: "poi1",
            expenses : [
                {expenseName: "Grocery Outlet", cost: 16.24, payer: "User1", date: {month:"jan", day:31}, id:"qwe1"},
                {expenseName: "Grocery Outlet", cost: 10.2, payer: "User2", date: {month:"jan",day:30}, id:"qwe2"},
                {expenseName: "instacart", cost: 36.00, payer: "User1", date: {month:"jan", day:28}, id:"qwe3"},
                {expenseName: "instacart", cost: 7.50, payer: "User2", date: {month:"jan", day:12}, id:"qwe4"},
                {expenseName: "instacart", cost: 56.20, payer: "User3", date: {month:"feb", day:2}, id:"qwe5"},
                {expenseName: "Dai Thanh", cost: 22.76, payer: "User1", date: {month:"feb", day:3}, id:"qwe7"},
                {expenseName: "instacart-walmart", cost: 36.00, payer: "User2", date: {month:"feb", day:12}, id:"qwe8"},
                {expenseName: "instacart", cost: 36.00, payer: "User2", date: {month:"feb", day:28}, id:"qwe9"},
            ],
            totalExpenses:[
                {user:"USER 1", amt: 12, id:"poi1"},
                {user:"USER 2", amt: -10, id:"poi2"},
                {user:"USER 1", amt: 20, id:"poi3"}
            ]
        }, {
            name: "Home Expenses",
            id: "poi1",
            expenses : [
                {expenseName: "Grocery Outlet", cost: 16.24, payer: "User1", date: {month:"jan", day:31}, id:"qwe1"},
                {expenseName: "Grocery Outlet", cost: 10.2, payer: "User2", date: {month:"jan",day:30}, id:"qwe2"},
                {expenseName: "instacart", cost: 36.00, payer: "User1", date: {month:"jan", day:28}, id:"qwe3"},
            ],
            totalExpenses:[
                {user:"USER 2", amt: 12, id:"poi9"},
                {user:"USER 3", amt: -10, id:"poi8"}
            ]
        }
    ],
}

const groupExpenses = (state = initState, action)=>{
    switch(action.type){
        case 'ADD_NEW_EXPENSE':
        {
            const groupName = action.payload.groupName;
            const expenseName = action.payload.itemName;
            const date = action.payload.date;
            const cost = action.payload.itemCost
            const id = "qwe" + (Math.floor(Math.random()*10));

            const newExpense = {
                expenseName : expenseName,
                cost : cost,
                payer: "all",
                date: date,
                id: id
            };

            console.log("group name : " ,groupName)
            console.log("new Expense : ", newExpense);

            const newGroupList = state.groups.map((group)=>{
                if(group.name === groupName){
                    // console.log("match found : ",groupName);
                    const tempGrp = [...group.expenses, newExpense];
                    group.expenses = tempGrp;
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
