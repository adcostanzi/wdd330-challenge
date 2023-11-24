import { loadHeaderFooter, loadFilterOptions } from "./utils.mjs";

async function main() {
    await loadHeaderFooter();
    
    let filterBtn = document.querySelector("#filter-btn");
  
    filterBtn.addEventListener("click", loadFilterOptions);
  }
  
  main();