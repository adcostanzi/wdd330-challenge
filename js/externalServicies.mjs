import { convertArrayIngredients, getLocalStorage, getParam } from "./utils.mjs";

const baseURL = "https://api.spoonacular.com/recipes/";

const apiKey = "apiKey=ee02132207be4e9ca097b01c3028b136";

export async function searchQuery(parameter) {
  let filterQuery = getParam("filter");
  let response = {};

  if (filterQuery === "ingredients") {
    let ingredients = await convertArrayIngredients(getLocalStorage("ingredients"));
    response = await fetch(baseURL + "findByIngredients?" + apiKey + ingredients + "&number=5"
      );
  } else {
    let query = getParam(parameter);

    if (filterQuery === null) {
      response = await fetch(
        baseURL + "complexSearch?" + apiKey + `&query=${query}` + "&number=5"
      );
    } else if (filterQuery === "recipe") {
      let userFilters = getLocalStorage("filters");
      let filters = "";
      for (const filter in userFilters) {
        filters = `${filters}&${filter}=${userFilters[filter]}`;
      }
      response = await fetch(
        baseURL +
          "complexSearch?" +
          apiKey +
          `&query=${query}` +
          "&number=5" +
          `${filters}`
      );
    } 
  }
  if (response.ok) {
    return response.json();
  }
}

export async function recipeQuery(parameter) {
  let query = getParam(parameter);
  const response = await fetch(baseURL + query + "/information?" + apiKey);
  if (response.ok) {
    return response.json();
  }
}
