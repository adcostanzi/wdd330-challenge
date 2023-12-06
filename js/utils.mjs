import { search } from "./recipeList.mjs";

function loadHTMLTemplate(path) {
  return async function () {
    const res = await fetch(path);

    if (res.ok) {
      const html = res.text();
      return html;
    }
  };
}

async function renderTemplate(
  templateFn,
  parentElement,
  data,
  position = "afterbegin",
  clear = true
) {
  if (clear == true) {
    parentElement.innerHTML = "";
  }
  let response = await templateFn(data);
  parentElement.insertAdjacentHTML(position, response);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export async function loadHeaderFooter() {
  let header = document.querySelector("#main-header");
  let footer = document.querySelector("#main-footer");

  let headerTemplate = loadHTMLTemplate("/partials/header.html");
  let footerTemplate = loadHTMLTemplate("/partials/footer.html");

  await renderTemplate(headerTemplate, header);
  await renderTemplate(footerTemplate, footer);
}

export function searchFunction() {
  let userInput = document.querySelector("#search-bar").value;
  if (userInput !== "" && userInput !== undefined && userInput !== null) {
    search(userInput);
  }
}

export function getParam(parameter) {
  const queryBase = window.location.search;
  const urlParameters = new URLSearchParams(queryBase);
  const toSearch = urlParameters.get(parameter);
  return toSearch;
}

export function convertParameter(searchParameter) {
  // Converts user input " " into +
return searchParameter.replace(" ", "+");
}

export function filtersFunctionOn(){
  const searchByHTML = `
  <form name="filters">
  <fieldset class="search-by">
      <legend>Search by</legend>
      <label class="filter-radio-option" for="filter">           
      <input type="radio" value="1" name="search-filter" id="recipe-filter"checked>    
      Recipe Filters
       </label>
       
      <label class="filter-radio-option">
      <input type="radio" value="2" name="search-filter" id="ingredients-filter">    
      Ingredients
      </label>
  </fieldset>
  <fieldset class>
      <legend>Filters</legend>
      <div class="filter-options"> </div>
  </fieldset>
</form>
  `;
  let div = document.querySelector(".header-section");
  div.insertAdjacentHTML("beforeend", searchByHTML);

  renderCheckedOption();
  let recipe = document.querySelector("#recipe-filter");
  let ingredient = document.querySelector("#ingredients-filter");
  recipe.addEventListener("input", renderCheckedOption);
  ingredient.addEventListener("input", renderCheckedOption);
}

function renderCheckedOption(){
  let recipe = document.querySelector("#recipe-filter");
  let ingredient = document.querySelector("#ingredients-filter");
  if (recipe.checked){
    renderRecipeFilterOptions()
  } else if (ingredient.checked){
    renderIngredientsFilterOptions();
  }
}

function renderRecipeFilterOptions(){

  const recipeFilterHTML = `
  <label class="select-filter">
  Cuisine: 
  <select name="cuisine" id="cuisine">
  </select>
</label>
<label class="select-filter">
  Diet: 
  <select name="diet" id="diet">
  </select>
</label>
<label class="select-filter">
  Intolerances: 
  <select name="intolerances" id="intolerances">
  </select>
</label>
<label class="range-filter">
  Max Calories: <output id="user-calories"></output>
  <input name="calories" id="calories" type="range" min="0" max="5000" step="10">
</label>
  `;
let div = document.querySelector(".filter-options");
div.innerHTML = "";
div.insertAdjacentHTML("beforeend", recipeFilterHTML);
  

loadOptions();

let showCalories = document.querySelector("#user-calories");
let userCalories = document.querySelector("#calories");
showCalories.textContent = userCalories.value;

userCalories.addEventListener("input", (e) => {
  showCalories.textContent = e.target.value;
});
}



async function loadOptions(){
  let response = await fetch("/json/options.json");
  let options;
  if (response.ok){
    options = await response.json();
  }
  let cuisineSelect = document.querySelector("#cuisine");
  let dietSelect = document.querySelector("#diet");
  let intolerancesSelect = document.querySelector("#intolerances");


  let cuisineOptions = options.cuisine;
  let dietOptions = options.diet;
  let intolerancesOptions = options.intolerances;

  cuisineOptions.forEach(cuisine => {
    let option = new Option(`${cuisine}`, cuisine);
    cuisineSelect.append(option);
  });

  dietOptions.forEach(diet => {
    let option = new Option(`${diet}`, diet);
    dietSelect.append(option);
  });

  intolerancesOptions.forEach(intolerance => {
    let option = new Option(`${intolerance}`, intolerance);
    intolerancesSelect.append(option);
  });

  
}

function renderIngredientsFilterOptions(){

  const ingredientsFilterHTML = `
  <label>
  Add Ingredient:
  <div class="add-ingredient-container">
  <input name="ingredient" id="ingredient" type="text" required>
  <input type="submit" id="add-ingredient" name="add-ingredient" value="Add" class="">
  </div>
  </label>
  <label class="select-filter">Ingredients:</label>
  <div class="ingredient-list-search">
  </div>
  `;

  let div = document.querySelector(".filter-options");
  div.innerHTML = "";
  div.insertAdjacentHTML("beforeend", ingredientsFilterHTML);

// Add button functionality
let addBtn = document.forms["filters"];
addBtn.addEventListener("submit", (e)=> {
  e.preventDefault();
  addIngredientTag();
});

}

function addIngredientTag(){
  // Create Tag with user provided name of ingredient and add functionality to be used and removed.
  let userIngredient = document.querySelector("#ingredient");

  let newIngredient = document.createElement("div");
  newIngredient.classList.add("tag-search-ingredient");
  newIngredient.setAttribute("data-name", `${userIngredient.value}`);

  let ingredientName = document.createElement("span");
  ingredientName.textContent = userIngredient.value;

  let closeBtn = document.createElement("span");
  closeBtn.classList.add("close-tag");
  closeBtn.setAttribute("data-name", `${userIngredient.value}`);
  closeBtn.innerHTML = `X`;
  closeBtn.addEventListener("click", removeTag);


  newIngredient.appendChild(ingredientName);
  newIngredient.appendChild(closeBtn);

  let divContainer = document.querySelector(".ingredient-list-search");
  divContainer.appendChild(newIngredient);

  userIngredient.value = "";
  userIngredient.focus();
}

function removeTag(){
  this.parentElement.remove();
}