import Pokemon_detail from "../pokedex/pokedex.js";
import Pokedex from "../pokedex/pokedex.js";

Pokemon_detail.init_detail = async function(url, url2) {
    const detail_1_request = fetch(url).then(r => r.json());
    const detail_2_request = fetch(url2).then(r => r.json());
    const [detail_1, detail_2] = await Promise.all([detail_1_request, detail_2_request]);
    this.template_detail_html(detail_1, detail_2);
}
Pokemon_detail.template_detail_html = function(req, req2) {
    if (document.getElementById('pokemon_detail') !== null) {
        document.getElementById('pokemon_detail').setAttribute("data-id", req.name);
        while( document.getElementById('pokemon_detail').firstChild){
            document.getElementById('pokemon_detail').removeChild( document.getElementById('pokemon_detail').firstChild );
        }
        this.template_detail_html_header(req, req2);
    } else {
        let template = `<div id="pokemon_detail" data-id="${req.name}"> </div> </div>`;
        Pokedex.variables.app_container.insertAdjacentHTML('beforeend', template);
        this.template_detail_html_header(req, req2);
    }

}
Pokemon_detail.template_detail_html_header = function(req, req2){
    let desc = null;
    for (var key in req2.flavor_text_entries) {
        if (req2.flavor_text_entries[key].language.name === "en" && req2.flavor_text_entries[key].version.name === "yellow") {
            desc = req2.flavor_text_entries[key].flavor_text;
            break;
        }
    }

    let template_container = `<header><h1>${this.capitalize_first_letter(req.name)}</h1> <h2>${desc}</h2> <div class="types_pokemon"></div></header>`;
    document.getElementById('pokemon_detail').insertAdjacentHTML('beforeend', template_container);

    req.types.map(item => {
        let template_type =  `<p>${this.capitalize_first_letter(item.type.name)}</p>`;
        document.querySelector('.types_pokemon').insertAdjacentHTML('beforeend', template_type);
    });

    for (let key in req.sprites) {
        if (req.sprites[key] !== null) {
            let template_sprite =  `<div> <img src=${req.sprites[key]} alt="${key}"> <h2>${this.capitalize_first_letter(key.replace(/_/g, ' '))}</h2> </div>`;
            document.querySelector('.types_pokemon').insertAdjacentHTML('beforeend', template_sprite);
        }
    }
}
Pokemon_detail.search = function(){
    let input_search = document.body.querySelector("#pokedex_list_container input"),
        pokedex_list = document.querySelectorAll("#pokedex_list li");
    input_search.addEventListener("keyup", function(event){
        let input_value = this.value;
        search_pokemon(input_value);
    })
    function search_pokemon(name){
        for (var i = 0; i < pokedex_list.length; i++) {
            if (pokedex_list[i].innerText.indexOf(name) !== -1) {
                pokedex_list[i].classList.add("active");
                if (pokedex_list[i].classList.contains("no_active")) {
                    pokedex_list[i].classList.remove("no_active");
                }
            } else {
                if (pokedex_list[i].classList.contains("active")) {
                    pokedex_list[i].classList.remove("active");
                }
                pokedex_list[i].classList.add("no_active");
            }
        }
    }
}





export default Pokemon_detail;
