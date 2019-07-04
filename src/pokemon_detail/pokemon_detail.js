import Pokemon_detail from "../pokedex/pokedex.js";
import Pokedex from "../pokedex/pokedex.js";

Pokemon_detail.init_detail = async function(url, url2) {
    const detail_1_request = fetch(url).then(r => r.json());
    const detail_2_request = fetch(url2).then(r => r.json());
    const [detail_1, detail_2] = await Promise.all([detail_1_request, detail_2_request]);
    console.log(detail_1);
    console.log(detail_2);
}

export default Pokemon_detail;
