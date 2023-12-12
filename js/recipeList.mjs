import { searchQuery } from "./externalServicies.mjs";
import { setLocalStorage, convertParameter, getParam} from "./utils.mjs";

export function search(userInput) {
  // format user input for appropiate query search and redirect to recipeList page
  let formattedInput = convertParameter(userInput);
  setLocalStorage("last-search", userInput);
  window.location = `/search-list/index.html?search=${formattedInput}`;
}

export function searchWithRecipeFilters(userInput, userFilters) {
  let formattedInput = convertParameter(userInput);
  setLocalStorage("filters", userFilters);
  window.location = `/search-list/index.html?search=${formattedInput}&filter=recipe`;
}

export function searchWithIngredients(ingredients){
  setLocalStorage("ingredients", ingredients);
  window.location = `/search-list/index.html?search=&filter=ingredients`;
}

export async function renderSearchList() {
    // Perform searchQuery, store results in localStorage and render each result
  let searchResults = await searchQuery("search");
  setLocalStorage("search-results", searchResults);
  const parentContainer = document.querySelector(".search-list-container");
  if (getParam("filter") !== "ingredients"){
    if (searchResults.results.length !== 0){
      searchResults.results.forEach((result) => {
        renderSearchResult(result, parentContainer);
      });
    } else {
      renderNoResultsFound();
    }
    
  } else {
    if (searchResults.length !== 0){
      searchResults.forEach((result) => {
        renderSearchResult(result, parentContainer);
      });
    } else {
      renderNoResultsFound();
    }
    
  } 
}



export function renderNoResultsFound(){
  const noResultsHTML = `
  <section class="not-found-message">
    <h3>Oops... No results were found</h3>
    <div class="not-found-body">
      <p>Unfortunately our search engine was not able to find any results for your search. Please try again with another keyword(s).</p>
      <div class="not-found-image-container">
        <img src="/images/recipe-not-found-280.jpg" alt="recipe not found image of book with prohibitted sign">
      </div>
    </div>
  </section>
  `;

  let parent = document.querySelector(".search-list-container");
  parent.insertAdjacentHTML("afterbegin", noResultsHTML);
}

export function renderSearchResult(element, parent, mode = "afterbegin") {
  const elementHTML = `
  <a href=/recipe-pages/index.html?recipe=${element.id} class="recipe-search-result">
    <section class="search-result">
      <img src="${element.image}" alt="${element.title} image" loading="lazy" width="250">
      <h3 class="recipe-title-sr">${element.title}</h3>
    </section>
    <div class="click-me">
        <span class="highlight">Click n'Look!</span>
      </div>
  </a>
  `;
  parent.insertAdjacentHTML(mode, elementHTML);
}

