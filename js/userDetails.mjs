import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { renderNoResultsFound, renderSearchResult } from "./recipeList.mjs";

export async function renderFavList(){
    let favResults = await getLocalStorage("fav-list") || [];
    console.log(favResults);
    let favCount = document.querySelector("#fav-count");
    favCount.textContent = favResults.length;

    let results = document.querySelector(".search-list-container");

    if (favResults == null) {
        setLocalStorage("fav-list", favResults);
    }
    if (favResults.length === 0){
        renderNoResultsFound();
    } else {
        favResults.forEach((recipe) => {
            renderSearchResult(recipe, results);
        });
    }
  }