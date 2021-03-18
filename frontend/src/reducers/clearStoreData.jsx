const initState = {

}

const clearStoreData = (state = initState, action)=>{
    switch(action.type){
        case 'CLEAR_STORE':{
            return{
                ...state,
                groups : '',
                user : {
                    name: '', currency: '', email: '', id: '', imageURL: '', language: '', phone: '', timezone: '', token: '',
                },
                activeGroups : [],
                invitedGroups : [],
                acceptedGroups: [],
                recentActivities: [],
                recieve: [],
                pay: [],
            }
        }

        default : {
            return state;
        }
    }
}

export default clearStoreData;