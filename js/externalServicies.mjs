import { getParam } from "./utils.mjs";

const baseURL = "https://api.spoonacular.com/recipes/";

const apiKey = "apiKey=ee02132207be4e9ca097b01c3028b136";

export async function searchQuery(parameter){
    let query = getParam(parameter);
    const response = await fetch(baseURL + "complexSearch?"+ apiKey + `&query=${query}`+ "&number=5");  
    if (response.ok){
        return response.json();
    } 
}


export async function recipeQuery(parameter){
    let query = getParam(parameter);
    const response = await fetch(baseURL + query + "/information?" + apiKey);
    if (response.ok){
        return response.json();
    }
}



