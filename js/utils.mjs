


function loadHTMLTemplate(path){
    return async function (){
        const res = await fetch(path);

        if (res.ok){
            const html = res.text();
            return html;
        }
    };
}

async function renderTemplate(templateFn, parentElement, data, position = "afterbegin", clear = true){
    if (clear == true){
        parentElement.innerHTML = "";
    }
    let response = await templateFn(data);
    parentElement.insertAdjacentHTML(position, response);
}

export function loadHeaderFooter(home = false){
    
    let header = document.querySelector("#main-header");
    let footer = document.querySelector("#main-footer");
    let headerTemplate;
    let footerTemplate = loadHTMLTemplate("/partials/footer.html");
    if (home){
        headerTemplate = loadHTMLTemplate("/partials/home-header.html");
        
    } else {
        headerTemplate = loadHTMLTemplate("/partials/header.html");
    }
    renderTemplate(headerTemplate, header);
    renderTemplate(footerTemplate, footer);

}