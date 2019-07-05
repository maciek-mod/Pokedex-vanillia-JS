import Pokedex from "./pokedex/pokedex.js";
import Pokemon_detail from "./pokemon_detail/pokemon_detail.js";

const api_pokedex_kanto = 'https://pokeapi.co/api/v2/pokedex/2/';
require('./scss/defaul.scss');

Pokedex.init(api_pokedex_kanto);
