const initState = {
    recentActivities: [],
    recieve: [],
    pay: [],
}

const expenseReducer = (state = initState, action)=>{
    switch(action.type) {
        case 'ADD_RECENT_ACTIVITIES': {
            return {
                ...state,
                recentActivities: payload,
            }
        }
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

export default expenseReducer;
