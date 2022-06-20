//global variables
var searchMealTextEl = document.getElementById("search-meals");
var submitMealButtonEl = document.getElementById("submit-meals");
var ingredientMealEl = document.getElementById("ingredients-meals");
var instructionMealEl = document.getElementById("instructions-meals");

//main function for API calls
async function getRandomMeal(ingredient) {
  //get list of meals from api
  const list = await getMealList(ingredient);
  //select random meal from list
  var meals = selectRandomMeal(list);
  //get ingredients for selected meal
  const recipe = await getMealIngredients(meals);
  renderMealRecipe(recipe);
}

function getMealList(ingredient) {
  var list = fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.meals;
    });
  return list;
}

function selectRandomMeal(list) {
  // select random meal from list
  //math.random() returns a random number between 0 and 1
  //math.floor rounds down to the nearest integer
  // multiply by list length to get a random index
  let random = Math.floor(Math.random() * Object.keys(list).length);
  // return Object.keys(random).strMeal;
  return Object.values(list[random]);
}

function getMealIngredients(meals) {
  let meal = meals;
	var recipe = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal[2]}`)
  // var recipe = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meals.idMeal}`)
    .then((response) => response.json())
    .then((data) => {
      //this only shows the first ingredient
      //you can get more in the same way. the ingredients and instructions are logged in the console.
      let recipe = data.meals[0];
      return recipe;
    });
  return recipe;
}

//render meal name and ingredients function
function renderMealRecipe(recipe) {
  let measurementStrings = getMealRecipeFields(recipe);
  var ingredientsHTML = `
    <h5>${recipe.strMeal}</h5>

    <strong>INGREDIENTS</strong>
    <ul style="list-style-type:none;">
    `;
  for (var i = 0; i < measurementStrings.length; i++) {
    var innerHTML = `
        <li>${measurementStrings[i]}</li>
        `;
    ingredientsHTML += innerHTML;
  }
  ingredientsHTML += "</ul>";
  ingredientMealEl.innerHTML = ingredientsHTML;

  //render meal instructions and image functional
  var instructionsHTML = `
    <strong>INSTRUCTIONS</strong>
    <p>${recipe.strInstructions}</p>
    <img src="${recipe.strMealThumb}" style="width:250px;">`;

  instructionMealEl.innerHTML = instructionsHTML;
}

//function to get fields from the response data
function getMealRecipeFields(recipe) {
  var measurementStrings = [];
  for (var i = 1; i < 16; i++) {
    let ingredient = recipe[`strIngredient${i}`];
    if (ingredient) {
      var measure = recipe[`strMeasure${i}`];
      if (measure) {
        var builtString = `${measure}${ingredient}`;
      } else {
        var builtString = ingredient;
      }
      measurementStrings.push(builtString);
    }
  }
  return measurementStrings;
}

//listener for meal button
submitMealButtonEl.addEventListener("click", function () {
  var mealIngredient = searchMealTextEl.value;
  getRandomMeal(mealIngredient);
});

getRandomMeal("beef");