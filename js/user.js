import { searchFunction, showFilterModal } from "./searchEngine.mjs";
import { renderFavList } from "./userDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

async function main() {
    await loadHeaderFooter();
    
    let searchBtn = document.querySelector("#search-btn");
    let filters = document.querySelector("#filters-btn");

    searchBtn.addEventListener("click", searchFunction);
    filters.addEventListener("click", showFilterModal);

    let searchBar = document.querySelector("#search-bar");
    searchBar.addEventListener("keypress", (e) => {
      if (e.key === "Enter"){
        e.preventDefault();
        searchBtn.click();
      }
    });
    renderFavList();
  }
  
  main();

 