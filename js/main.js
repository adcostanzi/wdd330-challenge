import { searchFunction, showFilterModal } from "./searchEngine.mjs";
import { loadHeaderFooter } from "./utils.mjs";

async function main() {
    await loadHeaderFooter();
    
    let searchBtn = document.querySelector("#search-btn");
    let filters = document.querySelector("#filters-btn");

    searchBtn.addEventListener("click", searchFunction);
    filters.addEventListener("click", showFilterModal);
  }
  
  main();