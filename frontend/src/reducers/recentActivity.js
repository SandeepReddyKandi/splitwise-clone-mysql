const initState = {
    activity : [
    ]
}

const recentActivity = (state = initState, actions)=>{
    switch(actions.type){
        case 'ADD_ACTIVITIES':
            const activities = actions.payload;
            return{ 
                ...state,
                activity: activities
            }

        default:
            return{
                ...state
            }
    }
}

export default recentActivity;