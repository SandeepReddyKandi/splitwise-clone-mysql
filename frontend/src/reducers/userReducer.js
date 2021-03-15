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
  },
  activeGroups : [
    {name:"Bazaar expences", id:"kio1"},
    {name:"furniture bazaar", id:"kio2"},
    {name:"ice cream store", id:"kio3"}
  ],

  invitedGroups : [
    {name: "Four People One House", expense:70, id:"kio4"},
    {name: "Home Expenses", expense:-20, id:"kio5"},
  ]
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
