const initState = {
  user: {
    name: '',
    currency: '',
    email: '',
    id: '',
    imageURL: '',
    language: '',
    phone: '',
    timezone: '',
    token: '',
  }
};

const userReducer = (state = initState, action)=> {
  switch (action.type) {
    case 'ADD_USER' : {
      return {
        ...state,
        user: {
          ...action.payload,
        }
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default userReducer;
