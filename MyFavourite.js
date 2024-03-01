
let favContainerEl = document.querySelector(".fav-container")

//get favMeals from localStorage
function getFavMealLocalstorage() {
    let favMeals = JSON.parse(localStorage.getItem("favMeals"));
    return favMeals;
}



function showFavMeal() {
    //calling getFavMealLocalstorage to get favMeals
    let favMeals = getFavMealLocalstorage();

    favContainerEl.innerHTML = "";

    for (let meal of favMeals) {
        let favListEl = document.createElement("div");
        favListEl.className = "fav-list"

        let favImgEl = document.createElement("div");
        favImgEl.className = "fav-img"

        let imgEl = document.createElement("img")
        imgEl.src = meal.strMealThumb;
        let anchorEl = document.createElement("a");
        anchorEl.href = "./MealDetailPage.html"
        anchorEl.append(imgEl)

        favImgEl.append(anchorEl)

        let favDetailEl = document.createElement("div");
        favDetailEl.className = "fav-detail"

        let DetailEl = document.createElement("div");
        DetailEl.className = "detail"
        DetailEl.innerHTML = `<span class="name">Name:</span><span> ${meal.strMeal}</span><br><span class="category">Category:</span><span> ${meal.strCategory}</span><br><span class="area">Area:</span><span> ${meal.strArea}<Area></Area></span>`

        let deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Delete"

        favDetailEl.append(DetailEl, deleteBtn)

        favListEl.append(favImgEl, favDetailEl)

        favContainerEl.append(favListEl)

        //Adding event listner to delete button
        deleteBtn.addEventListener("click", () => {
            //console.log(meal.strMeal);
            let updatedMeal = favMeals.filter((ele) => meal.strMeal !== ele.strMeal)
            //console.log(updatedMeal);

            //update favMeal in Locastorage
            let updatedMealStr = JSON.stringify(updatedMeal);
            localStorage.setItem("favMeals", updatedMealStr)

            //callign this function again with updated favMeals
            showFavMeal();
        })

        //Navigate to MealDetailPage and add meal to loacalStorage
        anchorEl.addEventListener("click", () => {
            let mealString = JSON.stringify(meal)
            localStorage.setItem("meal", mealString)
        })
    }

}

//calling showFavMeal on load
showFavMeal();

