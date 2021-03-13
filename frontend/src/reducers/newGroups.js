const initState = {
    groups : {
        name: "lorem ipsum",
        users:[
            {name:"user1", email:"user1@gmail.com"},
            {name:"user2", email:"user2@gmail.com"},
            {name:"user3", email:"user3@gmail.com"}
        ]
    }
}

const NewGroups = (state = initState, action){
    return state
}

export default NewGroups;