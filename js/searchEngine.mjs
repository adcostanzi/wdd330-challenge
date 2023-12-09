import { search, searchWithIngredients, searchWithRecipeFilters } from "./recipeList.mjs";
import { formAlert, setLocalStorage } from "./utils.mjs";



export function searchFunction() {
    let userInput = document.querySelector("#search-bar").value;
    if (userInput !== "" && userInput !== undefined && userInput !== null) {
      search(userInput);
    }
  }

export function showFilterModal() {
    // Create Modal and Overlay divs and render checked option
    const searchByHTML = `
    <form name="filters">
    <fieldset class="search-by">
        <legend>Search by</legend>
        <label class="filter-radio-option">           
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
    <div class="search-btns-container">
    </div>
  </form>
    `;
  
    let div = document.createElement("div");
    div.classList.add("modal");
    div.insertAdjacentHTML("afterbegin", searchByHTML);
  
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.addEventListener("click", closeModal);
  
    document.body.append(div);
    document.body.append(overlay);
  
    renderCheckedOption();
    let recipe = document.querySelector("#recipe-filter");
    let ingredient = document.querySelector("#ingredients-filter");
    recipe.addEventListener("input", renderCheckedOption);
    ingredient.addEventListener("input", renderCheckedOption);
  }
  
  function closeModal() {
    // Close Modal and Overlay return search bar to original position
    let modal = document.querySelector(".modal");
    let overlay = document.querySelector(".overlay");

    
    document.querySelector(".search-bar-container").appendChild(document.querySelector("#search-bar"));
    document.body.removeChild(modal);
    document.body.removeChild(overlay);
  }
  
  function renderCheckedOption() {
    let recipe = document.querySelector("#recipe-filter");
    let ingredient = document.querySelector("#ingredients-filter");
    if (recipe.checked) {
      renderRecipeFilterOptions();
    } else if (ingredient.checked) {
      renderIngredientsFilterOptions();
    }
  }
  
  function renderRecipeFilterOptions() {
    // Render Recipe filters, search bar and search button and options for select inputs
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
    let btnsContainer = document.querySelector(".search-btns-container");
    div.innerHTML = "";
    btnsContainer.innerHTML = "";
    div.insertAdjacentHTML("afterbegin", recipeFilterHTML);
  
    loadOptions();
  
    let showCalories = document.querySelector("#user-calories");
    let userCalories = document.querySelector("#calories");
    showCalories.textContent = userCalories.value;
  
    userCalories.addEventListener("input", (e) => {
      showCalories.textContent = e.target.value;
    });
  
    const searchButton = `
    <div class="alert-container"></div>
    <button type="button" id="search-with-filters">Search</button>
    `; 


    btnsContainer.appendChild(document.querySelector("#search-bar"));
    btnsContainer.insertAdjacentHTML("beforeend", searchButton);

    //let oldSearchBtn = document.querySelector("#search-btn");

    //oldSearchBtn.removeEventListener("keypress", assignKey);
    //removeEventListener("keypress", searchBar);
    
    let newSearchBtn = document.querySelector("#search-with-filters");
    newSearchBtn.addEventListener("click", searchUsingFilters);
    
    let searchBar = document.querySelector("#search-bar");
    searchBar.addEventListener("keypress", (e) => {
        if (e.key === "Enter"){
            e.preventDefault();
            newSearchBtn.click();
        }
    });
    searchBar.focus();
  }

  function searchUsingFilters(){
    // Check user input and send searchQuery with filters
    let cuisine = document.querySelector("#cuisine").value;
    let diet = document.querySelector("#diet").value;
    let intolerances = document.querySelector("#intolerances").value;
    let calories = document.querySelector("#calories").value;
    let userInput = document.querySelector("#search-bar").value;

    if (userInput !== ""){
        let filters = {
            "cuisine" : cuisine,
            "diet" : diet,
            "intolerances" : intolerances,
            "maxCalories" : calories
    };

    for (const filter in filters){
        if (filters[filter] === ""){
            delete filters[filter];
        }
    }
    searchWithRecipeFilters(userInput, filters);

    } else {
        formAlert("Please add a keyword to search for", document.querySelector(".alert-container"))
        document.querySelector("#search-bar").focus();
    }
    
  }
  
  async function loadOptions() {
    // Load option for select inputs
    let response = await fetch("/json/options.json");
    let options;
    if (response.ok) {
      options = await response.json();
    }
    let cuisineSelect = document.querySelector("#cuisine");
    let dietSelect = document.querySelector("#diet");
    let intolerancesSelect = document.querySelector("#intolerances");
  
    let cuisineOptions = options.cuisine;
    let dietOptions = options.diet;
    let intolerancesOptions = options.intolerances;
  
    cuisineOptions.forEach((cuisine) => {
      let option = new Option(`${cuisine}`, cuisine);
      cuisineSelect.append(option);
    });
  
    dietOptions.forEach((diet) => {
      let option = new Option(`${diet}`, diet);
      dietSelect.append(option);
    });
  
    intolerancesOptions.forEach((intolerance) => {
      let option = new Option(`${intolerance}`, intolerance);
      intolerancesSelect.append(option);
    });
  }
  
  function renderIngredientsFilterOptions() {
    // Render Ingredient Filters and Add-btn functionality
    const ingredientsFilterHTML = `
    <label>
    Add Ingredient:
    <div class="add-ingredient-container">
    <input name="ingredient" id="ingredient" type="text">
    <button type="button" id="add-ingredient">Add</button>
    </div>
    </label>
    <label class="select-filter">Ingredients:</label>
    <div class="ingredient-list-search">
    </div>
    `;
  
    let div = document.querySelector(".filter-options");
    let btnsContainer = document.querySelector(".search-btns-container");
    document.querySelector(".search-bar-container").appendChild(document.querySelector("#search-bar"));
    div.innerHTML = "";
    btnsContainer.innerHTML = "";
    div.insertAdjacentHTML("afterbegin", ingredientsFilterHTML);
  
    // Add button functionality
    let addBtn = document.querySelector("#add-ingredient");
    addBtn.addEventListener("click", addIngredientTag);
  
    let ingredientInput = document.querySelector("#ingredient");
    ingredientInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter"){
            e.preventDefault();
            addBtn.click();
        }
    });
       
    const searchButton = `
    <button type="button" id="search-by-ingredients">Search</button>
    `;
  
    btnsContainer.insertAdjacentHTML("afterbegin", searchButton);
  
    let searchBtn = document.querySelector("#search-by-ingredients");

    searchBtn.addEventListener("click", searchUsingIngredients);

  }



  function searchUsingIngredients(){
    const ingredientsElements = document.querySelectorAll(".tag-search-ingredient");
    let ingredients = [];

    ingredientsElements.forEach(element => {
        ingredients.push(element.dataset.name);
    });
    setLocalStorage("last-search", "");
    searchWithIngredients(ingredients);
  }
  
  function addIngredientTag() {
    // Create Tag with user provided name of ingredient and add functionality to be used and removed.
    let userIngredient = document.querySelector("#ingredient");
    let divContainer = document.querySelector(".ingredient-list-search");
  
    if (userIngredient.value !== "") {
      let newIngredient = document.createElement("div");
      newIngredient.classList.add("tag-search-ingredient");
      newIngredient.setAttribute("data-name", `${userIngredient.value}`);
  
      //let ingredientName = document.createElement("span");
      //ingredientName.textContent = userIngredient.value;
      newIngredient.textContent = userIngredient.value;
  
      let closeBtn = document.createElement("span");
      closeBtn.classList.add("close-tag");
      closeBtn.setAttribute("data-name", `${userIngredient.value}`);
      closeBtn.innerHTML = `X`;
      closeBtn.addEventListener("click", (e) => removeTag(e));
  
      newIngredient.appendChild(closeBtn);
  
      
      divContainer.appendChild(newIngredient);
  
      userIngredient.value = "";
      userIngredient.focus();
    } else {
        formAlert("Cannot add empty ingredient", document.querySelector(".add-ingredient-container"));
    }
  }
  
  function removeTag(e) {
    let element = document.querySelector(
      `[data-name="${e.target.dataset.name}"]`
    );
    let parentElement = document.querySelector(".ingredient-list-search");
    parentElement.removeChild(element);
  }