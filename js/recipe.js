
import renderRecipeDetails from "./recipeDetails.mjs";
import { loadHeaderFooter, searchFunction } from "./utils.mjs";

async function main() {
    await loadHeaderFooter();
    
    let searchBtn = document.querySelector("#search-btn");
    let searchBar = document.querySelector("#search-bar");

    searchBtn.addEventListener("click", searchFunction);
    
    searchBar.addEventListener("keypress", function(e){
      if (e.key === "Enter"){
        searchBtn.click();    
      }
    });

    renderRecipeDetails();
  }
  
  main();