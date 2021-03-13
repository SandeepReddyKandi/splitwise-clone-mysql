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
        {name:"Four People One House", id:"lkj1"},
        {name:"Home Expenses", id:"lkj2"}
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
        
        case "DELETE_USER":
            const username = action.payload.userName;

            console.log('action: ',username);
            
            const recieveList = state.recieve.filter((user)=> user.name !== username);
            const payingList = state.pay.filter((user) => user.name !== username);
            
            return {
                ...state,
                recieve : recieveList,
                pay : payingList
            }

        default:
            return state;
    }
}

export default userExpenses;