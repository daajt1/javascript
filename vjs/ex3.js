const morning = {
    breakfast: "outmeal",
    lunch : "peanut butter"
};

const dinner = "mac and cheese"

const backpackingMeals = {
    ...morning,
    dinner
};

console.log(backpackingMeals);

fetch ("https://api.radomuser.me/?nat=US&results=1").then(res=>console.log(res.json()))
console.log(fetch("http://api.radomuser.me/?nat=us&results=1"));
