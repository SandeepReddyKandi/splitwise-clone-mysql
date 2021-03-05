const initState = {
    loginInfo : {
        email: null,
        password: null
    },

    signupInfo : {
        userName : null,
        userEmail : null,
        userPhone: null,
        userPassword: null
    }
}

// storing user info to the redux store
const rootReducer = (state = initState, action)=>{
    if(action.type === 'LOGIN_INFO'){
        const loginInfo = [action.payload.email, action.payload.password];
        return {
            ...state,
            loginInfo: loginInfo   
        }
    }

    if(action.type === 'SIGNUP_INFO'){
        const signupInfo = [action.payload.name, action.payload.email, action.payload.phone, action.payload.password];
        return{
            ...state,
            signupInfo : signupInfo
        }
    }

    return state;
}
export default rootReducer;