import { loadHeaderFooter, searchFunction } from "./utils.mjs";

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