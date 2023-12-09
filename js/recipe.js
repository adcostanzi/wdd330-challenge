import { searchFunction, showFilterModal } from "./searchEngine.mjs";
import renderRecipeDetails from "./recipeDetails.mjs";
import { loadHeaderFooter} from "./utils.mjs";

async function main() {
    await loadHeaderFooter();
    
    let searchBtn = document.querySelector("#search-btn");
    let searchBar = document.querySelector("#search-bar");
    let filters = document.querySelector("#filters-btn");

    searchBtn.addEventListener("click", searchFunction);
    filters.addEventListener("click", showFilterModal);
    
    searchBar.addEventListener("keypress", function(e){
      if (e.key === "Enter"){
        e.preventDefault();
        searchBtn.click();    
      }
    });

    renderRecipeDetails();
  }
  
  main();




 