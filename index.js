
let favoriteMealArray;

let mealsEl = document.querySelector(".meals");
let searchBtn = document.querySelector(".meal-search-box button");
let inputSearchEl = document.querySelector(".meal-search-box input");
let bodyEl = document.querySelector("body")

//check in localstorage favoriteMealArray available
if (JSON.parse(localStorage.getItem("favMeals"))) {
    favoriteMealArray = [...JSON.parse(localStorage.getItem("favMeals"))]
} else {
    favoriteMealArray = []
}

//Fetch searched meal and show in result section
async function fetchSearchMeals(mealName) {
    try {

        let respose = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);

        //if response is not Ok throw error to handle in catch
        if (!respose.ok) {
            throw new Error()
        }

        let mealsSearchData = await respose.json();

        console.log(mealsSearchData.meals);
        mealsEl.innerHTML = "";
        if (mealsSearchData.meals && mealName !== "") {

            showMealsSearch(mealsSearchData)
        } else {
            mealsEl.innerHTML = `No meals found for search "${mealName}"`;
        }
    } catch (error) {
        mealsEl.innerHTML = `Error happens while fetching data`
    }


}

//populate meals in result section
function showMealsSearch(data) {

    let { meals } = data;

    for (let meal of meals) {

        let mealItemEl = document.createElement("div");
        mealItemEl.className = "meal-item";

        let mealImgEl = document.createElement("div");
        mealImgEl.className = "meal-img";

        let imgEl = document.createElement("img");
        imgEl.src = meal.strMealThumb;

        let anchorEl = document.createElement("a");
        anchorEl.href = "./MealDetailPage.html"
        anchorEl.append(imgEl)
        mealImgEl.append(anchorEl);

        let mealNameEl = document.createElement("div");
        mealNameEl.className = "meal-name";

        let spanEl = document.createElement("span");
        spanEl.innerText = meal.strMeal.length > 20 ? meal.strMeal.slice(0, 20) + "..." : meal.strMeal;

        let btnEl = document.createElement("button")
        btnEl.innerText = "Add To Favourite"

        mealNameEl.append(spanEl)

        mealItemEl.append(mealImgEl, mealNameEl, btnEl)

        //append individual meals to meals div
        mealsEl.append(mealItemEl)

        //Push meal to favoriteMealArray and add to favoriteMealArray localStorage
        btnEl.addEventListener("click", () => {
            let isMealInFav = false;
            for (let ele of favoriteMealArray) {
                if (ele.idMeal === meal.idMeal) {

                    isMealInFav = true;
                    break;
                }
            }

            //if meal is not in favoriteMealArray then only push to favoriteMealArray
            if (!isMealInFav) {
                favoriteMealArray.push(meal);
                console.log(favoriteMealArray);

                let favMeals = JSON.stringify(favoriteMealArray);
                localStorage.setItem("favMeals", favMeals)

            }

        })

        //Navigate to MealDetailPage and add meal to loacalStorage
        anchorEl.addEventListener("click", () => {
            let mealString = JSON.stringify(meal)
            localStorage.setItem("meal", mealString)
        })

    }
}

//on clicking search button call fetchSearchMeals
searchBtn.addEventListener("click", () => {
    let mealName = inputSearchEl.value;
    fetchSearchMeals(mealName)
})


//onload search for text in search bar
bodyEl.onload = () => {
    let mealName = inputSearchEl.value;
    if (mealName != "") {

        fetchSearchMeals(mealName)
    }
}










