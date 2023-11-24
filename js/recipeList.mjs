import { searchQuery } from "./externalServicies.mjs";
import { setLocalStorage } from "./utils.mjs";

export function search(userInput) {
  // format user input for appropiate query search and redirect to recipeList page
  let formattedInput = convertParameter(userInput);
  setLocalStorage("last-search", userInput);
  window.location = `/search-list/index.html?search=${formattedInput}`;
}

export async function renderSearchList() {
    // Perform searchQuery, store results in localStorage and render each result
  /* try {
        const searchResults = getLocalStorage("search-results");    
    } catch (error) {
        alert("Oops, unfortunately there are no results to display")
    } */
  let searchResults = await searchQuery("search");
  setLocalStorage("search-results", searchResults);
  const parentContainer = document.querySelector(".search-list-container");
  searchResults.results.forEach((result) => {
    renderTemplate(result, parentContainer);
  });
}

export function renderTemplate(element, parent, mode = "afterbegin") {
  const elementHTML = `<section class="search-result">
    <h3 class="recipe-name">${element.title}</h3>
    <img src="${element.image}" alt="${element.title} image">
    <button id="view-recipe" data-id="${element.id}">View Full Recipe</button>
    <div class="favs-remove-container">
        <button id="favs" data-id="${element.id}"><img src="/images/star.png" alt="add recipe to favorite list button"></button>
        <button id="remove-recipe" data-id="${element.id}"><img src="/images/remove.png" alt="remove button"></button>
    </div>
</section>`;
  parent.insertAdjacentHTML(mode, elementHTML);
}

function convertParameter(searchParameter) {
    // Converts user input " " into +
  return searchParameter.replace(" ", "+");
}
