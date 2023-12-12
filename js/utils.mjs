

function loadHTMLTemplate(path) {
  return async function () {
    const res = await fetch(path);

    if (res.ok) {
      const html = res.text();
      return html;
    }
  };
}

async function renderTemplate(
  templateFn,
  parentElement,
  data,
  position = "afterbegin",
  clear = true
) {
  if (clear == true) {
    parentElement.innerHTML = "";
  }
  let response = await templateFn(data);
  parentElement.insertAdjacentHTML(position, response);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export async function loadHeaderFooter() {
  let header = document.querySelector("#main-header");
  let footer = document.querySelector("#main-footer");

  let headerTemplate = loadHTMLTemplate("partials/header.html");
  let footerTemplate = loadHTMLTemplate("partials/footer.html");

  await renderTemplate(headerTemplate, header);
  await renderTemplate(footerTemplate, footer);
}



export function getParam(parameter) {
  const queryBase = window.location.search;
  const urlParameters = new URLSearchParams(queryBase);
  const toSearch = urlParameters.get(parameter);
  return toSearch;
}

export function convertParameter(searchParameter) {
  // Converts user input " " into +
  return searchParameter.replace(" ", "+");
}


export function formAlert(text, parent){
  let alert = document.createElement("span");
  alert.textContent = text;
  alert.classList.add("alert")
  parent.append(alert);
  setTimeout( ()=> {
    parent.removeChild(alert);
  }, 3000);
}

export function convertArrayIngredients(unformattedArray){
  let finalString = "&ingredients=";
  for (let i = 0; i < unformattedArray.length; i++) {
    if (i === 0){
      finalString = `${finalString}${unformattedArray[i]}`;
    } else {
      finalString = `${finalString},+${unformattedArray[i]}`;
    }
  }
  return finalString;
}