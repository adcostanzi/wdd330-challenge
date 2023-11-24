import { renderSearchList} from "./recipeList.mjs";
import { getLocalStorage, loadHeaderFooter, searchFunction } from "./utils.mjs";

async function main() {
    await loadHeaderFooter();
    
    let searchBtn = document.querySelector("#search-btn");
    let searchBar = document.querySelector("#search-bar");

    searchBar.value = getLocalStorage("last-search");
    searchBtn.addEventListener("click", searchFunction);
    

    renderSearchList();
  }
  
  main();