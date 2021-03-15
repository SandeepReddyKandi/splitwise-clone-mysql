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
    language: 'English',
    token: ''
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

  if(action.type === "SET_USER_VARIABLES"){
    const newInfo = state.signupInfo;

    if(action.payload.currency !== '')
      newInfo.currency = action.payload.currency;
    if(action.payload.timezone !== '')
      newInfo.timezone = action.payload.timezone;
    if(action.payload.language !== '')
      newInfo.language = action.payload.language;

    console.log("newInfo : ", newInfo);
    console.log('payload : ', action.payload);

    return {
      ...state,
      signupInfo: newInfo
    }
  }

  return state;
};

export default authReducer;
