import { searchQuery } from "./externalServicies.mjs";
import { setLocalStorage, convertParameter} from "./utils.mjs";

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
    renderSearchResult(result, parentContainer);
  });
}

export function renderSearchResult(element, parent, mode = "afterbegin") {
  const elementHTML = `
  <a href=/recipe-pages/index.html?recipe=${element.id} class="recipe-search-result">
    <section class="search-result">
      <img src="${element.image}" alt="${element.title} image" loading="lazy">
      <h3 class="recipe-title-sr">${element.title}</h3>
    </section>
    <div class="click-me">
        <span class="highlight">Click n'Look!</span>
      </div>
  </a>
  `;
  parent.insertAdjacentHTML(mode, elementHTML);
}

