const initState = {
    groupInvites : [
        {name:"Bazaar expences", id:"kio1"},
        {name:"furniture bazaar", id:"kio2"},
        {name:"ice cream store", id:"kio3"}
    ],

    existingGroups : [
        {name: "Four People One House", expense:70, id:"kio4"},
        {name: "Home Expenses", expense:-20, id:"kio5"},
    ]
}

const AllGroups = (state = initState, action) => {
    return state;
}

export default AllGroups;