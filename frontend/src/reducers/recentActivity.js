const initState = {
    activity : [
        {name:"User 1", expensesItem: "Grocery outlet", groupName:"Home Expenses", amt: -8.12, date: "jan 31", id:"asd12", imgSrc: "https://img.icons8.com/bubbles/50/000000/grocery-shelf.png"},
        {name:"User 1", expensesItem: "Grocery outlet", groupName:"Home Expenses", amt: -31.94, date:"jan 31",  id:"asd13", imgSrc: "https://img.icons8.com/bubbles/50/000000/grocery-shelf.png"},
        {name:"User 1", expensesItem: "Dai Thanh", groupName:"Home Expenses", amt: -10.91, date:"jan28", id:"asd13", 
        imgSrc: "https://img.icons8.com/bubbles/50/000000/list.png"},
        {name:"User 1", expensesItem: "instacart-walmart", groupName:"Home Expenses", amt: -18.91, date:"jan 26", id:"asd14", 
        imgSrc: "https://img.icons8.com/bubbles/50/000000/sanitizer.png" },
        {name:"You", expensesItem: "instacart", groupName:"Home Expenses", amt: 21.96, date:"jan 25", id:"asd15", 
        imgSrc: "https://img.icons8.com/bubbles/50/000000/list.png"},
        {name:"User 1", expensesItem: "Grocery outlet", groupName:"Home Expenses", amt: -20.00, date:"jan 25", id:"asd15", imgSrc: "https://img.icons8.com/bubbles/50/000000/grocery-shelf.png"},
        {name:"You", expensesItem: "instacart", groupName:"Home Expenses", amt: 21.96, date:"jan 25",id:"asd16", 
        imgSrc: "https://img.icons8.com/bubbles/50/000000/list.png"}
    ]
}

const recentActivity = (state = initState, actions)=>{
    return{
        state
    }
}

export default recentActivity;