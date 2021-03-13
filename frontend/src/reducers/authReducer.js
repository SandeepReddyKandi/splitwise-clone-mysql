const initState = {
  loginInfo: {
    email: null,
    password: null
  },

  signupInfo: {
    name: "User1",
    email: "user1@gmail.com",
    phone: "91XXXXXXX",
    password: "",
    currency: "USD",
    timezone: 'UTC -8 USA and 2 more',
    language: 'English'
  }
};

const authReducer = (state = initState, action)=>{
  if(action.type === "LOGIN_INFO"){
    const loginInfo = [action.payload.email, action.payload.password];
    return {
      ...state,
      loginInfo: loginInfo   
    };
  }
    
  if(action.type === "SIGNUP_INFO"){
    const signupInfo = [action.payload.name, action.payload.email, action.payload.phone, action.payload.password];   
    return{
      ...state,
      signupInfo: signupInfo
    };
  }

  if(action.type === "UPDATE_CURR"){
    const newInfo = [state.signupInfo];
    newInfo.currency = action.payload.currency;

    console.log("newInfo : ", newInfo);

    return {
      ...state,
      signupInfo: newInfo
    }
  }

  if(action.type === "UPDATE_TZ"){
    const newInfo = [state.signupInfo];
    newInfo.timezone = action.payload.timezone;

    console.log("newInfo : ", newInfo);

    return {
      ...state,
      signupInfo: newInfo
    }
  }
    
  return state;
};

export default authReducer;
