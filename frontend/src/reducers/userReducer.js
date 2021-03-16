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
    // {name:"Bazaar expences", id:"kio1"},
    // {name:"furniture bazaar", id:"kio2"},
    // {name:"ice cream store", id:"kio3"}
  ],

  invitedGroups : [
    // {name: "Four People One House", id:"kio4"},
    // {name: "Home Expenses", id:"kio5"},
  ]
};

const userReducer = (state = initState, action)=> {
  console.log('state : ', state);
  switch (action.type) {
    case 'ADD_USER' : {
      return {
        ...state,
        user: {
          ...action.payload,
        }
      }
    }

    case 'ADD_ACTIVE_GROUPS':{
      console.log('active groups : ',action.payload);
      // const newActiveGrp = [...state.activeGroups, action.payload];
      return {
        ...state,
        activeGroups : [
          ...state.activeGroups, 
          ...action.payload
        ]
      }
    }

    case 'ADD_INVITES':{
      console.log('active groups : ',action.payload);
      // const newActiveGrp = [...state.activeGroups, action.payload];
      return {
        ...state,
        invitedGroups : [
          ...state.invitedGroups, 
          ...action.payload
        ]
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
