const api_pokedex_kanto = 'https://pokeapi.co/api/v2/pokedex/2/';
require('./style.scss');

const Pokedex = {
    variables: {
        app_container: document.getElementById('app'),
    },

    init: async function(api_pokedex_kanto) {
        let pokedex_request = await fetch(api_pokedex_kanto)
            .then(function(response) {
                return response.json();
            })
            .catch(error => {
                console.log(error);
            });
        this.view_list(pokedex_request);
    },

    get_pokemon: async function(url){
        let pokemon_request = await fetch(url)
            .then(function(response) {
                return response.json();
            })
            .catch(error => {
                console.log(error);
        });
        console.log(pokemon_request);
    },

    view_list: function(pokedex_request) {
        let template = '<ul id="pokedex_list"> </ul>';
        this.variables.app_container.insertAdjacentHTML('beforeend', template);
        pokedex_request.pokemon_entries.map(item => {
            // console.log(item);
            this.template_html(item, "pokedex_list");
        });
        this.add_event_to_list_pokemon();
    },

    template_html: function(elements, elements_id) {
        let template = `<li data-id="${elements.entry_number}"> ${elements.entry_number}. ${elements.pokemon_species.name}  </li>`;
        document.getElementById(elements_id).insertAdjacentHTML('beforeend', template);
    },

    add_event_to_list_pokemon: function() {
        let list_pokemon = Array.from(document.querySelectorAll("#pokedex_list li"));
        list_pokemon.map(item => {
            item.addEventListener('click', function(event) {
                let id = this.getAttribute("data-id");
                Pokedex.get_pokemon(`https://pokeapi.co/api/v2/pokemon/${id}`)
            });
        });
    }
};


Pokedex.init(api_pokedex_kanto);
