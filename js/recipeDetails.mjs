import { getLocalStorage, setLocalStorage, convertParameter } from "./utils.mjs";
import { recipeQuery } from "./externalServicies.mjs";


export default async function renderRecipeDetails(){
    //Render Information of Recipe + dish-type tags + ingredient in ul

    let recipe = await recipeQuery("recipe");

    setLocalStorage("recipe", recipe);

    let title = document.querySelector(".recipe-title");
    let recipeImage = document.querySelector(".recipe-image");
    let servings = document.querySelector(".servings");
    let prepTime = document.querySelector(".prep-time");
    let dishType = document.querySelector(".dish-type");
    const dishList = recipe.dishTypes || [];
    let ingredientList = document.querySelector(".recipe-ingredients");
    const ingredients = recipe.extendedIngredients;
    let instructions = recipe.analyzedInstructions[0].steps;
    let ol = document.querySelector(".recipe-instructions");
    
    
    title.textContent = `${recipe.title}`;
    recipeImage.setAttribute("src", `${recipe.image}`);
    recipeImage.setAttribute("alt", `${recipe.title} image`);
    recipeImage.classList.add("img-border");
    servings.textContent = `${recipe.servings}`;
    prepTime.textContent = `${recipe.readyInMinutes} Minutes`;

    
    renderDishTags(dishList, dishType);

    renderIngredients(ingredients, ingredientList);

    renderInstructions(instructions, ol);

    let backBtn = document.querySelector("#back-to-search-btn");


    backBtn.addEventListener("click", goBack);
    
}

function renderDishTags(dishList, parent){
    dishList.forEach(type => {
        let tag = document.createElement("span");
        tag.classList.add("tag-dishtype");
        tag.textContent = type;
        parent.appendChild(tag);
    });

    if (!dishList.length){
        let tag = document.createElement("span");
        tag.classList.add("tag-dishtype-null");
        tag.textContent = "none";
        parent.appendChild(tag);
    }

}

function renderIngredients(ingredients, parent){
    ingredients.forEach(ingredient => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        td1.textContent = `${ingredient.name}`;
        td1.classList.add("ingredient");
        td2.textContent = `${ingredient.measures.us.amount} ${ingredient.measures.us.unitShort}`;
        td3.textContent = `${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitShort}`;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        parent.appendChild(tr);
    });
}

async function renderInstructions(steps, ol){
    // Render Instructions into OL
    steps.forEach(step => {
        let li = document.createElement("li");
        li.textContent = step.step;
        ol.appendChild(li);
    });
}

function goBack(){
    let lastSearch = convertParameter(getLocalStorage("last-search"));

    window.location.replace(`/search-list/index.html?search=${lastSearch}`);
}