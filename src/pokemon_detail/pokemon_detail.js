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
        let template = `<div id="pokemon_detail" data-id="${req.name}"> </div>`;
        Pokedex.variables.app_container.insertAdjacentHTML('beforeend', template);
        this.template_detail_html_header(req, req2);
    }

}
Pokemon_detail.template_detail_html_header = function(req, req2){
    // console.log(req);
    let template_container = `<header><h1>${this.capitalize_first_letter(req.name)}</h1> <div class="types_pokemon"></div></header>`;
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



export default Pokemon_detail;
