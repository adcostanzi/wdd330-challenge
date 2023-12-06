import { loadHeaderFooter, searchFunction, filtersFunctionOn } from "./utils.mjs";

async function main() {
    await loadHeaderFooter();
    
    let searchBtn = document.querySelector("#search-btn");
    let searchBar = document.querySelector("#search-bar");
    let filters = document.querySelector("#filters-btn");

    searchBar.addEventListener("keypress", function(e){
      if (e.key === "Enter"){
        searchBtn.click();    
      }
    });
    searchBtn.addEventListener("click", searchFunction);
    filters.addEventListener("click", filtersFunctionOn);
  }
  
  main();