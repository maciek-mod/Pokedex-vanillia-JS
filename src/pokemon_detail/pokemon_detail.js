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
        document.getElementById('pokemon_detail').innerHTML = req.name;
    } else {
        let template = `<div id="pokemon_detail" data-id="${req.name}"> ${req.name} </div>`;
        Pokedex.variables.app_container.insertAdjacentHTML('beforeend', template);
    }

}

export default Pokemon_detail;
