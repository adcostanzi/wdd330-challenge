import { renderSearchList} from "./recipeList.mjs";
import { searchFunction, showFilterModal } from "./searchEngine.mjs";
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

async function main() {
    await loadHeaderFooter();
    
    let searchBtn = document.querySelector("#search-btn");
    let searchBar = document.querySelector("#search-bar");
    let filters = document.querySelector("#filters-btn");

    searchBar.value = getLocalStorage("last-search");
    searchBtn.addEventListener("click", searchFunction);
    filters.addEventListener("click", showFilterModal);
    
    searchBar.addEventListener("keypress", function(e){
      if (e.key === "Enter"){
        searchBtn.click();    
      }
    });

    renderSearchList();
  }
  
  main();




  
