const initState = {
  loginInfo: {
    email: null,
    password: null
  },

  signupInfo: {
    name: "",
    email: "",
    phone: "",
    password: ""   
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
    
  return state;
};

export default authReducer;
