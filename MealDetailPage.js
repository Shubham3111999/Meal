
//featching meal from localstorage
let meal = JSON.parse(localStorage.getItem("meal"));

//display meal image
let imgEl = document.querySelector(".mdp-container img");
imgEl.src = meal.strMealThumb;

//display meal name
let mealNameEl = document.querySelector(".mealName span");
mealNameEl.innerText = meal.strMeal;

//display meal instruction
let mealInstructionEl = document.querySelector(".mealInstruction p");
mealInstructionEl.innerText = meal.strInstructions;