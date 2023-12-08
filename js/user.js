import { loadHeaderFooter } from "./utils.mjs";
import { searchFunction } from "./searchEngine.mjs";

async function main() {
    await loadHeaderFooter();
    
    let searchBtn = document.querySelector("#search-btn");
    let searchBar = document.querySelector("#search-bar");

    searchBar.addEventListener("keypress", function(e){
      if (e.key === "Enter"){
        searchBtn.click();    
      }
    });
    searchBtn.addEventListener("click", searchFunction);
  }
  
  main();