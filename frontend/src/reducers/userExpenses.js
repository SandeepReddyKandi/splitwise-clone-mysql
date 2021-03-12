const initState = {
    totalCost:40,
    pay: 30,
    recieve: 40,

    recieve: [
        {
            name:"aman",
            totalAmt: 90,
            id: "aw12",
            groups:[
                {group:"Four People One House", amt:26.71, id:1},
                {group:"Non group expenses", amt:48.97, id:2}
            ]
        },
        {
            name:"kabir",
            totalAmt: 54.89,
            id: "aw15",
            groups:[
                {group:"House Party", amt:54.89, id:7}
            ]
        }
    ],

    pay: [
        {
            name:"kabir",
            totalAmt: 54.89,
            id: "aw16",
            groups:[
                {group:"House Party", amt:54.89, id:9}
            ]
        }
    ],

    groups:[
        "Four People One House",
        "Home Expenses"
    ]
}

const userExpenses = (state = initState, action)=>{
    switch(action.type){
        case 'TO_RECIEVE':
            const totalRecievedAmt = [...state.toTake, action.newUser];
            return {
                ...state,
                toTake: totalRecievedAmt
            }

        case 'TO_PAY':
            const totakPayableAmt = [...state.toGive, action.newUser];
            return {
                ...state,
                toGive: totakPayableAmt
            }
        
        default:
            return state;
    }
}

export default userExpenses;