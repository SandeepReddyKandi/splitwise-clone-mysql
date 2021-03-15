const initState = {
    groupName: '',
    users: [
    
    ]
}

const NewGroups = (state = initState, action)=>{
    
    switch(action.type){
        case 'ADD_USER':
            const groupName = action.payload.groupName;
            const users = [...state.users, 
                            {name:action.payload.name, email:action.payload.email}
                        ];
            
            return{
                ...state,
                groupName,
                users
            }

        default:
            return state
    }    
}

export default NewGroups;