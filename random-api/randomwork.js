//global variables
var categoryEl = document.getElementById("category")
var ingredientEl = document.getElementById("ingredients");
var instructionEl = document.getElementById("instructions");
var barfindrecipebuttonEl = document.getElementById("findarecipe");

//main function for API calls 
async function getRandomCocktail(ingredient) {

  //get list of cocktails from api
  const list = await getCocktailList(ingredient);

  //select random cocktail from list
  const cocktail = selectRandomCocktail(list);
  //get ingredients for selected cocktail
  const recipe = await getCocktailIngredients(cocktail);
  renderRecipe(recipe);
}


function getCocktailList(ingredient) {
  var list = fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/random.php`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.drinks;
    });
  return list;
}

function selectRandomCocktail(list) {
  // select random cocktail from list
  //math.random() returns a random number between 0 and 1
  //math.floor rounds down to the nearest integer
  // multiply by list length to get a random index
  let random = Math.floor(Math.random() * list.length);
  return list[random];
}

function getCocktailIngredients(cocktail) {
  var recipe = fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`
  )
    .then((response) => response.json())
    .then((data) => {
      //this only shows the first ingredient
      //you can get more in the same way. the ingredients and instructions are logged in the console.
      let recipe = data.drinks[0];
      return recipe;
    });
  return recipe;
}

//render cocktail name and ingredients function
function renderRecipe(recipe) {
  let measurementStrings = getRecipeFields(recipe);
  var ingredientsHTML = `
    <h5>${recipe.strDrink}</h5>

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
  ingredients.innerHTML = ingredientsHTML;

  //render cocktail instructions and image functional
  var instructionsHTML = `
    <strong>INSTRUCTIONS</strong>
    <p>${recipe.strInstructions}</p>
    <img src="${recipe.strDrinkThumb}" style="width:250px;">`;

  instructions.innerHTML = instructionsHTML;
}

//function to get fields from the response data
function getRecipeFields(recipe) {
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

//listener for recipe button

if(document.getElementById("alcoholoption")=selected, barfindrecipebuttonEl=onclick) { 
barfindrecipebuttonEl.addEventListener("click", function () {
var cocktailIngredient = categoryEl.value
    getRandomCocktail(cocktailIngredient);

}) ;

getRandomCocktail("vodka"); }